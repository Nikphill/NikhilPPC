var SYM='₹',NAV=[['Start','index.html'],['1 Goals','goals.html'],['2 Funnel','funnel.html'],['3 Tracking','tracking.html'],['4 Events','events.html'],['5 Data','campaign.html'],['6 Dashboard','dashboard.html'],['7 Incrementality','incrementality.html'],['8 Optimize','optimize.html'],['9 Pacing','pacing.html']];
function merge(d,s){var o={};for(var k in d)o[k]=(d[k]&&typeof d[k]==='object'&&s&&s[k]&&typeof s[k]==='object')?merge(d[k],s[k]):(s&&s[k]!==undefined?s[k]:d[k]);return o}
function load(k,d){var s={};try{s=JSON.parse(localStorage.getItem('nppc.'+k))||{}}catch(e){}return merge(d,s)}
function save(k,o){try{localStorage.setItem('nppc.'+k,JSON.stringify(o))}catch(e){}}
function fmt(v,d){return isFinite(v)?Number(v).toLocaleString('en-IN',{minimumFractionDigits:d||0,maximumFractionDigits:d||0}):'–'}
function money(v,d){return isFinite(v)?(v<0?'−':'')+SYM+fmt(Math.abs(v),d===undefined?(Math.abs(v)<100&&v%1?2:0):d):'–'}
function pct(v,d){return isFinite(v)?fmt(v*100,d===undefined?1:d)+'%':'–'}
function chrome(on,sub){document.getElementById('top').innerHTML='<h1>NikhilPPC</h1><p class="sub">'+sub+'</p><nav>'+NAV.map(function(n){return n[1]?'<a href="'+n[1]+'"'+(n[1]===on?' class="on"':'')+'>'+n[0]+'</a>':'<span title="Coming next">'+n[0]+'</span>'}).join('')+'</nav>'}
function bind(root,st,key,render){root.addEventListener('input',function(e){var p=e.target.dataset.p;if(!p)return;var a=p.split('.'),o=st;for(var i=0;i<a.length-1;i++)o=o[a[i]];o[a[a.length-1]]=(e.target.tagName==='SELECT'||e.target.dataset.t)?e.target.value:(+e.target.value||0);save(key,st);render()})}
function num(p,v,s){return'<input type="number" min="0" step="'+(s||1)+'" data-p="'+p+'" value="'+v+'">'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function loadRaw(k,d){try{var s=JSON.parse(localStorage.getItem('nppc.'+k));if(s)return s}catch(e){}return JSON.parse(JSON.stringify(d))}
function chip(s){var c={'On target':'st ok','Watch':'st wt','Off target':'st x','OK':'st ok','Reduce':'st x','Under pace':'st wt'}[s];return s?'<span class="'+(c||'tip')+'">'+s+'</span>':''}
