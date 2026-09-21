export const automationConversionDestination = 'AW-18410180479/mBarCPixx_EcEP-e1MpE';
const performanceConversionDestination = 'AW-18410180479/sQJVCNy0xugcEP-e1MpE';

/**
 * La etiqueta es una configuración de publicación, no una opción del navegador.
 * Las previews y las compilaciones locales normales nunca deben incluirla.
 */
export function resolveMeasurementConfiguration({ target, environment, conversionDestination } = {}) {
  const destination = conversionDestination || '';
  if (destination && destination === performanceConversionDestination) {
    throw new Error('La conversión de rendimiento no pertenece a esta web.');
  }
  if (destination && !/^AW-\d+\/[A-Za-z0-9_-]+$/.test(destination)) {
    throw new Error('Conversión de Ads no válida.');
  }
  if (!environment || environment === 'preview') {
    return { enabled: false, conversionDestination: '' };
  }
  if (environment !== 'production') {
    throw new Error('Entorno de medición no válido.');
  }
  if (target !== 'home') {
    throw new Error('La medición de IA solo se publica con la portada de producción.');
  }
  if (destination !== automationConversionDestination) {
    throw new Error('La producción requiere la conversión de IA autorizada.');
  }
  return { enabled: true, conversionDestination: destination };
}
