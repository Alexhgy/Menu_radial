// ul
const disco = document.querySelector(".disco");
// ---
const discoRadio = disco.getBoundingClientRect().width / 2;
const discoPadding = Math.trunc(discoRadio * 0.016); // rem
// elementos li
const links = document.querySelectorAll(".link");
// nav
const layout = document.querySelector(".nav-layout");

const total = links.length;
const step = 30; /*360 / total*/
let discoRotacion = 0;
let scrollTimeout;
let currentIndex = 0;

links.forEach((link, i) => {
  const angle = -i * step;

  link.style.transform = `
    rotate(${angle}deg)
    translate(${discoRadio - link.getBoundingClientRect().width}px)
    `;
});

let touchStartY = 0;

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

// ===============================
// LÓGICA UNIFICADA
// ===============================
function handleInput(direction) {
  if (direction === 0) return;

  const nextIndex = currentIndex + direction;

  if (nextIndex < 0 || nextIndex >= total) return;

  currentIndex = nextIndex;

  const angle = currentIndex * step;

  disco.style.transition = "transform 0.3s ease-out";
  disco.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  focus();
}

function focus() {
  links.forEach((link, i) => {
    link.style.opacity = i === currentIndex ? "1" : "0.2";
  });
}

// translate(calc(${discoRadio}px - ${discoPadding}rem))

// controla el scroll para el menu circular
// window.addEventListener("wheel", (e) => {
//   focus();
//   const direction = Math.sign(e.deltaY);

//   const nextIndex = currentIndex + direction;

//   if (nextIndex < 0) return;

//   if (nextIndex >= total) return;

//   currentIndex = nextIndex;

//   const angle = currentIndex * step;
//   disco.style.transition = "transform 0.3s ease-out";
//   disco.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
//   focus();
// });

// function focus() {
//   links.forEach((link, i) => {
//     link.style.opacity = i === currentIndex ? "1" : "0.2";
//   });
// }
