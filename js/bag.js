const BAG_KEY = 'belavie_bag_v1';
function getBag() {
  try { const data=JSON.parse(localStorage.getItem(BAG_KEY)||'[]'); return Array.isArray(data)?data.filter(x=>x && Number.isInteger(x.id) && typeof x.size==='string' && typeof x.color==='string').map(x=>({...x,quantity:Math.min(20,Math.max(1,Math.floor(Number(x.quantity)||1)))})):[]; } catch { return []; }
}
function saveBag(items) {
  try { localStorage.setItem(BAG_KEY,JSON.stringify(items)); } catch { throw new Error('Não foi possível salvar a sacola. Habilite o armazenamento do navegador ou fale com nossa equipe.'); }
  updateBagCount();
}
function addToBag(id,size,color) {
  const p=PRODUCTS.find(p=>p.id===id);
  if(!p || p.soldOut || !(p.sizes||[]).map(String).includes(String(size)) || (p.soldOutSizes||[]).map(String).includes(String(size)))throw new Error('Esta opção está indisponível. Escolha outra peça ou tamanho.');
  if(!validVariant(id,String(size),color))throw new Error('Escolha uma combinação de cor e tamanho disponível.');
  const items=getBag(), existing=items.find(x=>x.id===id && x.size===size && x.color===color);
  if(existing){if(existing.quantity>=20)throw new Error('Para mais de 20 unidades, consulte nossa equipe.');existing.quantity++;}
  else items.push({id,size:String(size),color:color.slice(0,60),quantity:1});
  saveBag(items);
}
function updateBagCount(){document.querySelectorAll('[data-bag-count]').forEach(el=>el.textContent=getBag().reduce((sum,x)=>sum+x.quantity,0));}
// Compara duas ofertas independentes, em centavos; nunca soma os descontos.
function calculateBag(items) {
  const lines=items.map((item,index)=>{
    const product=PRODUCTS.find(p=>p.id===item.id);
    const valid=!!product && validVariant(item.id,item.size,item.color) && !product.soldOut && (product.sizes||[]).map(String).includes(item.size) && !(product.soldOutSizes||[]).map(String).includes(item.size);
    return {...item,index,product,valid,unit:product?Math.round(product.price*100):0,discount:0,singleDiscount:0,pairDiscount:0};
  });
  const units=lines.filter(x=>x.valid).flatMap(line=>Array.from({length:line.quantity},()=>({line,price:line.unit})));
  units.sort((a,b)=>a.price-b.price || a.line.index-b.line.index);
  if(BLACK_FRIDAY.active) {
    units.forEach(x=>x.line.singleDiscount+=x.price-Math.round(getFinalPrice(x.line.product)*100));
    units.slice(0,Math.floor(units.length/2)).forEach(x=>x.line.pairDiscount+=Math.round(x.price*BLACK_FRIDAY.discount/100));
  }
  const singleDiscount=lines.reduce((sum,x)=>sum+x.singleDiscount,0);
  const pairDiscount=lines.reduce((sum,x)=>sum+x.pairDiscount,0);
  const offer=!BLACK_FRIDAY.active || !units.length?'none':pairDiscount>singleDiscount?'pair':'single';
  lines.forEach(x=>x.discount=offer==='pair'?x.pairDiscount:offer==='single'?x.singleDiscount:0);
  const offerLabel=offer==='pair'?'40% OFF nas peças de menor valor, a cada 2 unidades':offer==='single'?'10% OFF em todas as peças':'Sem promoção';
  const subtotal=lines.filter(x=>x.valid).reduce((n,x)=>n+x.unit*x.quantity,0);
  const discount=lines.reduce((n,x)=>n+x.discount,0);
  return {lines,subtotal,discount,total:subtotal-discount,count:units.length,invalid:lines.some(x=>!x.valid),offer,offerLabel,singleDiscount,pairDiscount,singleTotal:subtotal-singleDiscount,pairTotal:subtotal-pairDiscount};
}
function buildBagMessage(result) {
  return ['Olá! Gostaria de confirmar este pedido da Belavie:',...result.lines.filter(x=>x.valid).map(x=>`${x.quantity}x ${x.product.name} | Código ${x.id} | Tamanho ${x.size} | Cor: ${x.color}\n${formatPrice((x.unit*x.quantity-x.discount)/100)}${x.discount?' (economia de '+formatPrice(x.discount/100)+')':''}\nhttps://belavie-bay.vercel.app/produto.html?id=${x.id}`),`Subtotal a preços regulares: ${formatPrice(result.subtotal/100)}`,`Oferta aplicada: ${result.offerLabel}`,`Desconto${BLACK_FRIDAY.active?' Super Black Friday':''}: ${formatPrice(result.discount/100)}`,`Total das peças: ${formatPrice(result.total/100)}`,'Frete de entrega não incluído. Por favor, confirme disponibilidade, cores, medidas, prazo e forma de pagamento.'].join('\n\n');
}
function renderBag() {
  const target=document.getElementById('bag-content');if(!target)return;
  const items=getBag(), result=calculateBag(items);
  if(!items.length){target.innerHTML='<div class="empty-state"><h2>Seu próximo look começa aqui.</h2><p>Escolha suas peças e confira o desconto na sacola.</p><a class="btn btn-primary" href="catalogo.html">Explorar coleção</a></div>';return;}
  target.innerHTML=`<div class="bag-layout"><div>${result.lines.map(x=>`<article class="bag-item">${x.product?`<a href="produto.html?id=${x.id}"><img src="${x.product.img}" alt="${escapeHTML(x.product.name)}"></a>`:''}<div><h2>${escapeHTML(x.product?.name||'Produto removido')}</h2><p>Tamanho ${escapeHTML(x.size)} · ${escapeHTML(x.color)}</p><p>${x.valid?formatPrice(x.unit/100)+' cada · preço regular':'Indisponível — remova para continuar'}</p><label>Quantidade <input type="number" min="1" max="20" value="${x.quantity}" data-quantity="${x.index}" aria-label="Quantidade de ${escapeHTML(x.product?.name||'produto')}"></label><button class="remove-item" data-remove="${x.index}" aria-label="Remover ${escapeHTML(x.product?.name||'produto')}">Remover</button>${x.discount?`<p class="saving">Você economiza ${formatPrice(x.discount/100)}</p>`:''}</div><strong>${x.valid?formatPrice((x.unit*x.quantity-x.discount)/100):'—'}</strong></article>`).join('')}</div><aside class="bag-summary"><h2>Resumo do pedido</h2><p>Subtotal regular <strong>${formatPrice(result.subtotal/100)}</strong></p><p>Desconto <strong>− ${formatPrice(result.discount/100)}</strong></p><p class="bag-total">Total das peças <strong>${formatPrice(result.total/100)}</strong></p><p>Frete de entrega a consultar.</p>${BLACK_FRIDAY.active && result.count?`<div class="bag-progress"><strong>Melhor oferta aplicada</strong><p>${result.offerLabel}</p><p>Ofertas não cumulativas. Você já está pagando o menor total.</p></div><details class="offer-comparison"><summary>Comparar as ofertas</summary><p>10% OFF em todas: <strong>${formatPrice(result.singleTotal/100)}</strong></p>${result.count>=2?`<p>40% OFF a cada 2 peças: <strong>${formatPrice(result.pairTotal/100)}</strong></p>`:"<p>Adicione outra peça para comparar com a oferta de 40% na de menor valor.</p>"}<p>Comparação sobre os preços regulares, sem somar descontos.</p></details>`:""}<p>Crédito em até 3x sem juros. Confirme estoque, cores e entrega com a equipe antes de pagar.</p><button class="btn btn-primary" id="send-bag" ${result.invalid || !result.count?'disabled':''}>Enviar pedido pelo WhatsApp</button>${result.invalid?'<p role="alert">Remova os itens indisponíveis para enviar o pedido.</p>':''}<a class="bag-next" href="catalogo.html">Continuar escolhendo</a><a href="trocas.html">Trocas e devoluções</a></aside></div>`;
  target.querySelectorAll('[data-remove]').forEach(btn=>btn.onclick=()=>changeBag(()=>items.splice(Number(btn.dataset.remove),1)));
  target.querySelectorAll('[data-quantity]').forEach(input=>input.onchange=()=>changeBag(()=>{items[Number(input.dataset.quantity)].quantity=Math.min(20,Math.max(1,Math.floor(Number(input.value)||1)));}));
  function changeBag(change){try{change();saveBag(items);renderBag();}catch(err){alert(err.message);}}
  document.getElementById('send-bag').onclick=()=>{const current=calculateBag(getBag());if(current.invalid||!current.count){renderBag();return;}openWhatsApp(buildBagMessage(current));};
}
document.addEventListener('DOMContentLoaded',()=>{
  updateBagCount();renderBag();
  document.querySelectorAll('[data-campaign-rules]').forEach(el=>el.textContent=BLACK_FRIDAY.active?CAMPAIGN_RULES:'A campanha foi encerrada. Confira os preços atuais.');
  document.querySelectorAll('[data-campaign-offer]').forEach(el=>el.textContent=BLACK_FRIDAY.active?CAMPAIGN_OFFER:'Confira suas peças.');
  if(!BLACK_FRIDAY.active){document.querySelectorAll('.bf-hero,.campaign-head').forEach(el=>{el.innerHTML='<h1>Nossa coleção</h1><p>Escolha suas peças favoritas.</p><a class="btn btn-primary" href="catalogo.html">Ver coleção</a>';});}
});
window.addEventListener('storage',event=>{if(event.key===BAG_KEY){updateBagCount();renderBag();}});
