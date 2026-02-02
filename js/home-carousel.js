document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("featuredTrack");
  if (!track) return;

  // Duplicate content for seamless looping
  track.innerHTML += track.innerHTML;

  let scrollSpeed = 0.3; // pixels per frame
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      track.scrollLeft += scrollSpeed;

      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(animate);
  }

  track.addEventListener("mouseenter", () => isPaused = true);
  track.addEventListener("mouseleave", () => isPaused = false);
  track.addEventListener("touchstart", () => isPaused = true);
  track.addEventListener("touchend", () => isPaused = false);

  animate();
});
