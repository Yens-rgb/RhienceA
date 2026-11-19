document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  const timelineItems = document.querySelectorAll(".timeline-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      timelineItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("clientName").value.trim();
      const email = document.getElementById("clientEmail").value.trim();
      const service = document.getElementById("serviceNeeded").value;
      const message = document.getElementById("clientMessage").value.trim();

      const subject = encodeURIComponent(`VA Inquiry: ${service} — from ${name}`);
      const body = encodeURIComponent(
        `Hi Rhience,\n\nName: ${name}\nEmail: ${email}\nService Needed: ${service}\n\nDetails:\n${message}\n\nBest regards,\n${name}`
      );

      window.location.href = `mailto:asuncionrhience@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
