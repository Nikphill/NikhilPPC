function DE(){var o={r:{}};EVT.rows.forEach(function(r,i){o.r[i]={ev:r[0],sg:r[1],g:r[2],m:r[3],l:r[4],c0:'',c1:'',c2:'',c3:'',c4:''}});return o}
var E=load('events',DE()),CH=['Pixel / tag firing?','Conversion API / server-side?','Dedup event_id set?','Value passed?','Tested end-to-end?'];
chrome('events.html','Step 4: one row per business event. Map the name each platform needs, then mark each check Yes, No or N/A. Blank means not checked yet.');
function tx(p,v){return'<input type="text" data-p="'+p+'" data-t="1" value="'+esc(v)+'">'}
function sel(p,v){return'<select data-p="'+p+'">'+['','Yes','No','N/A'].map(function(o){return'<option value="'+o+'"'+(v===o?' selected':'')+'>'+(o||'–')+'</option>'}).join('')+'</select>'}
document.getElementById('main').innerHTML='<div class="card"><p id="sm" style="margin:0 0 8px"></p><div class="sc"><table class="t l"><tr><th>Business event</th><th>Funnel stage</th><th>Google event</th><th>Meta event</th><th>LinkedIn conversion</th>'+CH.map(function(c){return'<th>'+c+'</th>'}).join('')+'<th>Status</th><th style="min-width:220px">Tip</th></tr>'+
EVT.rows.map(function(t,i){var r=E.r[i],b='r.'+i+'.';return'<tr><td>'+tx(b+'ev',r.ev)+'</td><td>'+tx(b+'sg',r.sg)+'</td><td>'+tx(b+'g',r.g)+'</td><td>'+tx(b+'m',r.m)+'</td><td>'+tx(b+'l',r.l)+'</td>'+[0,1,2,3,4].map(function(c){return'<td>'+sel(b+'c'+c,r['c'+c])+'</td>'}).join('')+'<td id="s'+i+'"></td><td class="tip">'+t[5]+'</td></tr>'}).join('')+'</table></div><p class="tip">'+EVT.note+'</p></div><p><a href="tracking.html" style="color:var(--acc)">← Step 3, Tracking</a></p>';
function render(){var y=0,n=0;EVT.rows.forEach(function(t,i){var r=E.r[i],s=evStatus(r);[0,1,2,3,4].forEach(function(c){var v=r['c'+c];if(v==='Yes')y++;if(v==='No')n++});
 document.getElementById('s'+i).innerHTML=!s?'':'<span class="'+(s==='OK'?'st ok':s==='In progress'?'st wt':s[0]==='G'?'st x':'tip')+'">'+s+'</span>'});
 document.getElementById('sm').innerHTML='<b>Tracking health:</b> '+y+' checks Yes · '+n+' gaps (No)'}
bind(document.getElementById('main'),E,'events',render);render();
