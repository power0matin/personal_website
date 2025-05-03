<script>
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else {
    body.classList.add("light-mode");
  }

  toggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.replace("dark-mode", "light-mode");
      localStorage.setItem("theme", "light-mode");
    } else {
      body.classList.replace("light-mode", "dark-mode");
      localStorage.setItem("theme", "dark-mode");
    }
  });
</script>
