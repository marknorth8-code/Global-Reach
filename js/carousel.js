/* =========================================================
   CAROUSEL ENGINE – Infinite Loop (cloned slides)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const items = Array.from(track.children);
    if (!track || items.length === 0) return;

    const config =
      (window.CAROUSEL_CONFIGS && window.CAROUSEL_CONFIGS[carousel.id]) || {};

    /* ---------- CLONE SLIDES ---------- */
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    const slides = Array.from(track.children);

    /* ---------- STATE ---------- */
    let currentIndex = 1; // start on first REAL slide
    let autoplayTimer = null;
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    /* ---------- COUNTER ---------- */
    const counter = carousel.querySelector(".carousel-counter");
    const currentEl = counter?.querySelector(".current");
    const totalEl = counter?.querySelector(".total");
    const realTotal = items.length;

    if (totalEl) totalEl.textContent = realTotal;

    function updateCounter() {
      if (!currentEl) return;
      let displayIndex = currentIndex - 1;
      if (displayIndex < 0) displayIndex = realTotal;
      if (displayIndex >= realTotal) displayIndex = 1;
      currentEl.textContent = displayIndex;
    }

    /* ---------- SIZING ---------- */
    function getStep() {
      const slideWidth = slides[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap || 0, 10);
      return slideWidth + gap;
    }

    function setTranslate(x, animate = true) {
      track.style.transition = animate
        ? `transform ${config.speed || 500}ms ease`
        : "none";
      track.style.transform = `translateX(${x}px)`;
    }

    function goToIndex(index, animate = true) {
      currentIndex = index;
      setTranslate(-currentIndex * getStep(), animate);
      updateCounter();
    }

    /* ---------- LOOP FIX ---------- */
    track.addEventListener("transitionend", () => {
      if (slides[currentIndex].classList.contains("clone")) {
        track.style.transition = "none";

        if (currentIndex === 0) {
          currentIndex = realTotal;
        } else if (currentIndex === slides.length - 1) {
          currentIndex = 1;
        }

        setTranslate(-currentIndex * getStep(), false);
      }
    });

    /* ---------- NAV ---------- */
    function next() {
      goToIndex(currentIndex + 1);
    }

    function prev() {
      goToIndex(currentIndex - 1);
    }

    carousel.querySelector(".carousel-arrow.next")?.addEventListener("click", next);
    carousel.querySelector(".carousel-arrow.prev")?.addEventListener("click", prev);

    /* ---------- AUTOPLAY ---------- */
    function startAutoplay() {
      if (!config.autoplay || autoplayTimer) return;
      autoplayTimer = setInterval(() => {
        if (!isPaused && !isDragging) next();
      }, config.autoplayDelay || 4000);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    if (config.pauseOnHover) {
      carousel.addEventListener("mouseenter", () => (isPaused = true));
      carousel.addEventListener("mouseleave", () => (isPaused = false));
    }

    /* ---------- DRAG / SWIPE ---------- */
    function onDragStart(e) {
      isDragging = true;
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      prevTranslate = -currentIndex * getStep();
      track.style.transition = "none";
    }

    function onDragMove(e) {
      if (!isDragging) return;
      const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      currentTranslate = prevTranslate + (x - startX);
      setTranslate(currentTranslate, false);
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;

      const moved = currentTranslate - prevTranslate;
      const threshold = getStep() * 0.2;

      if (moved < -threshold) next();
      else if (moved > threshold) prev();
      else goToIndex(currentIndex);
    }

    carousel.addEventListener("mousedown", onDragStart);
    carousel.addEventListener("mousemove", onDragMove);
    carousel.addEventListener("mouseup", onDragEnd);
    carousel.addEventListener("mouseleave", onDragEnd);

    carousel.addEventListener("touchstart", onDragStart, { passive: true });
    carousel.addEventListener("touchmove", onDragMove, { passive: true });
    carousel.addEventListener("touchend", onDragEnd);

    /* ---------- INIT ---------- */
    goToIndex(1, false);
    startAutoplay();
  });
});
