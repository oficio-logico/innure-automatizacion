(function () {
  'use strict';
  var script = document.currentScript;
  var destination = script && script.getAttribute('data-conversion');
  if (!/^AW-\d+\/[A-Za-z0-9_-]+$/.test(destination || '') || location.origin !== 'https://www.innure.es') return;
  // Una sola decisión para todo innure.es, compartida con /rendimiento/.
  var key = 'innure_consent_v1';
  // De las claves anteriores solo se hereda un rechazo: las aceptaciones se
  // dieron con un texto que no cubría todo el dominio.
  var legacyKeys = ['innure_automation_consent_v1','innure_ads_consent_v1'];
  var attributionKey = 'innure_automation_attribution_v1';
  var maxAge = 180 * 86400000;
  var cookiePrefix = 'innure_auto';
  var decision = null;
  var consentSnapshot;
  var loaded = false;
  var banner;
  var completed = new Set();
  var fields = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid'];
  function read(storage, name) { try { return JSON.parse(window[storage].getItem(name) || 'null'); } catch { return null; } }
  function write(storage, name, value) { try { window[storage].setItem(name, JSON.stringify(value)); return true; } catch { return false; } }
  function parseConsent(raw) {
    try {
      var saved = JSON.parse(raw || 'null');
      var at = saved && (Number.isFinite(saved.at) ? saved.at : saved.savedAt);
      if (saved && ['accepted','rejected'].includes(saved.value) && Number.isFinite(at) && Date.now()-at >= 0 && Date.now()-at < maxAge) return saved.value;
    } catch { /* un valor inválido no autoriza medición */ }
    return null;
  }
  function syncConsent() {
    var raw;
    try { raw = window.localStorage.getItem(key); } catch { return decision === 'accepted'; }
    // Consultar el valor vigente también antes de atribuir o convertir cubre
    // el intervalo anterior a recibir el evento storage de otra pestaña.
    if (raw !== consentSnapshot) {
      consentSnapshot = raw;
      applyDecision(parseConsent(raw));
    }
    return decision === 'accepted';
  }
  function clearAttribution() { try { sessionStorage.removeItem(attributionKey); } catch { /* sin almacenamiento */ } }
  function migrateLegacyConsent() {
    try {
      var storage = window.localStorage;
      if (storage.getItem(key) === null && legacyKeys.some(function (name) { return parseConsent(storage.getItem(name)) === 'rejected'; })) {
        storage.setItem(key, JSON.stringify({value:'rejected',at:Date.now()}));
      }
      legacyKeys.forEach(function (name) { storage.removeItem(name); });
    } catch { /* sin almacenamiento se vuelve a preguntar */ }
  }
  function clearCookies(pattern, cookiePath) {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (!pattern.test(name)) return;
      // La portada fija Domain=www.innure.es; la etiqueta de rendimiento usa el dominio raíz.
      ['; Domain=www.innure.es','; Domain=innure.es',''].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; Path=' + cookiePath + domain + '; Secure; SameSite=Lax';
      });
    });
  }
  function clearAttributionCookies() {
    // La decisión es común: se borran las cookies de la portada (innure_auto_gcl_*)
    // y las de rendimiento (_gcl_*) en la raíz.
    clearCookies(new RegExp('^(?:' + cookiePrefix + ')?_gcl_'),'/');
    // Si aún se ejecuta bajo la ruta antigua, borra también su cookie heredada.
    if (location.pathname.startsWith('/automatizacion/')) clearCookies(/^_gcl_/,'/automatizacion/');
  }
  function validFields(source) {
    var clean = {};
    fields.forEach(function (field) { var value = source && source[field]; if (typeof value === 'string' && /^[a-zA-Z0-9_.~+ -]{1,200}$/.test(value)) clean[field] = value; });
    return clean;
  }
  function capture() {
    var search = new URLSearchParams(location.search);
    var incoming = {}; fields.forEach(function (field) { incoming[field] = search.get(field); });
    incoming = validFields(incoming);
    if (Object.keys(incoming).length) write('sessionStorage', attributionKey, { fields: incoming, at: Date.now() });
  }
  window.innureAutomationAttribution = function () {
    if (!syncConsent()) return {};
    var saved = read('sessionStorage', attributionKey);
    return Object.assign({ measurement_consent: 'accepted' }, saved && Date.now()-saved.at < 86400000 ? validFields(saved.fields) : {});
  };
  function loadTag() {
    if (loaded || decision !== 'accepted') return;
    loaded = true;
    capture();
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('set','ads_data_redaction',true);
    window.gtag('set','allow_ad_personalization_signals',false);
    window.gtag('consent','update',{ad_storage:'granted',analytics_storage:'denied',ad_user_data:'granted',ad_personalization:'denied'});
    window.gtag('js',new Date());
    var safeUrl = new URL(location.origin + location.pathname);
    var attribution = window.innureAutomationAttribution();
    if (decision !== 'accepted') return;
    fields.forEach(function (field) { if (attribution[field]) safeUrl.searchParams.set(field,attribution[field]); });
    window.gtag('config',destination.split('/')[0],{
      send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,
      page_location:safeUrl.toString(),page_referrer:'',cookie_prefix:cookiePrefix,cookie_path:'/',cookie_domain:'www.innure.es',
    });
    var tag = document.createElement('script');
    tag.async = true; tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + destination.split('/')[0];
    document.head.appendChild(tag);
  }
  function applyDecision(value, canReload) {
    var changed = decision !== value;
    decision = value;
    if (banner) banner.hidden = true;
    if (value === 'accepted') loadTag();
    else {
      clearAttribution();
      if (value === 'rejected' || (loaded && changed)) clearAttributionCookies();
      if (loaded && changed) {
        window.gtag('consent','update',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
        // No recargar si aún queda una aceptación que no hemos podido borrar:
        // el documento nuevo restauraría esa decisión y volvería a medir.
        if (canReload !== false) location.reload();
      }
      if (!value) show();
    }
  }
  function choose(value) {
    var saved = {value:value,at:Date.now()};
    var canReload = true;
    // Si guardar falla, conservar la elección explícita de esta pestaña hasta
    // que cambie el valor compartido; no restaurar una decisión antigua.
    if (write('localStorage',key,saved)) consentSnapshot = JSON.stringify(saved);
    else {
      if (value === 'rejected') {
        canReload = false;
        try { window.localStorage.removeItem(key); } catch { /* conservar el rechazo en memoria */ }
      }
      try {
        consentSnapshot = window.localStorage.getItem(key);
        if (value === 'rejected') canReload = parseConsent(consentSnapshot) !== 'accepted';
      } catch { /* no recargar sin comprobar que la aceptación anterior ya no está */ }
    }
    applyDecision(value, canReload);
  }
  function show() {
    if (!banner || !banner.isConnected) {
      banner = document.createElement('section');
      banner.className = 'measurement-banner';
      banner.setAttribute('aria-label','Preferencias de medición publicitaria');
      banner.innerHTML = '<div><h2>¿Nos ayudas a saber si los anuncios funcionan?</h2><p>Solo si aceptas, Google Ads relacionará tu visita con una consulta enviada. Tu elección se aplica en todo innure.es. No compartimos los datos que escribas en el formulario ni usamos remarketing. <a href="/privacidad/#medicion">Privacidad y cookies</a>.</p></div><div class="measurement-actions"><button type="button" data-choice="rejected">Rechazar</button><button type="button" data-choice="accepted">Aceptar medición</button></div>';
      banner.querySelectorAll('[data-choice]').forEach(function (button) { button.addEventListener('click',function () { choose(button.getAttribute('data-choice')); }); });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }
  window.addEventListener('innure:lead-received',function (event) {
    var detail = event.detail || {};
    if (!syncConsent() || detail.service !== 'automatizacion-ia' || !/^[a-f0-9]{32}$/.test(detail.submissionId || '')) return;
    var id = detail.submissionId;
    if (completed.has(id) || read('sessionStorage','innure_auto_sent_'+id)) return;
    completed.add(id); write('sessionStorage','innure_auto_sent_'+id,true);
    window.gtag('event','conversion',{send_to:destination,transaction_id:id,value:0,currency:'EUR'});
  });
  function init() {
    // La hidratación puede reemplazar el botón: escuchar en document mantiene
    // disponible la retirada del consentimiento también después de ese cambio.
    document.addEventListener('click',function (event) {
      var target = event.target;
      if (target && typeof target.closest === 'function' && target.closest('[data-automation-measurement]')) show();
    });
    window.addEventListener('storage',function (event) {
      if (event.key !== key && event.key !== null) return;
      try { if (event.storageArea !== window.localStorage) return; } catch { return; }
      // No escribir de nuevo: evitar propagar el mismo cambio entre pestañas.
      syncConsent();
    });
    migrateLegacyConsent();
    syncConsent();
    if (!decision) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
