var PK=['G','M','L'],PN={G:'Google',M:'Meta',L:'LinkedIn'};
var DEF_G={sym:'₹',goal:'B2B pipeline / revenue',budget:30000,deal:6000,margin:80,ltv:15000,ratio:3,l2q:25,q2c:20,basis:'ltv',buffer:25,plat:{G:{share:50,roas:1.8,cac:3500},M:{share:20,roas:1.2,cac:5000},L:{share:30,roas:1.3,cac:4500}}};
var DEF_F={G:{cpm:300,ctr:4,lp:4,l2q:30,q2c:20},M:{cpm:25,ctr:0.9,lp:5,l2q:10,q2c:12},L:{cpm:90,ctr:0.55,lp:10,l2q:25,q2c:15}};
function calcGoals(g){var m=g.margin/100,be=1/m,tr=be*(1+g.buffer/100),mx=g.ltv*m/g.ratio,fo=g.deal*m,tc=g.basis==='ltv'?mx:fo,l2c=g.l2q/100*g.q2c/100,P={},s=0;
 PK.forEach(function(k){s+=g.plat[k].share;P[k]={budget:g.budget*g.plat[k].share/100}});
 return{be:be,tr:tr,mx:mx,fo:fo,tc:tc,l2c:l2c,tcpl:tc*l2c,tcpql:tc*g.q2c/100,need:g.budget/tc,rev:g.budget*tr,P:P,sum:s}}
function calcPlat(b,f,deal){var imp=b/f.cpm*1000,cl=imp*f.ctr/100,le=cl*f.lp/100,ql=le*f.l2q/100,cu=ql*f.q2c/100,rev=cu*deal;
 return{budget:b,imp:imp,cl:cl,le:le,ql:ql,cu:cu,rev:rev,cpm:f.cpm,ctr:f.ctr/100,lp:f.lp/100,l2q:f.l2q/100,q2c:f.q2c/100,cpc:b/cl,cpl:b/le,cac:b/cu,roas:rev/b}}
function status(roas,cac,tr,tc){var a=roas>=tr,b=cac<=tc;return a&&b?['On target','ok']:(roas>=tr*0.8||cac<=tc*1.2)?['Watch','wt']:['Off target','x']}
function calcFunnel(g,f){var G=calcGoals(g),R={},T={budget:0,imp:0,cl:0,le:0,ql:0,cu:0,rev:0};
 PK.forEach(function(k){var r=calcPlat(G.P[k].budget,f[k],g.deal);r.tr=g.plat[k].roas;r.tc=g.plat[k].cac;R[k]=r;for(var x in T)T[x]+=r[x]});
 T.cpm=T.budget/T.imp*1000;T.ctr=T.cl/T.imp;T.lp=T.le/T.cl;T.l2q=T.ql/T.le;T.q2c=T.cu/T.ql;T.cpc=T.budget/T.cl;T.cpl=T.budget/T.le;T.cac=T.budget/T.cu;T.roas=T.rev/T.budget;T.tr=G.tr;T.tc=G.tc;R.T=T;
 for(var k in R)R[k].st=status(R[k].roas,R[k].cac,R[k].tr,R[k].tc);
 return{G:G,R:R}}
function evStatus(r){if(!r.ev)return'';var c=[r.c0,r.c1,r.c2,r.c3,r.c4],f=c.filter(Boolean).length,no=c.filter(function(x){return x==='No'}).length,ok=c.filter(function(x){return x==='Yes'||x==='N/A'}).length;return f===0?'Not started':no>0?'Gaps: fix the No items':ok===5?'OK':'In progress'}
function normcdf(x){var t=1/(1+0.2316419*Math.abs(x)),p=0.3989423*Math.exp(-x*x/2)*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return x>0?1-p:p}
var PM={Google:'G',Meta:'M',LinkedIn:'L'};
function campRow(r,tg,pl){var N=function(x){return+x||0},e=N(r.spend),im=N(r.imp),cl=N(r.clicks),cv=N(r.conv),cu=N(r.cust),rv=N(r.rev),o={ctr:im>0?cl/im:NaN,cpc:cl>0?e/cl:NaN,cpm:im>0?e/im*1000:NaN,cvr:cl>0?cv/cl:NaN,cpa:cv>0?e/cv:NaN,cac:cu>0?e/cu:NaN,roas:e>0?rv/e:NaN,st:'',tip:'',cls:''};
 if(e===0)return o;var s=!tg?['Set targets','']:cu===0?['No customers','']:status(o.roas,o.cac,tg.tr,tg.tc);o.st=s[0];o.cls=s[1];
 o.tip=s[0]==='On target'?'Winning: scale budget 15-20% every 3-4 days while CAC holds; add new creative or keyword/audience variants to protect it.':s[0]==='No customers'?'No customers yet: B2B deals lag spend. Track cost per qualified lead meanwhile and confirm CRM-to-platform imports work.':
 pl&&o.cpm>pl.cpm*1.2?'CPM is 20%+ above plan: broaden the audience, test new placements or creative, check frequency and audience overlap.':pl&&o.ctr<pl.ctr*0.8?'CTR is 20%+ below plan: refresh hooks, headlines and creative; sharpen message-to-audience fit.':pl&&o.cvr<pl.cvr*0.8?'Clicks are not converting (conv. rate 20%+ below plan): check page speed, message match, form length, offer and tracking.':pl&&cv>0&&cu/cv<pl.cust*0.8?'Lead quality is below plan: send qualified and closed-won signals back to the platform, tighten targeting, add qualifying questions.':'Off plan with no single cause: review search terms or placements, audience overlap and creative fatigue; change one thing at a time.';return o}
function incr(t){var N=function(x){return+x||0},sp=N(t.spend),n1=N(t.n1),c1=N(t.c1),n0=N(t.n0),c0=N(t.c0);if(!(sp>0&&n1>0&&n0>0))return{ok:false,plat:t.plat};
 var r1=c1/n1,r0=c0/n0,ex=r0*n1,inc=c1-ex,rev=inc*N(t.rpc),iroas=rev/sp,fac=N(t.roas)>0?iroas/N(t.roas):NaN,pp=(c1+c0)/(n1+n0),z=(r1-r0)/Math.sqrt(pp*(1-pp)*(1/n1+1/n0)),p=2*(1-normcdf(Math.abs(z))),sig=p<0.05;
 return{ok:true,plat:t.plat,r1:r1,r0:r0,ex:ex,inc:inc,lift:ex?inc/ex:NaN,rev:rev,cpa:inc>0?sp/inc:NaN,iroas:iroas,fac:fac,z:z,p:p,sig:sig,verdict:!sig?'Inconclusive: extend the test or enlarge the sample':!isFinite(fac)?'':fac>=0.9?'Platform credit is close to true impact':fac>=0.6?'Platform over-credits: apply the factor to ROAS and CAC':'Platform heavily over-credits: restructure or cut this spend'}}
function dashCalc(rows,g,tests){var G=calcGoals(g),O={},ks=PK.concat(['T']),sig=tests.filter(function(t){return t.ok&&t.sig&&isFinite(t.fac)});
 ks.forEach(function(k){var s={spend:0,imp:0,clicks:0,conv:0,cust:0,rev:0};rows.forEach(function(r){if(k==='T'||r.plat===PN[k])for(var x in s)s[x]+=(+r[x]||0)});O[k]=s});
 ks.forEach(function(k){var s=O[k];s.ctr=s.imp>0?s.clicks/s.imp:NaN;s.cpc=s.clicks>0?s.spend/s.clicks:NaN;s.cpm=s.imp>0?s.spend/s.imp*1000:NaN;s.cvr=s.clicks>0?s.conv/s.clicks:NaN;s.cpa=s.conv>0?s.spend/s.conv:NaN;s.cac=s.cust>0?s.spend/s.cust:NaN;s.roas=s.spend>0?s.rev/s.spend:NaN;
  s.tr=k==='T'?G.tr:g.plat[k].roas;s.tc=k==='T'?G.tc:g.plat[k].cac;s.roasVs=isFinite(s.roas)&&s.tr?s.roas/s.tr-1:NaN;s.cacVs=isFinite(s.cac)&&s.tc?s.cac/s.tc-1:NaN;
  s.status=s.spend===0?'No data':!isFinite(s.cac)?'No customers':status(s.roas,s.cac,s.tr,s.tc)[0];s.shareSpend=O.T.spend>0?s.spend/O.T.spend:NaN;s.shareRev=O.T.rev>0?s.rev/O.T.rev:NaN;
  var f=sig.filter(function(t){return k==='T'||t.plat===PN[k]});s.fac=f.length?f.reduce(function(a,t){return a+t.fac},0)/f.length:'No test';
  s.adjRoas=isFinite(s.fac)&&isFinite(s.roas)?s.roas*s.fac:'n/a';s.adjCac=isFinite(s.fac)&&isFinite(s.cac)?s.cac/s.fac:'n/a';
  s.action={'On target':'Scale 15-20% steps','Watch':'Hold budget; fix weakest metric','Off target':'Fix or cut before adding spend','No customers':'Judge on cost per qualified lead'}[s.status]||'Add data in Step 5'});return O}
function pacing(o){var R={},rem=o.dim-o.day;['G','M','L','T'].forEach(function(k){var ps=k==='T'?['G','M','L']:[k],s=0,cum=[],day=[],t=ps.reduce(function(a,p){return a+o.target[p]},0);
 for(var d=1;d<=o.dim;d++){var v=0;ps.forEach(function(p){v+=+(o.data[p]&&o.data[p][d])||0});day.push(v);if(d<=o.day)s+=v;cum.push(d<=o.day?s:null)}
 var plan=t*o.day/o.dim,avg=o.day?s/o.day:NaN,fc=o.day?s+avg*rem:NaN,pace=plan>0?s/plan:NaN;
 R[k]={spent:s,target:t,plan:plan,pace:pace,avg:avg,fc:fc,diff:fc-t,req:rem>0?(t-s)/rem:NaN,day:day,cum:cum,latest:o.day?day[o.day-1]:NaN,
  st:!(plan>0)||!o.day?'No data':pace*100>o.hi?'Reduce':pace*100<o.lo?'Under pace':'On track'}});return R}
