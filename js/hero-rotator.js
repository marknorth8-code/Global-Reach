(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".intro-image");
    const caption = document.getElementById("image-caption");
    
    // Safety check: Exit if elements aren't found
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
    let timer;

    // Core Update Function
    function updateHero() {
      hero.style.backgroundImage = `url(${slides[current].url})`;
      caption.textContent = slides[current].label;
    }

    // Timer Controls
    const start = () => { if (!timer) timer = setInterval(rotate, 5000); };
    const stop = () => { clearInterval(timer); timer = null; };
    const rotate = () => {
      current = (current + 1) % slides.length;
      updateHero();
    };

    // 1. Performance: Stop when scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? start() : stop();
    }, { threshold: 0.1 });

    observer.observe(hero);

    // 2. Battery: Stop when tab is hidden
    document.addEventListener("visibilitychange", () => {
      (document.hidden) ? stop() : start();
    });

    // Set initial state
    updateHero();
  });
})();
