import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync(new URL('../public/lead-measurement.js',import.meta.url),'utf8');
function setup({ consent, origin = 'https://www.innure.es', destination = 'AW-123456/AutomationOnly', search = '', pathname = '/', cookies = [], local = new Map() } = {}) {
  const session = new Map(); const events = new Map(); const documentEvents = new Map(); const tags = []; const buttons = new Map(); const cookieWrites = []; let banner; let reloads = 0;
  if (consent) local.set('innure_automation_consent_v1', JSON.stringify({value:consent,at:Date.now()}));
  const storage = map => ({getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)});
  const context = {
    location:{origin,pathname,search,reload:()=>{reloads++;}},
    localStorage:storage(local),sessionStorage:storage(session),URL,URLSearchParams,Date,Set,Number,
    document:{
      currentScript:{getAttribute:()=>destination},readyState:'complete',
      querySelectorAll:()=>[],
      addEventListener:(name,fn)=>documentEvents.set(name,fn),
      head:{appendChild:tag=>tags.push(tag)},body:{appendChild:element=>{banner=element;element.isConnected=true;}},
      createElement:type=>type==='section'?{hidden:false,setAttribute:()=>{},querySelectorAll:()=>['accepted','rejected'].map(value=>({getAttribute:()=>value,addEventListener:(event,fn)=>buttons.set(value,fn)}))}:{},
    },
    addEventListener:(name,fn)=>events.set(name,fn),
  };
  const cookieString = cookies.join('; ');
  Object.defineProperty(context.document,'cookie',{
    get:()=>cookieString,
    set:value=>{ cookieWrites.push(value); },
  });
  context.window=context;
  vm.runInNewContext(code,context);
  return {context,tags,session,buttons,cookieWrites,banner:()=>banner,emit:detail=>events.get('innure:lead-received')?.({detail}),reloads:()=>reloads,
    storageEvent:(overrides={})=>events.get('storage')?.({key:'innure_automation_consent_v1',storageArea:context.localStorage,...overrides}),
    settingsClick:()=>documentEvents.get('click')?.({target:{closest:selector=>selector==='[data-automation-measurement]'?{}:null}}),
    unrelatedClick:()=>documentEvents.get('click')?.({target:{closest:()=>null}})};
}
test('sin elección no se carga Google ni se almacena atribución',()=>{
  const result=setup({search:'?gclid=example'});
  assert.equal(result.tags.length,0); assert.equal(result.session.size,0); assert.equal(result.banner().hidden,false);
  assert.match(result.banner().innerHTML,/href="\/privacidad\/#medicion"/); assert.doesNotMatch(result.banner().innerHTML,/automatizacion\/privacidad/);
  result.emit({service:'automatizacion-ia',submissionId:'a'.repeat(32)});
  assert.equal(result.context.dataLayer,undefined);
});
test('rechazo conservado no carga Google y permite el resto de la web',()=>{
  const result=setup({consent:'rejected'}); assert.equal(result.tags.length,0); assert.deepEqual(Object.keys(result.context.innureAutomationAttribution()),[]);
});
test('solo aceptación carga una etiqueta con parámetros de consentimiento restrictivos',()=>{
  const result=setup({search:'?utm_campaign=auto&email=privado%40ejemplo.es&gclid=abc_123'});
  result.buttons.get('accepted')();
  assert.equal(result.tags.length,1); assert.match(result.tags[0].src,/AW-123456$/);
  const commands=result.context.dataLayer.map(args=>Array.from(args));
  assert.equal(commands.find(c=>c[0]==='consent'&&c[1]==='default')[2].ad_storage,'denied');
  assert.equal(commands.find(c=>c[0]==='consent'&&c[1]==='update')[2].ad_personalization,'denied');
  const config=commands.find(c=>c[0]==='config')[2]; assert.equal(config.send_page_view,false); assert.doesNotMatch(config.page_location,/email|privado/); assert.equal(config.cookie_prefix,'innure_auto'); assert.equal(config.cookie_path,'/');
});
test('solo lead aceptado de automatización, una vez y sin PII',()=>{
  const result=setup({consent:'accepted'}); const id='a'.repeat(32);
  result.emit({service:'rendimiento',submissionId:id}); result.emit({service:'automatizacion-ia',submissionId:'invalid'});
  result.emit({service:'automatizacion-ia',submissionId:id,email:'private@example.invalid',process:'secret'});
  result.emit({service:'automatizacion-ia',submissionId:id});
  const events=result.context.dataLayer.map(args=>Array.from(args)).filter(c=>c[0]==='event');
  assert.equal(events.length,1); assert.equal(events[0][2].send_to,'AW-123456/AutomationOnly');
  assert.deepEqual(Object.keys(events[0][2]),['send_to','transaction_id','value','currency']);
});
test('retirar consentimiento borra solo cookies propias de raíz, atribución y etiquetas',()=>{
  const result=setup({search:'?utm_campaign=auto',cookies:['innure_auto_gcl_au=own','_gcl_au=performance']}); result.buttons.get('accepted')(); result.buttons.get('rejected')();
  assert.equal(result.reloads(),1); assert.equal(result.session.has('innure_automation_attribution_v1'),false);
  assert.ok(result.cookieWrites.some(value=>value.startsWith('innure_auto_gcl_au=;') && value.includes('Path=/')));
  assert.ok(!result.cookieWrites.some(value=>value.startsWith('_gcl_au=;') && value.includes('Path=/')));
  result.emit({service:'automatizacion-ia',submissionId:'a'.repeat(32)});
  assert.equal(result.context.dataLayer.map(args=>Array.from(args)).filter(c=>c[0]==='event').length,0);
});
test('al revocar desde la ruta antigua limpia solo su cookie heredada',()=>{
  const result=setup({pathname:'/automatizacion/',cookies:['_gcl_au=legacy','innure_auto_gcl_au=own']});
  result.buttons.get('accepted')(); result.buttons.get('rejected')();
  assert.ok(result.cookieWrites.some(value=>value.startsWith('_gcl_au=;') && value.includes('Path=/automatizacion/')));
  assert.ok(!result.cookieWrites.some(value=>value.startsWith('_gcl_au=;') && value.includes('Path=/;')));
});
test('desactivado fuera del dominio o con destino inválido',()=>{
  assert.equal(setup({origin:'http://localhost:3000',consent:'accepted'}).tags.length,0);
  assert.equal(setup({destination:'not-a-conversion',consent:'accepted'}).tags.length,0);
});
test('el botón nuevo tras hidratación vuelve a abrir las opciones de rechazo',()=>{
  const result=setup({consent:'rejected'});
  result.unrelatedClick(); assert.equal(result.banner(),undefined);
  result.settingsClick(); assert.equal(result.banner().hidden,false);
  result.buttons.get('rejected')(); assert.equal(result.banner().hidden,true);
  result.settingsClick(); assert.equal(result.banner().hidden,false);
  assert.equal(result.tags.length,0);
});
test('se recrea el aviso si el render de la aplicación retiró su nodo',()=>{
  const result=setup(); const first=result.banner(); first.isConnected=false;
  result.settingsClick(); assert.notEqual(result.banner(),first);
  assert.equal(result.banner().isConnected,true); assert.equal(result.banner().hidden,false);
});
test('revocar en otra pestaña detiene la medición sin reescribir su decisión',()=>{
  const local=new Map();
  const first=setup({consent:'accepted',local});
  const second=setup({local,search:'?utm_campaign=auto',cookies:['innure_auto_gcl_au=own','_gcl_au=performance']});
  first.settingsClick(); first.buttons.get('rejected')();
  const saved=local.get('innure_automation_consent_v1');
  second.storageEvent();
  assert.equal(second.reloads(),1);
  assert.equal(second.session.has('innure_automation_attribution_v1'),false);
  assert.deepEqual(Object.keys(second.context.innureAutomationAttribution()),[]);
  second.emit({service:'automatizacion-ia',submissionId:'b'.repeat(32)});
  const commands=second.context.dataLayer.map(args=>Array.from(args));
  assert.equal(commands.filter(c=>c[0]==='event').length,0);
  assert.equal(commands.filter(c=>c[0]==='consent'&&c[1]==='update').at(-1)[2].ad_storage,'denied');
  assert.ok(second.cookieWrites.some(value=>value.startsWith('innure_auto_gcl_au=;')));
  assert.ok(!second.cookieWrites.some(value=>value.startsWith('_gcl_au=;')));
  assert.equal(local.get('innure_automation_consent_v1'),saved);
  second.storageEvent(); assert.equal(second.reloads(),1);
});
for (const action of ['attribution','conversion']) test(`revocación pendiente de evento storage bloquea ${action}`,()=>{
  const local=new Map(); const result=setup({consent:'accepted',local,search:'?gclid=synthetic'});
  local.set('innure_automation_consent_v1',JSON.stringify({value:'rejected',at:Date.now()}));
  if (action==='attribution') assert.deepEqual(Object.keys(result.context.innureAutomationAttribution()),[]);
  else {
    result.emit({service:'automatizacion-ia',submissionId:'c'.repeat(32)});
    assert.equal(result.context.dataLayer.map(args=>Array.from(args)).filter(c=>c[0]==='event').length,0);
  }
  assert.equal(result.reloads(),1);
});
test('aceptar en otra pestaña habilita una sola etiqueta y conserva las restricciones',()=>{
  const local=new Map(); const first=setup({local}); const second=setup({local});
  first.buttons.get('accepted')(); second.storageEvent(); second.storageEvent();
  assert.equal(second.tags.length,1); assert.equal(second.banner().hidden,true);
  assert.equal(second.context.innureAutomationAttribution().measurement_consent,'accepted');
  const commands=second.context.dataLayer.map(args=>Array.from(args));
  assert.equal(commands.find(c=>c[0]==='consent'&&c[1]==='update')[2].ad_personalization,'denied');
});
test('ignora cambios de otras claves y sessionStorage',()=>{
  const local=new Map(); const result=setup({consent:'accepted',local});
  local.set('innure_automation_consent_v1',JSON.stringify({value:'rejected',at:Date.now()}));
  result.storageEvent({storageArea:result.context.sessionStorage});
  result.storageEvent({key:'unrelated'});
  assert.equal(result.reloads(),0);
  result.storageEvent(); assert.equal(result.reloads(),1);
});
for (const [label,invalid] of [['borrado',null],['JSON malformado','invalid-json'],['valor desconocido',JSON.stringify({value:'unknown',at:Date.now()})],['caducado',JSON.stringify({value:'accepted',at:0})],['fecha futura',JSON.stringify({value:'accepted',at:Date.now()+86400000})]]) {
  test(`borrado o consentimiento inválido retira la medición: ${label}`,()=>{
    const local=new Map(); const result=setup({consent:'accepted',local,search:'?utm_campaign=auto'});
    if (invalid===null) local.clear(); else local.set('innure_automation_consent_v1',invalid);
    result.storageEvent({key:invalid===null?null:'innure_automation_consent_v1'});
    assert.equal(result.reloads(),1); assert.equal(result.banner().hidden,false);
    assert.equal(result.session.has('innure_automation_attribution_v1'),false);
    assert.deepEqual(Object.keys(result.context.innureAutomationAttribution()),[]);
    result.emit({service:'automatizacion-ia',submissionId:'d'.repeat(32)});
    assert.equal(result.context.dataLayer.map(args=>Array.from(args)).filter(c=>c[0]==='event').length,0);
  });
}
test('la elección de esta pestaña sigue funcionando si localStorage no se puede escribir',()=>{
  const result=setup({consent:'rejected'});
  result.context.localStorage.setItem=()=>{throw new Error('Storage unavailable');};
  result.settingsClick(); result.buttons.get('accepted')();
  assert.equal(result.context.innureAutomationAttribution().measurement_consent,'accepted');
  result.buttons.get('rejected')();
  assert.deepEqual(Object.keys(result.context.innureAutomationAttribution()),[]);
});
test('un rechazo compartido que sucede al aceptar impide cargar la etiqueta',()=>{
  const local=new Map(); const result=setup({local});
  // Otra pestaña escribe un rechazo después de nuestra escritura de aceptación.
  result.context.localStorage.setItem=(key)=>local.set(key,JSON.stringify({value:'rejected',at:Date.now()}));
  result.buttons.get('accepted')();
  assert.equal(result.tags.length,0);
  assert.deepEqual(Object.keys(result.context.innureAutomationAttribution()),[]);
});
test('si falla guardar el rechazo se elimina la aceptación anterior antes de recargar',()=>{
  const local=new Map(); const first=setup({consent:'accepted',local});
  first.context.localStorage.setItem=()=>{throw new Error('Storage write blocked');};
  first.settingsClick(); first.buttons.get('rejected')();
  assert.equal(first.reloads(),1);
  assert.equal(local.has('innure_automation_consent_v1'),false);
  assert.deepEqual(Object.keys(first.context.innureAutomationAttribution()),[]);
  const afterReload=setup({local});
  assert.equal(afterReload.tags.length,0);
  assert.deepEqual(Object.keys(afterReload.context.innureAutomationAttribution()),[]);
});
for (const removal of ['throws','ineffective']) test(`si el rechazo no puede persistirse no se recarga: ${removal}`,()=>{
  const local=new Map(); const result=setup({consent:'accepted',local,search:'?utm_campaign=auto'});
  result.context.localStorage.setItem=()=>{throw new Error('Storage write blocked');};
  result.context.localStorage.removeItem=()=>{if(removal==='throws')throw new Error('Storage removal blocked');};
  result.settingsClick(); result.buttons.get('rejected')();
  assert.equal(result.reloads(),0);
  assert.equal(JSON.parse(local.get('innure_automation_consent_v1')).value,'accepted');
  assert.deepEqual(Object.keys(result.context.innureAutomationAttribution()),[]);
  result.emit({service:'automatizacion-ia',submissionId:'e'.repeat(32)});
  const commands=result.context.dataLayer.map(args=>Array.from(args));
  assert.equal(commands.filter(c=>c[0]==='event').length,0);
  assert.equal(commands.filter(c=>c[0]==='consent'&&c[1]==='update').at(-1)[2].ad_storage,'denied');
  assert.equal(result.session.has('innure_automation_attribution_v1'),false);
});
