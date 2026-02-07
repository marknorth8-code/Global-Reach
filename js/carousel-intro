// Intro Images Carousel
const introImages = [
  '/images/placeholder/intro-01.jpg',
  '/images/placeholder/intro-02.jpg',
  '/images/placeholder/intro-03.jpg',
  '/images/placeholder/intro-04.jpg'
];

let currentIntroIndex = 0;
const introImageDiv = document.getElementById('intro-image');

function changeIntroImage() {
  introImageDiv.style.backgroundImage = `url('${introImages[currentIntroIndex]}')`;
  currentIntroIndex = (currentIntroIndex + 1) % introImages.length;
}

// Initialize
changeIntroImage();
setInterval(changeIntroImage, 4000); // change every 4 seconds
