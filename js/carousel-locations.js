document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const prevBtn = carousel.querySelector(".locations-prev");
    const nextBtn = carousel.querySelector(".locations-next");

    if (!track || !prevBtn || !nextBtn) return;

    const items = Array.from(track.children);
    if (!items.length) return;

    const gap = parseInt(getComputedStyle(track).gap) || 24;

    function getStep() {
      return items[0].offsetWidth + gap;
    }

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });
  });
});
