// ================= INCLUDE.HTML =================
// Dynamically loads header and footer into any page
// Works for pages in subfolders or at root
// Requires <div id="header"></div> and <div id="footer"></div> in HTML

function includeHTML() {
  const includes = [
    { id: "header", file: "/includes/header.html" },
    { id: "footer", file: "/includes/footer.html" }
  ];

  includes.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      fetch(item.file)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${item.file}: ${response.status}`);
          return response.text();
        })
        .then(html => el.innerHTML = html)
        .catch(err => console.error(err));
    }
  });
}

// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", includeHTML);
