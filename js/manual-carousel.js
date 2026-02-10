document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');

    if (!track || !prev || !next) return;

    let currentIndex = 0;
    const items = track.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function updateCarousel() {
      // Moves the track left by 100% for every index
      // (e.g., index 1 moves it -100%)
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Disable buttons at the edges
      prev.disabled = currentIndex === 0;
      next.disabled = currentIndex === totalItems - 1;
    }

    next.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    prev.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Initial button state
    updateCarousel();
  });
});
