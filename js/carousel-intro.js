// ========= carousel-intro.js =========
document.addEventListener("DOMContentLoaded", () => {
  const introImageDiv = document.getElementById("intro-image");
  if (!introImageDiv) return;

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

  const introAlts = [
    "Description of work 1",
    "Description of work 2",
    "Description of work 3",
    "Description of work 4",
    "Description of work 5",
    "Description of work 6",
    "Description of work 7"
  ];

  /* ---------- GENERATION ---------- */
  introImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = introAlts[index] || "";
    
    // Set the dimensions here globally for all images
    img.width = 1200;
    img.height = 800;

    // Apply Lazy Loading
    // We load the first image "eagerly" so the site feels fast,
    // and the rest "lazy" to save data.
    if (index === 0) {
      img.loading = "eager"; 
    } else {
      img.loading = "lazy";
    }

    introImageDiv.appendChild(img);
  });
});
