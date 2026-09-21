import test from 'node:test';
import assert from 'node:assert/strict';
import { automationConversionDestination, resolveMeasurementConfiguration } from './measurement-config.mjs';

test('las previews y compilaciones sin entorno no incluyen medición', () => {
  assert.deepEqual(resolveMeasurementConfiguration({ target: 'home' }), { enabled: false, conversionDestination: '' });
  assert.deepEqual(resolveMeasurementConfiguration({
    target: 'home', environment: 'preview', conversionDestination: automationConversionDestination,
  }), { enabled: false, conversionDestination: '' });
});

test('solo la publicación de portada en producción acepta la conversión de IA', () => {
  assert.deepEqual(resolveMeasurementConfiguration({
    target: 'home', environment: 'production', conversionDestination: automationConversionDestination,
  }), { enabled: true, conversionDestination: automationConversionDestination });
  assert.throws(() => resolveMeasurementConfiguration({
    target: 'automation', environment: 'production', conversionDestination: automationConversionDestination,
  }), /portada de producción/);
});

test('rechaza destinos inválidos, la conversión de rendimiento y producción incompleta', () => {
  assert.throws(() => resolveMeasurementConfiguration({ target: 'home', conversionDestination: 'not-a-conversion' }), /no válida/);
  assert.throws(() => resolveMeasurementConfiguration({
    target: 'home', environment: 'production', conversionDestination: 'AW-18410180479/sQJVCNy0xugcEP-e1MpE',
  }), /rendimiento/);
  assert.throws(() => resolveMeasurementConfiguration({ target: 'home', environment: 'production' }), /conversión de IA autorizada/);
  assert.throws(() => resolveMeasurementConfiguration({
    target: 'home', environment: 'staging', conversionDestination: automationConversionDestination,
  }), /Entorno de medición/);
});
