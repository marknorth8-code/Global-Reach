/* =========================================================
   CAROUSEL ENGINE – Infinite loop with cloned slides
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const id = carousel.id;
    const config =
      (window.CAROUSEL_CONFIGS && window.CAROUSEL_CONFIGS[id]) || {};

    const track = carousel.querySelector(".carousel-track");
    let items = Array.from(carousel.querySelectorAll(".carousel-item"));
    if (!track || items.length === 0) return;

    /* ---------- Clone slides (loop only) ---------- */
    if (config.loop) {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[items.length - 1].cloneNode(true);

      firstClone.classList.add("clone");
      lastClone.classList.add("clone");

      track.appendChild(firstClone);
      track.insertBefore(lastClone, items[0]);

      items = Array.from(track.querySelectorAll(".carousel-item"));
    }

    const realCount = config.loop ? items.length - 2 : items.length;

    /* ---------- State ---------- */
    let currentIndex = config.loop ? 1 : 0;
    let autoplayTimer = null;
    let isPaused = false;
    let isVisible = false;

    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;

    /* ---------- Counter ---------- */
    const counter = carousel.querySelector(".carousel-counter");
    const currentEl = counter?.querySelector(".current");
    const totalEl = counter?.querySelector(".total");

    if (totalEl) totalEl.textContent = realCount;

    /* ---------- Thumbnails ---------- */
    const thumbnailStrip = carousel.querySelector(".carousel-thumbnails");
    const thumbnails = [];

    if (thumbnailStrip) {
      const realItems = config.loop ? items.slice(1, -1) : items;

      realItems.forEach((item, index) => {
        const img = item.querySelector("img");
        if (!img) return;

        const thumb = document.createElement("button");
        thumb.className = "carousel-thumbnail";
        thumb.style.backgroundImage = `url(${img.src})`;
        thumb.addEventListener("click", () => {
          goToIndex(config.loop ? index + 1 : index);
        });

        thumbnailStrip.appendChild(thumb);
        thumbnails.push(thumb);
      });
    }

    /* ---------- Sizing ---------- */
    function getStep() {
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap || 0, 10);
      return itemWidth + gap;
    }

    function setTranslate(x, animate = false) {
      track.style.transition = animate
        ? `transform ${config.speed || 400}ms ease`
        : "none";
      track.style.transform = `translateX(${x}px)`;
    }

    /* ---------- UI Sync ---------- */
    function updateUI() {
      let displayIndex = currentIndex;

      if (config.loop) {
        if (currentIndex === 0) displayIndex = realCount;
        else if (currentIndex === items.length - 1) displayIndex = 1;
        else displayIndex = currentIndex;
        displayIndex -= 1;
      }

      if (currentEl) currentEl.textContent = displayIndex + 1;

      if (thumbnails.length) {
        thumbnails.forEach(t => t.classList.remove("is-active"));
        thumbnails[displayIndex]?.classList.add("is-active");
      }
    }

    /* ---------- Movement ---------- */
    function goToIndex(index, animate = true) {
      currentIndex = index;
      setTranslate(-index * getStep(), animate);
      updateUI();
    }

    function goToNext() {
      goToIndex(currentIndex + 1);
    }

    function goToPrev() {
      goToIndex(currentIndex - 1);
    }

    /* ---------- Snap after clone ---------- */
    track.addEventListener("transitionend", () => {
      if (!config.loop) return;

      if (currentIndex === 0) {
        goToIndex(items.length - 2, false);
      }

      if (currentIndex === items.length - 1) {
        goToIndex(1, false);
      }
    });

    /* ---------- Autoplay ---------- */
    function startAutoplay() {
      if (!config.autoplay || !isVisible || autoplayTimer) return;

      autoplayTimer = setInterval(() => {
        if (!isPaused && !isDragging) goToNext();
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

    /* ---------- Arrows ---------- */
    carousel.querySelector(".carousel-arrow.prev")?.addEventListener("click", goToPrev);
    carousel.querySelector(".carousel-arrow.next")?.addEventListener("click", goToNext);

    /* ---------- Drag / Swipe ---------- */
    function onDragStart(e) {
      isDragging = true;
      isPaused = true;
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      prevTranslate = -currentIndex * getStep();
      track.style.transition = "none";
    }

    function onDragMove(e) {
      if (!isDragging) return;
      const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      currentTranslate = prevTranslate + (x - startX);
      setTranslate(currentTranslate);
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      isPaused = false;

      const movedBy = currentTranslate - prevTranslate;
      const threshold = getStep() * 0.2;

      if (movedBy < -threshold) goToNext();
      else if (movedBy > threshold) goToPrev();
      else goToIndex(currentIndex);
    }

    carousel.addEventListener("mousedown", onDragStart);
    carousel.addEventListener("mousemove", onDragMove);
    carousel.addEventListener("mouseup", onDragEnd);
    carousel.addEventListener("mouseleave", onDragEnd);

    carousel.addEventListener("touchstart", onDragStart, { passive: true });
    carousel.addEventListener("touchmove", onDragMove, { passive: true });
    carousel.addEventListener("touchend", onDragEnd);

    /* ---------- Visibility ---------- */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? startAutoplay() : stopAutoplay();
      },
      { threshold: 0.25 }
    );

    observer.observe(carousel);

    /* ---------- Init ---------- */
    goToIndex(currentIndex, false);
  });
});
