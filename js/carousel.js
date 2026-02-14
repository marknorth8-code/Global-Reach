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
      
      // 1. Measure the width of the 60% slot established by your CSS
      const rect = viewport.getBoundingClientRect();
      slideWidth = rect.width;

      // 2. THE GAP FIX: Force each slide to be exactly one viewport wide.
      // This stops high-res images from "bulging" the track and eating the side gap.
      // We skip this for 'services-carousel' because it shows 3 items at once via CSS math.
      if (!carousel.classList.contains('services-carousel')) {
        slides.forEach(slide => {
          slide.style.width = slideWidth + 'px';
        });
      }
    }

    function moveToSlide(i) {
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

    // Init - 50ms delay ensures CSS layout is ready for measurement
    setTimeout(() => {
      calculateSlideWidth();
      moveToSlide(index);
    }, 50);

    // Events
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    
    window.addEventListener('resize', handleResize);
    
    // Recalculate once images are fully loaded to ensure gaps are perfect
    window.addEventListener('load', handleResize);

    carousel.dataset.initialised = "true";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

})();
