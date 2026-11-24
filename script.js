"use strict";

// =========================================
// PHARAOH EGYPT - MAIN SCRIPT
// Google Translate + Booking + Theme + Menu
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // ظهور العناصر أثناء التمرير
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
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
      element.classList.add("show");
    });
  }

  const $ = (selector) => document.querySelector(selector);

  // =====================================
  // قراءة اللغة من Google Translate
  // =====================================

  function getGoogleLanguage() {
    // أولاً: قراءة اللغة من قائمة Google Translate
    const googleSelect = document.querySelector(".goog-te-combo");

    if (googleSelect && googleSelect.value) {
      return googleSelect.value;
    }

    // ثانياً: قراءة اللغة المحفوظة في Cookie
    try {
      const cookies = document.cookie.split(";");

      const translateCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("googtrans="),
      );

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
  // تحديد اتجاه الصفحة حسب اللغة
  // =====================================

  function applyLanguageDirection() {
    const language = getGoogleLanguage();

    const rtlLanguages = ["ar", "fa", "ur", "he", "ps", "sd", "ug", "yi"];

    const isRTL = rtlLanguages.includes(language);

    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    document.body.classList.toggle("ltr", !isRTL);
    document.body.classList.toggle("rtl", isRTL);

    updateEgyptDateTime();

    if (window.pharaohUpdateDestinationLanguage) {
      window.pharaohUpdateDestinationLanguage();
    }
  }

  // =====================================
  // متابعة تغيير اللغة من Google Translate
  // =====================================

  function watchGoogleTranslate() {
    const googleSelect = document.querySelector(".goog-te-combo");

    if (!googleSelect || googleSelect.dataset.pharaohReady === "true") {
      return;
    }

    googleSelect.dataset.pharaohReady = "true";

    googleSelect.addEventListener("change", () => {
      setTimeout(applyLanguageDirection, 300);
      setTimeout(applyLanguageDirection, 1000);
    });
  }

  // مراقبة ظهور قائمة Google Translate
  if ("MutationObserver" in window) {
    const translateObserver = new MutationObserver(() => {
      watchGoogleTranslate();
    });

    translateObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  watchGoogleTranslate();

  // =====================================
  // التاريخ والساعة
  // =====================================

  function updateEgyptDateTime() {
    const dateElement = $("#liveDate");
    const timeElement = $("#liveTime");

    if (!dateElement || !timeElement) return;

    const now = new Date();
    const language = getGoogleLanguage();

    let locale = language || "ar-EG";

    if (language === "ar") {
      locale = "ar-EG";
    } else if (language === "en") {
      locale = "en-GB";
    }

    try {
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
    } catch (error) {
      dateElement.textContent = now.toLocaleDateString("ar-EG");
      timeElement.textContent = now.toLocaleTimeString("ar-EG");
    }
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
        const element = $("#" + id);
        return !element || !element.value.trim();
      });

      const formError = $("#formError");

      if (missing) {
        if (formError) {
          formError.textContent = isArabic
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
          (isArabic ? "لم يحدد" : "Not specified")
        );
      };

      // رسالة الحجز بالعربية أو الإنجليزية
      // اللغات الأخرى تستخدم الإنجليزية كرسالة بديلة

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
  // تشغيل اتجاه اللغة عند فتح الصفحة
  // =====================================

  applyLanguageDirection();

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

    // زر تخطي المقدمة
    if (skipIntro) {
      skipIntro.addEventListener("click", finishIntro);
    }

    // منع إعادة المقدمة في نفس جلسة التصفح
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
});

// =========================================
// PHARAOH EGYPT - LIGHT NIGHT SKY
// =========================================

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

// =========================================
// PHARAOH EGYPT
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

// =========================================
// قراءة اللغة الحالية من Google Translate
// =========================================

function pharaohCurrentLanguage() {
  try {
    const googleSelect = document.querySelector(".goog-te-combo");

    if (googleSelect && googleSelect.value) {
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

// =========================================
// بناء قائمة المحافظات
// =========================================

function pharaohFillGovernorates() {
  const governorateSelect = document.getElementById("destination");
  const attractionSelect = document.getElementById("attraction");

  if (!governorateSelect || !attractionSelect) return;

  const language = pharaohCurrentLanguage();
  const isArabic = language === "ar";

  const oldGovernorate = governorateSelect.value;
  const oldAttraction = attractionSelect.value;

  governorateSelect.innerHTML = "";

  const first = document.createElement("option");
  first.value = "";
  first.textContent = isArabic ? "اختر المحافظة" : "Choose a governorate";

  governorateSelect.appendChild(first);

  pharaohEgyptPlaces.forEach((governorate) => {
    const option = document.createElement("option");

    // نحتفظ بالقيمة العربية حتى تعمل روابط الخريطة والحجز
    option.value = governorate.ar;

    // الإنجليزية هي النص الأساسي للغات غير العربية
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

// =========================================
// بناء قائمة المعالم السياحية
// =========================================

function pharaohFillAttractions(selectedPlace = "") {
  const governorateSelect = document.getElementById("destination");
  const attractionSelect = document.getElementById("attraction");

  if (!governorateSelect || !attractionSelect) return;

  const language = pharaohCurrentLanguage();
  const isArabic = language === "ar";

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

    // القيمة تظل عربية حتى لا تتعطل بيانات الحجز
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
});

// =========================================
// تحديث القوائم عند تغيير اللغة
// =========================================

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
