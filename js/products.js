const BLACK_FRIDAY = { active: true, discount: 40, singleDiscount: 10 };
const CAMPAIGN_TITLE = 'Super Black Friday Belavie';
const CAMPAIGN_OFFER = '10% OFF nas peças disponíveis ou 40% OFF na de menor valor a cada 2 peças. Aplicamos a melhor oferta, sem acumular.';
const CAMPAIGN_RULES = 'Comparamos 10% OFF em todas as peças disponíveis do pedido com 40% OFF nas peças de menor valor, a cada 2 unidades. Com 4 peças, a segunda oferta desconta as 2 de menor valor; com 3, apenas a de menor valor. Ambas são calculadas sobre os preços regulares. Aplicamos uma única oferta ao pedido: a que resultar no menor total. Não cumulativas com outras promoções. Estoque confirmado no atendimento.';
function getFinalPrice(p) { const cents = Math.round(p.price * 100); return hasDiscount(p) ? Math.max(0, Math.round(cents * (100 - BLACK_FRIDAY.singleDiscount) / 100) - 1) / 100 : p.price; }
function hasDiscount(p) { return BLACK_FRIDAY.active && !p.soldOut; }
function formatPriceHTML(v) { return '<small class="currency">R$</small> ' + v.toFixed(2).replace('.', ','); }
function priceHTML(p) { return hasDiscount(p) ? `<span class="price-old">De ${formatPriceHTML(p.price)}</span><span class="price-new">Por ${formatPriceHTML(getFinalPrice(p))}</span><span class="single-offer-label">${BLACK_FRIDAY.singleDiscount}% OFF</span>` : formatPriceHTML(p.price); }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
// Catálogo de produtos — Belavie
const PRODUCTS = [
  {
    id: 1,
    name: "Conjunto Moletom Luna",
    category: "Conjuntos",
    price: 195.00,
    ph: "ph-a",
    img: "img/image1.jpeg",
    featured: true,
    sizes: ["Único"],
    sizeInfo: "Veste do 38 ao 42"
  },
  {
    id: 2,
    name: "Conjunto Moletom Laís",
    category: "Conjuntos",
    price: 235.00,
    ph: "ph-b",
    img: "img/image2.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 38 ao 42"
  },
  {
    id: 3,
    name: "Calça Slim Bege Escura",
    category: "Calças",
    price: 185.00,
    ph: "ph-c",
    img: "img/image3.jpeg",
    featured: false,
    sizes: ["36"]
  },
  {
    id: 4,
    name: "Conjunto Calça Alfaiataria",
    category: "Conjuntos",
    price: 220.00,
    ph: "ph-d",
    img: "img/image4.jpeg",
    featured: false,
    sizes: ["P", "M", "G"],
    sizeInfo: "Disponível na cor Marrom (P, M e G) e também na cor Azul (P)"
  },
  {
    id: 5,
    name: "Vestido Jeans",
    category: "Vestidos",
    price: 210.00,
    ph: "ph-e",
    img: "img/image5.jpeg",
    featured: false,
    sizes: ["G"]
  },
  {
    id: 6,
    name: "Conjunto Short Café",
    category: "Conjuntos",
    price: 250.00,
    ph: "ph-f",
    img: "img/image6.jpeg",
    featured: false,
    sizes: ["P"]
  },
  // {
  //   id: 7,
  //   name: "Conjunto Short Marrant",
  //   category: "Conjuntos",
  //   price: 245.00,
  //   ph: "ph-g",
  //   img: "img/image7.jpeg",
  //   featured: true,
  //   sizes: ["P", "M", "G"]
  // },
  {
    id: 8,
    name: "Conjunto Calça Marrant",
    category: "Conjuntos",
    price: 285.00,
    ph: "ph-h",
    img: "img/image8.jpeg",
    featured: true,
    sizes: [ "G"]
  },
  {
    id: 9,
    name: "Conjunto Short Marrant",
    category: "Conjuntos",
    price: 255.00,
    ph: "ph-a",
    img: "img/image9.jpeg",
    featured: true,
    sizes: ["P"]
  },
  {
    id: 10,
    name: "Calça Jeans Slim",
    category: "Calças",
    price: 185.00,
    ph: "ph-b",
    img: "img/image10.jpeg",
    featured: false,
    sizes: ["36"]
  },
  {
    id: 11,
    name: "Calça Wide Leg",
    category: "Calças",
    price: 206.00,
    ph: "ph-c",
    img: "img/image11.jpeg",
    featured: false,
    sizes: ["36", "38"]
  },
  {
    id: 12,
    name: "Blusa Daniela",
    category: "Blusas",
    price: 110.00,
    ph: "ph-d",
    img: "img/image12.jpeg",
    featured: false,
    sizes: [ "M"],
    sizeInfo: "Marrom esgotada, Preta tamanho M"
  },
  // {
  //   id: 13,
  //   name: "Calça Wide Leg Com Cinto",
  //   category: "Calças",
  //   price: 165.00,
  //   ph: "ph-e",
  //   img: "img/image13.jpeg",
  //   featured: false,
  //   sizes: ["P", "M", "G"]
  // },
  {
    id: 14,
    name: "Vestido Priscila",
    category: "Vestidos",
    price: 200.00,
    ph: "ph-f",
    img: "img/image14.jpeg",
    featured: false,
    sizes: ["M"]
  },
  {
    id: 15,
    name: "Vestido Floral Lisa",
    category: "Vestidos",
    price: 190.00,
    ph: "ph-g",
    img: "img/image15.jpeg",
    featured: false,
    sizes: ["Único"],
    soldOut:true
  },
  {
    id: 16,
    name: "Vestido Margô",
    category: "Vestidos",
    price: 200.00,
    ph: "ph-h",
    img: "img/image16.jpeg",
    featured: false,
    sizes: ["G"]
  },
  {
    id: 17,
    name: "Blusa Helena",
    category: "Blusas",
    price: 110.00,
    ph: "ph-a",
    img: "img/image17.jpeg",
    featured: false,
    sizes: ["P"]
  },
  {
    id: 18,
    name: "Blusa Mia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-b",
    img: "img/image18.jpeg",
    featured: false,
    sizes: ["P"]
  },
  {
    id: 19,
    name: "Blusa Eliana",
    category: "Blusas",
    price: 86.00,
    ph: "ph-c",
    img: "img/image19.jpeg",
    featured: false,
    sizes: ["P", "M", "G"],
    sizeInfo: "Disponível na cor Azul Claro (P, M), Off-white (G), Creme (P), Café(P)"
  },
  {
    id: 20,
    name: "Blusa Julia",
    category: "Blusas",
    price: 65.00,
    ph: "ph-d",
    img: "img/image20.jpeg",
    featured: false,
    sizes: ["M"]
  },
  {
    id: 21,
    name: "Blusa Carolina",
    category: "Blusas",
    price: 120.00,
    ph: "ph-e",
    img: "img/image21.jpeg",
    featured: false,
    sizes: ["GG"]
  },
  {
    id: 22,
    name: "Blusa Cintia",
    category: "Blusas",
    price: 85.00,
    ph: "ph-f",
    img: "img/image22.jpeg",
    featured: false,
    sizes: ["P","M","G"],
    sizeInfo: "Disponivel também na cor Azul claro (P, G), Salmão (M), Creme (M), Off-white (G)"
  },
  {
    id: 23,
    name: "Blusa Carol",
    category: "Blusas",
    price: 65.00,
    ph: "ph-g",
    img: "img/image23.jpeg",
    featured: false,
    sizes: ["M"]
  },
  {
    id: 24,
    name: "Blusa Poliana",
    category: "Blusas",
    price: 110.00,
    ph: "ph-h",
    img: "img/image24.jpeg",
    featured: false,
    sizes: ["M"],
    soldOut:true
  },
  {
    id: 25,
    name: "Blusa Marilene",
    category: "Blusas",
    price: 65.00,
    ph: "ph-a",
    img: "img/image25.jpeg",
    featured: false,
    sizes: ["P"]
  },
  {
    id: 26,
    name: "Blusa Marilene",
    category: "Blusas",
    price: 65.00,
    ph: "ph-b",
    img: "img/image26.jpeg",
    featured: false,
    sizes: ["P"]
  },
  {
    id: 27,
    name: "Blusa Guia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-c",
    img: "img/image27.jpeg",
    featured: false,
    sizes: ["M"],
    sizeInfo: "Disponível também na cor Laranja"
  },
  {
    id: 28,
    name: "Blusa Olivia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-d",
    img: "img/image28.jpeg",
    featured: false,
    sizes: ["M"],
    soldOut: true
  },
  {
    id: 29,
    name: "Blusa katia",
    category: "Blusas",
    price: 65.00,
    ph: "ph-e",
    img: "img/image29.jpeg",
    featured: false,
    sizes: ["G"]
  },
  {
    id: 30,
    name: "Blusa Julia",
    category: "Blusas",
    price: 65.00,
    ph: "ph-f",
    img: "img/image30.jpeg",
    featured: false,
    sizes: ["M"],
    sizeInfo:"Disponivel também na cor Amarelo Floral"
  },
  {
    id: 31,
    name: "Blusa Lucia",
    category: "Blusas",
    price: 110.00,
    ph: "ph-g",
    img: "img/image31.jpeg",
    featured: false,
    sizes: ["G(42)"]
  },
  {
    id: 32,
    name: "Blusa Renata",
    category: "Blusas",
    price: 50.00,
    ph: "ph-h",
    img: "img/image32.jpeg",
    featured: false,
    sizes: ["M", "G", "GG"],
    sizeInfo:"Disponível nas cores Off-White(M, G, GG), Azul(G) e Amarelo Manteiga (GG)"
  },
  {
    id: 33,
    name: "Vestido Floral Laísa",
    category: "Vestidos",
    price: 190.00,
    ph: "ph-a",
    img: "img/image33.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo:"Veste do 38 ao 42",
    soldOut: true
  },
  {
    id: 34,
    name: "Vestido Floral Laísa",
    category: "Vestidos",
    price: 190.00,
    ph: "ph-b",
    img: "img/image34.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo:"Veste do 38 ao 42"
  },
  {
    id: 35,
    name: "Conjunto Short Off-White",
    category: "Conjuntos",
    price: 250.00,
    ph: "ph-c",
    img: "img/image35.jpeg",
    featured: true,
    sizes: ["M"]
  },
  {
    id: 36,
    name: "Blusa Mariana",
    category: "Blusas",
    price: 115.00,
    ph: "ph-d",
    img: "img/image36.jpeg",
    featured: false,
    sizes: ["P", "M", "G"],
    sizeInfo: "Disponível nas cores Off-white (M e G), Azul (M e G) e Creme(P)"
  },
  {
    id: 37,
    name: "Jaqueta Horrana",
    category: "Camisas",
    price: 206.00,
    ph: "ph-e",
    img: "img/image37.jpeg",
    featured: false,
    sizes: ["P", "M"]
  },
  {
    id: 38,
    name: "Conjunto Liara",
    category: "Conjuntos",
    price: 195.00,
    ph: "ph-f",
    img: "img/image38.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 38 ao 42"
  },
  {
    id: 39,
    name: "Conjunto Regina",
    category: "Conjuntos",
    price: 200.00,
    ph: "ph-g",
    img: "img/image39.jpeg",
    featured: true,
    sizes: ["M", "G"]
  },
  {
    id: 40,
    name: "Macacão Roberta",
    category: "Macacão",
    price: 205.00,
    ph: "ph-f",
    img: "img/image40.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 38 ao 42"
  },
  {
    id: 41,
    name: "Macacão Roberta",
    category: "Macacão",
    price: 205.00,
    ph: "ph-g",
    img: "img/image41.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 38 ao 42"
  },
  {
    id: 42,
    name: "Vestido Larissa",
    category: "Vestidos",
    price: 205.00,
    ph: "ph-h",
    img: "img/image42.jpeg",
    featured: false,
    sizes: ["Único"],
    soldOut: true,
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 43,
    name: "Vestido Manuela",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-a",
    img: "img/image43.jpeg",
    featured: true,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 44,
    name: "Vestido Leticia",
    category: "Vestidos",
    price: 205.00,
    ph: "ph-b",
    img: "img/image44.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46",
    soldOut: true
  },
  {
    id: 45,
    name: "Vestido Clarisse",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-c",
    img: "img/image45.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 46,
    name: "Vestido Clarisse",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-d",
    img: "img/image46.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 47,
    name: "Vestido Manuela",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-e",
    img: "img/image47.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 48,
    name: "Vestido Serena",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-f",
    img: "img/image48.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 49,
    name: "Vestido Serena",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-g",
    img: "img/image49.jpeg",
    featured: false,
    sizes: ["Único"],
    soldOut: true,
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 50,
    name: "Chemise listrada",
    category: "Vestidos",
    price: 165.00,
    ph: "ph-f",
    img: "img/image50.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 51,
    name: "Chemise listrada",
    category: "Vestidos",
    price: 165.00,
    ph: "ph-g",
    img: "img/image51.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 52,
    name: "Vestido Rebeca",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-h",
    img: "img/image52.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 53,
    name: "Vestido Rebeca",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-a",
    img: "img/image53.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 54,
    name: "Vestidos Ana",
    category: "Vestidos",
    price: 200.00,
    ph: "ph-g",
    img: "img/image54.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 55,
    name: "Vestido Flora",
    category: "Vestidos",
    price: 180.00,
    ph: "ph-h",
    img: "img/image55.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 56,
    name: "Vestido Flora",
    category: "Vestidos",
    price: 180.00,
    ph: "ph-a",
    img: "img/image56.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 57,
    name: "Macacão Cris",
    category: "Macacão",
    price: 120.00,
    ph: "ph-a",
    img: "img/image57.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 36 ao 46"
  },
  {
    id: 58,
    name: "Calça Jeans Vanessa",
    category: "Calças",
    price: 186.00,
    ph: "ph-f",
    img: "img/image58.jpeg",
    featured: false,
    sizes: ["36"]
  },
  {
    id: 59,
    name: "Calça Jeans Amanda",
    category: "Calças",
    price: 186.00,
    ph: "ph-g",
    img: "img/image59.jpeg",
    featured: false,
    sizes: ["36"]
  },
  {
    id: 60,
    name: "Calça Jeans Ana",
    category: "Calças",
    price: 185.00,
    ph: "ph-f",
    img: "img/image60.jpeg",
    featured: false,
    sizes: ["36"]
  },
  {
    id: 61,
    name: "Calça Jeans Marilia",
    category: "Calças",
    price: 199.99,
    ph: "ph-g",
    img: "img/image61.jpeg",
    featured: true,
    sizes: ["40"]
  },
  {
    id: 62,
    name: "Calça Jeans Hannah",
    category: "Calças",
    price: 185.00,
    ph: "ph-h",
    img: "img/image62.jpeg",
    featured: false,
    sizes: ["40"],
    soldOut: true
  },
  {
    id: 63,
    name: "Calça Bianca",
    category: "Calças",
    price: 206.00,
    ph: "ph-a",
    img: "img/image63.jpeg",
    featured: false,
    sizes: ["36", "40", "42"]
  },
  {
    id: 64,
    name: "Calça Isabela",
    category: "Calças",
    price: 185.00,
    ph: "ph-b",
    img: "img/image64.jpeg",
    featured: false,
    sizes: ["40", "42"]
  },
  {
    id: 65,
    name: "Calça Olivia",
    category: "Calças",
    price: 186.00,
    ph: "ph-c",
    img: "img/image65.jpeg",
    featured: false,
    sizes: ["36"],
    soldOut: true
  },
  {
    id: 66,
    name: "Calça alfaiataria Lilian",
    category: "Calças",
    price: 165.00,
    ph: "ph-d",
    img: "img/image66.jpeg",
    featured: false,
    sizes: ["P", "M"],
    sizeInfo: "Tamanho P Marrom e Tamanho M preta"
  },
  {
    id: 67,
    name: "Calça alfaiataria Daniela",
    category: "Calças",
    price: 165.00,
    ph: "ph-e",
    img: "img/image67.jpeg",
    featured: false,
    sizes: ["P", "M", "G"],
    sizeInfo: "Tamanho P e G  Azul e Tamanho M preta"
  },
  {
    id: 68,
    name: "Calça alfaiataria Melanie",
    category: "Calças",
    price: 165.00,
    ph: "ph-f",
    img: "img/image68.jpeg",
    featured: false,
    sizes: ["G"]
  },
  {
    id: 69,
    name: "Conjunto de Short Aline",
    category: "Conjuntos",
    price: 245.00,
    ph: "ph-g",
    img: "img/image69.jpeg",
    featured: false,
    sizes: ["G"]
  },
  {
    id: 70,
    name: "Conjunto de Short Adriana",
    category: "Conjuntos",
    price: 245.00,
    ph: "ph-f",
    img: "img/image70.jpeg",
    featured: false,
    sizes: ["P"]
  },
  {
    id: 71,
    name: "Conjunto de Short Marrant",
    category: "Conjuntos",
    price: 265.00,
    ph: "ph-f",
    img: "img/image71.jpeg",
    featured: false,
    sizes: ["42"]
  },
  {
    id: 72,
    name: "Conjunto de Short Marrant",
    category: "Conjuntos",
    price: 265.00,
    ph: "ph-g",
    img: "img/image72.jpeg",
    featured: false,
    sizes: ["42"]
  },
  {
    id: 73,
    name: "Conjunto de Short Marrant",
    category: "Conjuntos",
    price: 265.00,
    ph: "ph-f",
    img: "img/image73.jpeg",
    featured: false,
    sizes: ["40"]
  },
  {
    id: 74,
    name: "Calça paloma",
    category: "Calças",
    price: 185.00,
    ph: "ph-g",
    img: "img/image74.png",
    featured: false,
    sizes: ["40"]
  },
  {
    id: 75,
    name: "Calça Pietra",
    category: "Calças",
    price: 185.00,
    ph: "ph-f",
    img: "img/image75.png",
    featured: false,
    sizes: ["40"]
  },
  {
    id: 76,
    name: "Vestido Thalista",
    category: "Vestidos",
    price: 185.00,
    ph: "ph-d",
    img: "img/image76.jpeg",
    featured: false,
    sizes: ["Único"],
    sizeInfo: "Veste do 38 ao 42 - Disponível também na cor verde claro com estampa"
  },
  {
    id: 77,
    name: "Calça Juliana",
    category: "Calças",
    price: 186.00,
    ph: "ph-e",
    img: "img/image77.jpeg",
    featured: false,
    sizes: ["38"]
  },
  {
    id: 78,
    name: "Calça Jeans Wideleg",
    category: "Calças",
    price: 206.00,
    ph: "ph-f",
    img: "img/image78.jpeg",
    featured: false,
    sizes: ["36", "38"]
  },
  {
    id: 79,
    name: "Short Adelânia",
    category: "Shorts",
    price: 165.00,
    ph: "ph-g",
    img: "img/image79.jpeg",
    featured: false,
    sizes: ["44"],
    soldOut: true
  },
  {
    id: 80,
    name: "Short Vasti",
    category: "Shorts",
    price: 165.00,
    ph: "ph-f",
    img: "img/image80.jpeg",
    featured: false,
    sizes: ["44"]
  },
  {
    id: 81,
    name: "Short Mia",
    category: "Shorts",
    price: 145.00,
    ph: "ph-f",
    img: "img/image81.jpeg",
    featured: false,
    sizes: ["42"]
  },
  {
    id: 82,
    name: "Short Jeans Claudia",
    category: "Shorts",
    price: 165.00,
    ph: "ph-g",
    img: "img/image82.jpeg",
    featured: true,
    sizes: ["38","42"],
    sizeInfo: "Disponível na cor azul"
  },
  {
    id: 83,
    name: "Calça jeans wideleg",
    category: "Calças",
    price: 206.00,
    ph: "ph-f",
    img: "img/image83.jpeg",
    featured: false,
    sizes: ["36","38","42"]
  }
];

function formatPrice(v) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}


function productCardHTML(p) {
  const active = isFavorite(p.id);
  return `<article class="product-card ${p.soldOut ? 'out-of-stock' : ''}">
    <div class="product-image">
      <a href="produto.html?id=${p.id}" aria-label="Ver ${escapeHTML(p.name)}"><img src="${p.img}" alt="${escapeHTML(p.name)}" loading="lazy"></a>
      ${p.soldOut ? '<span class="sold-out-badge">Esgotado</span>' : ''}
      ${BLACK_FRIDAY.active && !p.soldOut ? '<span class="super-black-ribbon"><span>SUPER</span> BLACK</span>' : ''}
      <button class="favorite-btn ${active ? 'active' : ''}" aria-label="Favoritar ${escapeHTML(p.name)}" aria-pressed="${active}" onclick="toggleFavoriteClick(event, ${p.id});this.setAttribute('aria-pressed',isFavorite(${p.id}))"><svg width="20" height="20" viewBox="0 0 24 24" fill="${active ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
    </div>
    <div class="product-cat">${p.category}</div>
    <a class="product-name" href="produto.html?id=${p.id}">${escapeHTML(p.name)}</a>
    <div class="product-price">${priceHTML(p)}</div>
    <p class="card-sizes">${(p.sizes || []).join(' · ')}</p>
    ${BLACK_FRIDAY.active && !p.soldOut ? '<p class="card-offer">Comprando 2, você pode economizar mais: 40% OFF na de menor valor.</p>' : ''}
  </article>`;
}

// Cores/tamanhos transcritos das observações existentes do catálogo.
const PRODUCT_VARIANTS = {
  4: {'Marrom':['P','M','G'],'Azul':['P']},
  12: {'Preta':['M']},
  19: {'Azul Claro':['P','M'],'Off-white':['G'],'Creme':['P'],'Café':['P']},
  22: {'Azul claro':['P','G'],'Salmão':['M'],'Creme':['M'],'Off-white':['G']},
  32: {'Off-white':['M','G','GG'],'Azul':['G'],'Amarelo Manteiga':['GG']},
  36: {'Off-white':['M','G'],'Azul':['M','G'],'Creme':['P']},
  66: {'Marrom':['P'],'Preta':['M']},
  67: {'Azul':['P','G'],'Preta':['M']},
  82: {'Azul':['38','42']}
};
function validVariant(id,size,color) { return !PRODUCT_VARIANTS[id] || (PRODUCT_VARIANTS[id][color] || []).includes(size); }
