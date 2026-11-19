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

  // Testimonials Carousel (10 slides)
  const track = document.getElementById("carouselTrack");
  const viewport = document.getElementById("carouselViewport");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsWrap = document.getElementById("carouselDots");

  if (track && viewport && prevBtn && nextBtn && dotsWrap) {
    const slides = Array.from(track.children);
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoTimer = null;

    const getVisibleCount = () => {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 960) return 2;
      return 3;
    };

    const getMaxIndex = () => Math.max(0, totalSlides - getVisibleCount());

    const buildDots = () => {
      const maxIdx = getMaxIndex();
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= maxIdx; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "carousel-dot" + (i === currentIndex ? " active" : "");
        btn.setAttribute("aria-label", `Go to testimonial slide ${i + 1}`);
        btn.addEventListener("click", () => {
          goTo(i);
          restartAuto();
        });
        dotsWrap.appendChild(btn);
      }
    };

    const updateDots = () => {
      const dotButtons = Array.from(dotsWrap.children);
      dotButtons.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    };

    const goTo = (index) => {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      const card = slides[0];
      if (!card) return;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(-${currentIndex * step}px)`;
      updateDots();
    };

    const startAuto = () => {
      stopAuto();
      autoTimer = setInterval(() => {
        goTo(currentIndex + 1);
      }, 5000);
    };

    const stopAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    const restartAuto = () => {
      startAuto();
    };

    prevBtn.addEventListener("click", () => {
      goTo(currentIndex - 1);
      restartAuto();
    });

    nextBtn.addEventListener("click", () => {
      goTo(currentIndex + 1);
      restartAuto();
    });

    viewport.addEventListener("mouseenter", stopAuto);
    viewport.addEventListener("mouseleave", startAuto);

    let startX = 0;
    viewport.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 45) {
        if (diffX < 0) {
          goTo(currentIndex + 1);
        } else {
          goTo(currentIndex - 1);
        }
      }
      startAuto();
    }, { passive: true });

    window.addEventListener("resize", () => {
      buildDots();
      goTo(Math.min(currentIndex, getMaxIndex()));
    });

    buildDots();
    goTo(0);
    startAuto();
  }

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
