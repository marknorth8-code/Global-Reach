/* ================= 1. SHARED LOADERS (Header/Footer) ================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("../header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        initMobileNav();
      });
  }

  if (footer) {
    fetch("../footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      });
  }
  
  // Initialize other components
  initCarousel();
  loadPropertyGrid(); 
});

/* ================= 2. MOBILE NAVIGATION ================= */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

/* ================= 3. PROPERTY GRID (JSON & Lazy Loading) ================= */
async function loadPropertyGrid() {
  const gridContainer = document.querySelector(".property-grid");
  if (!gridContainer) return;

  try {
    const response = await fetch("data/properties.json");
    if (!response.ok) throw new Error("Could not load properties data.");
    const properties = await response.json();

    gridContainer.innerHTML = ""; // Clear existing placeholders

    properties.forEach(prop => {
      const card = document.createElement("article");
      card.className = "property-card";

      // 1200x800 for Locations, 800x533 for Services as discussed
      const imgWidth = prop.width || 800;
      const imgHeight = prop.height || 533;

      card.innerHTML = `
        <div class="property-image-container" style="aspect-ratio: ${imgWidth}/${imgHeight}; overflow: hidden; background: #f0f0f0;">
          <img src="${prop.src}" 
               alt="${prop.alt}" 
               width="${imgWidth}" 
               height="${imgHeight}" 
               loading="lazy" 
               style="width: 100%; height: 100%; object-fit: cover; display: block;">
        </div>
        <p class="property-title" style="padding: 12px; font-weight: 600;">${prop.name}</p>
      `;
      
      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Property Grid Error:", error);
  }
}

/* ================= 4. HOME CAROUSEL ================= */
function initCarousel() {
  const carousel = document.querySelector('.home-carousel');
  if (!carousel || carousel.dataset.initialised) return;

  const track = carousel.querySelector('.carousel-track');
  const items = carousel.querySelectorAll('.project-box');
  const left = carousel.querySelector('.carousel-arrow.left');
  const right = carousel.querySelector('.carousel-arrow.right');
  const wrapper = carousel.querySelector('.carousel-wrapper');

  if (!track || !items.length || !left || !right || !wrapper) return;

  carousel.dataset.initialised = "true";
  
  let currentTranslate = 0;
  const gap = parseInt(getComputedStyle(track).gap) || 40;

  function getItemWidth() { return items[0].getBoundingClientRect().width; }

  function getMaxScroll() {
    const totalWidth = items.length * (getItemWidth() + gap) - gap;
    return Math.max(totalWidth - wrapper.clientWidth, 0);
  }

  function updateTranslate() {
    const maxScroll = getMaxScroll();
    currentTranslate = Math.min(0, Math.max(currentTranslate, -maxScroll));
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  left.addEventListener('click', () => {
    currentTranslate += getItemWidth() + gap;
    updateTranslate();
  });

  right.addEventListener('click', () => {
    currentTranslate -= getItemWidth() + gap;
    updateTranslate();
  });

  // Basic Mouse Dragging
  let dragging = false, startX = 0, prevTranslate = 0;
  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    track.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    track.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    updateTranslate();
  });

  window.addEventListener('resize', updateTranslate);
  updateTranslate();
}
