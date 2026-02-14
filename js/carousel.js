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
      
      // FIX: Use getBoundingClientRect for precise width calculation
      // This ensures the JS sees the exact "box" the CSS has created
      slideWidth = viewport.getBoundingClientRect().width;

      // FIX: Force the track and slides to match this calculated width
      // This prevents high-res images from "pushing" the track wider
      if (track) track.style.width = (slideWidth * slides.length) + 'px';
      
      slides.forEach(slide => {
        // Only force 100% width for the Office and Work carousels
        // We let the Services carousel handle its own multi-card math via CSS
        if (!carousel.classList.contains('services-carousel')) {
           slide.style.width = slideWidth + 'px';
        }
      });
    }

    function moveToSlide(i) {
      // FIX: Added a check to ensure slideWidth isn't 0
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

    // Init
    // Added a small timeout to ensure the browser has finished painting the CSS
    setTimeout(() => {
      calculateSlideWidth();
      moveToSlide(index);
    }, 50);

    // Events
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    
    window.addEventListener('resize', handleResize);
    // Added 'load' event to recalculate once all images are actually visible
    window.addEventListener('load', handleResize);

    carousel.dataset.initialised = "true";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

})();
