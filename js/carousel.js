/* =========================================================
   CAROUSEL ENGINE
   Bundle 1 + Bundle 2
   Interaction + Accessibility + Keyboard
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const id = carousel.id;
    const config =
      (window.CAROUSEL_CONFIGS && window.CAROUSEL_CONFIGS[id]) || {};

    const track = carousel.querySelector(".carousel-track");
    const items = carousel.querySelectorAll(".carousel-item");
    if (!track || items.length === 0) return;

    /* ================= STATE ================= */
    let currentIndex = 0;
    let autoplayTimer = null;
    let isPaused = false;
    let isVisible = false;

    let startX = 0;
    let lastX = 0;
    let velocity = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let hasDragged = false;

    /* ================= ACCESSIBILITY ================= */
    carousel.setAttribute("role", "region");
    carousel.setAttribute(
      "aria-roledescription",
      "carousel"
    );
    carousel.setAttribute(
      "aria-label",
      config.ariaLabel || "Image carousel"
    );
    carousel.tabIndex = 0;

    items.forEach((item, i) => {
      item.setAttribute("role", "group");
      item.setAttribute(
        "aria-roledescription",
        "slide"
      );
      item.setAttribute(
        "aria-label",
        `${i + 1} of ${items.length}`
      );
    });

    /* ================= COUNTER ================= */
    const counter = carousel.querySelector(".carousel-counter");
    const currentEl = counter?.querySelector(".current");
    const totalEl = counter?.querySelector(".total");

    if (totalEl) totalEl.textContent = items.length;
    if (currentEl) {
      currentEl.textContent = 1;
      currentEl.setAttribute("aria-live", "polite");
    }

    /* ================= SIZING ================= */
    function getStep() {
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap || 0, 10);
      return itemWidth + gap;
    }

    function setTranslate(x, animate = false) {
      track.style.transition = animate
        ? `transform ${config.speed || 350}ms ease`
        : "none";
      track.style.transform = `translateX(${x}px)`;
    }

    /* ================= ARROWS ================= */
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

    /* ================= MOVEMENT ================= */
    function goToIndex(index) {
      const step = getStep();
      currentIndex = Math.max(0, Math.min(index, items.length - 1));

      currentTranslate = -currentIndex * step;
      setTranslate(currentTranslate, true);

      if (currentEl) currentEl.textContent = currentIndex + 1;
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

    /* ================= AUTOPLAY ================= */
    function startAutoplay() {
      if (!config.autoplay || !isVisible || autoplayTimer) return;

      autoplayTimer = setInterval(() => {
        if (!isPaused && !isDragging) {
          goToNext();
        }
      }, config.autoplayDelay || 4000);
    }

    function stopAutoplay() {
      if (!autoplayTimer) return;
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    /* Pause autoplay when focused (a11y) */
    carousel.addEventListener("focusin", () => {
      isPaused = true;
      stopAutoplay();
    });

    carousel.addEventListener("focusout", () => {
      isPaused = false;
      startAutoplay();
    });

    if (config.pauseOnHover) {
      carousel.addEventListener("mouseenter", () => (isPaused = true));
      carousel.addEventListener("mouseleave", () => (isPaused = false));
    }

    /* ================= KEYBOARD ================= */
    carousel.addEventListener("keydown", (e) => {
      if (isDragging) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "Home":
          e.preventDefault();
          goToIndex(0);
          break;
        case "End":
          e.preventDefault();
          goToIndex(items.length - 1);
          break;
      }
    });

    /* ================= ARROW WIRING ================= */
    prevBtn?.addEventListener("click", goToPrev);
    nextBtn?.addEventListener("click", goToNext);

    /* ================= DRAG / SWIPE ================= */
    function onDragStart(e) {
      isDragging = true;
      isPaused = true;
      hasDragged = false;

      startX = e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;

      lastX = startX;
      velocity = 0;

      track.style.transition = "none";
    }

    function onDragMove(e) {
      if (!isDragging) return;

      const x = e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;

      velocity = x - lastX;
      lastX = x;

      currentTranslate += velocity;
      hasDragged = true;

      setTranslate(currentTranslate);
    }

    function onDragEnd() {
      if (!isDragging) return;

      isDragging = false;
      isPaused = false;

      const step = getStep();
      const projected = currentTranslate + velocity * 3;
      let target = Math.round(-projected / step);

      target = Math.max(0, Math.min(target, items.length - 1));
      goToIndex(target);
    }

    carousel.addEventListener("mousedown", onDragStart);
    carousel.addEventListener("mousemove", onDragMove);
    carousel.addEventListener("mouseup", onDragEnd);
    carousel.addEventListener("mouseleave", onDragEnd);

    carousel.addEventListener("touchstart", onDragStart, { passive: true });
    carousel.addEventListener("touchmove", onDragMove, { passive: true });
    carousel.addEventListener("touchend", onDragEnd);

    carousel.addEventListener("click", (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        hasDragged = false;
      }
    });

    /* ================= VISIBILITY ================= */
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

    /* ================= INIT ================= */
    goToIndex(0);
  });
});
