document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const arrows = carousel.querySelector('.carousel-arrows');
    const prev = arrows?.querySelector('.carousel-prev');
    const next = arrows?.querySelector('.carousel-next');
    const items = track?.querySelectorAll('.carousel-item');

    if (!track || !prev || !next || !items.length) return;

    // FIX 1: Tell the browser to allow horizontal swipes on this container
    track.style.touchAction = 'pan-y'; 

    const type = carousel.dataset.carouselType || "full";
    let index = 0;
    let touchStartX = 0;

    function slideWidth() {
      return items[0].getBoundingClientRect().width;
    }

    function update() {
      // Use the existing logic for buttons and layout
      if (type === "strip") {
        track.style.transform = `translateX(-${index * (slideWidth() + 24)}px)`; 
      } else {
        track.style.transform = `translateX(-${index * 100}%)`;
      }
      
      prev.disabled = index === 0;
      next.disabled = index >= items.length - 1;
      
      const counter = carousel.querySelector('.carousel-counter');
      if (counter) counter.textContent = `${index + 1} / ${items.length}`;
    }

    // CLICK EVENTS
    next.addEventListener("click", () => { if (index < items.length - 1) { index++; update(); } });
    prev.addEventListener("click", () => { if (index > 0) { index--; update(); } });

    // TOUCH EVENTS (SWIPE)
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchStartX - touchEndX;
      const threshold = 50; // pixels moved

      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0 && index < items.length - 1) {
          index++; // Swipe Left -> Next
        } else if (swipeDistance < 0 && index > 0) {
          index--; // Swipe Right -> Prev
        }
        update();
      }
    }, { passive: true });

    update();
  });
});
