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

document.addEventListener("DOMContentLoaded", () => {
  const carousels = [
    { trackId: "locations-carousel-track" },       // home/index
    { trackId: "about-locations-carousel-track" } // about page
  ];

  carousels.forEach(c => {
    const track = document.getElementById(c.trackId);
    const prevBtn = track?.closest(".locations-carousel-wrapper")?.querySelector(".locations-prev");
    const nextBtn = track?.closest(".locations-carousel-wrapper")?.querySelector(".locations-next");

    if (!track || !prevBtn || !nextBtn) return;

    const items = Array.from(track.children);
    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const itemWidth = track.offsetWidth; // full wrapper width

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -itemWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: itemWidth, behavior: "smooth" });
    });
  });
});

