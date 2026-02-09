document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("services-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const prev = carousel.querySelector(".locations-prev");
  const next = carousel.querySelector(".locations-next");
  const item = track.querySelector(".carousel-item");

  if (!track || !prev || !next || !item) return;

  const gap = parseInt(getComputedStyle(track).gap) || 32;

  function scrollAmount() {
    return item.offsetWidth + gap;
  }

  prev.addEventListener("click", () => {
    track.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth"
    });
  });

  next.addEventListener("click", () => {
    track.scrollBy({
      left: scrollAmount(),
      behavior: "smooth"
    });
  });
});
