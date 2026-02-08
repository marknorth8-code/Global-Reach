// ========= carousel-intro.js =========
// Static intro carousel (no scroll, no layout shift)

document.addEventListener("DOMContentLoaded", () => {

  const introImageDiv = document.getElementById("intro-image");
  if (!introImageDiv) return;

  /* ---------- CONFIG ---------- */
  const introImages = [
    "https://via.placeholder.com/1200x800/ff7f7f/333333?text=Intro+Image+1",
    "https://via.placeholder.com/1200x800/7fbfff/333333?text=Intro+Image+2",
    "https://via.placeholder.com/1200x800/7fff7f/333333?text=Intro+Image+3",
    "https://via.placeholder.com/1200x800/ffff7f/333333?text=Intro+Image+4"
  ];

  const interval = 4000; // ms
  let currentIndex = 0;

  /* ---------- PRELOAD ---------- */
  const preloaded = [];
  introImages.forEach(src => {
    const img = new Image();
    img.src = src;
    preloaded.push(img);
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
