// ul
const disco = document.querySelector(".disco");
// ---
let discoRadio = disco.offsetWidth / 2;
// elementos li
const links = document.querySelectorAll(".link");
// nav
const layout = document.querySelector(".nav-layout");

const total = links.length;
const step = 30;

let angle = 0;
let currentIndex = 0;
let touchStartY = 0;

// abrir menu
disco.addEventListener("click", () => {
  let discoClase = disco.classList;
  if (discoClase.contains("closed")) {
    disco.classList.remove("closed");
    disco.style.setProperty("--rotate", `${angle}deg`);
    handleInput(0);
    updateLinks();
  } else {
    disco.classList.add("closed");
  }
});

// reposicionar los links al cambiar el alto del circulo
window.addEventListener("resize", () => {
  updateLinks();
});

// INICIO
// ### CONTROLES DE SCROLL ###
// ### CONTROLES DE SCROLL ###
// ### CONTROLES DE SCROLL ###
// rueda del mouse
window.addEventListener("wheel", (e) => {
  const direction = Math.sign(e.deltaY);
  handleInput(direction);
});

// --- Touch
window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  const deltaY = touchStartY - e.changedTouches[0].clientY;
  const direction = Math.sign(deltaY);
  handleInput(direction * -1);
});

// --- Teclado
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") handleInput(-1);
  if (e.key === "ArrowUp") handleInput(1);
});

function handleInput(direction) {
  if (direction === 0) return;
  if (disco.classList.contains("closed")) return;

  const nextIndex = currentIndex + direction;

  if (nextIndex < 0 || nextIndex >= total) return;

  currentIndex = nextIndex;

  angle = currentIndex * step;

  disco.style.transition = "transform 0.3s ease-out";
  disco.style.setProperty("--rotate", `${angle}deg`);

  focus();
}
// ### CONTROLES DE SCROLL ###
// ### CONTROLES DE SCROLL ###
// ### CONTROLES DE SCROLL ###
// ### FIN

function focus() {
  links.forEach((link, i) => {
    link.style.opacity = i === currentIndex ? "1" : "0.2";
  });
}

function placingLinks() {
  links.forEach((link, i) => {
    const angle = -i * step;
    link.style.transform = `
      rotate(${angle}deg)
      translate(${Math.trunc(discoRadio - link.offsetWidth)}px, -50%)
      `;
  });
}

function updateLinks() {
  discoRadio = disco.offsetWidth / 2;
  placingLinks();
}
