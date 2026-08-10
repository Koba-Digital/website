// CURSOR
const cur = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function anim(){
  cur.style.left=mx+'px'; cur.style.top=my+'px';
  rx+=(mx-rx)*.11; ry+=(my-ry)*.11;
  curR.style.left=rx+'px'; curR.style.top=ry+'px';
  requestAnimationFrame(anim);
})();
document.querySelectorAll('a,button,.svc,.pitem').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
});

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', ()=> nav.classList.toggle('sc', window.scrollY>60));

// REVEAL
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); obs.unobserve(e.target); }});
},{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// COUNT UP
const cObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, to=+el.dataset.to;
    let v=0, step=to/45;
    const t=setInterval(()=>{ v=Math.min(v+step,to); el.textContent=Math.round(v); if(v>=to)clearInterval(t); },25);
    cObs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.cnt').forEach(el=>cObs.observe(el));

// FORM → WHATSAPP
document.getElementById('form-wa').addEventListener('submit', e=>{
  e.preventDefault();
  const nombre = document.getElementById('f-nombre').value;
  const email  = document.getElementById('f-email').value;
  const svc    = document.getElementById('f-svc').value || 'Sin especificar';
  const msg    = document.getElementById('f-msg').value;
  const texto  = `Hola! Te escribo desde la web de Koba Digital 👋\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n*Servicio:* ${svc}\n\n*Proyecto:* ${msg}`;
  window.open(`https://wa.me/5492612501757?text=${encodeURIComponent(texto)}`, '_blank');
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href === '#') return;
    const t = document.querySelector(href);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  });
});
