const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

const setPressed = (items, activeItem) => {
  items.forEach((item) => {
    const active = item === activeItem;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
};

const closeMenu = () => {
  navigation?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
};

menuButton?.addEventListener("click", () => {
  const open = navigation?.classList.toggle("open") ?? false;
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-driver-card]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = (x / bounds.width - 0.5) * 9;
    const rotateX = (y / bounds.height - 0.5) * -9;
    card.classList.add("is-tilting");
    card.style.setProperty("--mx", `${(x / bounds.width) * 100}%`);
    card.style.setProperty("--my", `${(y / bounds.height) * 100}%`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave", () => {
    card.classList.remove("is-tilting");
    card.style.transform = "";
  });
});

const timelineCards = document.querySelectorAll(".timeline-card");
const timelineStatement = document.getElementById("timeline-statement");
timelineCards.forEach((card) => {
  card.addEventListener("click", () => {
    setPressed(timelineCards, card);
    if (timelineStatement) {
      timelineStatement.textContent = `${card.dataset.story} · ${card.querySelector("em")?.textContent ?? ""}`;
    }
  });
});

const fleetContent = {
  executive: {
    kicker: "Executive sedan",
    title: "Silencio, presencia y precisión.",
    copy: "La elección ideal para aeropuertos, agendas corporativas y desplazamientos individuales de máxima discreción.",
    features: ["Hasta 3 pasajeros", "Equipaje ejecutivo", "Confort premium"],
    image: "hero-chauffeur-pink-tie.png",
  },
  van: {
    kicker: "Premium van",
    title: "Espacio sin renunciar al detalle.",
    copy: "Pensada para familias, grupos reducidos, equipaje especial y equipos que necesitan viajar juntos.",
    features: ["Hasta 7 pasajeros", "Gran capacidad", "Configuración flexible"],
    image: "autosalegre_cover.jpg",
  },
  events: {
    kicker: "Event fleet",
    title: "Una operativa que se mueve como una sola.",
    copy: "Coordinamos múltiples vehículos, horarios y puntos de encuentro para que cada invitado llegue con naturalidad.",
    features: ["Flota coordinada", "Soporte en tiempo real", "Llegadas escalonadas"],
    image: "autosalegre_cover.jpg",
  },
};

const fleetTabs = document.querySelectorAll(".fleet-tab");
fleetTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const content = fleetContent[tab.dataset.fleet];
    if (!content) return;
    setPressed(fleetTabs, tab);
    document.getElementById("fleet-kicker").textContent = content.kicker;
    document.getElementById("fleet-title").textContent = content.title;
    document.getElementById("fleet-copy").textContent = content.copy;
    document.getElementById("fleet-features").innerHTML = content.features.map((feature) => `<li>${feature}</li>`).join("");
    document.getElementById("fleet-image").src = content.image;
  });
});

const bookingSummaryIds = {
  service: "summaryService", origin: "summaryOrigin", destination: "summaryDestination",
  date: "summaryDate", time: "summaryTime", passengers: "summaryPassengers",
  luggage: "summaryLuggage", vehicle: "summaryVehicle", driver: "summaryDriver",
};

const updateBookingSummary = (key, value) => {
  const element = document.getElementById(bookingSummaryIds[key]);
  if (element) element.textContent = String(value || "").trim() || "Pendiente";
};

document.querySelectorAll("[data-booking-group]").forEach((group) => {
  const options = group.querySelectorAll("button[data-value]");
  options.forEach((option) => option.addEventListener("click", () => {
    setPressed(options, option);
    updateBookingSummary(group.dataset.bookingGroup, option.dataset.value);
  }));
});

document.querySelectorAll("[data-booking-field]").forEach((field) => {
  const update = () => updateBookingSummary(field.dataset.bookingField, field.value);
  field.addEventListener("input", update);
  field.addEventListener("change", update);
  update();
});

document.querySelectorAll("[data-booking-demo]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    if (message) message.textContent = "Vista completada. No se ha enviado ni guardado ningún dato.";
  });
});

document.querySelectorAll("[data-demo-form], .drivers-contact .contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    if (message) message.textContent = "Demostración visual: el formulario todavía no envía datos.";
  });
});
