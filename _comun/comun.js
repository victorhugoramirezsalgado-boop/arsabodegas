/* Sitios VHRS · idiomas (12), Morse sonoro, Receptor Morse (RX), red de sitios y modo incrustado.
   Cada página define window.SITIO = { morse: 'PALABRA', t: { clave: { es, en, ... } } } antes de cargar este archivo.
   © Víctor Hugo Ramírez Salgado */
(function(){
"use strict";
const S=window.SITIO||{};
const LANGS=[['es','Español'],['en','English'],['fr','Français'],['pt','Português'],['it','Italiano'],['de','Deutsch'],['zh','中文'],['ja','日本語'],['ko','한국어'],['ar','العربية'],['ru','Русский'],['hi','हिन्दी']];
const BASE={
 contacto:{es:'Contacto',en:'Contact',fr:'Contact',pt:'Contato',it:'Contatti',de:'Kontakt',zh:'联系',ja:'お問い合わせ',ko:'연락처',ar:'اتصل',ru:'Контакты',hi:'संपर्क'},
 aviso:{es:'Aviso legal',en:'Legal notice',fr:'Mentions légales',pt:'Aviso legal',it:'Note legali',de:'Impressum',zh:'法律声明',ja:'法的通知',ko:'법적 고지',ar:'إشعار قانوني',ru:'Правовая информация',hi:'कानूनी सूचना'},
 red:{es:'Red de sitios',en:'Site network',fr:'Réseau de sites',pt:'Rede de sites',it:'Rete di siti',de:'Website-Netzwerk',zh:'网站网络',ja:'サイト一覧',ko:'사이트 네트워크',ar:'شبكة المواقع',ru:'Сеть сайтов',hi:'साइट नेटवर्क'},
 derechos:{es:'Todos los derechos reservados.',en:'All rights reserved.',fr:'Tous droits réservés.',pt:'Todos os direitos reservados.',it:'Tutti i diritti riservati.',de:'Alle Rechte vorbehalten.',zh:'版权所有。',ja:'無断転載を禁じます。',ko:'모든 권리 보유.',ar:'جميع الحقوق محفوظة.',ru:'Все права защищены.',hi:'सर्वाधिकार सुरक्षित।'},
 idioma_nota:{es:'',en:'Main content in Spanish; menus and headings translated.',fr:'Contenu principal en espagnol ; menus et titres traduits.',pt:'Conteúdo principal em espanhol; menus e títulos traduzidos.',it:'Contenuto principale in spagnolo; menu e titoli tradotti.',de:'Hauptinhalt auf Spanisch; Menüs und Überschriften übersetzt.',zh:'正文为西班牙语；菜单和标题已翻译。',ja:'本文はスペイン語、メニューと見出しは翻訳済み。',ko:'본문은 스페인어이며 메뉴와 제목은 번역되었습니다.',ar:'المحتوى الرئيسي بالإسبانية؛ القوائم والعناوين مترجمة.',ru:'Основной текст на испанском; меню и заголовки переведены.',hi:'मुख्य सामग्री स्पेनिश में; मेनू और शीर्षक अनुवादित।'}
};
const T=Object.assign({},BASE,S.t||{});
let lang='es';try{lang=localStorage.getItem('vhrs_lang')||(navigator.language||'es').slice(0,2)}catch(e){}
if(!LANGS.some(l=>l[0]===lang))lang='es';
const ES={};
function apply(){
  document.querySelectorAll('[data-t]').forEach(el=>{const k=el.dataset.t;if(!(k in ES))ES[k]=el.innerHTML;const v=lang==='es'?ES[k]:(T[k]&&T[k][lang]);el.innerHTML=v||ES[k];});
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  const n=document.getElementById('idioma-nota');if(n)n.textContent=(T.idioma_nota[lang]||'');
}
function morse(btn,word){
  const MO={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.',0:'-----'};
  const w=word.normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase();
  btn.title=w.split('').map(c=>MO[c]||'/').join(' ');btn.setAttribute('aria-label','Morse: '+w);
  let ac=null,busy=false;
  btn.addEventListener('click',()=>{if(busy)return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
    busy=true;btn.classList.add('on');const u=.07;let t=ac.currentTime+.05;
    for(const ch of w){const m=MO[ch];if(!m){t+=4*u;continue}for(const s of m){const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=640;o.connect(g);g.connect(ac.destination);const d=s==='.'?u:3*u;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.22,t+.005);g.gain.setValueAtTime(.22,t+d-.005);g.gain.linearRampToValueAtTime(0,t+d);o.start(t);o.stop(t+d+.01);t+=d+u;}t+=2*u;}
    setTimeout(()=>{busy=false;btn.classList.remove('on')},(t-ac.currentTime)*1000);});
}
function cargar(src){return new Promise((ok,mal)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=mal;document.head.appendChild(s);});}
let rxListo=null;
async function receptor(){
  try{rxListo=rxListo||cargar('/_comun/morse-motor.js').then(()=>cargar('/_comun/receptor.js'));await rxListo;window.VHRSReceptor.abrir();}
  catch(e){rxListo=null;location.href='/_comun/receptor.html';}
}
const RED=[['victorhugoramirezsalgado.com','Víctor Hugo Ramírez Salgado'],['arsabodegas.com','Arsa Bodegas'],['tcontenedores.com','TContenedores'],['codigocubico.com','Código Cúbico'],['sosistem.com','SOSistem'],['xn--econotopa-n5a.com','Econotopía'],['xn--intertopa-n5a.com','Intertopía'],['xn--1ntertopa-n5a.com','1ntertopía']];
document.addEventListener('DOMContentLoaded',()=>{
  const sel=document.getElementById('lang');
  if(sel){sel.innerHTML=LANGS.map(([k,n])=>`<option value="${k}">${n}</option>`).join('');sel.value=lang;sel.onchange=()=>{lang=sel.value;try{localStorage.setItem('vhrs_lang',lang)}catch(e){}apply();};}
  document.querySelectorAll('.morse[data-morse]').forEach(b=>morse(b,b.dataset.morse));
  // Receptor Morse (escucha por micrófono, archivo o toques): botón RX junto al Morse sonoro
  document.querySelectorAll('.morse[data-morse]').forEach(b=>{if(b.nextElementSibling&&b.nextElementSibling.classList.contains('rx'))return;
    const r=document.createElement('button');r.type='button';r.className='morse rx';r.textContent='RX ·−·';r.title='Receptor Morse';r.setAttribute('aria-label','Receptor Morse');
    r.onclick=receptor;b.after(r);});
  const red=document.getElementById('red');if(red)red.innerHTML=RED.filter(([d])=>d!==location.hostname.replace(/^www\./,'')).map(([d,n])=>`<a href="https://${d}/">${n}</a>`).join('');
  document.querySelectorAll('[data-anio]').forEach(e=>e.textContent=new Date().getFullYear());
  apply();
  // dentro de un marco (panel o Squarespace): avisa la altura
  let emb=false;try{emb=window.self!==window.top}catch(e){emb=true}
  if(emb){document.documentElement.classList.add('embed');const send=()=>{try{parent.postMessage({vhrs:true,h:Math.ceil(document.documentElement.scrollHeight)},'*')}catch(e){}};new ResizeObserver(send).observe(document.documentElement);send();}
});
})();
