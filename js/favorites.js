// ==========================================================
// Belavie — sistema de favoritos (localStorage, sem login)
// ==========================================================

const FAVORITES_KEY = "belavie_favorites";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter((f) => f !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  updateFavoritesBadge();
  return favs.includes(id);
}

// chamado pelo clique no coração dentro do card de produto
function toggleFavoriteClick(event, id) {
  event.stopPropagation();
  event.preventDefault();
  const btn = event.currentTarget;
  const nowActive = toggleFavorite(id);
  btn.classList.toggle("active", nowActive);
  const svg = btn.querySelector("svg");
  if (svg) svg.setAttribute("fill", nowActive ? "currentColor" : "none");
}

// atualiza o numerozinho no ícone de coração do cabeçalho
function updateFavoritesBadge() {
  const badge = document.querySelector("#favorites-count");
  if (!badge) return;
  const count = getFavorites().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", updateFavoritesBadge);
