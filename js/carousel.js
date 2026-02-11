(function () {

  function initCarousel(carousel) {
    if (!carousel) return;
    if (carousel.dataset.initialised) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    if (!track || slides.length === 0) return;

    let index = 0;
    let slideWidth = slides[0].getBoundingClientRect().width;

    function updateSlideWidth() {
      slideWidth = slides[0].getBoundingClientRect().width;
      moveToSlide(index);
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

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);

    window.addEventListener('resize', updateSlideWidth);

    carousel.dataset.initialised = "true";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

})();
