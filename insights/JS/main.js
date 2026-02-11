/* ============================================================
   GLOBAL INITIALIZATION
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load shared components (Header/Footer)
  loadComponent("header", "header.html", initMobileNav);
  loadComponent("footer", "footer.html", updateFooterYear);

  // 2. Identify and initialize page-specific features
  const insightsGrid = document.getElementById("insightsGrid");
  const homeCarousel = document.querySelector('.home-carousel');

  if (insightsGrid) {
    loadInsightsGrid();
  }

  if (homeCarousel) {
    initCarousel();
  }
});

/* ============================================================
   1. SHARED COMPONENT LOADER
   ============================================================ */
async function loadComponent(id, fileName, callback) {
  const container = document.getElementById(id);
  if (!container) return;

  // Determine path prefix based on current folder depth
  const isSubfolder = window.location.pathname.includes('/articles/');
  const pathPrefix = isSubfolder ? '../../' : '';

  try {
    const res = await fetch(pathPrefix + fileName);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
    if (callback) callback();
  } catch (err) {
    console.error(`Failed to load ${fileName}:`, err);
  }
}

function updateFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ============================================================
   2. INSIGHTS GRID & LAZY LOADING
   ============================================================ */
async function loadInsightsGrid() {
  const gridContainer = document.getElementById("insightsGrid");
  if (!gridContainer) return;

  try {
    // Correct relative path for data fetching
    const response = await fetch("insights/JS/insights-data.json");
    if (!response.ok) throw new Error("JSON fetch failed");
    
    const insights = await response.json();
    gridContainer.innerHTML = ""; // Clear loader if any

    insights.forEach((item) => {
      const card = document.createElement("article");
      card.className = "insight-card";
      
      // Use data-src for lazy loading with Intersection Observer
      card.innerHTML = `
        <a href="${item.link}" class="insight-card-link">
          <div class="image-container">
            <img data-src="${item.image}" 
                 alt="${item.title}" 
                 class="lazy-load-img"
                 loading="lazy">
          </div>
          <div class="insight-content">
            <span class="insight-date">${item.date}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <span class="read-more">Read More</span>
          </div>
        </a>
      `;
      gridContainer.appendChild(card);
    });

    // Initialize Intersection Observer for the newly added images
    initImageLazyLoading();

  } catch (error) {
    console.error("Error building grid:", error);
    gridContainer.innerHTML = "<p>Insights are temporarily unavailable.</p>";
  }
}

/**
 * Modern Lazy Loading using Intersection Observer
 */
function initImageLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-load-img");
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Swap data-src to src
        img.classList.add("loaded");
        observer.unobserve(img); // Stop watching this image
      }
    });
  }, { rootMargin: "0px 0px 200px 0px" }); // Start loading 200px before it enters view

  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ============================================================
   3. NAVIGATION & CAROUSEL (Existing Logic)
   ============================================================ */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => nav.classList.toggle('active'));
  }
}

function initCarousel() {
  // ... Paste your existing initCarousel logic here ...
}
