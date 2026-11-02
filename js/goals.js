var g=load('goals',DEF_G);SYM=g.sym||'₹';
chrome('goals.html','Step 1: set goals and targets. Fill the inputs and everything else calculates. The values shown are the playbook’s sample B2B example, so overwrite them.');
var FLD=[['goal','Primary goal','s',['B2B pipeline / revenue','Ecommerce sales','Lead generation','Brand awareness'],'Pick one. It decides which event you optimise on and which platform leads.'],
['sym','Currency symbol','t',0,'Used for display only.'],
['budget','Total monthly ad budget','n',1000,'Ad spend only. Hold back 10–20% as a test budget for new audiences, creative and offers.'],
['deal','First-order or deal value','n',500,'Ecommerce: average order value. B2B: first-year contract value.'],
['margin','Gross margin (%)','n',1,'After product, delivery and hosting costs. Break-even ROAS = 1 ÷ margin.'],
['ltv','Customer lifetime value (revenue)','n',500,'Revenue per customer over 12–36 months. If unsure, use first-order value.'],
['ratio','Desired LTV : CAC ratio','n',0.5,'3 is a common rule of thumb. Accept lower if payback is fast.'],
['l2q','Lead → qualified lead (%)','n',1,'From your CRM. Ecommerce: enter 100.'],
['q2c','Qualified lead → customer (%)','n',1,'From your CRM close rate. Ecommerce: enter 100.'],
['basis','CAC basis','s',[['ltv','LTV-based'],['first','First-order break-even']],'LTV-based lets you pay more upfront when customers renew. First-order is safer when repeat revenue is unproven.'],
['buffer','Profit buffer on ROAS target (%)','n',5,'Safety margin above break-even. 20–30% is a typical starting point (rule of thumb).']];
function ctl(f){var k=f[0];if(f[2]==='n')return num(k,g[k],f[3]);if(f[2]==='t')return'<input type="text" maxlength="3" data-p="'+k+'" data-t="1" value="'+g[k]+'">';
 return'<select data-p="'+k+'">'+f[3].map(function(o){o=[].concat(o);var v=o[0],l=o[o.length-1];return'<option value="'+v+'"'+(g[k]===v?' selected':'')+'>'+l+'</option>'}).join('')+'</select>'}
var ROLE={G:'Demand capture. Prioritise high-intent Search and keep brand and non-brand separate.',M:'Demand creation and retargeting. Needs fresh creative and clean Pixel and Conversions API signals; judge on blended results.',L:'B2B precision. Expect higher cost per lead; judge on cost per qualified lead and pipeline.'};
document.getElementById('main').innerHTML='<div class="card"><h3>A. Business inputs</h3><div class="g" id="in">'+FLD.map(function(f){return'<label>'+f[1]+ctl(f)+'<span class="tip">'+f[4]+'</span></label>'}).join('')+'</div></div>'+
'<div class="card"><h3>B. Calculated targets</h3><div class="sc"><table class="t l" id="tb"></table></div></div>'+
'<div class="card"><h3>C. Platform budget split and targets</h3><div class="sc"><table class="t" id="pl"><tr><th>Platform</th><th>Budget share (%)</th><th>Monthly budget</th><th>Target ROAS</th><th>Target CAC</th></tr>'+
PK.map(function(k){return'<tr><td>'+PN[k]+'</td><td>'+num('plat.'+k+'.share',g.plat[k].share,5)+'</td><td id="b'+k+'"></td><td>'+num('plat.'+k+'.roas',g.plat[k].roas,.1)+'</td><td>'+num('plat.'+k+'.cac',g.plat[k].cac,100)+'</td></tr>'}).join('')+
'<tr><td><b>Total</b></td><td id="sum"></td><td id="bT"></td><td></td><td></td></tr></table></div>'+PK.map(function(k){return'<p class="tip"><b>'+PN[k]+':</b> '+ROLE[k]+'</p>'}).join('')+'</div><p><a href="funnel.html" style="color:var(--acc)">Next: Step 2, Funnel →</a></p>';
function render(){SYM=g.sym||'';var G=calcGoals(g),x=function(v){return fmt(v,2)+'x'};
 var rows=[['Break-even ROAS',x(G.be),'1 ÷ gross margin. Below this you lose money on first purchases.'],['Target ROAS (blended)',x(G.tr),'Break-even × (1 + profit buffer)'],['Max CAC, LTV-based',money(G.mx),'LTV × margin ÷ LTV:CAC ratio'],['Break-even CAC, first order',money(G.fo),'First-order value × margin'],['Target CAC used',money(G.tc),'Follows the CAC basis you chose'],['Overall lead → customer rate',pct(G.l2c),'Lead→qualified × qualified→customer'],['Target cost per lead',money(G.tcpl),'Target CAC × lead→customer rate. Your guardrail if you can only measure leads.'],['Target cost per qualified lead',money(G.tcpql),'Target CAC × close rate. Best KPI when B2B deals take months to close.'],['Customers needed per month',fmt(G.need,1),'Budget ÷ target CAC. Compare with your sales goal.'],['Revenue at target ROAS, per month',money(G.rev),'Budget × target ROAS. Sanity-check against your revenue goal.']];
 document.getElementById('tb').innerHTML='<tr><th>Metric</th><th>Result</th><th>How it is calculated</th></tr>'+rows.map(function(r){return'<tr><td>'+r[0]+'</td><td><b>'+r[1]+'</b></td><td class="tip">'+r[2]+'</td></tr>'}).join('');
 PK.forEach(function(k){document.getElementById('b'+k).textContent=money(G.P[k].budget)});document.getElementById('bT').textContent=money(g.budget);
 document.getElementById('sum').innerHTML=G.sum===100?'100 <span class="st ok">OK</span>':G.sum+' <span class="st x">Must be 100</span>'}
bind(document.getElementById('main'),g,'goals',render);render();
