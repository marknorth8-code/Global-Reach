/**
 * carousel.js
 * --------------------------------------------------
 * Generic carousel engine.
 * Behaviour is driven entirely by carousel-configs.js
 */

(function () {
  if (!window.CAROUSEL_CONFIGS) {
    console.warn("CAROUSEL_CONFIGS not found — carousels will use defaults.");
  }

  const DEFAULT_CONFIG = {
    autoplay: false,
    autoplaySpeed: 4000,
    loop: false,
    centerMode: false,
    scaleActive: false,
    imageRatio: "3:2",
    transition: "medium",
    arrows: false,
    dots: false,
    swipe: true,
    keyboard: false
  };

  function initCarousel(carouselEl) {
    const id = carouselEl.id;
    const userConfig = window.CAROUSEL_CONFIGS?.[id] || {};
    const config = { ...DEFAULT_CONFIG, ...userConfig };

    const track = carouselEl.querySelector(".carousel-track");
    const items = carouselEl.querySelectorAll(".carousel-item");

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    // ----------------------------------------------
    // Apply base styles
    // ----------------------------------------------
    carouselEl.dataset.transition = config.transition;
    carouselEl.dataset.center = config.centerMode;

    items.forEach((item, index) => {
      item.dataset.index = index;
    });

    // ----------------------------------------------
    // Navigation helpers
    // ----------------------------------------------
    function update() {
      items.forEach((item, index) => {
        item.classList.toggle("is-active", index === currentIndex);

        if (config.scaleActive) {
          item.style.transform =
            index === currentIndex ? "scale(1.2)" : "scale(1)";
        }
      });

      const offset = -currentIndex * items[0].offsetWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    function next() {
      if (currentIndex < items.length - 1) {
        currentIndex++;
      } else if (config.loop) {
        currentIndex = 0;
      }
      update();
    }

    function prev() {
      if (currentIndex > 0) {
        currentIndex--;
      } else if (config.loop) {
        currentIndex = items.length - 1;
      }
      update();
    }

    // ----------------------------------------------
    // Autoplay
    // ----------------------------------------------
    if (config.autoplay) {
      autoplayTimer = setInterval(next, config.autoplaySpeed);

      carouselEl.addEventListener("mouseenter", () => {
        clearInterval(autoplayTimer);
      });

      carouselEl.addEventListener("mouseleave", () => {
        autoplayTimer = setInterval(next, config.autoplaySpeed);
      });
    }

    // ----------------------------------------------
    // Arrows
    // ----------------------------------------------
    if (config.arrows) {
      const prevBtn = carouselEl.querySelector(".carousel-prev");
      const nextBtn = carouselEl.querySelector(".carousel-next");

      prevBtn && prevBtn.addEventListener("click", prev);
      nextBtn && nextBtn.addEventListener("click", next);
    }

    // ----------------------------------------------
    // Keyboard
    // ----------------------------------------------
    if (config.keyboard) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      });
    }

    // ----------------------------------------------
    // Initial render
    // ----------------------------------------------
    update();
  }

  // ----------------------------------------------
  // Boot all carousels
  // ----------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carousel").forEach(initCarousel);
  });
})();
