/* =========================
   SERVICES CAROUSEL – MANUAL SCROLL
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("services-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const prevBtn = carousel.querySelector(".locations-prev");
  const nextBtn = carousel.querySelector(".locations-next");
  const firstItem = track?.querySelector(".carousel-item");

  if (!track || !prevBtn || !nextBtn || !firstItem) return;

  const gap = parseInt(getComputedStyle(track).gap) || 32;

  function getScrollAmount() {
    return firstItem.offsetWidth + gap;
  }

  prevBtn.addEventListener("click", () => {
    track.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });
});
