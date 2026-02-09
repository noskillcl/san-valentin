// 🔊 Sonidos
const miau = new Audio("sounds/miau.mp3");
const latido = new Audio("sounds/latido.mp3");
latido.loop = true;

// reproducir latido al tocar pantalla inicial
document.addEventListener("touchstart", () => latido.play(), {once:true});

// Variables
let intentos = 0;
let progreso = 0;
const susurros = ["ya eras mío","no hay salida","solo di que sí","esto era inevitable","me perteneces"];

// Título animado
const titulo = document.getElementById("titulo");
const t = "¿Quieres ser mi San Valentín? :3";
let i=0;
(function escribir(){ if(i<t.length){ titulo.textContent+=t[i++]; setTimeout(escribir,80); }})();

// Elementos
const mensaje = document.getElementById("mensaje");
const extra = document.getElementById("extra");
const barra = document.getElementById("progreso");
const susurro = document.getElementById("susurro");
const btnNo = document.getElementById("btnNo");
const btnTalvez = document.getElementById("btnTalvez");
const btnSi = document.getElementById("btnSi");

// Vibración
function vibrar(ms){ if(navigator.vibrate) navigator.vibrate(ms); }

// ===== Funciones botones =====
btnNo.onclick = () => {
  miau.play();
  latido.play();
  vibrar(150);
  intentos++;
  progreso += 25; barra.style.width = progreso+"%";
  mensaje.textContent = intentos<3 ? "eso no era una opción 😾" : "como que no cabeza de aba, eres mía 😈";
  btnNo.style.position = "absolute";
  btnNo.style.left = Math.random()*60+"%";
  btnNo.style.top = Math.random()*60+"%";
  susurro.textContent = susurros[Math.floor(Math.random()*susurros.length)];
  if(intentos>=4) btnNo.style.display="none";
};

btnTalvez.onclick = () => {
  miau.play();
  latido.play();
  vibrar(150);
  progreso += 25; barra.style.width = progreso+"%";
  mensaje.textContent = "eso ya es un sí disfrazado 😏";
  extra.innerHTML="";
  const trampa = document.createElement("button");
  trampa.textContent = "mmm no";
  trampa.onclick = () => {
    miau.play();
    vibrar(300);
    mensaje.textContent = "ups… ya aceptaste 😼💘";
    barra.style.width="100%";
  };
  extra.appendChild(trampa);
  susurro.textContent = susurros[Math.floor(Math.random()*susurros.length)];
};

btnSi.onclick = () => {
  localStorage.setItem("acepto","true");
  window.location.href = "feliz.html";
};

// Memoria
if(localStorage.getItem("acepto")) {
  mensaje.innerHTML = "😼💘 ya aceptaste antes.";
  barra.style.width="100%";
}

// Intentos de escape
document.addEventListener("visibilitychange", ()=>{
  if(document.hidden) alert("¿a dónde vas? 😼");
});
window.onbeforeunload = () => "seguro que quieres irte?";