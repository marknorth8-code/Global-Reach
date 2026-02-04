/* =========================================================
   CAROUSEL ENGINE
   Generic, config-driven
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const id = carousel.id;
    const config = (window.CAROUSEL_CONFIGS && window.CAROUSEL_CONFIGS[id]) || {};

    const track = carousel.querySelector(".carousel-track");
    const items = carousel.querySelectorAll(".carousel-item");

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer = null;
    let isPaused = false;

    /* NOTE: widths must be read AFTER layout */
    function getStep() {
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap || 0, 10);
      return itemWidth + gap;
    }

    /* ================= MOVE ================= */

    function goToIndex(index) {
      const step = getStep();
      track.style.transition = `transform ${config.speed || 500}ms ease`;
      track.style.transform = `translateX(${-index * step}px)`;
      currentIndex = index;
    }

    function goToNext() {
      if (currentIndex < items.length - 1) {
        goToIndex(currentIndex + 1);
      } else if (config.loop) {
        goToIndex(0);
      }
    }

    /* ================= AUTOPLAY ================= */
function startAutoplay() {
  if (!config.autoplay || !isVisible) return;

      stopAutoplay();

      autoplayTimer = setInterval(() => {
        if (!isPaused) {
          goToNext();
        }
      }, config.autoplayDelay || 3000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    /* ================= INTERACTION ================= */

    if (config.pauseOnHover) {
      carousel.addEventListener("mouseenter", () => {
        isPaused = true;
      });

      carousel.addEventListener("mouseleave", () => {
        isPaused = false;
      });
    }
     
/* ================= VISIBILITY (IntersectionObserver) ================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible = true;
        startAutoplay();
      } else {
        isVisible = false;
        stopAutoplay();
      }
    });
  },
  {
    threshold: 0.25 // 25% visible = active
  }
);

observer.observe(carousel);

     
    /* ================= INIT ================= */

    requestAnimationFrame(() => {
      setTimeout(startAutoplay, 100);
    });

  });
});
