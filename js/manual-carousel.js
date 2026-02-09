document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {

    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');

    if (!track || !prev || !next) return;

    const items = Array.from(track.children);
    if (!items.length) return;

    // Compute the width of a single slide including gap
    const style = getComputedStyle(track);
    const gap = parseInt(style.gap) || 16; // match CSS gap
    const slideWidth = items[0].offsetWidth + gap;

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -slideWidth, behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: slideWidth, behavior: "smooth" });
    });

    // Optional: hide arrows when at start/end
    const updateArrows = () => {
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1;
    };

    // Update on scroll
    track.addEventListener("scroll", updateArrows);
    updateArrows(); // initial check

  });
});
