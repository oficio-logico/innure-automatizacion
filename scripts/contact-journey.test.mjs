import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

function compile(source) {
  return ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

function load(code, imports = {}, globals = {}) {
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    process: { env: {} },
    require(name) {
      assert.ok(name in imports, `Unexpected import: ${name}`);
      return imports[name];
    },
    ...globals,
  });
  return exports;
}

const contentModule = load(compile(await readFile(new URL('../app/site-content.ts', import.meta.url), 'utf8')));
const intentModule = load(compile(await readFile(new URL('../app/contact-intent.ts', import.meta.url), 'utf8')));
const componentCode = compile(await readFile(new URL('../app/interactive.tsx', import.meta.url), 'utf8'));
const { resolveContactNeed, prepareContactProcess, contactDetailLimit } = intentModule;
const examples = contentModule.siteContent.landing.examples;

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap((child) => nodes(child, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props?.children, predicate)];
}

function one(tree, predicate) {
  const matches = nodes(tree, predicate);
  assert.equal(matches.length, 1);
  return matches[0];
}

// Exercise the actual handlers with in-memory React state and a fake receiver.
// This is not a browser test and never sends mail or loads third-party services.
function setup({ receiver = false, accepted = true, hydrated = true } = {}) {
  const hookSlots = new Map();
  const contexts = [];
  const state = { fetches: [], events: [], focus: [], resetCount: 0 };
  let activeSlots;
  let cursor;
  const slot = (initial) => {
    const index = cursor++;
    if (!(index in activeSlots)) activeSlots[index] = initial;
    return [activeSlots, index];
  };
  const react = {
    useSyncExternalStore: (_subscribe, getSnapshot, getServerSnapshot) => hydrated ? getSnapshot() : getServerSnapshot(),
    createContext(initial) {
      const context = { current: initial, Provider: 'ContactProvider' };
      contexts.push(context);
      return context;
    },
    useContext: (context) => context.current,
    useState(initial) {
      const [slots, index] = slot(initial);
      return [slots[index], (next) => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }];
    },
    useRef(initial) {
      const [slots, index] = slot({ current: initial });
      return slots[index];
    },
  };
  const jsx = (type, props) => ({ type, props });
  const Turnstile = () => null;
  const siteContent = {
    ...contentModule.siteContent,
    contact: {
      ...contentModule.siteContent.contact,
      formEndpoint: receiver ? '/automatizacion/contacto.php' : null,
      turnstileSiteKey: receiver ? 'test-site-key' : null,
    },
  };
  const fields = {
    service: siteContent.contact.serviceId,
    name: 'Prueba local', company: 'Empresa de prueba', email: 'prueba@example.invalid',
    phone: '', privacy: 'accepted', website: '', process: 'Copiamos los datos de cada pedido entre dos programas.',
  };
  const form = {
    fields,
    reportValidity: () => true,
    reset() { state.resetCount++; this.fields = {}; },
  };
  class FakeFormData extends Map {
    constructor(formElement) { super(Object.entries(formElement.fields)); }
  }
  const window = {
    location: { href: '', assign(url) { this.href = url; } },
    dispatchEvent(event) { state.events.push(event); },
  };
  const components = load(componentCode, {
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
    './site-content': { ...contentModule, siteContent },
    './icons': { Icon: () => null },
    './turnstile': { Turnstile },
    './contact-intent': intentModule,
  }, {
    window,
    document: { getElementById: (id) => ({ focus: () => state.focus.push(id) }) },
    FormData: FakeFormData,
    CustomEvent: class { constructor(type, { detail }) { this.type = type; this.detail = detail; } },
    AbortSignal: { timeout: () => undefined },
    async fetch(url, options) {
      state.fetches.push({ url, options });
      return { ok: true, json: async () => accepted ? { success: true, submissionId: '12345678abcdef0012345678abcdef00' } : { success: false } };
    },
  });

  function render(name, props = {}) {
    if (!hookSlots.has(name)) hookSlots.set(name, []);
    activeSlots = hookSlots.get(name);
    cursor = 0;
    const tree = components[name](props);
    if (name === 'ContactJourney') contexts[0].current = tree.props.value;
    for (const node of nodes(tree, (node) => node.type === 'textarea' && node.props.ref)) {
      node.props.ref.current = { focus: () => state.focus.push('process') };
    }
    return tree;
  }

  function choose(index) {
    render('ContactJourney');
    const before = render('ProcessExamples');
    nodes(before, (node) => node.props?.role === 'tab')[index].props.onClick();
    const selected = render('ProcessExamples');
    one(selected, (node) => node.type === 'a' && node.props.href === '#contacto').props.onClick();
    render('ContactJourney');
    return render('ContactForm');
  }

  async function submit() {
    render('ContactJourney');
    let tree = render('ContactForm');
    if (receiver) {
      one(tree, (node) => node.type === Turnstile).props.onToken('test-token');
      tree = render('ContactForm');
    }
    await tree.props.onSubmit({ preventDefault() {}, currentTarget: form });
    render('ContactJourney');
    return render('ContactForm');
  }
  render('ContactJourney');
  return { state, window, form, render, choose, submit };
}

test('sin JS el formulario queda inerte y nunca degrada a un GET con datos', async () => {
  const { render, submit, state } = setup({ receiver: true, hydrated: false });
  const tree = render('ContactForm');
  assert.equal(tree.props.method, 'post');
  assert.equal(tree.props.action, '/automatizacion/contacto.php');
  assert.equal(one(tree, (node) => node.type === 'fieldset').props.disabled, true);
  assert.equal(one(tree, (node) => node.type === 'button' && node.props.type === 'submit').props.disabled, true);
  assert.equal(nodes(tree, (node) => node.type === 'noscript').length, 1);
  await submit();
  assert.equal(state.fetches.length, 0);
  assert.equal(state.resetCount, 0);
});

test('tras hidratar se habilitan los campos; la preview sigue sin receptor', () => {
  const { render } = setup();
  const tree = render('ContactForm');
  assert.equal(tree.props.method, 'post');
  assert.equal(tree.props.action, undefined);
  assert.equal(one(tree, (node) => node.type === 'fieldset').props.disabled, false);
  assert.equal(one(tree, (node) => node.type === 'button' && node.props.type === 'submit').props.disabled, false);
});

test('solo se resuelven los tres ejemplos conocidos y las preguntas de contexto están presentes', () => {
  assert.equal(examples.length, 3);
  assert.equal(new Set(examples.map((example) => example.id)).size, 3);
  for (const example of examples) {
    assert.equal(resolveContactNeed(examples, example.id), example);
    assert.ok(example.contactPrompt.length > 20);
  }
  assert.equal(resolveContactNeed(examples, 'inventado'), null);
  assert.equal(resolveContactNeed(examples, null), null);
});

test('el mensaje conserva el detalle y reserva espacio para la etiqueta sin truncarlo', () => {
  assert.equal(prepareContactProcess('Mi detalle', null), 'Mi detalle');
  assert.equal(contactDetailLimit(null), 3000);
  for (const example of examples) {
    const detail = 'x'.repeat(contactDetailLimit(example));
    const prepared = prepareContactProcess(detail, example);
    assert.equal(prepared.length, 3000);
    assert.ok(prepared.endsWith(detail));
    assert.ok(prepared.includes(example.label));
  }
});

for (const [index, example] of examples.entries()) {
  test(`el ejemplo «${example.label}» llega seleccionado al formulario sin enviar nada`, () => {
    const app = setup();
    const tree = app.choose(index);
    const interest = one(tree, (node) => node.props?.className === 'form-interest');
    assert.equal(interest.props.hidden, false);
    assert.equal(one(interest, (node) => node.type === 'strong').props.children, example.label);
    const textarea = one(tree, (node) => node.type === 'textarea');
    assert.equal(textarea.props.placeholder, example.contactPrompt);
    assert.equal(textarea.props.required, true);
    assert.equal(textarea.props.minLength, 20);
    assert.equal(app.state.fetches.length, 0);
    assert.equal(app.state.events.length, 0);
    assert.equal(app.window.location.href, '');
  });
}

test('cambiar o quitar la tarea no controla ni borra el borrador del visitante', () => {
  const app = setup();
  const original = app.form.fields.process;
  app.choose(0);
  const tree = app.choose(2);
  const textarea = one(tree, (node) => node.type === 'textarea');
  assert.equal(textarea.props.value, undefined);
  assert.equal(textarea.props.defaultValue, undefined);
  const interest = one(tree, (node) => node.props?.className === 'form-interest');
  one(interest, (node) => node.type === 'button').props.onClick();
  app.render('ContactJourney');
  const cleared = app.render('ContactForm');
  assert.equal(one(cleared, (node) => node.props?.className === 'form-interest').props.hidden, true);
  assert.equal(app.form.fields.process, original);
  assert.equal(app.state.resetCount, 0);
  assert.equal(app.state.focus.at(-1), 'process');
});

test('la revisión local prepara un correo con contexto y conserva los campos', async () => {
  const app = setup();
  app.choose(1);
  await app.submit();
  const url = new URL(app.window.location.href);
  assert.equal(url.protocol, 'mailto:');
  assert.ok(url.searchParams.get('body').includes(examples[1].label));
  assert.ok(url.searchParams.get('body').includes(app.form.fields.process));
  assert.equal(app.state.fetches.length, 0);
  assert.equal(app.state.events.length, 0);
  assert.equal(app.state.resetCount, 0);
});

test('el envío conserva el contrato y la conversión nunca recibe el interés ni el texto', async () => {
  const app = setup({ receiver: true });
  const original = app.form.fields.process;
  app.choose(2);
  const tree = await app.submit();
  assert.equal(app.state.fetches.length, 1);
  const { url, options } = app.state.fetches[0];
  assert.equal(url, '/automatizacion/contacto.php');
  assert.equal(options.body.get('service'), 'automatizacion-ia');
  assert.equal(options.body.get('process'), prepareContactProcess(original, examples[2]));
  assert.equal(options.body.get('cf-turnstile-response'), 'test-token');
  assert.equal(app.state.resetCount, 1);
  assert.equal(one(tree, (node) => node.props?.className === 'form-interest').props.hidden, true);
  assert.equal(app.state.events.length, 1);
  assert.equal(app.state.events[0].type, 'innure:lead-received');
  assert.equal(Object.keys(app.state.events[0].detail).sort().join(','), 'service,submissionId');
});

test('un receptor que no confirma conserva el borrador y la selección, sin conversión', async () => {
  const app = setup({ receiver: true, accepted: false });
  const original = app.form.fields.process;
  app.choose(0);
  const tree = await app.submit();
  assert.equal(app.state.resetCount, 0);
  assert.equal(app.form.fields.process, original);
  assert.equal(one(tree, (node) => node.props?.className === 'form-interest').props.hidden, false);
  assert.equal(app.state.events.length, 0);
});

test('un borrador previo demasiado largo no se trunca ni se envía al elegir una tarea', async () => {
  const app = setup({ receiver: true });
  app.form.fields.process = 'x'.repeat(3000);
  app.choose(0);
  const tree = await app.submit();
  assert.equal(app.form.fields.process.length, 3000);
  assert.equal(app.state.fetches.length, 0);
  assert.equal(app.state.events.length, 0);
  assert.ok(one(tree, (node) => node.props?.className === 'form-status form-status-error').props.children.includes('se ha conservado'));
});

test('la etiqueta del ejemplo no permite enviar una explicación vacía o demasiado corta', async () => {
  for (const detail of [' '.repeat(30), 'Muy corto']) {
    const app = setup({ receiver: true });
    app.form.fields.process = detail;
    app.choose(1);
    const tree = await app.submit();
    assert.equal(app.form.fields.process, detail);
    assert.equal(app.state.fetches.length, 0);
    assert.equal(app.state.events.length, 0);
    assert.ok(one(tree, (node) => node.props?.className === 'form-status form-status-error').props.children.includes('20 caracteres'));
  }
});
