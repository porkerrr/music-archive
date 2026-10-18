const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function harness(){
  let now=0,next=0;const tasks=new Map(),rendered=[],props={};
  const body={inert:false,setAttribute(){}};
  const root={hidden:true,dataset:{},style:{setProperty(k,v){props[k]=v}},clientWidth:320,scrollHeight:600,offsetHeight:600,setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]},querySelector(){return body}};
  const motion={matches:false,addEventListener(_,fn){this.change=fn}};
  const context={window:{},ResizeObserver:class{observe(){}},performance:{now:()=>now},setTimeout(fn,ms){tasks.set(++next,{fn,at:now+ms});return next},clearTimeout(id){tasks.delete(id)}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/album-detail.js'),'utf8'),context);
  const controller=context.window.createArchiveDetail({root,motion,render:id=>{rendered.push(id);root.dataset.album=id}});
  function advance(ms){const end=now+ms;for(;;){const task=[...tasks].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!task)break;tasks.delete(task[0]);now=task[1].at;task[1].fn()}now=end}
  return {root,body,motion,controller,rendered,props,tasks,advance,select(id){controller.update({activeId:id,phase:'opening',started:now})},close(){controller.update({activeId:null,phase:'browsing',started:now})}};
}
test('header at 720ms, whole body at 820ms; hidden body stays inert',()=>{const h=harness();h.select('a');h.advance(719);assert.equal(h.root.dataset.reveal,'pending');h.advance(1);assert.equal(h.root.dataset.reveal,'header');assert.equal(h.body.inert,true);h.advance(100);assert.equal(h.root.dataset.reveal,'body');assert.equal(h.body.inert,false)});
test('rapid replacement cancels old jobs and invalidates already queued callbacks',()=>{const h=harness();h.select('a');const stale=[...h.tasks.values()].map(t=>t.fn);h.advance(300);h.select('b');stale.forEach(fn=>fn());assert.equal(h.root.dataset.reveal,'pending');h.advance(719);assert.equal(h.root.dataset.reveal,'pending');h.advance(101);assert.equal(h.root.dataset.album,'b');assert.equal(h.root.dataset.reveal,'body')});
test('close during opening cannot resurrect text; same album reopens',()=>{const h=harness();h.select('a');h.advance(200);h.close();h.advance(2000);assert.equal(h.root.dataset.reveal,'closed');assert.equal(h.root.inert,true);h.select('a');h.advance(820);assert.equal(h.root.dataset.reveal,'body');assert.equal(h.root.style.minHeight,'600px')});
test('repeated state notifications do not postpone presentation',()=>{const h=harness();const s={activeId:'a',phase:'opening',started:0};h.controller.update(s);h.advance(500);h.controller.update(s);h.advance(320);assert.equal(h.root.dataset.reveal,'body');assert.deepEqual(h.rendered,['a'])});
test('reduced motion bypasses wait and unknown album uses neutral colors',()=>{const h=harness();h.motion.matches=true;h.select('unknown');h.advance(0);assert.equal(h.root.dataset.reveal,'body');assert.equal(h.props['--album-light'],'#3c403a');h.close();assert.equal(h.root.dataset.reveal,'closed')});
test('motion preference change flushes pending stages without old callbacks',()=>{const h=harness();h.select('a');h.advance(150);h.motion.matches=true;h.motion.change();h.advance(0);assert.equal(h.root.dataset.reveal,'body');h.close();h.advance(1000);assert.equal(h.root.dataset.reveal,'closed')});
