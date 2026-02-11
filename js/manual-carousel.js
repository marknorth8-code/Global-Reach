document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const arrows = carousel.querySelector('.carousel-arrows');
    const prev = arrows?.querySelector('.carousel-prev');
    const next = arrows?.querySelector('.carousel-next');
    const items = track?.querySelectorAll('.carousel-item');

    if (!track || !prev || !next || !items.length) return;

    const type = carousel.dataset.carouselType || "full";
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function slideWidth() {
      return items[0].getBoundingClientRect().width;
    }

    function update() {
      if (type === "strip") {
        // For partial-view carousels (Section 3)
        track.style.transform = `translateX(-${index * (slideWidth() + 24)}px)`; 
      } else {
        // For full-width carousels (Section 4 / About Page)
        track.style.transform = `translateX(-${index * 100}%)`;
      }
      
      // Update button states
      prev.disabled = index === 0;
      next.disabled = index >= items.length - 1;
      
      // Update counter if it exists
      const counter = carousel.querySelector('.carousel-counter');
      if (counter) {
        counter.textContent = `${index + 1} / ${items.length}`;
      }
    }

    // CLICK EVENTS
    next.addEventListener("click", () => {
      if (index < items.length - 1) {
        index++;
        update();
      }
    });

    prev.addEventListener("click", () => {
      if (index > 0) {
        index--;
        update();
      }
    });

    // TOUCH EVENTS (FINGER SCROLLING)
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50; // Sensitivity: pixels moved before trigger
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe Left -> Next Slide
        if (index < items.length - 1) {
          index++;
          update();
        }
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe Right -> Previous Slide
        if (index > 0) {
          index--;
          update();
        }
      }
    }

    // Initialize
    update();
  });
});
