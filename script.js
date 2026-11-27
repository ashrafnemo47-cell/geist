"use strict";

/* =========================================
   PHARAOH EGYPT - MAIN SCRIPT
   Language + Booking + Theme + Menu + Contact
   Floating Clock + Governorates
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  // =====================================
  // الساعة القديمة في HTML
  // =====================================

  const datetimeWidget = document.getElementById("datetimeWidget");
  const toggleDateTime = document.getElementById("toggleDateTime");

  toggleDateTime?.addEventListener("click", () => {
    datetimeWidget?.classList.add("is-hidden");

    let showButton = document.getElementById("showDateTime");

    if (!showButton) {
      showButton = document.createElement("button");
      showButton.id = "showDateTime";
      showButton.type = "button";
      showButton.textContent = "🕒";
      showButton.title = "إظهار الساعة";
      showButton.className = "datetime-show-btn";

      document.body.appendChild(showButton);

      showButton.addEventListener("click", () => {
        datetimeWidget?.classList.remove("is-hidden");
        showButton.remove();
      });
    }
  });

  // =====================================
  // ظهور العناصر أثناء التمرير
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 40px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show", "visible");
    });
  }

  // =====================================
  // قراءة اللغة من Google Translate
  // =====================================

  function getGoogleLanguage() {
    const googleSelect = $(".goog-te-combo");

    if (googleSelect?.value) {
      return googleSelect.value;
    }

    try {
      const translateCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("googtrans="));

      if (translateCookie) {
        const value = decodeURIComponent(
          translateCookie.trim().split("=").slice(1).join("="),
        );

        const parts = value.split("/");
        return parts[parts.length - 1] || "ar";
      }
    } catch (error) {
      console.log("Language detection error:", error);
    }

    return "ar";
  }

  // =====================================
  // الساعة والتاريخ الدائري العائم
  // =====================================

  function createFloatingClock() {
    if ($("#pharaoh-floating-clock")) return;

    const style = document.createElement("style");

    style.textContent = `
      #pharaoh-floating-clock {
        position: fixed;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9990;
        width: 150px;
        padding: 12px;
        border: 1px solid rgba(218,174,78,.55);
        border-radius: 22px;
        background: rgba(5,18,39,.91);
        backdrop-filter: blur(14px);
        box-shadow: 0 12px 35px rgba(0,0,0,.35),
                    0 0 22px rgba(218,174,78,.12);
        color: #fff;
        text-align: center;
        font-family: inherit;
        transition: opacity .3s ease, transform .3s ease;
      }

      #pharaoh-floating-clock .clock-title {
        color: #e2bd68;
        font-size: 12px;
        font-weight: 800;
        margin-bottom: 10px;
      }

      #pharaoh-floating-clock .clock-face {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto 10px;
        border-radius: 50%;
        border: 3px solid #d8ad50;
        background: radial-gradient(circle, #142b49 0%, #071326 72%);
        box-shadow: 0 0 0 4px rgba(216,173,80,.12),
                    0 0 20px rgba(216,173,80,.2);
      }

      #pharaoh-floating-clock .clock-center {
        position: absolute;
        width: 9px;
        height: 9px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 50%;
        background: #f3d27d;
        z-index: 5;
      }

      #pharaoh-floating-clock .clock-hand {
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform-origin: bottom center;
        border-radius: 10px;
      }

      #pharaoh-floating-clock .clock-hour {
        width: 4px;
        height: 25px;
        background: #fff;
        margin-left: -2px;
      }

      #pharaoh-floating-clock .clock-minute {
        width: 3px;
        height: 34px;
        background: #e3bd65;
        margin-left: -1.5px;
      }

      #pharaoh-floating-clock .clock-second {
        width: 2px;
        height: 39px;
        background: #ef765e;
        margin-left: -1px;
      }

      #pharaoh-floating-clock .clock-number {
        position: absolute;
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        transform: translate(-50%,-50%);
      }

      #pharaoh-floating-clock .clock-digital {
        color: #f3d27d;
        font-size: 16px;
        font-weight: 900;
        direction: ltr;
        margin-top: 4px;
        letter-spacing: 1px;
      }

      #pharaoh-floating-clock .clock-date {
        color: #d8dce5;
        font-size: 10px;
        margin-top: 5px;
        line-height: 1.6;
      }

      #pharaoh-floating-clock .clock-hide {
        position: absolute;
        top: 5px;
        left: 7px;
        width: 24px;
        height: 24px;
        border: 0;
        border-radius: 50%;
        background: rgba(255,255,255,.12);
        color: #fff;
        cursor: pointer;
        font-size: 15px;
      }

      #pharaoh-clock-show {
        display: none;
        position: fixed;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9991;
        width: 42px;
        height: 42px;
        border: 1px solid #d8ad50;
        border-radius: 50%;
        background: #071a35;
        color: #f3d27d;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 5px 18px rgba(0,0,0,.3);
      }

      #pharaoh-floating-clock.hidden {
        display: none;
      }

      @media(max-width:600px) {
        #pharaoh-floating-clock {
          right: 8px;
          width: 125px;
          padding: 9px;
          border-radius: 17px;
        }

        #pharaoh-floating-clock .clock-face {
          width: 82px;
          height: 82px;
        }

        #pharaoh-floating-clock .clock-hour {
          height: 21px;
        }

        #pharaoh-floating-clock .clock-minute {
          height: 28px;
        }

        #pharaoh-floating-clock .clock-second {
          height: 32px;
        }

        #pharaoh-floating-clock .clock-digital {
          font-size: 14px;
        }
      }

      body.light-mode #pharaoh-floating-clock {
        background: rgba(255,255,255,.94);
        color: #14233b;
        border-color: #c49a3a;
      }

      body.light-mode #pharaoh-floating-clock .clock-face {
        background: radial-gradient(circle,#fff8e8,#e7dcc5);
      }

      body.light-mode #pharaoh-floating-clock .clock-number {
        color: #14233b;
      }

      body.light-mode #pharaoh-floating-clock .clock-date {
        color: #39465a;
      }

      body.light-mode #pharaoh-clock-show {
        background: #fff;
        color: #9c7422;
      }
    `;

    document.head.appendChild(style);

    const clock = document.createElement("div");
    clock.id = "pharaoh-floating-clock";

    clock.innerHTML = `
      <button type="button" class="clock-hide"
        aria-label="إخفاء الساعة" title="إخفاء الساعة">×</button>

      <div class="clock-title">PHARAOH EGYPT</div>

      <div class="clock-face">
        <span class="clock-number" style="left:50%;top:13%">12</span>
        <span class="clock-number" style="left:87%;top:50%">3</span>
        <span class="clock-number" style="left:50%;top:87%">6</span>
        <span class="clock-number" style="left:13%;top:50%">9</span>

        <div class="clock-hand clock-hour" id="clockHour"></div>
        <div class="clock-hand clock-minute" id="clockMinute"></div>
        <div class="clock-hand clock-second" id="clockSecond"></div>
        <div class="clock-center"></div>
      </div>

      <div class="clock-digital" id="clockDigital">00:00:00</div>
      <div class="clock-date" id="clockDate"></div>
    `;

    const showButton = document.createElement("button");
    showButton.id = "pharaoh-clock-show";
    showButton.type = "button";
    showButton.textContent = "◷";
    showButton.title = "إظهار الساعة";
    showButton.setAttribute("aria-label", "إظهار الساعة");

    document.body.appendChild(clock);
    document.body.appendChild(showButton);

    clock.querySelector(".clock-hide").addEventListener("click", () => {
      clock.classList.add("hidden");
      showButton.style.display = "block";
    });

    showButton.addEventListener("click", () => {
      clock.classList.remove("hidden");
      showButton.style.display = "none";
    });
  }

  function updateFloatingClock() {
    const hourHand = $("#clockHour");
    const minuteHand = $("#clockMinute");
    const secondHand = $("#clockSecond");
    const digital = $("#clockDigital");
    const date = $("#clockDate");

    if (!hourHand || !minuteHand || !secondHand) return;

    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;

    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;

    const language = getGoogleLanguage();

    const locale =
      language === "ar" ? "ar-EG" : language === "en" ? "en-GB" : language;

    if (digital) {
      digital.textContent = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }

    if (date) {
      date.textContent = now.toLocaleDateString(locale, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  createFloatingClock();
  updateFloatingClock();
  setInterval(updateFloatingClock, 1000);

  // =====================================
  // تحديث التاريخ والوقت القديمين
  // =====================================

  function updateEgyptDateTime() {
    const dateElement = $("#liveDate");
    const timeElement = $("#liveTime");

    if (!dateElement && !timeElement) return;

    const now = new Date();
    const language = getGoogleLanguage();

    const locale =
      language === "ar" ? "ar-EG" : language === "en" ? "en-GB" : language;

    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    if (timeElement) {
      timeElement.textContent = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }
  }

  updateEgyptDateTime();
  setInterval(updateEgyptDateTime, 1000);

  // =====================================
  // اتجاه الصفحة حسب اللغة
  // =====================================

  function applyLanguageDirection() {
    const language = getGoogleLanguage();

    const rtlLanguages = ["ar", "fa", "ur", "he", "ps", "sd", "ug", "yi"];

    const isRTL = rtlLanguages.includes(language);

    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    // Share the selected language with the standalone Tourism Gallery.
    try {
      localStorage.setItem("pharaoh_language", language === "en" ? "en" : "ar");
    } catch (error) {
      console.warn("Could not save shared language setting.", error);
    }

    document.body.classList.toggle("ltr", !isRTL);
    document.body.classList.toggle("rtl", isRTL);

    updateEgyptDateTime();
    updateFloatingClock();

    if (window.pharaohUpdateDestinationLanguage) {
      window.pharaohUpdateDestinationLanguage();
    }
  }

  // =====================================
  // متابعة تغيير اللغة
  // =====================================

  function watchGoogleTranslate() {
    const googleSelect = $(".goog-te-combo");

    if (!googleSelect || googleSelect.dataset.pharaohReady === "true") {
      return;
    }

    googleSelect.dataset.pharaohReady = "true";

    googleSelect.addEventListener("change", () => {
      setTimeout(applyLanguageDirection, 300);
      setTimeout(applyLanguageDirection, 1000);
    });
  }

  if ("MutationObserver" in window) {
    const translateObserver = new MutationObserver(watchGoogleTranslate);

    translateObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  watchGoogleTranslate();

  // =====================================
  // شاشة التحميل
  // =====================================

  function hideLoader() {
    setTimeout(() => {
      $("#loader")?.classList.add("hide");
    }, 350);
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }

  // =====================================
  // السنة الحالية
  // =====================================

  const year = $("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =====================================
  // القائمة الرئيسية
  // =====================================

  const menuBtn = $("#menuBtn");
  const nav = $("#nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // =====================================
  // نظام التواصل
  // =====================================

  const contactWrapper = $(".contact-menu-wrapper");
  const contactMenuBtn = $("#contactMenuBtn");
  const contactMenu = $("#contactMenu");

  const showWhatsApp = $("#showWhatsApp");
  const goBooking = $("#goBooking");

  function closeContactMenu() {
    contactWrapper?.classList.remove("active");
    contactMenuBtn?.setAttribute("aria-expanded", "false");
  }

  if (contactWrapper && contactMenuBtn && contactMenu) {
    contactMenuBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = contactWrapper.classList.toggle("active");

      contactMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!contactWrapper.contains(event.target)) {
        closeContactMenu();
      }
    });
  }

  function scrollToBooking() {
    closeContactMenu();
    nav?.classList.remove("open");

    const booking = document.getElementById("booking");

    if (!booking) {
      alert("لم يتم العثور على قسم الحجز في الصفحة.");
      return;
    }

    booking.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const firstInput = booking.querySelector(
      "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled])",
    );

    if (firstInput) {
      setTimeout(() => {
        firstInput.focus({ preventScroll: true });
      }, 800);
    }
  }

  // =====================================
  // فتح واتساب مباشرة
  // =====================================

  function openWhatsApp() {
    closeContactMenu();
    nav?.classList.remove("open");

    window.open("https://wa.me/201028348346", "_blank", "noopener,noreferrer");
  }

  showWhatsApp?.addEventListener("click", openWhatsApp);

  // =====================================
  // زر تعبئة البيانات
  // =====================================

  goBooking?.addEventListener("click", scrollToBooking);

  // =====================================
  // أزرار التواصل الموجودة بجوار الحجز
  // =====================================

  document.querySelectorAll("[data-contact-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.contactAction;

      if (action === "whatsapp") {
        openWhatsApp();
      } else if (action === "booking") {
        scrollToBooking();
      }
    });
  });

  // =====================================
  // الضغط على الساعة القديمة
  // =====================================

  datetimeWidget?.addEventListener("click", (event) => {
    if (event.target.closest("#toggleDateTime")) return;

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  // =====================================
  // أقل تاريخ للحجز
  // =====================================

  const dateInput = $("#date");

  if (dateInput) {
    const today = new Date();

    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10);

    dateInput.min = localDate;
  }

  // =====================================
  // نموذج الحجز عبر واتساب
  // =====================================

  const bookingForm = $("#bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const language = getGoogleLanguage();
      const isArabic = language === "ar";

      const required = [
        "name",
        "phone",
        "service",
        "destination",
        "attraction",
      ];

      const missing = required.some((id) => {
        const element = document.getElementById(id);

        return !element || !element.value.trim();
      });

      const formError = $("#formError");

      if (missing) {
        if (formError) {
          formError.textContent = isArabic
            ? "من فضلك أكمل الاسم ورقم الهاتف ونوع الخدمة والمحافظة والمعلم السياحي."
            : "Please complete your name, phone number, service type, destination and tourist attraction.";

          formError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        return;
      }

      if (formError) {
        formError.textContent = "";
      }

      const val = (id) => {
        const element = document.getElementById(id);

        return (
          element?.value.trim() || (isArabic ? "لم يحدد" : "Not specified")
        );
      };

      const msg = isArabic
        ? `طلب حجز جديد - PHARAOH EGYPT

الاسم: ${val("name")}
الهاتف: ${val("phone")}
البريد: ${val("email")}
الدولة: ${val("country")}
الخدمة: ${val("service")}
المحافظة: ${val("destination")}
المعلم السياحي: ${val("attraction")}
التاريخ: ${val("date")}
عدد المسافرين: ${val("people")}
مكان الاستقبال: ${val("pickup")}
تفاصيل إضافية: ${val("details")}`
        : `New booking request - PHARAOH EGYPT

Name: ${val("name")}
Phone: ${val("phone")}
Email: ${val("email")}
Country: ${val("country")}
Service: ${val("service")}
Governorate: ${val("destination")}
Tourist attraction: ${val("attraction")}
Date: ${val("date")}
Travelers: ${val("people")}
Pickup: ${val("pickup")}
Additional details: ${val("details")}`;

      const whatsappURL =
        "https://wa.me/201028348346?text=" + encodeURIComponent(msg);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // =====================================
  // الوضع الليلي والنهاري
  // =====================================

  const themeToggle = $("#themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    const currentTheme = theme === "light" ? "light" : "dark";
    const isLight = currentTheme === "light";

    root.dataset.theme = currentTheme;
    document.body.dataset.theme = currentTheme;

    root.classList.toggle("light-mode", isLight);
    root.classList.toggle("dark-mode", !isLight);

    document.body.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("dark-mode", !isLight);

    root.style.colorScheme = currentTheme;

    const themeColor = $('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute("content", isLight ? "#f5f0e5" : "#06132c");
    }

    if (themeToggle) {
      themeToggle.textContent = isLight ? "🌙" : "☀️";

      themeToggle.setAttribute(
        "aria-label",
        isLight ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح",
      );

      themeToggle.setAttribute(
        "title",
        isLight ? "الوضع الداكن" : "الوضع الفاتح",
      );
    }
  }

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem("pharaoh_theme");

      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {
      console.log("Theme storage unavailable.");
    }

    return "dark";
  }

  applyTheme(getSavedTheme());

  themeToggle?.addEventListener("click", () => {
    const currentTheme = root.dataset.theme || "dark";

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);

    try {
      localStorage.setItem("pharaoh_theme", newTheme);
    } catch (error) {
      console.log("Could not save theme.");
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "pharaoh_theme" && event.newValue) {
      applyTheme(event.newValue);
    }
  });

  // =====================================
  // شاشة المقدمة والفيديو
  // =====================================

  const intro = $("#intro-screen");
  const video = $("#intro-video");
  const skipIntro = $("#skip-intro");

  if (intro && video) {
    function finishIntro() {
      if (!intro.isConnected) return;

      video.pause();
      intro.classList.add("hide");

      setTimeout(() => {
        if (intro.isConnected) {
          intro.remove();
        }
      }, 1000);
    }

    skipIntro?.addEventListener("click", finishIntro);

    try {
      if (sessionStorage.getItem("pharaoh_intro_played")) {
        intro.remove();
      } else {
        sessionStorage.setItem("pharaoh_intro_played", "true");

        video.muted = true;
        video.controls = false;
        video.load();

        video.addEventListener("ended", finishIntro);

        video.play().catch((error) => {
          console.log("Video playback error:", error);
        });
      }
    } catch (error) {
      video.muted = true;

      video.play().catch(() => {});
    }
  }

  // =====================================
  // PHARAOH EGYPT - LIGHT NIGHT SKY
  // =====================================

  (() => {
    function createNightSky() {
      if (document.querySelector(".night-sky")) return;

      const sky = document.createElement("div");

      sky.className = "night-sky";
      sky.setAttribute("aria-hidden", "true");

      const moon = document.createElement("div");

      moon.className = "night-moon";
      sky.appendChild(moon);

      for (let i = 0; i < 28; i++) {
        const star = document.createElement("span");

        star.className = "night-star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 5 + "s";

        sky.appendChild(star);
      }

      document.body.prepend(sky);
    }

    createNightSky();
  })();

  // =========================================
  // محافظات مصر والمعالم السياحية
  // =========================================

  const pharaohEgyptPlaces = [
    {
      ar: "القاهرة",
      en: "Cairo",
      places: [
        ["المتحف المصري", "The Egyptian Museum"],
        ["خان الخليلي", "Khan el-Khalili"],
        ["شارع المعز", "Al-Muizz Street"],
        ["قلعة صلاح الدين", "Salah El-Din Citadel"],
        ["المتحف القومي للحضارة", "National Museum of Egyptian Civilization"],
        ["قصر عابدين", "Abdeen Palace"],
      ],
    },
    {
      ar: "الجيزة",
      en: "Giza",
      places: [
        ["أهرامات الجيزة", "Giza Pyramids"],
        ["أبو الهول", "Great Sphinx"],
        ["المتحف المصري الكبير", "Grand Egyptian Museum"],
        ["سقارة", "Saqqara"],
        ["أهرامات دهشور", "Dahshur Pyramids"],
        ["قرية الحرانية", "Harrania Village"],
      ],
    },
    {
      ar: "الإسكندرية",
      en: "Alexandria",
      places: [
        ["مكتبة الإسكندرية", "Bibliotheca Alexandrina"],
        ["قلعة قايتباي", "Qaitbay Citadel"],
        ["قصر المنتزه", "Montaza Palace"],
        ["المسرح الروماني", "Roman Theatre"],
        ["مقابر كوم الشقافة", "Catacombs of Kom El Shoqafa"],
        ["عمود السواري", "Pompey's Pillar"],
      ],
    },
    {
      ar: "القليوبية",
      en: "Qalyubia",
      places: [
        ["القناطر الخيرية", "El Qanater El Khayreya"],
        ["قناطر محمد علي", "Mohamed Ali Barrages"],
        ["قصر محمد علي بشبرا", "Mohamed Ali Palace in Shubra"],
      ],
    },
    {
      ar: "المنوفية",
      en: "Menoufia",
      places: [
        ["متحف السادات", "Anwar Sadat Museum"],
        ["مسجد سيدي شبل", "Sidi Shebl Mosque"],
        ["شبين الكوم", "Shebin El-Kom"],
      ],
    },
    {
      ar: "الغربية",
      en: "Gharbia",
      places: [
        ["مسجد السيد البدوي", "El-Sayed El-Badawi Mosque"],
        ["متحف طنطا", "Tanta Museum"],
        ["سمنود", "Samanoud"],
      ],
    },
    {
      ar: "كفر الشيخ",
      en: "Kafr El Sheikh",
      places: [
        ["محمية بحيرة البرلس", "Burullus Lake Protectorate"],
        ["شاطئ بلطيم", "Baltim Beach"],
        ["متحف كفر الشيخ", "Kafr El Sheikh Museum"],
        ["كنيسة سخا", "Sakha Church"],
      ],
    },
    {
      ar: "الدقهلية",
      en: "Dakahlia",
      places: [
        ["دار ابن لقمان", "Dar Ibn Luqman"],
        ["متحف المنصورة", "Mansoura Museum"],
        ["جمصة", "Gamasa"],
        ["المنصورة", "Mansoura"],
      ],
    },
    {
      ar: "دمياط",
      en: "Damietta",
      places: [
        ["رأس البر", "Ras El Bar"],
        ["عزبة البرج", "Ezbet El Borg"],
        ["مسجد عمرو بن العاص", "Amr Ibn Al-Aas Mosque"],
        ["شاطئ دمياط الجديدة", "New Damietta Beach"],
      ],
    },
    {
      ar: "الشرقية",
      en: "Sharqia",
      places: [
        ["تل بسطة", "Tell Basta"],
        ["صان الحجر", "San El-Hagar"],
        ["تل الضبعة", "Tell El-Dab'a"],
        ["بلبيس", "Bilbeis"],
      ],
    },
    {
      ar: "بورسعيد",
      en: "Port Said",
      places: [
        ["متحف بورسعيد الحربي", "Port Said Military Museum"],
        ["فنار بورسعيد", "Port Said Lighthouse"],
        ["بورفؤاد", "Port Fouad"],
        ["شاطئ بورسعيد", "Port Said Beach"],
      ],
    },
    {
      ar: "الإسماعيلية",
      en: "Ismailia",
      places: [
        ["بحيرة التمساح", "Lake Timsah"],
        ["متحف الإسماعيلية", "Ismailia Museum"],
        ["قناة السويس", "Suez Canal"],
        ["حدائق الملاحة", "El-Malahah Gardens"],
      ],
    },
    {
      ar: "السويس",
      en: "Suez",
      places: [
        ["العين السخنة", "Ain Sokhna"],
        ["عيون موسى", "Moses Springs"],
        ["متحف السويس القومي", "Suez National Museum"],
        ["جبل عتاقة", "Ataka Mountain"],
      ],
    },
    {
      ar: "شمال سيناء",
      en: "North Sinai",
      places: [
        ["شاطئ العريش", "El-Arish Beach"],
        ["محمية الزرانيق", "Zaranik Protectorate"],
        ["منطقة الفرما الأثرية", "Pelusium Archaeological Site"],
        ["العريش", "El-Arish"],
      ],
    },
    {
      ar: "جنوب سيناء",
      en: "South Sinai",
      places: [
        ["شرم الشيخ", "Sharm El Sheikh"],
        ["دهب", "Dahab"],
        ["دير سانت كاترين", "Saint Catherine Monastery"],
        ["محمية رأس محمد", "Ras Mohammed Protectorate"],
        ["نويبع", "Nuweiba"],
        ["طابا", "Taba"],
      ],
    },
    {
      ar: "البحر الأحمر",
      en: "Red Sea",
      places: [
        ["الغردقة", "Hurghada"],
        ["الجونة", "El Gouna"],
        ["مرسى علم", "Marsa Alam"],
        ["جزر الجفتون", "Giftun Islands"],
        ["محمية وادي الجمال", "Wadi El Gemal Protectorate"],
        ["سهل حشيش", "Sahl Hasheesh"],
      ],
    },
    {
      ar: "مطروح",
      en: "Matrouh",
      places: [
        ["واحة سيوة", "Siwa Oasis"],
        ["حمام كليوباترا", "Cleopatra's Bath"],
        ["شاطئ عجيبة", "Agiba Beach"],
        ["مرسى مطروح", "Marsa Matrouh"],
        ["العلمين الجديدة", "New Alamein"],
      ],
    },
    {
      ar: "الفيوم",
      en: "Fayoum",
      places: [
        ["وادي الريان", "Wadi El Rayan"],
        ["وادي الحيتان", "Wadi El Hitan"],
        ["بحيرة قارون", "Lake Qarun"],
        ["قرية تونس", "Tunis Village"],
        ["مدينة ماضي", "Medinet Madi"],
      ],
    },
    {
      ar: "بني سويف",
      en: "Beni Suef",
      places: [
        ["هرم ميدوم", "Meidum Pyramid"],
        ["متحف بني سويف", "Beni Suef Museum"],
        ["إهناسيا", "Ihnasya"],
        ["محمية كهف وادي سنور", "Wadi Sannur Cave Protectorate"],
      ],
    },
    {
      ar: "المنيا",
      en: "Minya",
      places: [
        ["تل العمارنة", "Tell El-Amarna"],
        ["مقابر بني حسن", "Beni Hasan Tombs"],
        ["تونة الجبل", "Tuna El-Gebel"],
        ["متحف ملوي", "Mallawi Museum"],
        ["دير أبو حنس", "Deir Abu Hinnis"],
      ],
    },
    {
      ar: "أسيوط",
      en: "Assiut",
      places: [
        ["دير المحرق", "Deir El-Muharraq"],
        ["مقابر مير", "Meir Tombs"],
        ["متحف أسيوط", "Assiut Museum"],
        ["مسجد المجاهدين", "Al-Mujahideen Mosque"],
      ],
    },
    {
      ar: "سوهاج",
      en: "Sohag",
      places: [
        ["معبد أبيدوس", "Abydos Temple"],
        ["الدير الأبيض", "White Monastery"],
        ["الدير الأحمر", "Red Monastery"],
        ["متحف سوهاج القومي", "Sohag National Museum"],
        ["أخميم", "Akhmim"],
      ],
    },
    {
      ar: "قنا",
      en: "Qena",
      places: [
        ["معبد دندرة", "Dendera Temple"],
        ["مدينة نقادة", "Naqada"],
        ["مدينة قوص", "Qus"],
        ["قنا", "Qena"],
      ],
    },
    {
      ar: "الأقصر",
      en: "Luxor",
      places: [
        ["معبد الكرنك", "Karnak Temple"],
        ["معبد الأقصر", "Luxor Temple"],
        ["وادي الملوك", "Valley of the Kings"],
        ["معبد حتشبسوت", "Hatshepsut Temple"],
        ["مدينة هابو", "Medinet Habu"],
        ["تمثالا ممنون", "Colossi of Memnon"],
        ["متحف الأقصر", "Luxor Museum"],
        ["متحف التحنيط", "Mummification Museum"],
      ],
    },
    {
      ar: "أسوان",
      en: "Aswan",
      places: [
        ["معبد فيلة", "Philae Temple"],
        ["أبو سمبل", "Abu Simbel"],
        ["القرية النوبية", "Nubian Village"],
        ["السد العالي", "Aswan High Dam"],
        ["المسلة الناقصة", "Unfinished Obelisk"],
        ["جزيرة النباتات", "Botanical Island"],
      ],
    },
    {
      ar: "الوادي الجديد",
      en: "New Valley",
      places: [
        ["الصحراء البيضاء", "White Desert"],
        ["واحة الفرافرة", "Farafra Oasis"],
        ["واحة الداخلة", "Dakhla Oasis"],
        ["واحة الخارجة", "Kharga Oasis"],
        ["قرية القصر", "Al-Qasr Village"],
      ],
    },
    {
      ar: "البحيرة",
      en: "Beheira",
      places: [
        ["مدينة رشيد", "Rashid"],
        ["أديرة وادي النطرون", "Wadi El Natrun Monasteries"],
        ["مدينة إدكو", "Edku"],
        ["متحف رشيد", "Rashid Museum"],
      ],
    },
  ];

  // =====================================
  // قراءة اللغة الحالية للقوائم
  // =====================================

  function pharaohCurrentLanguage() {
    try {
      const googleSelect = document.querySelector(".goog-te-combo");

      if (googleSelect?.value) {
        return googleSelect.value;
      }

      const translateCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("googtrans="));

      if (translateCookie) {
        const value = decodeURIComponent(
          translateCookie.trim().split("=").slice(1).join("="),
        );

        const parts = value.split("/");

        return parts[parts.length - 1] || "ar";
      }
    } catch (error) {
      console.log("Could not read Google Translate language:", error);
    }

    return "ar";
  }

  // =====================================
  // بناء قائمة المحافظات
  // =====================================

  function pharaohFillGovernorates() {
    const governorateSelect = document.getElementById("destination");
    const attractionSelect = document.getElementById("attraction");

    if (!governorateSelect || !attractionSelect) return;

    const isArabic = pharaohCurrentLanguage() === "ar";

    const oldGovernorate = governorateSelect.value;
    const oldAttraction = attractionSelect.value;

    governorateSelect.innerHTML = "";

    const first = document.createElement("option");

    first.value = "";
    first.textContent = isArabic ? "اختر المحافظة" : "Choose a governorate";

    governorateSelect.appendChild(first);

    pharaohEgyptPlaces.forEach((governorate) => {
      const option = document.createElement("option");

      option.value = governorate.ar;
      option.textContent = isArabic ? governorate.ar : governorate.en;

      governorateSelect.appendChild(option);
    });

    if (pharaohEgyptPlaces.some((g) => g.ar === oldGovernorate)) {
      governorateSelect.value = oldGovernorate;
    }

    const selectedGovernorate = pharaohEgyptPlaces.find(
      (g) => g.ar === governorateSelect.value,
    );

    const attractionExists =
      selectedGovernorate &&
      selectedGovernorate.places.some((place) => place[0] === oldAttraction);

    pharaohFillAttractions(attractionExists ? oldAttraction : "");
  }

  // =====================================
  // بناء قائمة المعالم السياحية
  // =====================================

  function pharaohFillAttractions(selectedPlace = "") {
    const governorateSelect = document.getElementById("destination");
    const attractionSelect = document.getElementById("attraction");

    if (!governorateSelect || !attractionSelect) return;

    const isArabic = pharaohCurrentLanguage() === "ar";

    const governorate = pharaohEgyptPlaces.find(
      (item) => item.ar === governorateSelect.value,
    );

    attractionSelect.innerHTML = "";

    if (!governorate) {
      const option = document.createElement("option");

      option.value = "";
      option.textContent = isArabic
        ? "اختر المحافظة أولاً"
        : "Choose a governorate first";

      attractionSelect.appendChild(option);
      attractionSelect.disabled = true;

      return;
    }

    const first = document.createElement("option");

    first.value = "";
    first.textContent = isArabic
      ? "اختر المعلم السياحي"
      : "Choose a tourist attraction";

    attractionSelect.appendChild(first);

    governorate.places.forEach(([ar, en]) => {
      const option = document.createElement("option");

      option.value = ar;
      option.textContent = isArabic ? ar : en;

      attractionSelect.appendChild(option);
    });

    attractionSelect.disabled = false;

    if (
      selectedPlace &&
      governorate.places.some((place) => place[0] === selectedPlace)
    ) {
      attractionSelect.value = selectedPlace;
    }
  }

  // =====================================
  // تشغيل قوائم المحافظات والمعالم
  // =====================================

  const governorateSelect = document.getElementById("destination");

  if (governorateSelect) {
    pharaohFillGovernorates();

    governorateSelect.addEventListener("change", () => {
      pharaohFillAttractions();
    });

    // استقبال بيانات المحافظة والمعلم من الرابط

    const params = new URLSearchParams(window.location.search);

    const governorateParam = params.get("governorate");
    const attractionParam = params.get("attraction");

    if (governorateParam) {
      const selectedGovernorate = pharaohEgyptPlaces.find(
        (item) =>
          item.ar === governorateParam ||
          item.en.toLowerCase() === governorateParam.toLowerCase(),
      );

      if (selectedGovernorate) {
        governorateSelect.value = selectedGovernorate.ar;

        let selectedAttraction = attractionParam || "";

        const matchingAttraction = selectedGovernorate.places.find(
          (place) =>
            place[0] === attractionParam ||
            place[1].toLowerCase() === String(attractionParam).toLowerCase(),
        );

        if (matchingAttraction) {
          selectedAttraction = matchingAttraction[0];
        }

        pharaohFillAttractions(selectedAttraction);

        const booking = document.getElementById("booking");

        if (booking) {
          setTimeout(() => {
            booking.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 600);
        }
      }
    }
  }

  // =====================================
  // تحديث القوائم عند تغيير اللغة
  // =====================================

  window.pharaohUpdateDestinationLanguage = function () {
    const governorateSelect = document.getElementById("destination");

    if (!governorateSelect) return;

    const oldGovernorate = governorateSelect.value;

    const attractionSelect = document.getElementById("attraction");

    const oldAttraction = attractionSelect ? attractionSelect.value : "";

    pharaohFillGovernorates();

    if (oldGovernorate) {
      governorateSelect.value = oldGovernorate;
      pharaohFillAttractions(oldAttraction);
    }
  };

  // =====================================
  // تطبيق اتجاه اللغة بعد تجهيز القوائم
  // =====================================

  applyLanguageDirection();
});
