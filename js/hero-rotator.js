(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".intro-image");
    const caption = document.getElementById("image-caption"); // Selects the caption span
    if (!hero || !caption) return;

    const slides = [
      { url: "images/home/hero-01.webp", label: "Brazil - Bahia State" },
      { url: "images/home/hero-02.webp", label: "Japan - Tokyo Central" },
      { url: "images/home/hero-03.webp", label: "New Zealand - Auckland" },
      { url: "images/home/hero-04.webp", label: "UK - East Midlands" },
      { url: "images/home/hero-05.webp", label: "Strategic Development Site" },
      { url: "images/home/hero-06.webp", label: "Asset Management Portfolio" },
      { url: "images/home/hero-07.webp", label: "Commercial Acquisition" }
    ];

    let current = 0;

    // Function to update both image and text
    function updateHero() {
      hero.style.backgroundImage = `url(${slides[current].url})`;
      caption.textContent = slides[current].label;
    }

    // Set initial state
    updateHero();

    setInterval(function () {
      current = (current + 1) % slides.length;
      updateHero();
    }, 5000); // change every 5 seconds
  });
})();
