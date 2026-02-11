// ========= carousel-intro.js =========
document.addEventListener("DOMContentLoaded", () => {
  const introImageDiv = document.getElementById("intro-image");
  if (!introImageDiv) return;

  /* ---------- CONFIG ---------- */
  // Keep your structure exactly as it was: a list of strings
  const introImages = [
    "images/home/hero-01.webp",
    "images/home/hero-02.webp",
    "images/home/hero-03.webp",
    "images/home/hero-04.webp",
    "images/home/hero-05.webp",
    "images/home/hero-06.webp",
    "images/home/hero-07.webp"
  ];

  // Parallel array: matches descriptions to the images by index
  const introAlts = [
    "Description of work 1",
    "Description of work 2",
    "Description of work 3",
    "Description of work 4",
    "Description of work 5",
    "Description of work 6",
    "Description of work 7"
  ];

  const interval = 4000; 
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
  
  // Set accessibility role once
  introImageDiv.setAttribute("role", "img");

  /* ---------- SHOW IMAGE FUNCTION ---------- */
  function showImage(index) {
    introImageDiv.style.opacity = "0";

    setTimeout(() => {
      // Set the background image
      introImageDiv.style.backgroundImage = `url("${introImages[index]}")`;
      
      // Update the "alt" text equivalent using the parallel array
      introImageDiv.setAttribute("aria-label", introAlts[index]);
      
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
