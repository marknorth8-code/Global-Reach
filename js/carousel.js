/* =========================================================
   CAROUSEL ENGINE – Generic, config-driven
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

    /* ---------- State ---------- */
    let currentIndex = 0;
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

    if (totalEl) totalEl.textContent = items.length;
    if (currentEl) currentEl.textContent = 1;

    /* ---------- Thumbnails ---------- */
    const thumbnailStrip = carousel.querySelector(".carousel-thumbnails");
    const thumbnails = [];

    if (thumbnailStrip) {
      items.forEach((item, index) => {
        const img = item.querySelector("img");
        if (!img) return;

        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "carousel-thumbnail";
        thumb.style.backgroundImage = `url(${img.src})`;
        thumb.style.backgroundSize = "cover";
        thumb.style.backgroundPosition = "center";
        thumb.setAttribute("aria-label", `View image ${index + 1}`);

        thumb.addEventListener("click", () => {
          goToIndex(index);
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
      currentIndex = index;

      setTranslate(-index * step, true);

      if (currentEl) currentEl.textContent = currentIndex + 1;

      if (thumbnails.length) {
        thumbnails.forEach(t => t.classList.remove("is-active"));
        thumbnails[currentIndex]?.classList.add("is-active");
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

    if (config.pauseOnHover) {
      carousel.addEventListener("mouseenter", () => (isPaused = true));
      carousel.addEventListener("mouseleave", () => (isPaused = false));
    }

    /* ---------- Arrow wiring ---------- */
    prevBtn?.addEventListener("click", goToPrev);
    nextBtn?.addEventListener("click", goToNext);

    /* ---------- Drag / Swipe ---------- */
    function onDragStart(e) {
      isDragging = true;
      isPaused = true;

      startX = e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;

      prevTranslate = -currentIndex * getStep();
      track.style.transition = "none";
    }

    function onDragMove(e) {
      if (!isDragging) return;

      const currentX = e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;

      const delta = currentX - startX;
      currentTranslate = prevTranslate + delta;

      setTranslate(currentTranslate);
    }

    function onDragEnd() {
      if (!isDragging) return;

      isDragging = false;
      isPaused = false;

      const movedBy = currentTranslate - prevTranslate;
      const threshold = getStep() * 0.2;

      if (movedBy < -threshold) {
        goToNext();
      } else if (movedBy > threshold) {
        goToPrev();
      } else {
        goToIndex(currentIndex);
      }
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
      { threshold: 0.25 }
    );

    observer.observe(carousel);

    /* ---------- Init ---------- */
    goToIndex(0);
  });
});
