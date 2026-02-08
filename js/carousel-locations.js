/* =========================
   LOCATIONS CAROUSEL MANUAL SCROLL
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("locations-carousel-track");
  const prevBtn = document.querySelector(".locations-prev");
  const nextBtn = document.querySelector(".locations-next");

  if (!track || !prevBtn || !nextBtn) return;

  const items = Array.from(track.children);
  const gap = parseInt(getComputedStyle(track).gap) || 16;
  const itemWidth = items[0].offsetWidth + gap;

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: itemWidth, behavior: "smooth" });
  });
});

