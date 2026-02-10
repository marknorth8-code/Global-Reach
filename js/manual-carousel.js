document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel[data-carousel="manual"]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    const items = track?.querySelectorAll('.carousel-item');

    if (!track || !prev || !next || !items.length) return;

    const type = carousel.dataset.carouselType || "full";
    let index = 0;

    function slideWidth() {
      return items[0].getBoundingClientRect().width;
    }

    function update() {
      if (type === "strip") {
        track.style.transform = `translateX(-${index * slideWidth()}px)`;
        next.disabled = index >= items.length - 1;
      } else {
        track.style.transform = `translateX(-${index * 100}%)`;
        next.disabled = index >= items.length - 1;
      }

      prev.disabled = index === 0;
    }

    next.addEventListener("click", () => {
      if (index < items.length - 1) {
        index++;
        update();
      }
    });

    prev.addEventListener("click", () => {
      if (index > 0) {
        index--;
        update();
      }
    });

    update();
  });
});
