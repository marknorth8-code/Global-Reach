(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector(".intro-image");
    if (!hero) return;

    const images = [
      "/images/home/hero01.webp",
      "/images/home/hero02.webp",
      "/images/home/hero03.webp"
    ];

    let current = 0;

    // Set initial image
    hero.style.backgroundImage = `url(${images[current]})`;

    setInterval(function () {
      current = (current + 1) % images.length;
      hero.style.backgroundImage = `url(${images[current]})`;
    }, 5000); // change every 5 seconds

  });

})();
