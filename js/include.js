// ================= INCLUDE.JS (WITH DYNAMIC GRID) =================
function includeHTML() {
  const includes = [
    { id: "header", file: "./partials/header.html" },
    { id: "footer", file: "./partials/footer.html" }
  ];

  const loadPromises = includes.map(item => {
    const el = document.getElementById(item.id);
    if (!el) return Promise.resolve();

    return fetch(item.file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${item.file}`);
        return response.text();
      })
      .then(html => {
        el.innerHTML = html;
        if (item.id === "header") initHeader();
      })
      .catch(err => console.error(err));
  });

  // After Header/Footer are handled, check for the Dynamic Property Grid
  return Promise.all(loadPromises).then(() => {
    initDynamicGrid();
  });
}

// ================= DYNAMIC GRID LOADER =================
function initDynamicGrid() {
  const gridContainer = document.getElementById("opportunities-grid");
  if (!gridContainer) return;

  // 1. Get the current filename (e.g., 'brazil.html' -> 'brazil')
  const pathParts = window.location.pathname.split("/");
  const fileName = pathParts.pop() || "index.html";
  const pageBase = fileName.split(".")[0];

  // 2. Map the page name to the correct JSON file
  let jsonFile = pageBase;
  if (pageBase === "brazil") jsonFile = "br"; // Maps brazil.html to br-data.json
  if (pageBase === "japan") jsonFile = "jp";  // Maps japan.html to jp-data.json

  const jsonPath = `./data/${jsonFile}-data.json`;

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error(`No JSON found at ${jsonPath}`);
      return response.json();
    })
    .then(data => {
      const cardsHtml = data.map(prop => `
        <article class="property-card">
          <div class="property-image-container">
             <img src="${prop.image}" alt="${prop.title}" loading="lazy">
             <div class="property-overlay">
                <h3 class="sharp-text">${prop.title}</h3>
             </div>
          </div>
          <div class="property-info">
             <p class="prop-detail"><strong>${prop.line1}</strong></p>
             <p class="prop-detail">${prop.line2}</p>
             <p class="prop-detail">${prop.line3}</p>
          </div>
        </article>
      `).join("");

      gridContainer.innerHTML = cardsHtml;
    })
    .catch(err => console.warn("Dynamic grid skipped:", err.message));
}


// ================= HEADER INIT =================
function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!header) return;

  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "" || currentPath === "/") currentPath = "index.html";
  
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav a, .locations-dropdown a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
      const parentDropdown = link.closest('.has-dropdown');
      if (parentDropdown) {
        const parentBtn = parentDropdown.querySelector('.nav-link');
        if (parentBtn) parentBtn.classList.add('active');
      }
    }
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
  });

  toggle?.addEventListener("click", () => {
    const isVisible = mobileNav.style.display === "block";
    mobileNav.style.display = isVisible ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!isVisible));
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
