const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const contactForms = document.querySelectorAll(".contact-form");
const serviceSelect = document.getElementById("serviceSelect");

const setPressedState = (items, activeItem) => {
  items.forEach((item) => {
    const isActive = item === activeItem;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
};

const updateChrome = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

  header?.classList.toggle("is-scrolled", window.scrollY > 24);
  if (progress) {
    progress.style.width = `${Math.min(scrollRatio, 100)}%`;
  }
};

updateChrome();
window.addEventListener("scroll", updateChrome, { passive: true });

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    header?.classList.toggle("menu-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      header?.classList.remove("menu-active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = Array.from(document.querySelectorAll("main section[id]"));
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -48% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const principleButtons = document.querySelectorAll(".principle-item");
const principleDetail = document.getElementById("principleDetail");
principleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPressedState(principleButtons, button);
    if (principleDetail) {
      principleDetail.textContent = button.dataset.principle;
    }
  });
});

const processTabs = document.querySelectorAll(".process-tab");
const processStage = document.getElementById("processStage");
const processCopy = document.getElementById("processCopy");
processTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setPressedState(processTabs, tab);
    if (processStage) processStage.textContent = tab.dataset.stage;
    if (processCopy) processCopy.textContent = tab.dataset.copy;
  });
});

const timelineItems = document.querySelectorAll(".timeline-item");
const heritageLine = document.getElementById("heritageLine");
timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    setPressedState(timelineItems, item);
    if (heritageLine) {
      heritageLine.textContent = `${item.dataset.year} - ${item.dataset.copy}`;
    }
  });
});

const fleetOptions = document.querySelectorAll(".fleet-option");
const fleetCopy = document.getElementById("fleetCopy");
fleetOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setPressedState(fleetOptions, option);
    if (fleetCopy) {
      fleetCopy.textContent = option.dataset.copy;
    }
  });
});

const servicePills = document.querySelectorAll(".service-pill");
servicePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    servicePills.forEach((item) => item.classList.toggle("is-active", item === pill));
    if (serviceSelect) {
      serviceSelect.value = pill.dataset.service;
    }
  });
});

const driverCards = document.querySelectorAll("[data-driver-card]");
driverCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -14;

    card.classList.add("is-tilting");
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.classList.remove("is-tilting");
    card.style.transform = "";
    card.style.removeProperty("--mx");
    card.style.removeProperty("--my");
  });
});

contactForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    if (message) {
      message.textContent = "Solicitud recibida. El equipo de Autos Alegre contactar\u00e1 para concretar el servicio.";
    }
  });
});
