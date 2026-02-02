async function loadPartial(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#header", "/partials/header.html");
  loadPartial("#footer", "/partials/footer.html");
});
