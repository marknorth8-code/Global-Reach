// include.js
function includeHTML() {
  const includes = [
    { id: "header", file: "/includes/header.html" },
    { id: "footer", file: "/includes/footer.html" }
  ];

  includes.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      fetch(item.file)
        .then(res => res.text())
        .then(html => el.innerHTML = html)
        .catch(err => console.error(`Failed to load ${item.file}:`, err));
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
