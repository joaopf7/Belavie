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
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.querySelector("#search-input");
  const sortSelect = document.querySelector("#sort-select");
  const resultCount = document.querySelector("#result-count");
  let activeCategory = "Todos";

  function render() {
    const term = (searchInput?.value || "").toLowerCase().trim();
    let filtered = PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
      const matchesTerm = p.name.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });

    // aplica a ordenação escolhida
    const sortValue = sortSelect?.value || "relevance";
    if (sortValue === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "newest") {
      filtered = filtered.sort((a, b) => b.id - a.id); // maior id = adicionado mais recente
    }

    grid.innerHTML = filtered.map(productCardHTML).join("");
    if (resultCount) {
      resultCount.textContent = `${filtered.length} PEÇA${filtered.length === 1 ? "" : "S"}`;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      render();
    });
  });

  if (searchInput) searchInput.addEventListener("input", render);
  if (sortSelect) sortSelect.addEventListener("change", render);

  render();
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

    const text = `Olá! Meu nome é ${name} (${email}).%0A%0A${encodeURIComponent(message)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  });
}

// Botão "Solicitar troca" / "Comprar pelo WhatsApp" — link genérico
function openWhatsApp(message) {
  const text = encodeURIComponent(message || "Olá! Gostaria de mais informações.");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}
