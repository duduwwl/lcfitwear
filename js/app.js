/* ============ LC FITWEAR v2 — Catálogo, Sacola, Quick View, Checkout ============ */
"use strict";

/* ---------- Catálogo (fotos do Instagram @_.lcfitwear) ---------- */
const PRODUCTS = [
  {id:"vortex", name:"Conjunto Vortex", cat:"Conjuntos", price:159.90, old:189.90, sizes:["P","M","G","GG"], tag:"Pronta entrega",
   desc:"Top e legging em tecido de alta compressão, modelador e com zero transparência. O queridinho das clientes — pronta entrega M e G.",
   imgs:["img/ig_1.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DcJ_jRhFWkK/"},
  {id:"macacao-morango", name:"Macacão Fio 90", cat:"Macacões", price:189.90, old:null, sizes:["P","M","G"], tag:"Best-seller",
   desc:"O macacão mais queridinho da LC. Modelagem que valoriza o corpo, tecido macio e caimento perfeito.",
   imgs:["img/macacao-real.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DNx3FCa3LQ3/"},
  {id:"legging-fio90", name:"Legging Fio 90 com Bolso", cat:"Leggings", price:180.00, old:null, sizes:["P","M","G","GG"], tag:null,
   desc:"Tecido canelado de alta compressão que modela e valoriza. Bolso lateral funcional para celular, chave e cartão.",
   imgs:["img/ig_6.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DMAvPfouYZl/"},
  {id:"cropped-fio90", name:"Cropped Fio 90", cat:"Cropped", price:90.00, old:null, sizes:["P","M","G","GG"], tag:null,
   desc:"Cropped canelado de alta compressão com ótima sustentação. Combina com a legging Fio 90 para um look completo.",
   imgs:["img/ig_13.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DMAvPfouYZl/"},
  {id:"montana", name:"Macaquinho Montana", cat:"Macaquinhos", price:149.90, old:169.90, sizes:["P","M","G"], tag:"-12%",
   desc:"Modelagem perfeita para corrida, caminhada ou treino. Para quem quer exercitar bonita e confortável.",
   imgs:["img/ig_7.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DMILViYu8Vl/"},
  {id:"blusa-promo", name:"Blusa Manga Curta", cat:"Blusas", price:40.00, old:null, sizes:["P","M","G","GG"], tag:"Promo",
   desc:"Na compra de conjunto, macacão ou macaquinho, a blusa (manga curta ou regata) sai por R$40. Manga longa por R$50.",
   imgs:["img/ig_4.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DXpBgnqjrqV/"},
  {id:"regata-tela", name:"Regata Tela", cat:"Regatas", price:69.90, old:null, sizes:["P","M","G","GG"], tag:null,
   desc:"Regata em tecido tela, leve e respirável. Ideal para treinos intensos e dias quentes.",
   imgs:["img/ig_2.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DW1Lt7nDpew/"},
  {id:"corta-vento", name:"Corta-Vento Cropped", cat:"Corta-vento", price:129.90, old:null, sizes:["P","M","G"], tag:"Novo",
   desc:"Poliéster com resistência à água, modelagem cropped e ultraleve. Ideal para corrida e caminhada.",
   imgs:["img/ig_3.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DMAvt0hOJXi/"},
  {id:"conjunto-flare", name:"Conjunto Flare", cat:"Conjuntos", price:179.90, old:null, sizes:["P","M","G","GG"], tag:null,
   desc:"O básico que nunca passa despercebido. Cropped de manga longa + calça flare: elegância que alonga e valoriza.",
   imgs:["img/ig_12.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DWy0c5rjoRT/"},
  {id:"conjunto-cold", name:"Conjunto Cold", cat:"Conjuntos", price:189.90, old:null, sizes:["M","G"], tag:"Premium",
   desc:"Poliamida de alta qualidade com toque gelado, respirabilidade e bolso funcional. 4 cores disponíveis.",
   imgs:["img/ig_11.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DMILLokuRlm/"},
  {id:"macaquinho-ac", name:"Macaquinho AC Fio 90", cat:"Macaquinhos", price:159.90, old:null, sizes:["P","M","G"], tag:null,
   desc:"Tecido canelado de alta compressão, super modelador, com resistência e toque macio para qualquer treino.",
   imgs:["img/ig_8.jpg"], ig:"https://www.instagram.com/_.lcfitwear/p/DMIL5mPu4Yx/"},
];
const CATS = ["Todos","Conjuntos","Macacões","Macaquinhos","Leggings","Cropped","Blusas","Regatas","Corta-vento"];
const FRETE = {retirada:0, sudeste:29.9, sul:24.9, centro:34.9, norte:44.9};
const PIX_DESC = 0.10;

/* ---------- Utils ---------- */
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const brl = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const store = {
  get cart(){ try{return JSON.parse(localStorage.getItem("lc_cart")||"[]")}catch{return[]} },
  set cart(v){ localStorage.setItem("lc_cart",JSON.stringify(v)); renderCartBadge(); },
};

/* ---------- Toast ---------- */
let toastT;
function toast(msg){
  const t = $("#toast"); if(!t) return;
  $("#toast-msg").textContent = msg;
  t.classList.add("on"); clearTimeout(toastT);
  toastT = setTimeout(()=>t.classList.remove("on"), 2600);
}

/* ---------- Header / nav mobile ---------- */
function initHeader(){
  const burger = $("#burger"), mnav = $("#mnav");
  burger?.addEventListener("click",()=>{
    const on = mnav.classList.toggle("on");
    burger.setAttribute("aria-expanded",on);
  });
  $$("#mnav a").forEach(a=>a.addEventListener("click",()=>mnav.classList.remove("on")));
}

/* ---------- Preloader + intro ---------- */
function initLoader(){
  const l = $("#loader"); if(!l) return;
  const chars = $$("#loader .l-word span");
  const tl = gsap.timeline();
  tl.to(chars,{y:0,duration:.9,stagger:.045,ease:"power4.out"},.15)
    .to("#loader .l-bar i",{width:"100%",duration:1.1,ease:"power2.inOut"},.2)
    .to(chars,{y:"-110%",duration:.6,stagger:.03,ease:"power3.in"},"+=.1")
    .add(()=>{ l.classList.add("done"); document.body.dataset.loaded="1"; ScrollTrigger.refresh(); },"-=.2")
    .add(()=>l.remove(),"+=1");
  // hero intro
  const intro = gsap.timeline({delay:1.15});
  $$(".h-title .ln > span").forEach((s,i)=>intro.to(s,{y:0,duration:1,ease:"power4.out"},i*.09));
  intro.from(".hero .kicker",{opacity:0,y:-14,duration:.7,ease:"power3.out"},.2)
       .from(".h-sub, .h-cta",{opacity:0,y:22,duration:.8,stagger:.1,ease:"power3.out"},.4)
       .from(".h-media img",{opacity:0,scale:.94,y:24,duration:1,stagger:.12,ease:"power3.out"},.3)
       .from(".h-media .tag",{opacity:0,scale:.6,duration:.5,ease:"back.out(2)"},.9);
}

/* ---------- Reveals + parallax ---------- */
function initReveals(){
  if(window.gsap && window.ScrollTrigger){
    ScrollTrigger.batch(".rv",{start:"top 88%",onEnter:b=>b.forEach(el=>el.classList.add("in"))});
    // parallax hero media
    gsap.to(".h-media .m1",{yPercent:-8,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    gsap.to(".h-media .m2",{yPercent:14,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    // story float
    gsap.to(".story .media .float",{yPercent:-12,ease:"none",scrollTrigger:{trigger:".story",start:"top bottom",end:"bottom top",scrub:true}});
    // lookbook horizontal (desktop)
    const track = $(".lb-track");
    if(track && matchMedia("(min-width:769px)").matches){
      const dist = ()=> track.scrollWidth - innerWidth;
      gsap.to(track,{x:()=>-dist(),ease:"none",scrollTrigger:{trigger:".lb-wrap",start:"top top",end:()=>"+="+dist(),scrub:1,pin:true,invalidateOnRefresh:true,anticipatePin:1}});
    }
  } else {
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("in"); io.unobserve(e.target);} }),{threshold:.12});
    $$(".rv").forEach(el=>io.observe(el));
  }
}

/* ---------- Catálogo ---------- */
let filt = {cat:"Todos", sort:"relevancia", q:""};
function filtered(){
  let list = PRODUCTS.filter(p=>(filt.cat==="Todos"||p.cat===filt.cat) && (!filt.q || (p.name+" "+p.desc).toLowerCase().includes(filt.q)));
  if(filt.sort==="menor") list.sort((a,b)=>a.price-b.price);
  if(filt.sort==="maior") list.sort((a,b)=>b.price-a.price);
  return list;
}
function cardHTML(p){
  const off = p.old ? Math.round((1-p.price/p.old)*100) : null;
  return `<article class="p-card">
    <div class="p-media" data-qv="${p.id}">
      <div class="badges">${off?`<span class="badge rose">${off}% off</span>`:p.tag?`<span class="badge">${p.tag}</span>`:""}</div>
      <img src="${p.imgs[0]}" alt="${p.name}" loading="lazy">
      <div class="p-quick">
        <button class="qv-btn" data-qv="${p.id}">Ver rápido</button>
        <button class="qv-btn add" data-add="${p.id}" aria-label="Adicionar à sacola"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg></button>
      </div>
    </div>
    <div class="p-info">
      <div><span class="cat">${p.cat}</span><h3>${p.name}</h3></div>
      <div class="p-price">${brl(p.price)}${p.old?`<s>${brl(p.old)}</s>`:""}</div>
    </div>
  </article>`;
}
function renderGrid(animate=true){
  const grid = $("#grid"); if(!grid) return;
  const list = filtered();
  const c = $("#count"); if(c) c.textContent = list.length ? `${list.length} ${list.length===1?"peça":"peças"}` : "";
  if(animate) grid.classList.add("anim");
  grid.innerHTML = list.length ? list.map(cardHTML).join("") : `<p class="empty" style="grid-column:1/-1">Nenhuma peça encontrada.</p>`;
  if(animate && window.gsap){
    gsap.to("#grid .p-card",{opacity:1,y:0,duration:.7,stagger:.06,ease:"power3.out",clearProps:"all"});
  } else { $$("#grid .p-card").forEach(el=>{el.style.opacity=1;el.style.transform="none";}); }
}
function initCatalog(){
  const chips = $("#chips"); if(!chips) return;
  const preCat = new URLSearchParams(location.search).get("cat");
  if(preCat && CATS.includes(preCat)) filt.cat = preCat;
  chips.innerHTML = CATS.map(c=>`<button class="f-chip${c===filt.cat?" on":""}" data-cat="${c}">${c}</button>`).join("");
  chips.addEventListener("click",e=>{
    const b = e.target.closest("[data-cat]"); if(!b) return;
    filt.cat = b.dataset.cat; $$(".f-chip").forEach(c=>c.classList.toggle("on",c===b)); renderGrid();
  });
  $("#sort")?.addEventListener("change",e=>{filt.sort=e.target.value; renderGrid();});
  $("#search")?.addEventListener("input",e=>{filt.q=e.target.value.toLowerCase().trim(); renderGrid();});
  renderGrid(false);
}

/* ---------- Quick view ---------- */
function openQV(id){
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  const off = p.old ? Math.round((1-p.price/p.old)*100) : null;
  $("#mv-body").innerHTML = `
    <span class="cat">${p.cat}</span>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="mv-price">${brl(p.price)}${p.old?`<s>${brl(p.old)}</s>`:""}</div>
    <div><span class="up" style="color:var(--ink-2)">Tamanho</span>
      <div class="sizes" style="margin-top:.5rem">${p.sizes.map((s,i)=>`<button class="sz${i===0?" on":""}" data-sz="${s}">${s}</button>`).join("")}</div>
    </div>
    <button class="btn btn-dark btn-block" id="mv-add">Adicionar à sacola <span class="ar">→</span></button>
    <a class="up" style="color:var(--ink-2);text-decoration:underline" href="${p.ig}" target="_blank" rel="noopener">Ver no Instagram ↗</a>`;
  $("#mv-img").src = p.imgs[0];
  $("#mv-img").alt = p.name;
  $("#mv-modal").classList.add("open");
  document.body.style.overflow="hidden";
  $("#mv-add").addEventListener("click",()=>{ addToCart(p.id, $(".sz.on")?.dataset.sz); closeQV(); });
  $$("#mv-body .sz").forEach(b=>b.addEventListener("click",()=>{ $$("#mv-body .sz").forEach(x=>x.classList.remove("on")); b.classList.add("on"); }));
}
function closeQV(){ $("#mv-modal")?.classList.remove("open"); document.body.style.overflow=""; }
function initQV(){
  document.addEventListener("click",e=>{
    if(e.target.closest("[data-add]")) return;
    const q = e.target.closest("[data-qv]");
    if(q){ openQV(q.dataset.qv); return; }
    if(e.target.closest("#mv-x") || e.target.closest("#mv-modal .bg")) closeQV();
  });
  addEventListener("keydown",e=>{ if(e.key==="Escape"){ closeQV(); closeDrawer(); } });
}

/* ---------- Sacola ---------- */
function cartCount(){ return store.cart.reduce((s,i)=>s+i.qty,0); }
function cartTotal(){ return store.cart.reduce((s,i)=>s+i.price*i.qty,0); }
function renderCartBadge(){
  const n = cartCount(), el = $("#cart-n");
  if(!el) return; el.textContent = n; el.classList.toggle("on", n>0);
}
function openDrawer(){ $("#drawer").classList.add("on"); $("#ov").classList.add("on"); document.body.style.overflow="hidden"; renderDrawer(); }
function closeDrawer(){ $("#drawer")?.classList.remove("on"); $("#ov")?.classList.remove("on"); document.body.style.overflow=""; }
function addToCart(id, size){
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  size = size || p.sizes[0];
  const cart = store.cart;
  const k = cart.find(i=>i.id===id && i.size===size);
  k ? k.qty++ : cart.push({id,size,qty:1,price:p.price,name:p.name,img:p.imgs[0]});
  store.cart = cart;
  toast(`${p.name} (${size}) adicionada à sacola`);
  openDrawer();
}
function renderDrawer(){
  const box = $("#dw-items"); if(!box) return;
  const cart = store.cart;
  if(!cart.length){
    box.innerHTML = `<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Sua sacola está vazia.<br>Que tal um look novo? ✨</p></div>`;
  } else {
    box.innerHTML = cart.map((i,ix)=>`
      <div class="di">
        <img src="${i.img}" alt="${i.name}">
        <div><b>${i.name}</b><span class="sz">Tam: ${i.size}</span>
          <div class="qty"><button data-q="-1" data-ix="${ix}" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-q="1" data-ix="${ix}" aria-label="Aumentar">+</button></div>
        </div>
        <div style="text-align:right"><b style="font-family:var(--f-d)">${brl(i.price*i.qty)}</b><br><a class="rm" href="#" data-rm="${ix}">remover</a></div>
      </div>`).join("");
  }
  $("#dw-total").textContent = brl(cartTotal());
  $("#dw-go").disabled = !cart.length;
}
function initDrawer(){
  $("#cart-btn")?.addEventListener("click",openDrawer);
  $("#ov")?.addEventListener("click",closeDrawer);
  $("#dw-x")?.addEventListener("click",closeDrawer);
  $("#dw-items")?.addEventListener("click",e=>{
    const q = e.target.closest("[data-q]"), rm = e.target.closest("[data-rm]");
    if(q){ const c = store.cart; c[+q.dataset.ix].qty = Math.max(1, c[+q.dataset.ix].qty + +q.dataset.q); store.cart = c; renderDrawer(); }
    if(rm){ e.preventDefault(); const c = store.cart; c.splice(+rm.dataset.rm,1); store.cart = c; renderDrawer(); }
  });
  $("#dw-go")?.addEventListener("click",()=>location.href="checkout.html");
  document.addEventListener("click",e=>{ const b = e.target.closest("[data-add]"); if(b){ e.stopPropagation(); addToCart(b.dataset.add); } });
  renderCartBadge();
}

/* ---------- Checkout ---------- */
function initCheckout(){
  const form = $("#ck-form"); if(!form) return;
  if(!store.cart.length){ location.href = "produtos.html"; return; }
  const sub = cartTotal(), shipSel = $("#ship");
  const payTabs = $$(".pay-tab"), panes = $$(".pay-pane");
  let pay = "pix";
  function updateSummary(){
    const ship = FRETE[shipSel.value];
    const disc = pay==="pix" ? sub*PIX_DESC : 0;
    $("#s-sub").textContent = brl(sub);
    $("#s-ship").textContent = ship===0 ? "Grátis" : brl(ship);
    $("#s-disc-row").style.display = disc ? "flex" : "none";
    $("#s-disc").textContent = "− "+brl(disc);
    $("#s-total").textContent = brl(sub+ship-disc);
    $("#pay-cta").textContent = pay==="pix" ? `Finalizar com ${brl(sub+ship-disc)} no Pix` : "Confirmar pedido";
  }
  shipSel.addEventListener("change",updateSummary);
  payTabs.forEach(t=>t.addEventListener("click",()=>{
    payTabs.forEach(x=>x.classList.toggle("on",x===t));
    pay = t.dataset.pay;
    panes.forEach(p=>p.classList.toggle("on",p.dataset.pane===pay));
    $("#card-fields").style.display = pay==="credito" ? "grid" : "none";
    updateSummary();
  }));
  $("#cc-num").addEventListener("input",e=>{ e.target.value = e.target.value.replace(/\D/g,"").slice(0,16).replace(/(\d{4})(?=\d)/g,"$1 "); });
  $("#cc-valid").addEventListener("input",e=>{ let v=e.target.value.replace(/\D/g,"").slice(0,4); if(v.length>2) v=v.slice(0,2)+"/"+v.slice(2); e.target.value=v; });
  $("#cc-cvv").addEventListener("input",e=>{ e.target.value = e.target.value.replace(/\D/g,"").slice(0,4); });
  $("#cep").addEventListener("input",e=>{ e.target.value = e.target.value.replace(/\D/g,"").slice(0,8).replace(/(\d{5})(?=\d)/,"$1-"); });
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136"+crypto.randomUUID().replace(/-/g,"")+"5204000053039865802BR5919LC FITWEAR6009SAO PAULO62070503***6304"+Math.random().toString(16).slice(2,6).toUpperCase();
  $("#pix-code").value = pixCode;
  $("#qr").innerHTML = qrSVG(pixCode);
  $("#copy-pix").addEventListener("click",async()=>{
    try{ await navigator.clipboard.writeText(pixCode); }catch{ $("#pix-code").select(); document.execCommand("copy"); }
    toast("Código Pix copiado!");
  });
  function validate(){
    let ok = true;
    $$(".fld[req] input, .fld[req] select", form).forEach(i=>{
      const bad = !i.value.trim() || (i.id==="cep" && i.value.length<9);
      i.closest(".fld").classList.toggle("bad",bad);
      if(bad) ok = false;
    });
    if(pay==="credito"){
      ["cc-num","cc-valid","cc-cvv","cc-name"].forEach(id=>{
        const i = $("#"+id), bad = !i.value.trim() || (id==="cc-num"&&i.value.replace(/\D/g,"").length<16);
        i.closest(".fld").classList.toggle("bad",bad);
        if(bad) ok = false;
      });
    }
    return ok;
  }
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(!validate()){ toast("Confira os campos destacados"); return; }
    const order = "LC"+Date.now().toString(36).toUpperCase().slice(-6);
    localStorage.setItem("lc_last_order", JSON.stringify({code:order,total:$("#s-total").textContent,pay,name:$("#nome").value,items:store.cart.length,when:new Date().toLocaleString("pt-BR")}));
    store.cart = [];
    location.href = "obrigado.html";
  });
  updateSummary();
}
function qrSVG(seed){
  let h = 0; for(const c of seed) h = (h*31 + c.charCodeAt(0))>>>0;
  const rnd = ()=>{ h = (h*1664525+1013904223)>>>0; return h/2**32; };
  let cells = "";
  const fin = (x,y)=>`<rect x="${x}" y="${y}" width="7" height="7"/>`;
  for(let y=0;y<21;y++) for(let x=0;x<21;x++){
    const inFin = (x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12);
    if(!inFin && rnd()>.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg viewBox="0 0 25 25" fill="#121014" xmlns="http://www.w3.org/2000/svg">${fin(0,0)}${fin(18,0)}${fin(0,18)}<rect x="1" y="1" width="5" height="5" fill="#fff"/><rect x="19" y="1" width="5" height="5" fill="#fff"/><rect x="1" y="19" width="5" height="5" fill="#fff"/>${fin(1,1)}${fin(19,1)}${fin(1,19)}${cells}</svg>`;
}

/* ---------- Obrigado ---------- */
function initThanks(){
  const box = $("#thanks"); if(!box) return;
  const o = JSON.parse(localStorage.getItem("lc_last_order")||"null");
  if(!o){ location.href="index.html"; return; }
  $("#o-code").textContent = o.code;
  $("#o-total").textContent = o.total;
  $("#o-pay").textContent = {pix:"Pix",debito:"Cartão de débito",credito:"Cartão de crédito"}[o.pay];
  $("#o-when").textContent = o.when;
}

/* ---------- Swiper (destaques home) ---------- */
function initSwiper(){
  if(!window.Swiper || !$("#destaques-swiper")) return;
  new Swiper("#destaques-swiper",{
    observer:true, observeParents:true, observeSlideChildren:true,
    slidesPerView:1.15, spaceBetween:16, loop:true, speed:700,
    pagination:{el:"#destaques-swiper .swiper-pagination",clickable:true},
    navigation:{nextEl:"#sw-next",prevEl:"#sw-prev"},
    breakpoints:{640:{slidesPerView:2.15},1024:{slidesPerView:3.4}}
  });
}

/* ---------- Boot ---------- */
addEventListener("DOMContentLoaded",()=>{
  initHeader(); initDrawer(); initCatalog(); initQV(); initCheckout(); initThanks();
  if(window.gsap){ initLoader(); initReveals(); }
  else { $$(".rv").forEach(el=>el.classList.add("in")); }
  // preencher slides dos destaques ANTES de iniciar o Swiper
  const swEl = $("#sw-slides");
  if(swEl && !swEl.children.length){
    const picks = ["vortex","macacao-morango","legging-fio90","montana","conjunto-cold","cropped-fio90"];
    swEl.innerHTML = picks.map(id=>{ const p = PRODUCTS.find(x=>x.id===id); return `<div class="swiper-slide">${cardHTML(p)}</div>`; }).join("");
  }
  initSwiper();
});
