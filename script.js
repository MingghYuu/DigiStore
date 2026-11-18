const I={
laptop:'<rect x="10" y="12" width="44" height="30" rx="3"/><path d="M4 50h56l-4-8H8z"/>',
phone:'<rect x="19" y="5" width="26" height="54" rx="5"/><path d="M29 52h6"/>',
head:'<path d="M12 40V32a20 20 0 0 1 40 0v8"/><rect x="8" y="38" width="10" height="16" rx="4"/><rect x="46" y="38" width="10" height="16" rx="4"/>',
watch:'<rect x="18" y="16" width="28" height="32" rx="8"/><path d="M24 16l2-10h12l2 10M24 48l2 10h12l2-10M32 26v7l5 3"/>',
mouse:'<rect x="19" y="6" width="26" height="52" rx="13"/><path d="M32 6v18M19 24h26"/>',
power:'<rect x="14" y="10" width="36" height="44" rx="6"/><path d="M34 20l-8 14h10l-6 12"/>'};
const P=[
{id:1,n:"Laptop Nova 14",c:"Laptop",p:8999000,i:"laptop",g:["#2563eb","#7c3aed"],d:"Layar 14 inci, RAM 16GB, SSD 512GB. Ringan untuk kuliah dan kerja.",f:1},
{id:2,n:"Laptop ProBook Air",c:"Laptop",p:12499000,i:"laptop",g:["#0ea5e9","#2563eb"],d:"Prosesor generasi terbaru, baterai tahan 14 jam, bodi aluminium tipis."},
{id:3,n:"Smartphone Zenith X",c:"Handphone",p:4299000,i:"phone",g:["#f97316","#ef4444"],d:"Layar AMOLED 6,6 inci, kamera 64MP, baterai 5000 mAh.",f:1},
{id:4,n:"Smartphone Lumi 5G",c:"Handphone",p:6799000,i:"phone",g:["#10b981","#0d9488"],d:"Dukungan 5G, pengisian cepat 67W, performa ngebut untuk gaming."},
{id:5,n:"Headphone Pulse",c:"Aksesoris",p:549000,i:"head",g:["#8b5cf6","#ec4899"],d:"Bluetooth 5.3 dengan noise reduction dan bass mendalam.",f:1},
{id:6,n:"Smartwatch Fit Pro",c:"Aksesoris",p:1299000,i:"watch",g:["#14b8a6","#2563eb"],d:"Pantau detak jantung, tidur, dan olahraga. Tahan air 5ATM.",f:1},
{id:7,n:"Mouse Gaming Swift",c:"Aksesoris",p:249000,i:"mouse",g:["#ef4444","#7c3aed"],d:"Sensor 12.000 DPI, 6 tombol programable, lampu RGB."},
{id:8,n:"Powerbank 20.000 mAh",c:"Aksesoris",p:329000,i:"power",g:["#f59e0b","#ea580c"],d:"Kapasitas besar dengan fast charging dan dua port USB."}];
const $=s=>document.querySelector(s),rp=n=>"Rp"+n.toLocaleString("id-ID");
let cat="Semua",cart=[];
try{cart=JSON.parse(localStorage.getItem("ds-cart")||"[]")}catch(e){cart=[]}
const ic=p=>`<div class="img" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${I[p.i]}</svg></div>`;
const card=p=>`<article class="card">${ic(p)}<div class="cb"><span class="cat">${p.c}</span><h3>${p.n}</h3><p>${p.d.split(".")[0]}.</p><div class="price">${rp(p.p)}</div><div class="acts"><button class="btn out" data-d="${p.id}">Lihat Detail</button><button class="btn pri" data-a="${p.id}">+ Keranjang</button></div></div></article>`;
function render(){
const q=$("#q").value.trim().toLowerCase();
const r=P.filter(p=>(cat==="Semua"||p.c===cat)&&p.n.toLowerCase().includes(q));
$("#list").innerHTML=r.length?r.map(card).join(""):'<div class="empty">Produk tidak ditemukan.</div>'}
$("#feat").innerHTML=P.filter(p=>p.f).map(card).join("");
$("#chips").innerHTML=["Semua","Laptop","Handphone","Aksesoris"].map(c=>`<button class="chip${c===cat?" on":""}" data-c="${c}">${c}</button>`).join("");
function save(){try{localStorage.setItem("ds-cart",JSON.stringify(cart))}catch(e){}}
function drawCart(){
const n=cart.reduce((s,x)=>s+x.q,0),t=cart.reduce((s,x)=>s+x.q*P.find(p=>p.id===x.id).p,0);
$("#cc").textContent=n;$("#dn").textContent=n;$("#tt").textContent=rp(t);
$("#items").innerHTML=cart.length?cart.map(x=>{const p=P.find(p=>p.id===x.id);return `<div class="it"><div class="m"><b>${p.n}</b><small>${rp(p.p)}</small></div><div class="qty"><button data-m="${p.id}">−</button><span>${x.q}</span><button data-p="${p.id}">+</button></div></div>`}).join(""):'<div class="empty">Keranjang masih kosong.</div>';save()}
function toast(t){const e=$("#ts");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),1800)}
function add(id){const x=cart.find(c=>c.id===id);x?x.q++:cart.push({id,q:1});drawCart();toast("Ditambahkan ke keranjang")}
function chg(id,d){const x=cart.find(c=>c.id===id);x.q+=d;if(x.q<1)cart=cart.filter(c=>c!==x);drawCart()}
function drawer(on){$("#dr").classList.toggle("on",on);$("#sh").classList.toggle("on",on)}
function modal(id){const p=P.find(p=>p.id===id);$("#mb").innerHTML=`${ic(p)}<div class="cb"><span class="cat">${p.c}</span><h3 style="font-size:1.3rem">${p.n}</h3><p style="flex:none">${p.d}</p><div class="price" style="font-size:1.4rem">${rp(p.p)}</div><div class="acts"><button class="btn out" id="mx">Tutup</button><button class="btn pri" data-a="${p.id}">+ Keranjang</button></div></div>`;$("#md").classList.add("on")}
document.addEventListener("click",e=>{
const t=e.target;
if(t.dataset.a)add(+t.dataset.a);
if(t.dataset.d)modal(+t.dataset.d);
if(t.dataset.p)chg(+t.dataset.p,1);
if(t.dataset.m)chg(+t.dataset.m,-1);
if(t.dataset.c){cat=t.dataset.c;document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.c===cat));render()}
if(t.id==="mx"||t.id==="md")$("#md").classList.remove("on");
if(t.closest("#nav a"))$("#nav").classList.remove("on")});
$("#q").addEventListener("input",render);
$("#oc").onclick=()=>drawer(true);$("#cl").onclick=$("#sh").onclick=()=>drawer(false);
$("#bg").onclick=()=>$("#nav").classList.toggle("on");
$("#co").onclick=()=>{if(!cart.length)return toast("Keranjang masih kosong");cart=[];drawCart();drawer(false);toast("Terima kasih! Pesanan Anda diterima.")};
render();drawCart();
