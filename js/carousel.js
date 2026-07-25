// ==========================================================
// Belavie — carrossel de imagens
// Funciona em qualquer elemento ".hero-carousel" da página.
// Estrutura esperada:
// <div class="hero-carousel" data-autoplay="5000">
//   <div class="carousel-track">
//     <div class="carousel-slide">...</div>
//     <div class="carousel-slide">...</div>
//   </div>
//   <button class="carousel-arrow prev">‹</button>
//   <button class="carousel-arrow next">›</button>
//   <div class="carousel-dots"></div>
// </div>
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero-carousel").forEach(initCarousel);
});

function initCarousel(carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotsWrap = carousel.querySelector(".carousel-dots");
  const prevBtn = carousel.querySelector(".carousel-arrow.prev");
  const nextBtn = carousel.querySelector(".carousel-arrow.next");

  if (!track || slides.length === 0) return;

  let current = 0;
  const autoplayDelay = parseInt(carousel.dataset.autoplay, 10) || 0;
  let autoplayTimer = null;

  // cria os dots dinamicamente
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });
    }
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  function startAutoplay() {
    if (autoplayDelay > 0) {
      autoplayTimer = setInterval(next, autoplayDelay);
    }
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // pausa o autoplay quando o mouse está sobre o carrossel
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // suporte a arrastar/swipe (touch e mouse)
  let startX = 0;
  let isDragging = false;

  function dragStart(x) {
    isDragging = true;
    startX = x;
    stopAutoplay();
  }
  function dragEnd(x) {
    if (!isDragging) return;
    const delta = x - startX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    isDragging = false;
    startAutoplay();
  }

  carousel.addEventListener("touchstart", (e) => dragStart(e.touches[0].clientX));
  carousel.addEventListener("touchend", (e) => dragEnd(e.changedTouches[0].clientX));
  carousel.addEventListener("mousedown", (e) => dragStart(e.clientX));
  carousel.addEventListener("mouseup", (e) => dragEnd(e.clientX));

  // teclado (setas do lado quando o carrossel está focado)
  carousel.setAttribute("tabindex", "0");
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  update();
  startAutoplay();
}
