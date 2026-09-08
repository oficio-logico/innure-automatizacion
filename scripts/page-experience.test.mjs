import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../app/page-experience.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup({ reduced = false, supported = true } = {}) {
  const state = { showContact: false, animations: [], effect: null };
  const elements = Object.fromEntries(['hero', 'contact', 'footer', 'section'].map((name) => [name, {
    name, bottom: 600, classes: new Set(),
    classList: { add(value) { elements[name].classes.add(value); } },
    getBoundingClientRect() { return { bottom: this.bottom }; },
    animate(keyframes, options) {
      const animation = { keyframes, options, cancelled: false, finished: new Promise(() => {}), cancel() { this.cancelled = true; } };
      state.animations.push(animation);
      return animation;
    },
  }]));
  const media = { matches: reduced, listeners: new Set(), addEventListener(_, listener) { this.listeners.add(listener); }, removeEventListener(_, listener) { this.listeners.delete(listener); } };
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; this.observed = new Set(); this.disconnected = false; observers.push(this); }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.disconnected = true; }
  }
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name === 'react') return { useEffect(effect) { state.effect = effect; }, useState(initial) { state.showContact = initial; return [initial, (value) => { state.showContact = value; }]; } };
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === './icons') return { Icon: () => null };
      throw new Error(`Unexpected import: ${name}`);
    },
    window: { ...(supported ? { IntersectionObserver: Observer } : {}), matchMedia: () => media },
    IntersectionObserver: Observer,
    document: {
      querySelectorAll: () => [elements.section],
      getElementById: (id) => id === 'inicio' ? elements.hero : elements.contact,
      querySelector: () => elements.footer,
    },
  });
  const rendered = exports.PageExperience();
  const cleanup = state.effect();
  return { state, elements, media, observers, rendered, cleanup };
}

test('el CTA móvil no aparece al inicio ni sin IntersectionObserver', () => {
  const normal = setup();
  assert.equal(normal.rendered.props.hidden, true);
  assert.equal(normal.state.showContact, false);
  normal.cleanup();
  const fallback = setup({ supported: false });
  assert.equal(fallback.observers.length, 0);
  assert.equal(fallback.rendered.props.hidden, true);
});

test('el CTA aparece después del hero y se oculta al entrar el contacto o el pie', () => {
  const { state, elements, observers, cleanup } = setup();
  const visibility = observers[1];
  visibility.callback([{ target: elements.hero, isIntersecting: true }]);
  assert.equal(state.showContact, false);
  elements.hero.bottom = -1;
  visibility.callback([{ target: elements.hero, isIntersecting: false }]);
  assert.equal(state.showContact, true);
  visibility.callback([{ target: elements.contact, isIntersecting: true }]);
  assert.equal(state.showContact, false);
  visibility.callback([{ target: elements.contact, isIntersecting: false }, { target: elements.footer, isIntersecting: true }]);
  assert.equal(state.showContact, false);
  visibility.callback([{ target: elements.footer, isIntersecting: false }]);
  assert.equal(state.showContact, true);
  elements.hero.bottom = 100;
  visibility.callback([{ target: elements.hero, isIntersecting: true }]);
  assert.equal(state.showContact, false);
  cleanup();
});

test('la entrada se anima una vez, sin ocultar contenido fuera de la animación', () => {
  const { state, elements, observers, cleanup } = setup();
  observers[0].callback([{ target: elements.section, isIntersecting: false }]);
  assert.equal(state.animations.length, 0);
  observers[0].callback([{ target: elements.section, isIntersecting: true }]);
  assert.equal(state.animations.length, 1);
  assert.equal(elements.section.classes.has('is-entered'), true);
  assert.equal(observers[0].observed.has(elements.section), false);
  assert.equal(state.animations[0].keyframes[1].opacity, 1);
  cleanup();
  assert.equal(state.animations[0].cancelled, true);
});

test('reduced motion conserva el contenido y no inicia animaciones', () => {
  const { state, elements, observers, cleanup } = setup({ reduced: true });
  observers[0].callback([{ target: elements.section, isIntersecting: true }]);
  assert.equal(state.animations.length, 0);
  assert.equal(elements.section.classes.has('is-entered'), true);
  cleanup();
});

test('cambiar reduced motion cancela el movimiento y el desmontaje limpia los observadores', () => {
  const { state, elements, observers, media, cleanup } = setup();
  observers[0].callback([{ target: elements.section, isIntersecting: true }]);
  media.matches = true;
  media.listeners.forEach((listener) => listener());
  assert.equal(state.animations[0].cancelled, true);
  cleanup();
  assert.equal(observers.every((observer) => observer.disconnected), true);
  assert.equal(media.listeners.size, 0);
});
