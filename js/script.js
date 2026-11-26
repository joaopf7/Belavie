// ==========================================================
// Belavie — comportamentos gerais do site
// ==========================================================

const WHATSAPP_NUMBER = "5583991290541"; // troque pelo número real da loja

document.addEventListener("DOMContentLoaded", () => {
  markActiveNavLink();
  setupMobileNav();
  setupFAQAccordion();
  setupCatalogFilters();
  setupContactForm();
  setupPromoBanner();
});

function setupPromoBanner() {
  const banner = document.getElementById("promo-banner");
  const closeBtn = document.getElementById("promo-close");
  if (!banner || !closeBtn) return;

  if (!BLACK_FRIDAY.active) { banner.hidden=true; banner.style.display='none'; return; }
  banner.querySelector('span').textContent = CAMPAIGN_TITLE + ' · ' + CAMPAIGN_OFFER;
  const bannerId = banner.dataset.bannerId || "default";
  const dismissedId = localStorage.getItem("belavie_promo_dismissed");

  if (dismissedId === bannerId) {
    banner.style.display = "none";
    return;
  }

  closeBtn.addEventListener("click", () => {
    banner.style.display = "none";
    localStorage.setItem("belavie_promo_dismissed", bannerId);
  });
}

// Marca o link ativo do menu conforme a página atual
function markActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("active");
  });
}

// Alterna o menu em telas pequenas
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;
  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });
}

// Acordeão de perguntas frequentes
function setupFAQAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      // fecha os outros itens do mesmo grupo
      item.parentElement
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

// Filtro por categoria + busca por texto no catálogo
function setupCatalogFilters() {
 const grid=document.querySelector('#product-grid'); if(!grid)return;
 const buttons=[...document.querySelectorAll('.filter-btn')], search=document.querySelector('#search-input'), sort=document.querySelector('#sort-select'), size=document.querySelector('#size-filter'), available=document.querySelector('#available-filter');
 let category=new URLSearchParams(location.search).get('cat') || 'Todos';
 if(!buttons.some(b=>b.dataset.category===category))category='Todos';
 const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 [...new Set(PRODUCTS.flatMap(p=>p.sizes || []).map(String))].sort((a,b)=>a.localeCompare(b,'pt-BR',{numeric:true})).forEach(s=>size.add(new Option(s,s)));
 function render(){
  const term=normalize(search.value.trim());
  let items=PRODUCTS.filter(p=>(category==='Todos'||p.category===category)&&normalize(p.name).includes(term)&&(!available.checked||!p.soldOut)&&(!size.value||(!p.soldOut&&(p.sizes||[]).map(String).includes(size.value)&&!(p.soldOutSizes||[]).map(String).includes(size.value))));
  items.sort((a,b)=>Number(!!a.soldOut)-Number(!!b.soldOut)||(sort.value==='price-asc'?getFinalPrice(a)-getFinalPrice(b):sort.value==='price-desc'?getFinalPrice(b)-getFinalPrice(a):sort.value==='newest'?b.id-a.id:Number(!!b.featured)-Number(!!a.featured)));
  grid.innerHTML=items.length?items.map(productCardHTML).join(''):'<p class="empty-state">Nenhuma peça encontrada. Experimente outro tamanho ou categoria.</p>';
  document.querySelector('#result-count').textContent=items.length+' PEÇA'+(items.length===1?'':'S');
  buttons.forEach(b=>{b.classList.toggle('active',b.dataset.category===category);b.setAttribute('aria-pressed',b.dataset.category===category);});
 }
 buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;render();}));
 search.addEventListener('input',render);[sort,size,available].forEach(el=>el.addEventListener('change',render));render();
}

// Envia o conteúdo do formulário de contato via WhatsApp
function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const message = form.querySelector("#message")?.value.trim();

    const text = encodeURIComponent(`Olá! Meu nome é ${name} (${email}).\n\n${message}`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  });
}

// Botão "Solicitar troca" / "Comprar pelo WhatsApp" — link genérico
function openWhatsApp(message) {
  const text = encodeURIComponent(message || "Olá! Gostaria de mais informações.");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}
