document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {

    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');

    if (!track || !prev || !next) return;

    const items = Array.from(track.children);
    if (!items.length) return;

    // FIX: Instead of calculating gap, we get the full width of the item.
    // Since flex-basis is 100%, offsetWidth is exactly one full slide.
    const getSlideWidth = () => items[0].offsetWidth;

    prev.addEventListener("click", () => {
      track.scrollTo({
        left: track.scrollLeft - getSlideWidth(),
        behavior: "smooth"
      });
    });

    next.addEventListener("click", () => {
      track.scrollTo({
        left: track.scrollLeft + getSlideWidth(),
        behavior: "smooth"
      });
    });

    // Handle button disabling logic
    const updateArrows = () => {
      // Small 5px buffer to handle sub-pixel rounding issues
      prev.disabled = track.scrollLeft <= 5;
      next.disabled = (track.scrollLeft + track.offsetWidth) >= (track.scrollWidth - 5);
    };

    track.addEventListener("scroll", updateArrows);
    // Initial check after a tiny delay to ensure layout is painted
    setTimeout(updateArrows, 100); 

  });
});
