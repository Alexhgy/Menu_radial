const disco = document.querySelector(".disco");
const discoRadio = disco.getBoundingClientRect().width / 2;
const discoPadding = Math.trunc(discoRadio * 0.016); // rem
const links = document.querySelectorAll(".link");

const total = links.length;
const step = 30; /*360 / total*/
let discoRotacion = 0;
let scrollTimeout;
let currentIndex = 0;

links.forEach((link, i) => {
  const angle = -i * step;

  link.style.transform = `
    rotate(${angle}deg)
    translate(calc(${discoRadio}px - ${discoPadding}rem))
  `;
});

window.addEventListener("wheel", (e) => {
  focus();
  const direction = Math.sign(e.deltaY);

  const nextIndex = currentIndex + direction;

  if (nextIndex < 0) return;

  if (nextIndex >= total) return;

  currentIndex = nextIndex;

  const angle = currentIndex * step;
  disco.style.transition = "transform 0.3s ease-out";
  disco.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  focus();
});

function focus() {
  links.forEach((link, i) => {
    link.style.opacity = i === currentIndex ? "1" : "0.2";
  });
}
