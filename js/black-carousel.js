// Curadoria da Super Black. Produtos esgotados são retirados automaticamente.
function getBlackCarouselSlides() {
  const selected=[43,39,36,61].map(id=>PRODUCTS.find(p=>p.id===id)).filter(p=>p && !p.soldOut);
  return selected.map((product,index)=>({product,pair:index%2===1}));
}
function initBlackCarousel(root) {
  if(!BLACK_FRIDAY.active)return;
  const slides=getBlackCarouselSlides();if(!slides.length)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,timer=null,paused=reduced.matches,hovered=false,focused=false,visible=true;
  root.setAttribute('role','region');root.setAttribute('aria-roledescription','carrossel');root.setAttribute('aria-label','Peças e ofertas da Super Black Friday');
  root.innerHTML=`<div class="black-slides" aria-live="off">${slides.map(({product,pair},i)=>`<div class="black-slide ${i===0?'is-current':''}" role="group" aria-roledescription="slide" aria-label="${i+1} de ${slides.length}" aria-hidden="${i!==0}" ${i!==0?'inert':''}>
    <img src="${product.img}" alt="${escapeHTML(product.name)}" ${i===0?'fetchpriority="high"':'loading="lazy"'} decoding="async">
    <div class="black-slide-copy"><span class="black-slide-kicker">SUPER BLACK · BELAVIE</span><h2>${pair?'40% OFF':'10% OFF'}</h2><p class="black-slide-offer">${pair?'Na peça de menor valor, a cada 2 peças.':'Em toda a loja, nas peças disponíveis.'}</p><a href="produto.html?id=${product.id}" tabindex="${i===0?'0':'-1'}">${escapeHTML(product.name)} <span aria-hidden="true">↗</span></a>${!pair?`<p class="black-slide-price"><s>${formatPrice(product.price)}</s> <strong>${formatPrice(getFinalPrice(product))}</strong></p>`:''}<small>Melhor oferta na sacola. Não cumulativas.</small></div>
  </div>`).join('')}</div><div class="black-carousel-controls"><button type="button" data-black-prev aria-label="Slide anterior">‹</button><div class="black-carousel-dots">${slides.map((_,i)=>`<button type="button" data-black-dot="${i}" aria-label="Mostrar slide ${i+1}" aria-current="${i===0?'true':'false'}"></button>`).join('')}</div><button type="button" data-black-next aria-label="Próximo slide">›</button><button type="button" data-black-pause></button></div>`;
  const panels=[...root.querySelectorAll('.black-slide')],dots=[...root.querySelectorAll('[data-black-dot]')],pause=root.querySelector('[data-black-pause]');
  function stop(){if(timer!==null){clearTimeout(timer);timer=null;}}
  function schedule(){stop();if(slides.length>1&&!paused&&!hovered&&!focused&&visible&&!document.hidden&&root.isConnected)timer=setTimeout(()=>{show(current+1);},6000);}
  function show(index){
    current=(index+slides.length)%slides.length;
    panels.forEach((panel,i)=>{const active=i===current;panel.classList.toggle('is-current',active);panel.setAttribute('aria-hidden',String(!active));panel.inert=!active;panel.querySelector('a').tabIndex=active?0:-1;});
    dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===current)));schedule();
  }
  function updatePause(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Reproduzir carrossel':'Pausar carrossel');}
  root.querySelector('[data-black-prev]').onclick=()=>show(current-1);
  root.querySelector('[data-black-next]').onclick=()=>show(current+1);
  dots.forEach((dot,i)=>dot.onclick=()=>show(i));
  pause.onclick=()=>{paused=!paused;updatePause();schedule();};
  root.addEventListener('mouseenter',()=>{hovered=true;stop();});root.addEventListener('mouseleave',()=>{hovered=false;schedule();});
  root.addEventListener('focusin',()=>{focused=true;stop();});root.addEventListener('focusout',event=>{if(!root.contains(event.relatedTarget)){focused=false;schedule();}});
  root.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));}});
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',event=>{if(event.matches){paused=true;updatePause();schedule();}});
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.1});observer.observe(root);}
  updatePause();schedule();
}
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-black-carousel]').forEach(initBlackCarousel));
