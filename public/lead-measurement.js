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
  var loaded = false;
  var banner;
  var completed = new Set();
  var fields = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid'];
  function read(storage, name) { try { return JSON.parse(window[storage].getItem(name) || 'null'); } catch { return null; } }
  function write(storage, name, value) { try { window[storage].setItem(name, JSON.stringify(value)); } catch { /* la elección sigue funcionando sin almacenamiento */ } }
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
    if (decision !== 'accepted') return {};
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
    fields.forEach(function (field) { if (attribution[field]) safeUrl.searchParams.set(field,attribution[field]); });
    window.gtag('config',destination.split('/')[0],{
      send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,
      page_location:safeUrl.toString(),page_referrer:'',cookie_prefix:cookiePrefix,cookie_path:'/',cookie_domain:'www.innure.es',
    });
    var tag = document.createElement('script');
    tag.async = true; tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + destination.split('/')[0];
    document.head.appendChild(tag);
  }
  function choose(value) {
    decision = value; write('localStorage',key,{value:value,at:Date.now()});
    if (banner) banner.hidden = true;
    if (value === 'accepted') loadTag();
    else {
      clearAttribution();
      if (loaded) {
        // El prefijo propio separa las cookies nuevas de rendimiento en la raíz.
        clearCookies(new RegExp('^' + cookiePrefix + '_gcl_'),'/');
        // Si aún se ejecuta bajo la ruta antigua, borra solo su cookie heredada.
        // Path=/automatizacion/ no afecta a rendimiento en /.
        if (location.pathname.startsWith('/automatizacion/')) clearCookies(/^_gcl_/,'/automatizacion/');
        location.reload(); // descarga las etiquetas cargadas tras el consentimiento anterior
      }
    }
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
    if (decision !== 'accepted' || detail.service !== 'automatizacion-ia' || !/^[a-f0-9]{32}$/.test(detail.submissionId || '')) return;
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
    var saved = read('localStorage',key);
    if (saved && ['accepted','rejected'].includes(saved.value) && Number.isFinite(saved.at) && Date.now()-saved.at >= 0 && Date.now()-saved.at < maxAge) decision = saved.value;
    if (decision === 'accepted') loadTag();
    else if (!decision) show();
    else clearAttribution();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
