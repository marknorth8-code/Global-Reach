// ========= carousel-intro.js =========
// Static intro carousel (no scroll, no layout shift)

document.addEventListener("DOMContentLoaded", () => {

  const introImageDiv = document.getElementById("intro-image");
  if (!introImageDiv) return;

  /* ---------- CONFIG ---------- */
  const introImages = [
/* ---------- CONFIG ---------- */
const introImages = [
  "images/home/hero-01.webp",
  "images/home/hero-02.webp",
  "images/home/hero-03.webp",
  "images/home/hero-04.webp",
  "images/home/hero-05.webp",
  "images/home/hero-06.webp",
  "images/home/hero-07.webp"
];

  const interval = 4000; // ms
  let currentIndex = 0;

  /* ---------- PRELOAD ---------- */
  introImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  /* ---------- INITIAL STATE ---------- */
  introImageDiv.style.backgroundSize = "cover";
  introImageDiv.style.backgroundPosition = "center";
  introImageDiv.style.backgroundRepeat = "no-repeat";
  introImageDiv.style.transition = "opacity 0.6s ease";
  introImageDiv.style.opacity = "0";

  function showImage(index) {
    introImageDiv.style.opacity = "0";

    setTimeout(() => {
      introImageDiv.style.backgroundImage = `url("${introImages[index]}")`;
      introImageDiv.style.opacity = "1";
    }, 300);
  }

  /* ---------- START ---------- */
  showImage(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % introImages.length;
    showImage(currentIndex);
  }, interval);

});
