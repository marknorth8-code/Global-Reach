(function () {

  function initCarousel(carousel) {
    if (!carousel) return;
    if (carousel.dataset.initialised === "true") return;

    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    let index = 0;
    let slideWidth = 0;

    function calculateSlideWidth() {
      const viewport = carousel.querySelector('.carousel-viewport');
      
      // Measure the width established by your CSS (the 60% slot)
      // getBoundingClientRect is more precise than offsetWidth
      const rect = viewport.getBoundingClientRect();
      slideWidth = rect.width;

      // DO NOT set slide.style.width here. 
      // Letting the CSS (flex: 0 0 100% or calc) handle the width 
      // is what preserves the 24px side gap.
    }

    function moveToSlide(i) {
      // Ensure we have a valid width before moving
      if (slideWidth > 0) {
        track.style.transform = `translateX(-${i * slideWidth}px)`;
      }
    }

    function goNext() {
      index = (index + 1) % slides.length;
      moveToSlide(index);
    }

    function goPrev() {
      index = (index - 1 + slides.length) % slides.length;
      moveToSlide(index);
    }

    function handleResize() {
      calculateSlideWidth();
      moveToSlide(index);
    }

    // Initialize width after a tiny delay to ensure CSS is painted
    setTimeout(() => {
      calculateSlideWidth();
      moveToSlide(index);
    }, 50);

    // Events
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    
    window.addEventListener('resize', handleResize);
    
    // Recalculate once images are fully loaded to ensure correct alignment
    window.addEventListener('load', handleResize);

    carousel.dataset.initialised = "true";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

})();
