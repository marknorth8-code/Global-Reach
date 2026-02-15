(function () {
  function initCarousel(carousel) {
    if (!carousel || carousel.dataset.initialised === "true") return;

    const track = carousel.querySelector('.carousel-track');
    const viewport = carousel.querySelector('.carousel-viewport');
    if (!track || !viewport) return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    let index = 0;
    let scrollStep = 0;

    function calculateMetrics() {
      const viewportWidth = viewport.getBoundingClientRect().width;
      
      if (carousel.classList.contains('services-carousel')) {
        // Measure exactly one card
        const firstSlide = slides[0].getBoundingClientRect();
        // Step = Card Width + 30px Gap (defined in CSS)
        scrollStep = firstSlide.width + 30;
      } else {
        // Standard full-width behavior
        scrollStep = viewportWidth;
        slides.forEach(slide => {
          slide.style.width = scrollStep + 'px';
        });
      }
    }

    function moveToSlide(i) {
      if (scrollStep > 0) {
        // Prevent scrolling past the end for multi-carousels
        if (carousel.classList.contains('services-carousel')) {
            const maxIndex = slides.length - 3; // Stop when the last 3 are visible
            index = Math.max(0, Math.min(i, maxIndex));
        } else {
            index = (i + slides.length) % slides.length;
        }
        track.style.transform = `translateX(-${index * scrollStep}px)`;
      }
    }

    function goNext() {
      moveToSlide(index + 1);
    }

    function goPrev() {
      moveToSlide(index - 1);
    }

    function handleResize() {
      calculateMetrics();
      moveToSlide(index);
    }

    setTimeout(() => {
      calculateMetrics();
      moveToSlide(index);
    }, 100);

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    carousel.dataset.initialised = "true";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });
})();
