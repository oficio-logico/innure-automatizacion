import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync(new URL('../public/lead-measurement.js',import.meta.url),'utf8');
function setup({ consent, origin = 'https://www.innure.es', destination = 'AW-123456/AutomationOnly', search = '' } = {}) {
  const local = new Map(); const session = new Map(); const events = new Map(); const documentEvents = new Map(); const tags = []; const buttons = new Map(); let banner; let reloads = 0;
  if (consent) local.set('innure_automation_consent_v1', JSON.stringify({value:consent,at:Date.now()}));
  const storage = map => ({getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)});
  const context = {
    location:{origin,pathname:'/automatizacion/',search,reload:()=>{reloads++;}},
    localStorage:storage(local),sessionStorage:storage(session),URL,URLSearchParams,Date,Set,Number,
    document:{
      currentScript:{getAttribute:()=>destination},readyState:'complete',cookie:'',
      querySelectorAll:()=>[],
      addEventListener:(name,fn)=>documentEvents.set(name,fn),
      head:{appendChild:tag=>tags.push(tag)},body:{appendChild:element=>{banner=element;element.isConnected=true;}},
      createElement:type=>type==='section'?{hidden:false,setAttribute:()=>{},querySelectorAll:()=>['accepted','rejected'].map(value=>({getAttribute:()=>value,addEventListener:(event,fn)=>buttons.set(value,fn)}))}:{},
    },
    addEventListener:(name,fn)=>events.set(name,fn),
  };
  context.window=context;
  vm.runInNewContext(code,context);
  return {context,tags,session,buttons,banner:()=>banner,emit:detail=>events.get('innure:lead-received')?.({detail}),reloads:()=>reloads,
    settingsClick:()=>documentEvents.get('click')?.({target:{closest:selector=>selector==='[data-automation-measurement]'?{}:null}}),
    unrelatedClick:()=>documentEvents.get('click')?.({target:{closest:()=>null}})};
}
test('sin elección no se carga Google ni se almacena atribución',()=>{
  const result=setup({search:'?gclid=example'});
  assert.equal(result.tags.length,0); assert.equal(result.session.size,0); assert.equal(result.banner().hidden,false);
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
  const config=commands.find(c=>c[0]==='config')[2]; assert.equal(config.send_page_view,false); assert.doesNotMatch(config.page_location,/email|privado/);
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
test('retirar consentimiento borra atribución y descarga la página de etiquetas',()=>{
  const result=setup({search:'?utm_campaign=auto'}); result.buttons.get('accepted')(); result.buttons.get('rejected')();
  assert.equal(result.reloads(),1); assert.equal(result.session.has('innure_automation_attribution_v1'),false);
  result.emit({service:'automatizacion-ia',submissionId:'a'.repeat(32)});
  assert.equal(result.context.dataLayer.map(args=>Array.from(args)).filter(c=>c[0]==='event').length,0);
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
