const $=i=>document.getElementById(i),v=i=>+$(i).value||0,L=x=>'₹'+Math.round(x).toLocaleString('en-IN');
function fit(n,a){const r={s:{G:50,M:45,L:30}[n],r:[]},add=(p,t)=>{r.s+=p;r.r.push([p,t])},b=a.type==='b',i=a.intent;
 if(n==='G'){if(i==='s')add(25,'Buyers are already searching, which is what Google captures');else if(i==='c')add(10,'Buyers compare options in search before deciding');else add(-15,'Few people search for something they haven’t heard of');
  if(a.vol>0){if(a.vol>=5000)add(10,'Enough search volume to scale');else if(a.vol<500)add(-15,'Low search volume caps how many leads Google can deliver')}}
 if(n==='M'){if(!b)add(15,'Strong reach among consumers');else add(-10,'Weaker for reaching business buyers by role');
  if(i==='d')add(20,'Good at introducing something people don’t yet look for');else if(i==='c')add(10,'Works for people weighing options');else add(-5,'Buyers who search will mostly be caught by Google first');
  if(a.price>500000)add(-10,'High-ticket sales rarely close from a quick social lead')}
 if(n==='L'){if(b)add(25,'Targets business buyers by role, company and industry');else add(-20,'Consumers are hard to target by profession');
  if(a.price>=100000)add(15,'Ticket size can absorb a higher cost per lead');else if(a.price<50000)add(-15,'Low ticket size struggles to cover a higher cost per lead');
  if(a.aud>0){if(a.aud>=50000)add(5,'Audience is large enough to scale');else if(a.aud<5000)add(-10,'Audience is small, so ads will saturate quickly')}}
 const ec=a['ec'+n];if(ec>0){if(ec<=a.tCPL)add(15,'Expected CPL '+L(ec)+' is within your target');else if(ec>a.beCPL)add(-25,'Expected CPL '+L(ec)+' is above break-even ('+L(a.beCPL)+'), so each lead loses money');else add(-5,'Expected CPL '+L(ec)+' is above target but below break-even; viable only if more leads close')}
 r.s=Math.max(0,Math.min(100,r.s));return r}
function draw(){const a={type:$('type').value,intent:$('intent').value,price:v('price'),vol:v('vol'),aud:v('aud'),ecG:v('ecG'),ecM:v('ecM'),ecL:v('ecL')},
 mg=v('margin')/100,sh=v('share')/100,l2s=v('l2s')/100,bud=v('budget'),con=a.price*mg,maxCPA=con*sh;
 a.tCPL=maxCPA*l2s;a.beCPL=con*l2s;
 const N={G:'Google',M:'Meta',L:'LinkedIn'},R={};for(const k in N)R[k]=fit(k,a);
 const ok=Object.keys(N).filter(k=>R[k].s>=50).sort((x,y)=>R[y].s-R[x].s),tot=ok.reduce((t,k)=>t+R[k].s**2,0);
 const lab=s=>s>=70?['Strong fit','var(--good)']:s>=50?['Worth testing','var(--mid)']:['Weak fit','var(--bad)'];
 const warn=a.price<=0||con<=0?'Enter a selling price and margin to see the economics.':'';
 $('out').innerHTML=`${warn?`<div class="v">${warn}</div>`:''}
 <div class="k"><div class="card"><span>Margin per sale</span><b>${L(con)}</b></div><div class="card"><span>Max cost per sale</span><b>${L(maxCPA)}</b><span>${v('share')}% of margin</span></div>
 <div class="card"><span>Target cost per lead</span><b>${L(a.tCPL)}</b><span>Break-even ${L(a.beCPL)}</span></div>
 <div class="card"><span>Target ROAS</span><b>${(a.price/(maxCPA||1)).toFixed(1)}x</b><span>Break-even ${(1/(mg||1)).toFixed(1)}x</span></div>
 <div class="card"><span>Sales to break even</span><b>${(bud/(con||1)).toFixed(1)}</b><span>At ${L(bud)} a month</span></div>
 <div class="card"><span>Leads to break even</span><b>${Math.ceil(bud/((a.beCPL)||1))}</b><span>${a.beCPL?'Cost per lead '+L(bud/Math.ceil(bud/a.beCPL)):''}</span></div></div>
 <div class="v">${ok.length?`<b>Start with ${N[ok[0]]}.</b> ${ok.length>1?'Also worth testing: '+ok.slice(1).map(k=>N[k]).join(' and ')+'.':'No other channel scores 50 or more on these inputs.'}`:'<b>No channel scores 50 or more.</b> Revisit the inputs, especially cost per lead and market size, before spending.'}
 ${a.price>0&&a.cycle>90?'':''}${v('cycle')>60?'<br>Sales cycle is long, so expect revenue to land well after the spend.':''}</div>
 <div class="card"><h3>Channel fit</h3>${Object.keys(N).sort((x,y)=>R[y].s-R[x].s).map(k=>{const r=R[k],[t,c]=lab(r.s);return`<div style="margin-bottom:14px"><div class="ch"><b>${N[k]}</b><div class="bar"><i style="width:${r.s}%;background:${c}"></i></div><span style="color:${c}">${r.s} · ${t}</span></div><ul>${r.r.map(([p,x])=>`<li><b class="${p<0?'m':'p'}">${p>0?'+':'−'}${Math.abs(p)}</b>${x}</li>`).join('')}</ul></div>`}).join('')}</div>
 <div class="card"><h3>Starting budget split</h3>${ok.length?ok.map(k=>{const sh=R[k].s**2/tot;return`<div class="ch" style="grid-template-columns:90px 1fr 140px;margin:6px 0"><span>${N[k]}</span><div class="bar"><i style="width:${sh*100}%;background:var(--acc)"></i></div><span>${Math.round(sh*100)}% · ${L(bud*sh)}</span></div>`}).join('')+'<p class="n">Only channels scoring 50 or more get budget, weighted by score. The allocator in step 5 will refine this with each channel’s own forecast.</p>':'<p class="n">Nothing to allocate until at least one channel scores 50 or more.</p>'}</div>`}
const KEY='nikhilppc.assess',F=()=>document.querySelectorAll('#in input,#in select');
try{const s=JSON.parse(localStorage.getItem(KEY)||'{}');F().forEach(e=>{if(s[e.id]!==undefined)e.value=s[e.id]})}catch(e){}
function save(){try{const s={};F().forEach(e=>s[e.id]=e.value);localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
['input','change'].forEach(t=>$('in').addEventListener(t,()=>{draw();save()}));draw();
