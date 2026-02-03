document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".home-featured-track");
  if (!track) return;

  let scrollSpeed = 0.3; // px per frame
  let isPaused = false;

  function autoScroll() {
    if (!isPaused) {
      track.scrollLeft += scrollSpeed;

      // Loop seamlessly
      if (
        track.scrollLeft + track.clientWidth >=
        track.scrollWidth - 1
      ) {
        track.scrollLeft = 0;
      }
    }

    requestAnimationFrame(autoScroll);
  }

  // Pause on hover (desktop)
  track.addEventListener("mouseenter", () => (isPaused = true));
  track.addEventListener("mouseleave", () => (isPaused = false));

  autoScroll();
});
