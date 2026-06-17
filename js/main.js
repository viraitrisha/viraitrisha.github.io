const toggle = document.getElementById("themeToggle");

// Apply saved preference on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Toggle on click
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});