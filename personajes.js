// =============================
// CONVERTIR LINK YOUTUBE A EMBED
// =============================

function convertirYoutubeAEmbed(url){

if(!url) return "";

if(url.includes("youtu.be/")){
const id=url.split("youtu.be/")[1].split("?")[0];
return `https://www.youtube.com/embed/${id}?mute=1`;
}

if(url.includes("watch?v=")){
const id=url.split("watch?v=")[1].split("&")[0];
return `https://www.youtube.com/embed/${id}?mute=1`;
}

return url;
}


// =============================
// LISTA PERSONAJES
// =============================

const personajes=[

{
nombre:"Jean",
imagen:"img/mondstadt/jean.jpg",
elemento:"anemo",
region:"mondstadt",
trailer:"https://youtu.be/_FOkixTeAaA"
},

{
nombre:"Amber",
imagen:"img/mondstadt/amber.jpg",
elemento:"pyro",
region:"mondstadt",
trailer:"https://youtu.be/nNi6tt0kcAk"
},

{
nombre:"Lisa",
imagen:"img/mondstadt/lisa.jpg",
elemento:"electro",
region:"mondstadt",
trailer:"https://youtu.be/92YOcsgAOr8"
},

{
nombre:"Xiao",
imagen:"img/liyue/xiao.jpg",
elemento:"anemo",
region:"liyue",
trailer:"https://youtu.be/3c0i3x9mN1g"
},

{
nombre:"Beidou",
imagen:"img/liyue/beidou.jpg",
elemento:"electro",
region:"liyue"
},

{
nombre:"Kaeya",
imagen:"img/mondstadt/kaeya.jpg",
elemento:"cryo",
region:"mondstadt",
trailer:"https://youtu.be/KnNNsKmt4Sc?si=d-eaDFy2tcrRsYhT"
},

{
nombre:"barbara",
imagen:"img/mondstadt/barbara.jpg",
elemento:"hydro",
region:"mondstadt",
trailer:"https://youtu.be/NV0vBi-vkto?si=4rb900OlnmyiNzAA"
},

{
nombre:"Diluc",
imagen:"img/mondstadt/diluc.jpg",
elemento:"pyro",
region:"mondstadt",
trailer:"https://youtu.be/1TfbiDo7N4k?si=al_G4X3ajTbGDt9H"
}

];


// =============================
// RENDER PERSONAJES
// =============================

function renderPersonajes(lista){

// Limpiar contenedores
document.getElementById("mondstadt").innerHTML="";
document.getElementById("liyue").innerHTML="";

lista.forEach(p=>{

const section=document.getElementById(p.region);
if(!section) return;

const figure=document.createElement("figure");


// ⭐ BRILLO POR ELEMENTO
if(p.elemento){
figure.classList.add(p.elemento);
}


// ⭐ FAVORITO
const fav=document.createElement("span");
fav.textContent="★";
fav.className="favorito";
fav.style.display="none";
figure.appendChild(fav);

figure.addEventListener("dblclick",(e)=>{
e.stopPropagation(); // evita abrir trailer
fav.style.display = fav.style.display==="none" ? "block" : "none";
});


// ⭐ VIDEO
const embed=convertirYoutubeAEmbed(p.trailer);


// HTML TARJETA
figure.innerHTML += `

<img src="${p.imagen}" alt="${p.nombre}">

${p.elemento ? `<span class="element ${p.elemento}">${p.elemento}</span>` : ""}

${embed ? `<iframe class="previewVideo" src="${embed}" frameborder="0"></iframe>` : ""}

<figcaption>
${p.nombre}
<br>
<small>${p.descripcion || ""}</small>
</figcaption>

`;


// CLICK ABRIR TRAILER
if(embed){
figure.onclick=()=>abrirTrailer(embed);
}


// ⭐ EFECTO 3D
figure.addEventListener("mousemove", e => {

const rect = figure.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = -(y - centerY) / 20;
const rotateY = (x - centerX) / 20;

figure.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

figure.addEventListener("mouseleave",()=>{
figure.style.transform="rotateX(0) rotateY(0)";
});

section.appendChild(figure);

});

actualizarContador(lista.length);

}


// =============================
// FILTROS + BUSCADOR
// =============================

const buscador=document.getElementById("buscador");
const filtroElemento=document.getElementById("filtroElemento");
const filtroRegion=document.getElementById("filtroRegion");

function filtrar(){

let resultado=personajes;

const texto=buscador.value.toLowerCase();
const elemento=filtroElemento.value;
const region=filtroRegion.value;


// BUSCAR NOMBRE
resultado=resultado.filter(p =>
p.nombre.toLowerCase().includes(texto)
);


// FILTRAR ELEMENTO
if(elemento!=="todos"){
resultado=resultado.filter(p=>p.elemento===elemento);
}


// FILTRAR REGION
if(region!=="todos"){
resultado=resultado.filter(p=>p.region===region);
}

renderPersonajes(resultado);

}

buscador.addEventListener("input",filtrar);
filtroElemento.addEventListener("change",filtrar);
filtroRegion.addEventListener("change",filtrar);


// =============================
// CONTADOR
// =============================

function actualizarContador(total){
document.getElementById("contador").textContent=
`Mostrando ${total} personaje(s)`;
}


// =============================
// MODAL TRAILER
// =============================

function abrirTrailer(videoUrl){

document.getElementById("modalTrailer").style.display="flex";
document.getElementById("videoTrailer").src=videoUrl+"&autoplay=1";

}

function cerrarTrailer(){

document.getElementById("modalTrailer").style.display="none";
document.getElementById("videoTrailer").src="";

}

window.onclick=function(e){
const modal=document.getElementById("modalTrailer");
if(e.target===modal) cerrarTrailer();
};


// =============================
// CARGA INICIAL
// =============================

renderPersonajes(personajes);

