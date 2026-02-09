document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".locations-carousel-wrapper");

  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector(".locations-carousel-track");
    const prevBtn = wrapper.querySelector(".locations-prev");
    const nextBtn = wrapper.querySelector(".locations-next");

    if (!track || !prevBtn || !nextBtn) return;

    function getScrollAmount() {
      return track.offsetWidth;
    }

    prevBtn.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });
  });
});
