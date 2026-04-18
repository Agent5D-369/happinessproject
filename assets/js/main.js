const menuToggle = document.querySelector(".menu-toggle");
const body = document.body;

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    body.classList.toggle("menu-open", !expanded);
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
}

const filterChips = document.querySelectorAll(".filter-chip");
filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const group = chip.dataset.filterGroup;
    const filter = chip.dataset.filter;
    document.querySelectorAll(`.filter-chip[data-filter-group="${group}"]`).forEach((button) => {
      button.classList.toggle("is-active", button === chip);
    });

    document.querySelectorAll(`.filter-item[data-group="${group}"]`).forEach((item) => {
      const categories = item.dataset.category || "";
      const matches = filter === "all" || categories.includes(filter);
      item.classList.toggle("is-hidden", !matches);
    });
  });
});
