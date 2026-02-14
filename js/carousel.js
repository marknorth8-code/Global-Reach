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
      // FIX 1: Use getBoundingClientRect for sub-pixel accuracy
      slideWidth = viewport.getBoundingClientRect().width;

      // FIX 2: Explicitly tell the slides to match the viewport width
      // This stops the 1200px images from "bulging" the container
      if (!carousel.classList.contains('services-carousel')) {
        slides.forEach(slide => {
          slide.style.width = slideWidth + 'px';
        });
      }
    }

    function moveToSlide(i) {
      track.style.transform = `translateX(-${i * slideWidth}px)`;
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

    // Init - added a small delay to ensure CSS is loaded
    setTimeout(() => {
      calculateSlideWidth();
      moveToSlide(index);
    }, 50);

    // Events
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    window.addEventListener('resize', handleResize);
    // Recalculate on 'load' to ensure image sizes are known
    window.addEventListener('load', handleResize);

    carousel.dataset.initialised = "true";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

})();
