<script>
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load from localStorage if user previously selected a theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.add("light-mode");
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    // Save preference
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
</script>
