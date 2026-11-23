"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  let lang = "ar";

  // =====================================
  // الترجمات
  // =====================================

  const translations = {
    en: {
      navHome: "Home",
      navAbout: "About",
      navServices: "Services",
      navPlaces: "Destinations",
      navGallery: "Gallery",
      navBooking: "Book Now",
      navContact: "Contact",

      heroEyebrow: "LUXOR, EGYPT · YOUR GATEWAY TO ANCIENT HISTORY",
      heroRibbon: "Tourist transportation & private trips across Egypt",
      heroText:
        "Discover the magic of Egypt from the heart of Luxor. Enjoy tours, private transfers and airport pickups — a comfortable experience from the very first message.",
      heroBook: "PLAN YOUR TRIP NOW ↗",
      heroExplore: "EXPLORE DESTINATIONS",
      heroPrivate: "Private trips",
      heroFlexible: "Flexible schedules",
      heroEasy: "Easy booking",

      aboutKicker: "WELCOME TO EGYPT",
      aboutTitle:
        "Your journey is more than a transfer, <em>it is an experience to remember.</em>",
      aboutText:
        "At PHARAOH EGYPT, we help you discover Egypt through tourist transportation and private trips. Choose your destination and trip details, and we'll contact you to arrange an experience that fits your needs.",
      aboutPoint1: "Your comfort matters",
      aboutPoint2: "Many destinations",
      aboutPoint3: "Direct communication",
      aboutLink: "Start planning your trip ↗",

      servicesKicker: "WHAT WE OFFER",
      servicesTitle: "Our <em>Services</em>",
      servicesIntro:
        "Everything you need to travel and explore Egypt, all in one place.",
      service1: "Luxor sightseeing tours",
      service1p:
        "Discover Luxor and Karnak temples, the Valley of the Kings and both banks of the Nile.",
      service2: "Private transfers",
      service2p:
        "Transportation for individuals, families and groups, arranged around your needs.",
      service3: "Intercity trips",
      service3p:
        "Travel from Luxor to Aswan, Hurghada, Cairo and other destinations.",
      service4: "Airport & hotel transfers",
      service4p:
        "Airport pickups and drop-offs to hotels and your accommodation.",

      destKicker: "CHOOSE YOUR DESTINATION",
      destTitle: "Egypt… <em>a world of stories</em>",
      destIntro:
        "From ancient pharaonic sites to Red Sea beaches, choose the place you've dreamed of visiting.",
      placeLuxor: "Luxor",
      placeLuxorSub: "The capital of ancient history",
      placeAswan: "Aswan",
      placeAswanSub: "Nile serenity in the south",
      placeHurghada: "Hurghada",
      placeHurghadaSub: "Red Sea and beaches",
      placeCairo: "Cairo",
      placeCairoSub: "Pyramids and the heart of Egypt",
      placePyramids: "The Pyramids",
      placeRedSea: "Red Sea",
      placeRedSeaSub: "Coastal escapes and relaxation",

      galleryKicker: "MOMENTS IN EGYPT",
      galleryTitle: "Photo <em>Gallery</em>",
      galleryIntro: "A glimpse of the places and experiences waiting for you.",
      gallery1: "Timeless Egyptian monuments",
      gallery2: "The Giza Pyramids",
      gallery3: "The beauty of the Nile",
      gallery4: "Magic of the south",
      gallery5: "Red Sea beaches",

      bookingKicker: "YOUR FIRST STEP",
      bookingTitle: "Plan your trip <em>with us</em>",
      bookingIntro:
        "Fill in your details and trip preferences. WhatsApp will open with a prepared message for you to review and send.",
      formTitle: "Trip details",
      formSub: "Please enter the information so we can contact you",
      nameLabel: "Full name *",
      phoneLabel: "Phone / WhatsApp number *",
      emailLabel: "Email (optional)",
      countryLabel: "Nationality / Country",
      serviceLabel: "Service type *",
      destinationLabel: "Destination *",
      dateLabel: "Trip date",
      peopleLabel: "Number of travelers",
      pickupLabel: "Pickup location / Hotel",
      detailsLabel: "Additional details or requests",
      sendBtn: "Send booking request via WhatsApp",
      privacyNote:
        "Your information is not sent automatically. Review the message in WhatsApp before sending.",

      asideTitle: "Your next journey<br><em>starts right here.</em>",
      asideText: "Tell us what you need and we'll help coordinate your trip.",
      asideFeature1: "Direct contact through WhatsApp",
      asideFeature2: "Choose your destination and date",
      asideFeature3: "Trips for individuals and families",

      contactKicker: "WE ARE HERE TO HELP",
      contactTitle: "Contact us <em>and book your trip</em>",
      contactText:
        "Choose the contact number that works for you. We are happy to answer your questions and help you plan.",
      footerText: "Discover Egypt with us and make your journey unforgettable.",
    },
  };

  // =====================================
  // حفظ النصوص العربية الأصلية
  // =====================================

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.dataset.original === undefined) {
      element.dataset.original = element.innerHTML;
    }
  });

  // =====================================
  // تغيير اللغة
  // =====================================

  function setLanguage(next) {
    lang = next === "en" ? "en" : "ar";

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.body.classList.toggle("ltr", lang === "en");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (lang === "en" && translations.en[key]) {
        element.innerHTML = translations.en[key];
      } else if (element.dataset.original !== undefined) {
        element.innerHTML = element.dataset.original;
      }
    });

    const langLabel = $("#langBtn b");

    if (langLabel) {
      langLabel.textContent = lang === "ar" ? "English" : "العربية";
    }

    const placeholders = {
      name: ["اكتب اسمك", "Enter your name"],
      phone: ["+20 1xxxxxxxxx", "+20 1xxxxxxxxx"],
      country: ["مثال: مصر", "e.g. Egypt"],
      pickup: ["اسم الفندق أو مكان الاستقبال", "Hotel name or pickup location"],
      details: [
        "اكتب أي تفاصيل تساعدنا في تجهيز رحلتك...",
        "Tell us anything that will help us prepare your trip...",
      ],
    };

    Object.entries(placeholders).forEach(([id, values]) => {
      const element = $("#" + id);

      if (element) {
        element.placeholder = lang === "ar" ? values[0] : values[1];
      }
    });

    updateEgyptDateTime();
  }

  const langBtn = $("#langBtn");

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLanguage(lang === "ar" ? "en" : "ar");
    });
  }

  // =====================================
  // التاريخ والساعة حسب جهاز الزائر
  // =====================================

  function updateEgyptDateTime() {
    const dateElement = $("#liveDate");
    const timeElement = $("#liveTime");

    if (!dateElement || !timeElement) return;

    const now = new Date();
    const locale = lang === "ar" ? "ar-EG" : "en-GB";

    dateElement.textContent = now.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    timeElement.textContent = now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  updateEgyptDateTime();
  setInterval(updateEgyptDateTime, 1000);

  // =====================================
  // شاشة التحميل
  // =====================================

  function hideLoader() {
    setTimeout(() => {
      const loader = $("#loader");

      if (loader) {
        loader.classList.add("hide");
      }
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
  // ظهور العناصر أثناء التمرير
  // =====================================

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }

  // =====================================
  // تحديد أقل تاريخ للحجز
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

      const required = ["name", "phone", "service", "destination"];

      const missing = required.some((id) => {
        const element = $("#" + id);
        return !element || !element.value.trim();
      });

      const formError = $("#formError");

      if (missing) {
        if (formError) {
          formError.textContent =
            lang === "ar"
              ? "من فضلك أكمل الاسم ورقم الهاتف ونوع الخدمة والوجهة."
              : "Please complete your name, phone number, service type and destination.";
        }

        return;
      }

      if (formError) {
        formError.textContent = "";
      }

      const val = (id) => {
        const element = $("#" + id);

        return (
          (element && element.value.trim()) ||
          (lang === "ar" ? "لم يحدد" : "Not specified")
        );
      };

      const msg =
        lang === "ar"
          ? `طلب حجز جديد - PHARAOH EGYPT

الاسم: ${val("name")}
الهاتف: ${val("phone")}
البريد: ${val("email")}
الدولة: ${val("country")}
الخدمة: ${val("service")}
الوجهة: ${val("destination")}
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
Destination: ${val("destination")}
Date: ${val("date")}
Travelers: ${val("people")}
Pickup: ${val("pickup")}
Additional details: ${val("details")}`;

      const whatsappURL =
        "https://wa.me/201028348346?text=" + encodeURIComponent(msg);

      window.open(whatsappURL, "_blank", "noopener");
    });
  }

  // =====================================
  // نظام الليل والنهار والألوان
  // =====================================

  const themeToggle = $("#themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    const currentTheme = theme === "light" ? "light" : "dark";
    const isLight = currentTheme === "light";

    // تطبيق الوضع على الصفحة كلها
    root.dataset.theme = currentTheme;
    document.body.dataset.theme = currentTheme;

    root.classList.toggle("light-mode", isLight);
    root.classList.toggle("dark-mode", !isLight);

    document.body.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("dark-mode", !isLight);

    // ضبط ألوان المتصفح
    root.style.colorScheme = currentTheme;

    // تغيير لون شريط المتصفح
    const themeColor = $('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute("content", isLight ? "#f5f0e5" : "#06132c");
    }

    // تغيير شكل زر الوضع
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

  // استعادة الوضع المحفوظ
  function getSavedTheme() {
    try {
      const saved = localStorage.getItem("pharaoh-theme");

      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {
      // استخدام الوضع الافتراضي
    }

    return "dark";
  }

  // تشغيل الوضع المحفوظ عند فتح الموقع
  applyTheme(getSavedTheme());

  // تبديل الوضع عند الضغط
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.dataset.theme || "dark";

      const newTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(newTheme);

      try {
        localStorage.setItem("pharaoh-theme", newTheme);
      } catch (error) {
        // يظل التغيير فعالاً حتى لو تعذر الحفظ
      }
    });
  }

  // =====================================
  // تشغيل اللغة العربية عند فتح الموقع
  // =====================================

  setLanguage("ar");
});

/* =====================================
   PHARAOH EGYPT - LIGHT NIGHT SKY
===================================== */

(() => {
  function createNightSky() {
    if (document.querySelector(".night-sky")) return;

    const sky = document.createElement("div");
    sky.className = "night-sky";
    sky.setAttribute("aria-hidden", "true");

    // القمر
    const moon = document.createElement("div");
    moon.className = "night-moon";
    sky.appendChild(moon);

    // نجوم خفيفة بعدد أقل لتحسين الأداء
    for (let i = 0; i < 28; i++) {
      const star = document.createElement("span");
      star.className = "night-star";

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 5 + "s";

      sky.appendChild(star);
    }

    // وضع السماء أول عنصر داخل الصفحة
    document.body.prepend(sky);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createNightSky);
  } else {
    createNightSky();
  }
})();
