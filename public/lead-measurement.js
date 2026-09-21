(function () {
  'use strict';
  var script = document.currentScript;
  var destination = script && script.getAttribute('data-conversion');
  if (!/^AW-\d+\/[A-Za-z0-9_-]+$/.test(destination || '') || location.origin !== 'https://www.innure.es') return;
  var key = 'innure_automation_consent_v1';
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
      if (saved && ['accepted','rejected'].includes(saved.value) && Number.isFinite(saved.at) && Date.now()-saved.at >= 0 && Date.now()-saved.at < maxAge) return saved.value;
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
  function clearCookies(pattern, cookiePath) {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (pattern.test(name)) document.cookie = name + '=; Max-Age=0; Path=' + cookiePath + '; Domain=www.innure.es; Secure; SameSite=Lax';
    });
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
      if (loaded && changed) {
        window.gtag('consent','update',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
        // El prefijo propio separa las cookies nuevas de rendimiento en la raíz.
        clearCookies(new RegExp('^' + cookiePrefix + '_gcl_'),'/');
        // Si aún se ejecuta bajo la ruta antigua, borra solo su cookie heredada.
        // Path=/automatizacion/ no afecta a rendimiento en /.
        if (location.pathname.startsWith('/automatizacion/')) clearCookies(/^_gcl_/,'/automatizacion/');
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
      banner.innerHTML = '<div><h2>¿Nos ayudas a saber si los anuncios funcionan?</h2><p>Solo si aceptas, Google Ads relacionará tu visita con una consulta enviada. No compartimos los datos que escribas en el formulario ni usamos remarketing. <a href="/privacidad/#medicion">Privacidad y cookies</a>.</p></div><div class="measurement-actions"><button type="button" data-choice="rejected">Rechazar</button><button type="button" data-choice="accepted">Aceptar medición</button></div>';
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
    syncConsent();
    if (!decision) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
