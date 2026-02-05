/* =========================================================
   CAROUSEL ENGINE – Generic, config-driven
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
    let isVisible = false;

    /* ---------- Counter ---------- */
    const counter = carousel.querySelector(".carousel-counter");
    const currentEl = counter?.querySelector(".current");
    const totalEl = counter?.querySelector(".total");

    if (totalEl) totalEl.textContent = items.length;

    /* ---------- Sizing ---------- */
    function getStep() {
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap || 0, 10);
      return itemWidth + gap;
    }

    /* ---------- Arrows ---------- */
    const prevBtn = carousel.querySelector(".carousel-arrow.prev");
    const nextBtn = carousel.querySelector(".carousel-arrow.next");

    function updateArrows() {
      if (!prevBtn || !nextBtn) return;

      if (config.loop) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
      } else {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === items.length - 1;
      }
    }

    /* ---------- Movement ---------- */
    function goToIndex(index) {
      const step = getStep();
      track.style.transition = `transform ${config.speed || 500}ms ease`;
      track.style.transform = `translateX(${-index * step}px)`;
      currentIndex = index;

      if (currentEl) {
        currentEl.textContent = currentIndex + 1;
      }

      updateArrows();
    }

    function goToNext() {
      if (currentIndex < items.length - 1) {
        goToIndex(currentIndex + 1);
      } else if (config.loop) {
        goToIndex(0);
      }
    }

    function goToPrev() {
      if (currentIndex > 0) {
        goToIndex(currentIndex - 1);
      }
    }

    /* ---------- Autoplay ---------- */
    function startAutoplay() {
      if (!config.autoplay || !isVisible) return;

      stopAutoplay();
      autoplayTimer = setInterval(goToNext, config.autoplayDelay || 4000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (config.pauseOnHover) {
      carousel.addEventListener("mouseenter", () => (isPaused = true));
      carousel.addEventListener("mouseleave", () => (isPaused = false));
    }

    /* ---------- Arrows wiring ---------- */
    prevBtn?.addEventListener("click", goToPrev);
    nextBtn?.addEventListener("click", goToNext);

    /* ---------- Visibility ---------- */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          isVisible ? startAutoplay() : stopAutoplay();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(carousel);

    /* ---------- Init ---------- */
    goToIndex(0);
  });
});
