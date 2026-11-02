var g=load('goals',DEF_G),F=load('funnel',DEF_F);SYM=g.sym||'';
chrome('funnel.html','Step 2: design the funnel, then check what each stage must deliver. Budget and targets come from Step 1; enter your best estimates from the last 30–90 days.');
var D=[['1. Awareness',['YouTube / Demand Gen','Reach / Advantage+ video','Brand awareness / Thought Leader ads'],['Video views, site visits','Landing page views','Impressions, video views']],
['2. Consideration',['Search, non-brand (category and problem)','Traffic / engagement retargeting','Document / video ads'],['Lead or key event','Landing page views, lead','Lead or download']],
['3. Conversion',['Search brand + Performance Max / Shopping','Advantage+ sales / leads','Lead gen forms / website conversions'],['Qualified lead or purchase (offline import)','Purchase or qualified lead via Conversions API','Lead → qualified lead (CRM)']],
['4. Retargeting',['Remarketing / customer match','Retargeting + existing customers','Retarget engaged + site visitors'],['Purchase or lead','Purchase or lead','Demo or opportunity']]];
var IN=[['cpm','CPM (per 1,000 impressions)',1],['ctr','CTR (%)',.05],['lp','Landing-page conversion (%)',.5],['l2q','Lead → qualified (%)',1],['q2c','Qualified → customer (%)',1]];
var OUT=[['budget','Monthly budget','m'],['imp','Impressions','n'],['cl','Clicks','n'],['cpc','CPC','m'],['le','Leads / conversions','n'],['cpl','Cost per lead','m'],['ql','Qualified leads','n'],['cu','Customers','n'],['cac','CAC','m'],['rev','Revenue','m'],['roas','ROAS','x'],['tr','Target ROAS (Step 1)','x'],['tc','Target CAC (Step 1)','m']];
function v(t,x){return t==='m'?money(x):t==='x'?fmt(x,2)+'x':t==='p'?pct(x,2):fmt(x,x<100?1:0)}
var cols=PK.concat(['T']);
document.getElementById('main').innerHTML='<div class="card"><h3>A. Funnel design</h3><div class="sc"><table class="t l"><tr><th>Stage</th>'+PK.map(function(k){return'<th>'+PN[k]+'</th>'}).join('')+'</tr>'+D.map(function(r){return'<tr><td><b>'+r[0]+'</b></td>'+[0,1,2].map(function(i){return'<td>'+r[1][i]+'<br><span class="tip">Optimise for: '+r[2][i]+'</span></td>'}).join('')+'</tr>'}).join('')+'</table></div></div>'+
'<div class="card"><h3>B. Funnel math</h3><div class="sc" id="fm"><table class="t"><tr><th></th>'+PK.map(function(k){return'<th>'+PN[k]+'</th>'}).join('')+'<th>Total / blended</th></tr>'+
IN.map(function(r){return'<tr><td>'+r[1]+'</td>'+PK.map(function(k){return'<td>'+num(k+'.'+r[0],F[k][r[0]],r[2])+'</td>'}).join('')+'<td id="o_'+r[0]+'_T"></td></tr>'}).join('')+
OUT.map(function(r){return'<tr><td>'+r[1]+'</td>'+cols.map(function(k){return'<td id="o_'+r[0]+'_'+k+'"></td>'}).join('')+'</tr>'}).join('')+
'<tr><td><b>Plan vs target</b></td>'+cols.map(function(k){return'<td id="o_st_'+k+'"></td>'}).join('')+'</tr></table></div></div><div class="card"><h3>What it takes to hit target</h3><div id="tips"></div></div><p class="tip">Status: On target when ROAS and CAC both meet target, Watch when one is within 20% of its target, Off target when both miss. Tips are arithmetic on your own inputs, not market benchmarks.</p><p><a href="goals.html" style="color:var(--acc)">← Step 1, Goals</a></p>';
function render(){var res=calcFunnel(g,F),R=res.R;
 cols.forEach(function(k){var r=R[k];OUT.forEach(function(o){document.getElementById('o_'+o[0]+'_'+k).textContent=v(o[2],r[o[0]])});var s=r.st;document.getElementById('o_st_'+k).innerHTML='<span class="st '+s[1]+'">'+s[0]+'</span>'});
 var T=R.T;[['cpm','m'],['ctr','p'],['lp','p'],['l2q','p'],['q2c','p']].forEach(function(a){document.getElementById('o_'+a[0]+'_T').textContent=v(a[1],T[a[0]])});
 document.getElementById('tips').innerHTML=PK.map(function(k){var r=R[k],f=F[k],te=Math.min(r.tc,g.deal/r.tr),m=r.cac/te,t;
  if(!isFinite(m))t='No customers are forecast. Check that every rate above is above zero.';
  else if(m<=1)t='Meets both targets.';
  else{var o=[['CPM down to '+money(f.cpm/m),1],['CTR up to '+fmt(f.ctr*m,2)+'%',f.ctr*m<=100],['landing-page conversion up to '+fmt(f.lp*m,1)+'%',f.lp*m<=100],['qualified rate up to '+fmt(f.l2q*m,1)+'%',f.l2q*m<=100],['close rate up to '+fmt(f.q2c*m,1)+'%',f.q2c*m<=100]].filter(function(x){return x[1]}).map(function(x){return x[0]});
   t='You need '+fmt((m-1)*100)+'% more customers for the same spend. Any one of these gets you there: '+o.join(', ')+'.'}
  return'<p><span class="st '+r.st[1]+'">'+r.st[0]+'</span> <b>'+PN[k]+'</b> '+t+'</p>'}).join('')}
bind(document.getElementById('main'),F,'funnel',render);render();
