// ==========================================================
// Belavie — página de detalhes do produto
// Lê o parâmetro ?id= da URL, busca em PRODUCTS e renderiza.
// Inclui: lightbox (zoom na imagem) e botão de compartilhar.
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
        <p class="product-detail-description">
          ${product.description || "Peça atemporal, escolhida a dedo para compor um guarda-roupa versátil e sofisticado."}
        </p>
        ${sizeSelectorHTML(product)}
        <button class="btn btn-primary" style="width:100%;" id="buy-whatsapp-btn">
          Comprar pelo WhatsApp
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
  setupSizeSelector(product);
});

// -------------------- Seletor de tamanho --------------------
function sizeSelectorHTML(product) {
  const sizes = product.sizes && product.sizes.length ? product.sizes : ["Único"];
  return `
    <div class="size-selector">
      <span class="size-label">Tamanho</span>
      <div class="size-options">
        ${sizes.map((s, i) => `
          <button class="size-btn ${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function setupSizeSelector(product) {
  const buttons = document.querySelectorAll(".size-btn");
  const buyBtn = document.getElementById("buy-whatsapp-btn");
  const warning = document.getElementById("size-warning");
  if (!buttons.length || !buyBtn) return;

  let selectedSize = buttons[0]?.dataset.size || "Único";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
      warning.textContent = "";
    });
  });

  buyBtn.addEventListener("click", () => {
    if (!selectedSize) {
      warning.textContent = "Selecione um tamanho antes de continuar.";
      return;
    }
    const sizeText = selectedSize === "Único" ? "" : ` — Tamanho ${selectedSize}`;
    openWhatsApp(
      `Olá! Tenho interesse na peça: ${product.name}${sizeText} (${formatPrice(product.price)}).`
    );
  });
}

// -------------------- Favoritar (página de detalhes) --------------------
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
