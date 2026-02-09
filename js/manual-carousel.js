document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {

    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');

    if (!track || !prev || !next) return;

    const items = track.children;
    if (!items.length) return;

    const gap = parseInt(getComputedStyle(track).gap) || 24;

    const step = () => items[0].offsetWidth + gap;

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: step(), behavior: "smooth" });
    });

  });
});
