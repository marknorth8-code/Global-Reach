// ========= carousel-intro.js =========

// Array of images (placeholder for now)
const introImages = [
  'https://via.placeholder.com/1200x800/ff7f7f/333333?text=Intro+Image+1',
  'https://via.placeholder.com/1200x800/7fbfff/333333?text=Intro+Image+2',
  'https://via.placeholder.com/1200x800/7fff7f/333333?text=Intro+Image+3',
  'https://via.placeholder.com/1200x800/ffff7f/333333?text=Intro+Image+4'
];

let currentIntroIndex = 0;
const introImageDiv = document.getElementById('intro-image');

if (introImageDiv) {

  // ========= Preload images to avoid flicker =========
  introImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // ========= Function to change image =========
  function changeIntroImage() {
    introImageDiv.style.backgroundImage = `url('${introImages[currentIntroIndex]}')`;
    currentIntroIndex = (currentIntroIndex + 1) % introImages.length;
  }

  // Initialize first image after ensuring DOM is ready
  window.addEventListener('load', () => {
    changeIntroImage();
    // Rotate every 4 seconds
    setInterval(changeIntroImage, 4000);
  });

}
