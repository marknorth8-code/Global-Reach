document.addEventListener("DOMContentLoaded", () => {
  // Target only carousels that have buttons
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {

    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');

    // If this specific carousel is missing buttons or track, skip it
    if (!track || !prev || !next) return;

    const getSlideWidth = () => {
      const firstItem = track.querySelector('.carousel-item');
      // offsetWidth is the most reliable for flex-basis: 100% layouts
      return firstItem ? firstItem.offsetWidth : 0;
    };

    next.addEventListener("click", () => {
      track.scrollBy({
        left: getSlideWidth(),
        behavior: "smooth"
      });
    });

    prev.addEventListener("click", () => {
      track.scrollBy({
        left: -getSlideWidth(),
        behavior: "smooth"
      });
    });

    // Handle disabling buttons at the start/end
    const updateArrows = () => {
      const scrollPos = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      prev.disabled = scrollPos <= 5;
      next.disabled = scrollPos >= maxScroll - 5;
    };

    track.addEventListener("scroll", updateArrows);
    // Initial check after the page loads
    setTimeout(updateArrows, 200);
  });
});
