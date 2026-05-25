const cleanPath = window.location.pathname.replace(/index\.html$/, "");
if (cleanPath !== window.location.pathname) {
  window.history.replaceState(null, "", cleanPath + window.location.search + window.location.hash);
}

const email = "rendonfredy31@gmail.com";
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = document.body.dataset.page || "inicio";

navLinks.forEach((link) => {
  const isCurrent = link.dataset.pageLink === currentPage;
  link.classList.toggle("active", isCurrent);
  if (isCurrent) link.setAttribute("aria-current", "page");

  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir navegación");
    }
  });
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar navegación" : "Abrir navegación");
  });
}

const copyButton = document.querySelector("[data-copy-email]");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Email copiado";
    } catch (error) {
      copyButton.textContent = email;
    }
    setTimeout(() => copyButton.textContent = "Copiar email", 2200);
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
