// ==========================================================
// Belavie — página de detalhes do produto
// Lê o parâmetro ?id= da URL, busca em PRODUCTS e renderiza.
// Inclui: lightbox, compartilhar, favoritar, tamanhos
// (com esgotado e guia de medidas) e parcelamento.
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const product = PRODUCTS.find((p) => p.id === id);

  const wrap = document.getElementById("product-detail");

  if (!product) {
    wrap.innerHTML = `
      <div class="product-not-found">
        <p>Produto não encontrado.</p>
        <a href="catalogo.html" class="btn btn-primary">Voltar ao catálogo</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} — Belavie`;

  const favActive = isFavorite(product.id) ? "active" : "";

  wrap.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image" id="detail-image-trigger" role="button" tabindex="0" aria-label="Ampliar imagem">
        <img src="${product.img}" alt="${product.name}">
        <span class="zoom-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          Ampliar
        </span>
      </div>
      <div class="product-detail-info">
        <div class="product-detail-top-row">
          <div class="product-cat">${product.category}</div>
          <button class="favorite-btn detail-favorite-btn ${favActive}" id="detail-favorite-btn" aria-label="Favoritar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${favActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
            </svg>
          </button>
        </div>
        <h1>${product.name}</h1>
        <div class="product-detail-price">${formatPrice(product.price)}</div>
        ${paymentMethodsHTML()}
        <p class="product-detail-description">
          ${product.description || "Peça atemporal, escolhida a dedo para compor um guarda-roupa versátil e sofisticado."}
        </p>
        ${product.soldOut ? soldOutNoticeHTML() : sizeSelectorHTML(product)}
        <button class="btn ${product.soldOut ? 'btn-outline' : 'btn-primary'}" style="width:100%;" id="buy-whatsapp-btn">
          ${product.soldOut ? "Avise-me quando chegar" : "Comprar pelo WhatsApp"}
        </button>
        <span id="size-warning" class="size-warning"></span>
        <div style="display:flex; gap:12px; margin-top:14px;">
          <a href="catalogo.html" class="btn btn-outline" style="flex:1;">
            ← Voltar
          </a>
          <button class="btn btn-outline" id="share-btn" style="flex:1;">
            Compartilhar
          </button>
        </div>
        <span id="share-feedback" class="share-feedback"></span>
      </div>
    </div>
  `;

  setupLightbox(product);
  setupShareButton(product);
  setupDetailFavorite(product);

  if (product.soldOut) {
    setupSoldOutNotify(product);
  } else {
    setupSizeSelector(product);
    setupSizeGuide();
  }
});

// -------------------- Produto totalmente esgotado --------------------
function soldOutNoticeHTML() {
  return `
    <div class="sold-out-notice">
      <span class="sold-out-badge sold-out-badge-inline">Esgotado</span>
      <p>Esta peça está indisponível no momento. Deixe seu contato e avisamos assim que chegar uma nova remessa.</p>
    </div>
  `;
}

function setupSoldOutNotify(product) {
  const btn = document.getElementById("buy-whatsapp-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    openWhatsApp(`Olá! Gostaria de ser avisado(a) quando a peça "${product.name}" voltar ao estoque.`);
  });
}

// -------------------- Lightbox --------------------
function setupLightbox(product) {
  const trigger = document.getElementById("detail-image-trigger");
  if (!trigger) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <img src="${product.img}" alt="${product.name}">
  `;
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector(".lightbox-close");

  function open() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  trigger.addEventListener("click", open);
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") open();
  });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// -------------------- Compartilhar --------------------
function setupShareButton(product) {
  const btn = document.getElementById("share-btn");
  const feedback = document.getElementById("share-feedback");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const shareData = {
      title: `${product.name} — Belavie`,
      text: `Olha essa peça da Belavie: ${product.name} por ${formatPrice(product.price)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // usuário cancelou o compartilhamento
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      feedback.textContent = "Link copiado!";
      setTimeout(() => (feedback.textContent = ""), 2500);
    } catch (err) {
      feedback.textContent = window.location.href;
    }
  });
}

// -------------------- Favoritar --------------------
function setupDetailFavorite(product) {
  const btn = document.getElementById("detail-favorite-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const nowActive = toggleFavorite(product.id);
    btn.classList.toggle("active", nowActive);
    const svg = btn.querySelector("svg");
    if (svg) svg.setAttribute("fill", nowActive ? "currentColor" : "none");
  });
}

// -------------------- Formas de pagamento --------------------
function paymentMethodsHTML() {
  return `
    <div class="payment-methods">
      <span class="payment-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        Pix
      </span>
      <span class="payment-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        Crédito
      </span>
      <span class="payment-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>
        Débito
      </span>
      <span class="payment-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
        Dinheiro
      </span>
    </div>
  `;
}

// -------------------- Seletor de tamanho --------------------
function sizeSelectorHTML(product) {
  const sizes = product.sizes && product.sizes.length ? product.sizes : ["Único"];
  const soldOut = product.soldOutSizes || [];
  const isSingleSize = sizes.length === 1 && sizes[0] === "Único";

  const firstAvailableIndex = sizes.findIndex((s) => !soldOut.includes(s));

  return `
    <div class="size-selector">
      <div class="size-label-row">
        <span class="size-label">Tamanho</span>
        ${!isSingleSize ? '<button class="size-guide-link" id="size-guide-link" type="button">Como escolher meu tamanho?</button>' : ""}
      </div>
      <div class="size-options">
        ${sizes.map((s, i) => {
          const isSoldOut = soldOut.includes(s);
          const isActive = i === firstAvailableIndex;
          return `
            <button class="size-btn ${isActive ? "active" : ""} ${isSoldOut ? "sold-out" : ""}"
              data-size="${s}" ${isSoldOut ? "disabled" : ""}>
              ${s}
            </button>
          `;
        }).join("")}
      </div>
      ${isSingleSize && product.sizeInfo ? `<p class="size-info-note">${product.sizeInfo}</p>` : ""}
      ${firstAvailableIndex === -1 ? '<span class="size-warning" style="display:block;margin-top:8px;">Todos os tamanhos estão esgotados no momento.</span>' : ""}
    </div>
  `;
}

function setupSizeSelector(product) {
  const buttons = document.querySelectorAll(".size-btn:not(.sold-out)");
  const buyBtn = document.getElementById("buy-whatsapp-btn");
  const warning = document.getElementById("size-warning");
  if (!buyBtn) return;

  let selectedSize = buttons[0]?.dataset.size || null;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
      warning.textContent = "";
    });
  });

  buyBtn.addEventListener("click", () => {
    if (!selectedSize) {
      warning.textContent = "Todos os tamanhos estão esgotados. Fale conosco para saber sobre reposição.";
      return;
    }
    const sizeText = selectedSize === "Único" ? "" : ` — Tamanho ${selectedSize}`;
    openWhatsApp(
      `Olá! Tenho interesse na peça: ${product.name}${sizeText} (${formatPrice(product.price)}).`
    );
  });
}

// -------------------- Guia de tamanhos (modal) --------------------
function setupSizeGuide() {
  const link = document.getElementById("size-guide-link");
  if (!link) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay size-guide-overlay";
  overlay.innerHTML = `
    <div class="size-guide-modal">
      <button class="lightbox-close size-guide-close" aria-label="Fechar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <h3>Guia de tamanhos</h3>
      <p class="size-guide-note">Medidas aproximadas em centímetros. Em caso de dúvida entre dois tamanhos, recomendamos escolher o maior.</p>
      <table class="size-guide-table">
        <thead>
          <tr><th>Tamanho</th><th>Busto</th><th>Cintura</th><th>Quadril</th></tr>
        </thead>
        <tbody>
          <tr><td>P</td><td>82–86</td><td>62–66</td><td>90–94</td></tr>
          <tr><td>M</td><td>87–91</td><td>67–71</td><td>95–99</td></tr>
          <tr><td>G</td><td>92–97</td><td>72–77</td><td>100–105</td></tr>
        </tbody>
      </table>
      <button class="btn btn-outline" style="width:100%; margin-top:20px;" onclick="openWhatsApp('Olá! Preciso de ajuda para escolher o tamanho ideal.')">
        Falar com a equipe
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector(".size-guide-close");

  function open() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  link.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
}
