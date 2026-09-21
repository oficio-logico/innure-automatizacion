// Editorial and linking invariants for the solutions pilot. Uses node:test.
import test from 'node:test';
import assert from 'node:assert/strict';
import { solutionCatalog, solutionSlugs, getSolution } from '../app/solution-catalog.mjs';

const EXPECTED_SLUGS = [
  'consultoria-ia-empresas',
  'automatizacion-procesos',
  'fisioterapia',
  'centros-estetica',
  'gestorias',
  'reservas-whatsapp',
  'reservas-facturacion',
  'seguimiento-presupuestos',
  'aplicaciones-a-medida',
];

const REQUIRED_KEYS = [
  'slug',
  'group',
  'navTitle',
  'title',
  'description',
  'eyebrow',
  'headline',
  'intro',
  'audience',
  'problem',
  'decisions',
  'workflow',
  'example',
  'requirements',
  'limits',
  'firstStep',
  'questions',
  'faqs',
  'related',
  'evidence',
  'sources',
  'ctaLabel',
  'alternatives',
  'reviewedOn',
].sort();

const deepText = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(deepText).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(deepText).join(' ');
  return '';
};

test('la colección expone los nueve slugs esperados, únicos y derivados', () => {
  assert.deepEqual(
    solutionCatalog.map((solution) => solution.slug),
    EXPECTED_SLUGS,
  );
  assert.equal(new Set(solutionSlugs).size, solutionSlugs.length);
  assert.deepEqual(solutionSlugs, EXPECTED_SLUGS);
});

test('getSolution resuelve slugs conocidos y devuelve undefined para desconocidos', () => {
  for (const slug of EXPECTED_SLUGS) {
    assert.equal(getSolution(slug)?.slug, slug);
  }
  assert.equal(getSolution('no-existe'), undefined);
  assert.equal(getSolution(''), undefined);
  assert.equal(getSolution(undefined), undefined);
});

test('cada página tiene la estructura esperada con strings y arrays no vacíos', () => {
  for (const solution of solutionCatalog) {
    assert.deepEqual(Object.keys(solution).sort(), REQUIRED_KEYS, solution.slug);
    for (const key of ['slug', 'group', 'navTitle', 'title', 'description', 'eyebrow', 'headline', 'intro', 'audience', 'limits', 'firstStep', 'ctaLabel', 'reviewedOn']) {
      assert.equal(typeof solution[key], 'string', `${solution.slug}.${key}`);
      assert.ok(solution[key].trim().length > 0, `${solution.slug}.${key} vacío`);
    }
    assert.deepEqual(Object.keys(solution.problem).sort(), ['text', 'title']);
    assert.deepEqual(Object.keys(solution.example).sort(), ['text', 'title']);
    assert.deepEqual(Object.keys(solution.evidence).sort(), ['href', 'label', 'text']);
    assert.ok(solution.problem.title.trim() && solution.problem.text.trim());
    assert.ok(solution.example.title.trim() && solution.example.text.trim());
    assert.ok(solution.evidence.label.trim() && solution.evidence.text.trim());
    for (const group of ['decisions', 'workflow', 'requirements', 'questions', 'faqs', 'related', 'sources', 'alternatives']) {
      assert.ok(Array.isArray(solution[group]), `${solution.slug}.${group}`);
    }
    for (const group of ['decisions', 'workflow', 'requirements', 'questions', 'faqs', 'related']) {
      assert.ok(solution[group].length > 0, `${solution.slug}.${group} vacío`);
    }
    for (const item of [...solution.decisions, ...solution.workflow, ...solution.requirements]) {
      assert.deepEqual(Object.keys(item).sort(), ['text', 'title']);
      assert.ok(item.title.trim() && item.text.trim(), `${solution.slug} bloque incompleto`);
    }
    for (const question of solution.questions) {
      assert.equal(typeof question, 'string');
      assert.ok(question.trim().length > 0);
    }
    for (const faq of solution.faqs) {
      assert.deepEqual(Object.keys(faq).sort(), ['answer', 'question']);
      assert.ok(faq.question.trim() && faq.answer.trim());
    }
  }
});

test('los metadatos principales son únicos y el title no repite el sufijo de plantilla', () => {
  for (const field of ['title', 'description', 'headline', 'navTitle']) {
    const values = solutionCatalog.map((solution) => solution[field].trim());
    assert.equal(new Set(values).size, values.length, `campo repetido: ${field}`);
  }
  for (const solution of solutionCatalog) {
    assert.ok(!solution.title.includes('| innure'), solution.slug);
  }
});

test('related resuelve dentro del catálogo, no se autorreferencia y evidence apunta a /proyectos/', () => {
  const slugs = new Set(solutionCatalog.map((solution) => solution.slug));
  for (const solution of solutionCatalog) {
    assert.ok(solution.related.length >= 2 && solution.related.length <= 3, solution.slug);
    assert.equal(new Set(solution.related).size, solution.related.length, `${solution.slug} related repetido`);
    for (const slug of solution.related) {
      assert.ok(slugs.has(slug), `${solution.slug} apunta a ${slug}, que no existe`);
      assert.notEqual(slug, solution.slug, `${solution.slug} se autorreferencia`);
    }
    assert.ok(solution.evidence.href.startsWith('/proyectos/'), solution.evidence.href);
  }
});

test('las fuentes usan https', () => {
  for (const solution of solutionCatalog) {
    for (const source of solution.sources) {
      assert.deepEqual(Object.keys(source).sort(), ['note', 'title', 'url']);
      assert.match(source.url, /^https:\/\//, `${solution.slug} fuente no segura`);
      assert.ok(source.title.trim() && source.note.trim());
    }
  }
});

test('las alternativas son útiles solo en la página comparativa', () => {
  for (const solution of solutionCatalog) {
    if (solution.group === 'Decisiones') {
      assert.equal(solution.alternatives.length, 3, solution.slug);
      for (const alternative of solution.alternatives) {
        assert.deepEqual(Object.keys(alternative).sort(), ['fit', 'option', 'watch']);
        assert.ok(alternative.option.trim() && alternative.fit.trim() && alternative.watch.trim());
      }
    } else {
      assert.deepEqual(solution.alternatives, [], `${solution.slug} no debe tener alternativas`);
    }
  }
});

test('el ejemplo se marca explícitamente como hipotético en el texto', () => {
  for (const solution of solutionCatalog) {
    assert.match(
      solution.example.text.trim(),
      /^Ejemplo hipotético:/,
      `${solution.slug} no declara el ejemplo como hipotético`,
    );
  }
});

test('la marca innure no aparece en mayúsculas', () => {
  const text = solutionCatalog.map(deepText).join(' ');
  assert.ok(!/\bInnure\b|\bINNURE\b/.test(text));
});
