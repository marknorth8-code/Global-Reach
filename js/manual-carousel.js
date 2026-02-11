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

    function slideWidth() {
      return items[0].getBoundingClientRect().width;
    }

    function update() {
      if (type === "strip") {
        track.style.transform = `translateX(-${index * slideWidth()}px)`;
        next.disabled = index >= items.length - 1;
      } else {
        track.style.transform = `translateX(-${index * 100}%)`;
        next.disabled = index >= items.length - 1;
      }
      prev.disabled = index === 0;
    }

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

    update();
  });
});

const tracks = document.querySelectorAll('.carousel-track');

tracks.forEach(track => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.parentElement.scrollLeft; // Scroll the parent 'carousel' container
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isDragging = false;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed multiplier
    track.parentElement.scrollLeft = scrollLeft - walk;
  }, { passive: true });
});
