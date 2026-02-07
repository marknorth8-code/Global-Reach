/* =========================================================
   CAROUSEL ENGINE
   Bundle 1 + 2 + 3
   Interaction + A11y + Infinite Looping
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const id = carousel.id;
    const config =
      (window.CAROUSEL_CONFIGS && window.CAROUSEL_CONFIGS[id]) || {};

    const track = carousel.querySelector(".carousel-track");
    let items = Array.from(track.children);
    if (!track || items.length === 0) return;

    const isLooping = !!config.loop;

    /* ================= CLONE SLIDES ================= */
    let realCount = items.length;
    let startIndex = 0;

    if (isLooping && realCount > 1) {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[realCount - 1].cloneNode(true);

      firstClone.classList.add("is-clone");
      lastClone.classList.add("is-clone");

      track.appendChild(firstClone);
      track.insertBefore(lastClone, items[0]);

      items = Array.from(track.children);
      startIndex = 1;
    }

    /* ================= STATE ================= */
    let currentIndex = startIndex;
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
    carousel.setAttribute("aria-roledescription", "carousel");
    carousel.setAttribute(
      "aria-label",
      config.ariaLabel || "Image carousel"
    );
    carousel.tabIndex = 0;

    items.forEach((item, i) => {
      item.setAttribute("role", "group");
      item.setAttribute("aria-roledescription", "slide");
      item.setAttribute(
        "aria-label",
        `${((i - 1 + realCount) % realCount) + 1} of ${realCount}`
      );
    });

    /* ================= COUNTER ================= */
    const counter = carousel.querySelector(".carousel-counter");
    const currentEl = counter?.querySelector(".current");
    const totalEl = counter?.querySelector(".total");

    if (totalEl) totalEl.textContent = realCount;

    function updateCounter() {
      if (!currentEl) return;
      const realIndex =
        ((currentIndex - startIndex) % realCount + realCount) % realCount;
      currentEl.textContent = realIndex + 1;
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

    /* ================= MOVEMENT ================= */
    function goToIndex(index, animate = true) {
      const step = getStep();
      currentIndex = index;
      currentTranslate = -index * step;

      setTranslate(currentTranslate, animate);
      updateCounter();
    }

    function goToNext() {
      goToIndex(currentIndex + 1);
    }

    function goToPrev() {
      goToIndex(currentIndex - 1);
    }

    /* ================= LOOP FIX ================= */
    track.addEventListener("transitionend", () => {
      if (!isLooping) return;

      if (currentIndex === 0) {
        goToIndex(realCount, false);
      }

      if (currentIndex === items.length - 1) {
        goToIndex(startIndex, false);
      }
    });

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
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
      }
    });

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
    requestAnimationFrame(() => {
      goToIndex(startIndex, false);
    });
  });
});
