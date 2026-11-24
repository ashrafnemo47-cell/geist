
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  let lang = "ar";

  // =====================================
  // الترجمات
  // =====================================

  const translations = {
    en: {
      navMap: "Egypt Tourist Map",
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
      attractionLabel: "Tourist attraction *",
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

    try {
      localStorage.setItem("pharaoh_language", lang);
    } catch (error) {}

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

    // تحديث أسماء المحافظات والمعالم
    if (window.pharaohUpdateDestinationLanguage) {
      window.pharaohUpdateDestinationLanguage();
    }

    const langLabel = $("#langBtn b");

    if (langLabel) {
      langLabel.textContent = lang === "ar" ? "English" : "العربية";
    }

    const placeholders = {
      name: ["اكتب اسمك", "Enter your name"],
      phone: ["+20 1xxxxxxxxx", "+20 1xxxxxxxxx"],
      country: ["مثال: مصر", "e.g. Egypt"],
      pickup: [
        "اسم الفندق أو مكان الاستقبال",
        "Hotel name or pickup location"
      ],
      details: [
        "اكتب أي تفاصيل تساعدنا في تجهيز رحلتك...",
        "Tell us anything that will help us prepare your trip..."
      ]
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
  // مزامنة اللغة بين الصفحات
  // =====================================

  window.addEventListener("storage", (event) => {
    if (event.key === "pharaoh_language" && event.newValue) {
      setLanguage(event.newValue);
    }
  });

  // =====================================
  // التاريخ والساعة
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
      }
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
  // أقل تاريخ للحجز
  // =====================================

  const dateInput = $("#date");

  if (dateInput) {
    const today = new Date();

    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
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

      const required = [
        "name",
        "phone",
        "service",
        "destination",
        "attraction"
      ];

      const missing = required.some((id) => {
        const element = $("#" + id);
        return !element || !element.value.trim();
      });

      const formError = $("#formError");

      if (missing) {
        if (formError) {
          formError.textContent =
            lang === "ar"
              ? "من فضلك أكمل الاسم ورقم الهاتف ونوع الخدمة والمحافظة والمعلم السياحي."
              : "Please complete your name, phone number, service type, destination and tourist attraction.";
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

      window.open(whatsappURL, "_blank", "noopener");
    });
  }

  // =====================================
  // نظام الليل والنهار
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
      themeColor.setAttribute(
        "content",
        isLight ? "#f5f0e5" : "#06132c"
      );
    }

    if (themeToggle) {
      themeToggle.textContent = isLight ? "🌙" : "☀️";

      themeToggle.setAttribute(
        "aria-label",
        isLight ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"
      );

      themeToggle.setAttribute(
        "title",
        isLight ? "الوضع الداكن" : "الوضع الفاتح"
      );
    }
  }

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem("pharaoh_theme");

      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {}

    return "dark";
  }

  applyTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.dataset.theme || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(newTheme);

      try {
        localStorage.setItem("pharaoh_theme", newTheme);
      } catch (error) {}
    });
  }

  // مزامنة الوضع بين الصفحات
  window.addEventListener("storage", (event) => {
    if (event.key === "pharaoh_theme" && event.newValue) {
      applyTheme(event.newValue);
    }
  });

  // =====================================
  // تشغيل اللغة المحفوظة
  // =====================================

  let savedLanguage = "ar";

  try {
    savedLanguage = localStorage.getItem("pharaoh_language") || "ar";
  } catch (error) {}

  setLanguage(savedLanguage);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createNightSky);
  } else {
    createNightSky();
  }
})();

/* =========================================
   PHARAOH EGYPT
   محافظات مصر الـ27 والمعالم السياحية
========================================= */

const pharaohEgyptPlaces = [
  {
    ar: "القاهرة", en: "Cairo",
    places: [
      ["المتحف المصري", "The Egyptian Museum"],
      ["خان الخليلي", "Khan el-Khalili"],
      ["شارع المعز", "Al-Muizz Street"],
      ["قلعة صلاح الدين", "Salah El-Din Citadel"],
      ["المتحف القومي للحضارة", "National Museum of Egyptian Civilization"],
      ["قصر عابدين", "Abdeen Palace"]
    ]
  },
  {
    ar: "الجيزة", en: "Giza",
    places: [
      ["أهرامات الجيزة", "Giza Pyramids"],
      ["أبو الهول", "Great Sphinx"],
      ["المتحف المصري الكبير", "Grand Egyptian Museum"],
      ["سقارة", "Saqqara"],
      ["أهرامات دهشور", "Dahshur Pyramids"],
      ["قرية الحرانية", "Harrania Village"]
    ]
  },
  {
    ar: "الإسكندرية", en: "Alexandria",
    places: [
      ["مكتبة الإسكندرية", "Bibliotheca Alexandrina"],
      ["قلعة قايتباي", "Qaitbay Citadel"],
      ["قصر المنتزه", "Montaza Palace"],
      ["المسرح الروماني", "Roman Theatre"],
      ["مقابر كوم الشقافة", "Catacombs of Kom El Shoqafa"],
      ["عمود السواري", "Pompey's Pillar"]
    ]
  },
  {
    ar: "القليوبية", en: "Qalyubia",
    places: [
      ["القناطر الخيرية", "El Qanater El Khayreya"],
      ["قناطر محمد علي", "Mohamed Ali Barrages"],
      ["قصر محمد علي بشبرا", "Mohamed Ali Palace in Shubra"]
    ]
  },
  {
    ar: "المنوفية", en: "Menoufia",
    places: [
      ["متحف السادات", "Anwar Sadat Museum"],
      ["مسجد سيدي شبل", "Sidi Shebl Mosque"],
      ["شبين الكوم", "Shebin El-Kom"]
    ]
  },
  {
    ar: "الغربية", en: "Gharbia",
    places: [
      ["مسجد السيد البدوي", "El-Sayed El-Badawi Mosque"],
      ["متحف طنطا", "Tanta Museum"],
      ["سمنود", "Samanoud"]
    ]
  },
  {
    ar: "كفر الشيخ", en: "Kafr El Sheikh",
    places: [
      ["محمية بحيرة البرلس", "Burullus Lake Protectorate"],
      ["شاطئ بلطيم", "Baltim Beach"],
      ["متحف كفر الشيخ", "Kafr El Sheikh Museum"],
      ["كنيسة سخا", "Sakha Church"]
    ]
  },
  {
    ar: "الدقهلية", en: "Dakahlia",
    places: [
      ["دار ابن لقمان", "Dar Ibn Luqman"],
      ["متحف المنصورة", "Mansoura Museum"],
      ["جمصة", "Gamasa"],
      ["المنصورة", "Mansoura"]
    ]
  },
  {
    ar: "دمياط", en: "Damietta",
    places: [
      ["رأس البر", "Ras El Bar"],
      ["عزبة البرج", "Ezbet El Borg"],
      ["مسجد عمرو بن العاص", "Amr Ibn Al-Aas Mosque"],
      ["شاطئ دمياط الجديدة", "New Damietta Beach"]
    ]
  },
  {
    ar: "الشرقية", en: "Sharqia",
    places: [
      ["تل بسطة", "Tell Basta"],
      ["صان الحجر", "San El-Hagar"],
      ["تل الضبعة", "Tell El-Dab'a"],
      ["بلبيس", "Bilbeis"]
    ]
  },
  {
    ar: "بورسعيد", en: "Port Said",
    places: [
      ["متحف بورسعيد الحربي", "Port Said Military Museum"],
      ["فنار بورسعيد", "Port Said Lighthouse"],
      ["بورفؤاد", "Port Fouad"],
      ["شاطئ بورسعيد", "Port Said Beach"]
    ]
  },
  {
    ar: "الإسماعيلية", en: "Ismailia",
    places: [
      ["بحيرة التمساح", "Lake Timsah"],
      ["متحف الإسماعيلية", "Ismailia Museum"],
      ["قناة السويس", "Suez Canal"],
      ["حدائق الملاحة", "El-Malahah Gardens"]
    ]
  },
  {
    ar: "السويس", en: "Suez",
    places: [
      ["العين السخنة", "Ain Sokhna"],
      ["عيون موسى", "Moses Springs"],
      ["متحف السويس القومي", "Suez National Museum"],
      ["جبل عتاقة", "Ataka Mountain"]
    ]
  },
  {
    ar: "شمال سيناء", en: "North Sinai",
    places: [
      ["شاطئ العريش", "El-Arish Beach"],
      ["محمية الزرانيق", "Zaranik Protectorate"],
      ["منطقة الفرما الأثرية", "Pelusium Archaeological Site"],
      ["العريش", "El-Arish"]
    ]
  },
  {
    ar: "جنوب سيناء", en: "South Sinai",
    places: [
      ["شرم الشيخ", "Sharm El Sheikh"],
      ["دهب", "Dahab"],
      ["دير سانت كاترين", "Saint Catherine Monastery"],
      ["محمية رأس محمد", "Ras Mohammed Protectorate"],
      ["نويبع", "Nuweiba"],
      ["طابا", "Taba"]
    ]
  },
  {
    ar: "البحر الأحمر", en: "Red Sea",
    places: [
      ["الغردقة", "Hurghada"],
      ["الجونة", "El Gouna"],
      ["مرسى علم", "Marsa Alam"],
      ["جزر الجفتون", "Giftun Islands"],
      ["محمية وادي الجمال", "Wadi El Gemal Protectorate"],
      ["سهل حشيش", "Sahl Hasheesh"]
    ]
  },
  {
    ar: "مطروح", en: "Matrouh",
    places: [
      ["واحة سيوة", "Siwa Oasis"],
      ["حمام كليوباترا", "Cleopatra's Bath"],
      ["شاطئ عجيبة", "Agiba Beach"],
      ["مرسى مطروح", "Marsa Matrouh"],
      ["العلمين الجديدة", "New Alamein"]
    ]
  },
  {
    ar: "الفيوم", en: "Fayoum",
    places: [
      ["وادي الريان", "Wadi El Rayan"],
      ["وادي الحيتان", "Wadi El Hitan"],
      ["بحيرة قارون", "Lake Qarun"],
      ["قرية تونس", "Tunis Village"],
      ["مدينة ماضي", "Medinet Madi"]
    ]
  },
  {
    ar: "بني سويف", en: "Beni Suef",
    places: [
      ["هرم ميدوم", "Meidum Pyramid"],
      ["متحف بني سويف", "Beni Suef Museum"],
      ["إهناسيا", "Ihnasya"],
      ["محمية كهف وادي سنور", "Wadi Sannur Cave Protectorate"]
    ]
  },
  {
    ar: "المنيا", en: "Minya",
    places: [
      ["تل العمارنة", "Tell El-Amarna"],
      ["مقابر بني حسن", "Beni Hasan Tombs"],
      ["تونة الجبل", "Tuna El-Gebel"],
      ["متحف ملوي", "Mallawi Museum"],
      ["دير أبو حنس", "Deir Abu Hinnis"]
    ]
  },
  {
    ar: "أسيوط", en: "Assiut",
    places: [
      ["دير المحرق", "Deir El-Muharraq"],
      ["مقابر مير", "Meir Tombs"],
      ["متحف أسيوط", "Assiut Museum"],
      ["مسجد المجاهدين", "Al-Mujahideen Mosque"]
    ]
  },
  {
    ar: "سوهاج", en: "Sohag",
    places: [
      ["معبد أبيدوس", "Abydos Temple"],
      ["الدير الأبيض", "White Monastery"],
      ["الدير الأحمر", "Red Monastery"],
      ["متحف سوهاج القومي", "Sohag National Museum"],
      ["أخميم", "Akhmim"]
    ]
  },
  {
    ar: "قنا", en: "Qena",
    places: [
      ["معبد دندرة", "Dendera Temple"],
      ["مدينة نقادة", "Naqada"],
      ["مدينة قوص", "Qus"],
      ["قنا", "Qena"]
    ]
  },
  {
    ar: "الأقصر", en: "Luxor",
    places: [
      ["معبد الكرنك", "Karnak Temple"],
      ["معبد الأقصر", "Luxor Temple"],
      ["وادي الملوك", "Valley of the Kings"],
      ["معبد حتشبسوت", "Hatshepsut Temple"],
      ["مدينة هابو", "Medinet Habu"],
      ["تمثالا ممنون", "Colossi of Memnon"],
      ["متحف الأقصر", "Luxor Museum"],
      ["متحف التحنيط", "Mummification Museum"]
    ]
  },
  {
    ar: "أسوان", en: "Aswan",
    places: [
      ["معبد فيلة", "Philae Temple"],
      ["أبو سمبل", "Abu Simbel"],
      ["القرية النوبية", "Nubian Village"],
      ["السد العالي", "Aswan High Dam"],
      ["المسلة الناقصة", "Unfinished Obelisk"],
      ["جزيرة النباتات", "Botanical Island"]
    ]
  },
  {
    ar: "الوادي الجديد", en: "New Valley",
    places: [
      ["الصحراء البيضاء", "White Desert"],
      ["واحة الفرافرة", "Farafra Oasis"],
      ["واحة الداخلة", "Dakhla Oasis"],
      ["واحة الخارجة", "Kharga Oasis"],
      ["قرية القصر", "Al-Qasr Village"]
    ]
  },
  {
    ar: "البحيرة", en: "Beheira",
    places: [
      ["مدينة رشيد", "Rashid"],
      ["أديرة وادي النطرون", "Wadi El Natrun Monasteries"],
      ["مدينة إدكو", "Edku"],
      ["متحف رشيد", "Rashid Museum"]
    ]
  }
];

// =========================================
// قراءة اللغة الحالية
// =========================================

function pharaohCurrentLanguage() {
  try {
    return localStorage.getItem("pharaoh_language") || "ar";
  } catch (error) {
    return "ar";
  }
}

// =========================================
// بناء قائمة المحافظات
// =========================================

function pharaohFillGovernorates() {
  const governorateSelect = document.getElementById("destination");
  const attractionSelect = document.getElementById("attraction");

  if (!governorateSelect || !attractionSelect) return;

  const language = pharaohCurrentLanguage();
  const oldGovernorate = governorateSelect.value;
  const oldAttraction = attractionSelect.value;

  governorateSelect.innerHTML = "";

  const first = document.createElement("option");
  first.value = "";
  first.textContent = language === "en"
    ? "Choose a governorate"
    : "اختر المحافظة";

  governorateSelect.appendChild(first);

  pharaohEgyptPlaces.forEach((governorate) => {
    const option = document.createElement("option");
    option.value = governorate.ar;
    option.textContent = language === "en"
      ? governorate.en
      : governorate.ar;

    governorateSelect.appendChild(option);
  });

  if (pharaohEgyptPlaces.some(g => g.ar === oldGovernorate)) {
    governorateSelect.value = oldGovernorate;
  }

  const selectedGovernorate = pharaohEgyptPlaces.find(
    g => g.ar === governorateSelect.value
  );

  const attractionExists = selectedGovernorate &&
    selectedGovernorate.places.some(
      place => place[0] === oldAttraction
    );

  pharaohFillAttractions(
    attractionExists ? oldAttraction : ""
  );
}

// =========================================
// بناء قائمة المعالم السياحية
// =========================================

function pharaohFillAttractions(selectedPlace = "") {
  const governorateSelect = document.getElementById("destination");
  const attractionSelect = document.getElementById("attraction");

  if (!governorateSelect || !attractionSelect) return;

  const language = pharaohCurrentLanguage();

  const governorate = pharaohEgyptPlaces.find(
    item => item.ar === governorateSelect.value
  );

  attractionSelect.innerHTML = "";

  if (!governorate) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = language === "en"
      ? "Choose a governorate first"
      : "اختر المحافظة أولاً";

    attractionSelect.appendChild(option);
    attractionSelect.disabled = true;
    return;
  }

  const first = document.createElement("option");
  first.value = "";
  first.textContent = language === "en"
    ? "Choose a tourist attraction"
    : "اختر المعلم السياحي";

  attractionSelect.appendChild(first);

  governorate.places.forEach(([ar, en]) => {
    const option = document.createElement("option");
    option.value = ar;
    option.textContent = language === "en" ? en : ar;

    attractionSelect.appendChild(option);
  });

  attractionSelect.disabled = false;

  if (
    selectedPlace &&
    governorate.places.some(place => place[0] === selectedPlace)
  ) {
    attractionSelect.value = selectedPlace;
  }
}

// =========================================
// تشغيل القوائم واستقبال بيانات الخريطة
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const governorateSelect = document.getElementById("destination");

  if (!governorateSelect) return;

  pharaohFillGovernorates();

  governorateSelect.addEventListener("change", () => {
    pharaohFillAttractions();
  });

  const params = new URLSearchParams(window.location.search);
  const governorate = params.get("governorate");
  const attraction = params.get("attraction");

  if (governorate) {
    const governorateExists = pharaohEgyptPlaces.some(
      item => item.ar === governorate
    );

    if (governorateExists) {
      governorateSelect.value = governorate;
      pharaohFillAttractions(attraction || "");

      const booking = document.getElementById("booking");

      if (booking) {
        setTimeout(() => {
          booking.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 600);
      }
    }
  }
});

// =========================================
// تحديث القوائم عند تغيير اللغة
// =========================================

window.addEventListener("storage", (event) => {
  if (event.key === "pharaoh_language") {
    pharaohFillGovernorates();
  }
});

window.pharaohUpdateDestinationLanguage = function () {
  pharaohFillGovernorates();
};
