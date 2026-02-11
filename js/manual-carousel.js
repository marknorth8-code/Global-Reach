document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. LOCATIONS CAROUSEL CONFIG ---------- */
  const locationsContainer = document.getElementById("locations-image-div");
  const locationImages = [
    "images/locations/city-01.webp",
    "images/locations/city-02.webp",
    "images/locations/city-03.webp"
  ];
  const locationAlts = [
    "Global property investment consultancy in London",
    "Modern architectural project in Dubai",
    "Professional surveying services in Singapore"
  ];

  /* ---------- 2. SERVICES CAROUSEL CONFIG ---------- */
  const servicesContainer = document.getElementById("services-image-div");
  const serviceImages = [
    "images/services/consultancy.webp",
    "images/services/surveying.webp",
    "images/services/management.webp"
  ];
  const serviceAlts = [
    "Strategic property investment advice",
    "Chartered surveyors performing site inspection",
    "Expert project management for overseas markets"
  ];

  /* ---------- INITIALIZE CAROUSELS ---------- */
  if (locationsContainer) {
    generateImages(locationsContainer, locationImages, locationAlts, 1200, 800);
  }

  if (servicesContainer) {
    generateImages(servicesContainer, serviceImages, serviceAlts, 800, 533);
  }
});

/**
 * Optimized Image Generator
 * Sets exact dimensions to prevent Layout Shift (CLS)
 * Sets first image to 'eager' for speed (LCP) and others to 'lazy'
 */
function generateImages(container, images, alts, width, height) {
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alts[index] || "Global Reach Property Consultancy";
    img.width = width;   // Your requested exact width
    img.height = height; // Your requested exact height
    
    // SEO Optimization: First image in any carousel must load immediately
    if (index === 0) {
      img.loading = "eager"; 
      img.classList.add("active");
    } else {
      img.loading = "lazy"; 
    }

    container.appendChild(img);
  });
}
