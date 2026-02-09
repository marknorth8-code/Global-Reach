document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".manual-carousel").forEach(carousel => {
    const track = carousel.querySelector(".manual-carousel-track");
    const prev = carousel.querySelector(".manual-prev");
    const next = carousel.querySelector(".manual-next");

    if (!track || !prev || !next) return;

    const gap = parseInt(getComputedStyle(track).gap) || 24;

    function step() {
      const firstItem = track.children[0];
      if (!firstItem) return 0;
      return firstItem.offsetWidth + gap;
    }

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: step(), behavior: "smooth" });
    });
  });
});
