/* ================= 1. SHARED LOADERS (Header/Footer) ================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // Load Header
  if (header) {
    fetch("../header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        initMobileNav();
      })
      .catch(err => console.error("Header load failed:", err));
  }

  // Load Footer
  if (footer) {
    fetch("../footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      })
      .catch(err => console.error("Footer load failed:", err));
  }
  
  // Initialize dynamic content
  initCarousel();
  loadInsightsGrid(); 
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

/* ================= 3. INSIGHTS GRID (Dynamic JSON) ================= */
async function loadInsightsGrid() {
  const gridContainer = document.querySelector(".property-grid"); // or .insights-grid
  if (!gridContainer) return;

  try {
    // Points to your specific JSON location
    const response = await fetch("insights/JS/insights-data.json");
    if (!response.ok) throw new Error("Network response was not ok");
    
    const insights = await response.json();
    gridContainer.innerHTML = ""; 

    insights.forEach((item) => {
      const card = document.createElement("article");
      card.className = "property-card";
      
      // Using 1200x800 to maintain professional aspect ratio
      const imgWidth = 1200;
      const imgHeight = 800;

      card.innerHTML = `
        <a href="${item.link}" style="text-decoration: none; color: inherit; display: block;">
          <div class="property-image-container" style="aspect-ratio: ${imgWidth}/${imgHeight}; overflow: hidden; background: #f4f4f4;">
            <img src="${item.image}" 
                 alt="${item.caption}" 
                 width="${imgWidth}" 
                 height="${imgHeight}" 
                 loading="lazy" 
                 style="width: 100%; height: 100%; object-fit: cover; display: block;">
          </div>
          <div class="insight-content" style="padding: 20px;">
            <p style="font-size: 0.85rem; color: #888; margin-bottom: 8px; text-transform: uppercase;">${item.date}</p>
            <h3 style="margin: 0 0 12px 0; font-size: 1.3rem; line-height: 1.4; color: #1a1a1a;">${item.title}</h3>
            <p style="font-size: 1rem; line-height: 1.6; color: #555; margin: 0;">${item.summary}</p>
          </div>
        </a>
      `;
      
      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching insights:", error);
    gridContainer.innerHTML = "<p>Latest insights are currently unavailable.</p>";
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

  // Dragging logic
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
