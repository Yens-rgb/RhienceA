document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const burger = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("navMenu");
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      const expanded = navMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(expanded));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const pills = document.querySelectorAll(".tab-pill");
  const cards = document.querySelectorAll(".exp-card");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.getAttribute("data-filter");
      cards.forEach((card) => {
        const type = card.getAttribute("data-type");
        if (filter === "all" || type === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  const form = document.getElementById("inquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const topic = document.getElementById("senderTopic").value;
      const details = document.getElementById("senderDetails").value.trim();

      const subject = encodeURIComponent(`Client Inquiry: ${topic} — ${name}`);
      const body = encodeURIComponent(
        `Hi Rhience,

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${details}`
      );
      window.location.href = `mailto:asuncionrhience@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
