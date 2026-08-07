// Catálogo de produtos — Belavie
const PRODUCTS = [
  {
    id: 1,
    name: "Conjunto Moletom Luna",
    category: "Conjuntos",
    price: 195.00,
    ph: "ph-a",
    img: "img/image1.jpeg",
    featured: true
  },
  {
    id: 2,
    name: "Conjunto Moletom Laís",
    category: "Conjuntos",
    price: 235.00,
    ph: "ph-b",
    img: "img/image2.jpeg",
    featured: true
  },
  {
    id: 3,
    name: "Calça Slim Bege Escura",
    category: "Calças",
    price: 185.00,
    ph: "ph-c",
    img: "img/image3.jpeg",
    featured: true
  },
  {
    id: 4,
    name: "Conjunto Calça Alfaiataria",
    category: "Conjuntos",
    price: 220.00,
    ph: "ph-d",
    img: "img/image4.jpeg",
    featured: true
  },
  {
    id: 5,
    name: "Vestido Jeans",
    category: "Vestidos",
    price: 210.00,
    ph: "ph-e",
    img: "img/image5.jpeg",
    featured: true
  },
  {
    id: 6,
    name: "Conjunto Short Café",
    category: "Conjuntos",
    price: 250.00,
    ph: "ph-f",
    img: "img/image6.jpeg",
    featured: true
  },
  {
    id: 7,
    name: "Conjunto Short Marrant",
    category: "Conjuntos",
    price: 245.00,
    ph: "ph-g",
    img: "img/image7.jpeg",
    featured: true
  },
  {
    id: 8,
    name: "Conjunto Calça Marrant",
    category: "Conjuntos",
    price: 285.00,
    ph: "ph-h",
    img: "img/image8.jpeg",
    featured: true
  },
  {
    id: 9,
    name: "Conjunto Short Marrant",
    category: "Conjuntos",
    price: 255.00,
    ph: "ph-a",
    img: "img/image9.jpeg",
    featured: false
  },
  {
    id: 10,
    name: "Calça Jeans Slim",
    category: "calças",
    price: 185.00,
    ph: "ph-b",
    img: "img/image10.jpeg",
    featured: false
  },
  {
    id: 11,
    name: "Calça Wide Leg",
    category: "Calças",
    price: 206.00,
    ph: "ph-c",
    img: "img/image11.jpeg",
    featured: false
  },
  {
    id: 12,
    name: "Blusa Daniela",
    category: "Blusas",
    price: 110.00,
    ph: "ph-d",
    img: "img/image12.jpeg",
    featured: false
  },
  {
    id: 13,
    name: "Calça Wide Leg Com Cinto",
    category: "Calças",
    price: 165.00,
    ph: "ph-e",
    img: "img/image13.jpeg",
    featured: false
  },
  {
    id: 14,
    name: "Vestido Priscila",
    category: "Vestidos",
    price: 200.00,
    ph: "ph-f",
    img: "img/image14.jpeg",
    featured: false
  },
  {
    id: 15,
    name: "Vestido Floral Lisa",
    category: "Vestidos",
    price: 190.00,
    ph: "ph-g",
    img: "img/image15.jpeg",
    featured: false
  },
  {
    id: 16,
    name: "Vestido Margô",
    category: "Vestidos",
    price: 200.00,
    ph: "ph-h",
    img: "img/image16.jpeg",
    featured: false
  },
  {
    id: 17,
    name: "Blusa Helena",
    category: "Blusas",
    price: 110.00,
    ph: "ph-a",
    img: "img/image17.jpeg",
    featured: false
  },
  {
    id: 18,
    name: "Blusa Mia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-b",
    img: "img/image18.jpeg",
    featured: false
  },
  {
    id: 19,
    name: "Blusa Eliana",
    category: "Blusas",
    price: 86.00,
    ph: "ph-c",
    img: "img/image19.jpeg",
    featured: false
  },
  {
    id: 20,
    name: "Blusa Julia",
    category: "Blusas",
    price: 65.00,
    ph: "ph-d",
    img: "img/image20.jpeg",
    featured: false
  },
  {
    id: 21,
    name: "Blusa Carolina",
    category: "Blusas",
    price: 120.00,
    ph: "ph-e",
    img: "img/image21.jpeg",
    featured: false
  },
  {
    id: 22,
    name: "Blusa Cintia",
    category: "Blusas",
    price: 85.00,
    ph: "ph-f",
    img: "img/image22.jpeg",
    featured: false
  },
  {
    id: 23,
    name: "Blusa Carol",
    category: "Blusas",
    price: 65.00,
    ph: "ph-g",
    img: "img/image23.jpeg",
    featured: false
  },
  {
    id: 24,
    name: "Blusa Poliana",
    category: "Blusas",
    price: 110.00,
    ph: "ph-h",
    img: "img/image24.jpeg",
    featured: false
  },
  {
    id: 25,
    name: "Blusa Marilene",
    category: "Blusas",
    price: 65.00,
    ph: "ph-a",
    img: "img/image25.jpeg",
    featured: false
  },
  {
    id: 26,
    name: "Blusa Marilene",
    category: "Blusas",
    price: 65.00,
    ph: "ph-b",
    img: "img/image26.jpeg",
    featured: false
  },
  {
    id: 27,
    name: "Blusa Guia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-c",
    img: "img/image27.jpeg",
    featured: false
  },
  {
    id: 28,
    name: "Blusa Olivia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-d",
    img: "img/image28.jpeg",
    featured: false
  },
  {
    id: 29,
    name: "Blusa katia",
    category: "Blusas",
    price: 65.00,
    ph: "ph-e",
    img: "img/image29.jpeg",
    featured: false
  },
  {
    id: 30,
    name: "Blusa Julia",
    category: "Blusas",
    price: 65.00,
    ph: "ph-f",
    img: "img/image30.jpeg",
    featured: false
  },
  {
    id: 31,
    name: "Blusa Lucia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-g",
    img: "img/image31.jpeg",
    featured: false
  },
  {
    id: 32,
    name: "Blusa Renata",
    category: "Blusas",
    price: 50.00,
    ph: "ph-h",
    img: "img/image32.jpeg",
    featured: false
  },
  {
    id: 33,
    name: "Vestido Floral Laísa",
    category: "Vestidos",
    price: 190.00,
    ph: "ph-a",
    img: "img/image33.jpeg",
    featured: false
  },
  {
    id: 34,
    name: "Vestido Floral Laísa",
    category: "Vestidos",
    price: 190.00,
    ph: "ph-b",
    img: "img/image34.jpeg",
    featured: false
  },
  {
    id: 35,
    name: "Conjunto Short Off-White",
    category: "Conjuntos",
    price: 250.00,
    ph: "ph-c",
    img: "img/image35.jpeg",
    featured: false
  },
  {
    id: 36,
    name: "Blusa Mariana",
    category: "Blusas",
    price: 115.00,
    ph: "ph-d",
    img: "img/image36.jpeg",
    featured: false
  },
  {
    id: 37,
    name: "Jaqueta Horrana",
    category: "Camisas",
    price: 206.00,
    ph: "ph-e",
    img: "img/image37.jpeg",
    featured: false
  },
  {
    id: 38,
    name: "Conjunto Liara",
    category: "Conjuntos",
    price: 195.00,
    ph: "ph-f",
    img: "img/image38.jpeg",
    featured: false
  },
  {
    id: 39,
    name: "Conjunto Regina",
    category: "Conjuntos",
    price: 200.00,
    ph: "ph-g",
    img: "img/image39.jpeg",
    featured: false
  },
  {
    id: 40,
    name: "Macacão Roberta",
    category: "Macacão",
    price: 205.00,
    ph: "ph-f",
    img: "img/image40.jpeg",
    featured: false
  },
  {
    id: 41,
    name: "Macacão Roberta",
    category: "Macacão",
    price: 205.00,
    ph: "ph-g",
    img: "img/image41.jpeg",
    featured: false
  },
  {
    id: 42,
    name: "Vestido Larissa",
    category: "Vestidos",
    price: 205.00,
    ph: "ph-h",
    img: "img/image42.jpeg",
    featured: false
  },
  {
    id: 43,
    name: "Vestido Manuela",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-a",
    img: "img/image43.jpeg",
    featured: false
  },
  {
    id: 44,
    name: "Vestido Leticia",
    category: "Vestidos",
    price: 205.00,
    ph: "ph-b",
    img: "img/image44.jpeg",
    featured: false
  },
  {
    id: 45,
    name: "Vestido Clarisse",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-c",
    img: "img/image45.jpeg",
    featured: false
  },
  {
    id: 46,
    name: "Vestido Clarisse",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-d",
    img: "img/image46.jpeg",
    featured: false
  },
  {
    id: 47,
    name: "Vestido Manuela",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-e",
    img: "img/image47.jpeg",
    featured: false
  },
  {
    id: 48,
    name: "Vestido Serena",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-f",
    img: "img/image48.jpeg",
    featured: false
  },
  {
    id: 49,
    name: "Vestido Serena",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-g",
    img: "img/image49.jpeg",
    featured: false
  },
  {
    id: 50,
    name: "Chemise listrada",
    category: "Vestidos",
    price: 165.00,
    ph: "ph-f",
    img: "img/image50.jpeg",
    featured: false
  },
  {
    id: 51,
    name: "Chemise listrada",
    category: "Vestidos",
    price: 165.00,
    ph: "ph-g",
    img: "img/image51.jpeg",
    featured: false
  },
  {
    id: 52,
    name: "Vestido Rebeca",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-h",
    img: "img/image52.jpeg",
    featured: false
  },
  {
    id: 53,
    name: "Vestido Rebeca",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-a",
    img: "img/image53.jpeg",
    featured: false
  },
  {
    id: 54,
    name: "Vestidos Ana",
    category: "Vestidos",
    price: 200.00,
    ph: "ph-g",
    img: "img/image54.jpeg",
    featured: false
  },
  {
    id: 55,
    name: "Vestido Flora",
    category: "Vestidos",
    price: 180.00,
    ph: "ph-h",
    img: "img/image55.jpeg",
    featured: false
  },
  {
    id: 56,
    name: "Vestido Flora",
    category: "Vestidos",
    price: 180.00,
    ph: "ph-a",
    img: "img/image56.jpeg",
    featured: false
  },
  {
    id: 57,
    name: "Macacão Cris",
    category: "Macacão",
    price: 120.00,
    ph: "ph-a",
    img: "img/image57.jpeg",
    featured: false
  },
  {
    id: 58,
    name: "Conjunto Liara",
    category: "Conjuntos",
    price: 195.00,
    ph: "ph-f",
    img: "img/image58.jpeg",
    featured: false
  },
  {
    id: 59,
    name: "Conjunto Regina",
    category: "Conjuntos",
    price: 200.00,
    ph: "ph-g",
    img: "img/image59.jpeg",
    featured: false
  },
  {
    id: 60,
    name: "Macacão Roberta",
    category: "Macacão",
    price: 205.00,
    ph: "ph-f",
    img: "img/image60.jpeg",
    featured: false
  },
  {
    id: 61,
    name: "Macacão Roberta",
    category: "Macacão",
    price: 205.00,
    ph: "ph-g",
    img: "img/image61.jpeg",
    featured: false
  },
  {
    id: 62,
    name: "Vestido Larissa",
    category: "Vestidos",
    price: 205.00,
    ph: "ph-h",
    img: "img/image62.jpeg",
    featured: false
  },
  {
    id: 63,
    name: "Vestido Manuela",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-a",
    img: "img/image63.jpeg",
    featured: false
  },
  {
    id: 64,
    name: "Vestido Leticia",
    category: "Vestidos",
    price: 205.00,
    ph: "ph-b",
    img: "img/image64.jpeg",
    featured: false
  },
  {
    id: 65,
    name: "Vestido Clarisse",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-c",
    img: "img/image65.jpeg",
    featured: false
  },
  {
    id: 66,
    name: "Vestido Clarisse",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-d",
    img: "img/image66.jpeg",
    featured: false
  },
  {
    id: 67,
    name: "Vestido Manuela",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-e",
    img: "img/image67.jpeg",
    featured: false
  },
  {
    id: 68,
    name: "Vestido Serena",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-f",
    img: "img/image68.jpeg",
    featured: false
  },
  {
    id: 69,
    name: "Vestido Serena",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-g",
    img: "img/image69.jpeg",
    featured: false
  },
  {
    id: 70,
    name: "Chemise listrada",
    category: "Vestidos",
    price: 165.00,
    ph: "ph-f",
    img: "img/image70.jpeg",
    featured: false
  }
];

function formatPrice(v) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

function productCardHTML(p) {
  const favActive = isFavorite(p.id) ? "active" : "";
  return `
    <div class="product-card" data-category="${p.category}" data-name="${p.name.toLowerCase()}" onclick="handleCardClick(event, ${p.id})">
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="favorite-btn ${favActive}" aria-label="Favoritar" onclick="toggleFavoriteClick(event, ${p.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${favActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
          </svg>
        </button>
      </div>
      <div class="product-cat">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">${formatPrice(p.price)}</div>
    </div>
  `;
}

function handleCardClick(event, id) {
  if (event.target.closest(".favorite-btn")) return;
  window.location.href = `produto.html?id=${id}`;
}
