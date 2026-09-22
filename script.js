/* Local Growth — simple vanilla JavaScript */

const WHATSAPP_NUMBER = "917052188081";
const WHATSAPP_MESSAGE = "Hello, I want to know more about your Local SEO and Google Business Profile services.";

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Mobile navigation
  // -----------------------------
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // -----------------------------
  // Smooth scrolling
  // -----------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // -----------------------------
  // Reference image slider
  // -----------------------------
  const slider = document.getElementById("referenceSlider");
  const slides = slider ? [...slider.querySelectorAll(".slide")] : [];
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const dotsWrap = document.querySelector(".slider-dots");
  let currentSlide = 0;

  if (slider && slides.length) {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `slider-dot${index === 0 ? " active" : ""}`;
      dot.setAttribute("aria-label", `Show image ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsWrap.appendChild(dot);
    });

    const dots = [...dotsWrap.querySelectorAll(".slider-dot")];

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    }

    prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

    let scrollTimer;
    slider.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        currentSlide = Math.max(0, Math.min(slides.length - 1, index));
        dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
      }, 80);
    }, { passive: true });
  }

  // -----------------------------
  // FAQ accordion
  // -----------------------------
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        openItem.querySelector(".faq-question span:last-child").textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        button.querySelector("span:last-child").textContent = "−";
      }
    });
  });

  // -----------------------------
  // WhatsApp buttons
  // -----------------------------
  document.querySelectorAll("[data-whatsapp]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      const cleanNumber = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
      const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  // -----------------------------
  // Contact form validation
  // -----------------------------
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      let valid = true;
      clearErrors();

      const name = document.getElementById("name");
      const businessName = document.getElementById("businessName");
      const phone = document.getElementById("phone");
      const businessType = document.getElementById("businessType");
      const city = document.getElementById("city");
      const website = document.getElementById("website");

      if (name.value.trim().length < 2) { setError(name, "Please enter your name."); valid = false; }
      if (businessName.value.trim().length < 2) { setError(businessName, "Please enter your business name."); valid = false; }
      if (!/^[0-9+\-\s()]{7,20}$/.test(phone.value.trim())) { setError(phone, "Please enter a valid phone number."); valid = false; }
      if (businessType.value.trim().length < 2) { setError(businessType, "Please enter your business type."); valid = false; }
      if (city.value.trim().length < 2) { setError(city, "Please enter your city."); valid = false; }
      if (website.value.trim() && !isValidUrl(website.value.trim())) { setError(website, "Please enter a valid website URL."); valid = false; }

      if (!valid) {
        formStatus.textContent = "Please check the highlighted fields.";
        formStatus.style.color = "#c23b3b";
        return;
      }

      const subject = `Local Growth Enquiry - ${businessName.value.trim()}`;
      const body = [
        `Name: ${name.value.trim()}`,
        `Business Name: ${businessName.value.trim()}`,
        `Phone: ${phone.value.trim()}`,
        `Business Type: ${businessType.value.trim()}`,
        `City: ${city.value.trim()}`,
        `Current Website: ${website.value.trim() || "Not provided"}`,
        `Message: ${document.getElementById("message").value.trim() || "Not provided"}`
      ].join("\n");

      formStatus.textContent = "Opening your email app with the enquiry...";
      formStatus.style.color = "#087b40";
      window.location.href = `mailto:om20253040@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast("Email draft prepared.");
    });
  }

  // -----------------------------
  // Scroll reveal
  // -----------------------------
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // -----------------------------
  // Active navigation link
  // -----------------------------
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".primary-nav a[href^='#']");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.primary-nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // -----------------------------
  // Back to top
  // -----------------------------
  const backTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  function setError(input, message) {
    const field = input.closest(".field");
    field.classList.add("invalid");
    field.querySelector(".error-message").textContent = message;
  }
  function clearErrors() {
    document.querySelectorAll(".field.invalid").forEach(field => field.classList.remove("invalid"));
    document.querySelectorAll(".error-message").forEach(error => error.textContent = "");
    if (formStatus) formStatus.textContent = "";
  }
  function isValidUrl(value) {
    try { new URL(value); return true; } catch { return false; }
  }
  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }
});
const slider = document.querySelector(".gbp-slider");
const nextBtn = document.querySelector(".gbp-next");
const prevBtn = document.querySelector(".gbp-prev");


// Next Image
nextBtn.addEventListener("click", function () {

  slider.scrollBy({
    left: slider.clientWidth,
    behavior: "smooth"
  });

});


// Previous Image
prevBtn.addEventListener("click", function () {

  slider.scrollBy({
    left: -slider.clientWidth,
    behavior: "smooth"
  });

});
