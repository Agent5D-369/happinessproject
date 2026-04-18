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

const isSpanish = document.documentElement.lang === "es";

document.querySelectorAll(".stack-form").forEach((form) => {
  if (form.querySelector(".form-disclosure")) {
    return;
  }

  const disclosure = document.createElement("div");
  disclosure.className = "form-disclosure";
  disclosure.innerHTML = isSpanish
    ? `<label class="checkbox-row"><input type="checkbox" required><span>Doy mi consentimiento para que Happiness Project use esta informaci&oacute;n para responder mi consulta y gestionarla seg&uacute;n la <a href="privacy.html">Pol&iacute;tica de Privacidad</a>.</span></label><p>Los datos que nos ayudan a identificarte y responderte son necesarios si quieres seguimiento. Si no los compartes, es posible que no podamos atender tu solicitud. No env&iacute;es datos sensibles ni informaci&oacute;n m&eacute;dica por este formulario.</p>`
    : `<label class="checkbox-row"><input type="checkbox" required><span>I consent to Happiness Project using this information to respond to my inquiry and handle it according to the <a href="privacy.html">Privacy Policy</a>.</span></label><p>The details that help us identify you and reply are necessary if you want a follow-up. If you do not provide them, we may not be able to process your request. Please do not send sensitive personal or medical information through this form.</p>`;

  const primaryButton = form.querySelector(".button.button-primary");
  if (primaryButton) {
    form.insertBefore(disclosure, primaryButton);
  } else {
    form.appendChild(disclosure);
  }
});

document.querySelectorAll(".site-footer").forEach((footer) => {
  if (footer.querySelector(".footer-legal")) {
    return;
  }

  const legal = document.createElement("div");
  legal.className = "footer-legal";
  legal.innerHTML = isSpanish
    ? `<a href="privacy.html">Pol&iacute;tica de Privacidad</a><a href="terms.html">T&eacute;rminos de Uso</a><a href="accessibility.html">Accesibilidad</a>`
    : `<a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms of Use</a><a href="accessibility.html">Accessibility</a>`;
  footer.appendChild(legal);
});
