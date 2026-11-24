
"use strict";

// ==========================================
// PHARAOH EGYPT - MAP SYSTEM
// Arabic / English - Day / Night
// ==========================================

const $ = (selector) => document.querySelector(selector);

const translations = {
  ar: {
    backHome: "العودة للموقع الرئيسي",
    bookTrip: "احجز رحلتك",
    heroTitle: 'اكتشف <span>مصر</span> من خلال خريطتها',
    heroText: "اختر المحافظة واكتشف المدن والأماكن السياحية والرحلات ومواقعها على الخريطة",
    govTitle: "محافظات مصر الـ27",
    searchPlaceholder: "ابحث عن محافظة...",
    mapTitle: "الخريطة التفاعلية لمصر",
    mapNote: "حرّك الخريطة بالماوس، واستخدم عجلة الماوس للتقريب والتبعيد. اضغط على أي علامة لاكتشاف المحافظة.",
    placesTitle: "أماكن ومعالم سياحية",
    bookGovernorate: "احجز رحلة إلى هذه المحافظة",
    placeDescription: "اكتشف هذا المكان السياحي واحجز رحلتك إليه.",
    gps: "افتح الموقع GPS",
    bookPlace: "احجز هذه الرحلة",
    popup: "اضغط لاكتشاف المحافظة",
    footerText: "اكتشف جمال مصر",
    noResults: "لا توجد نتائج",
    day: "☀️ وضع النهار",
    night: "🌙 وضع الليل"
  },

  en: {
    backHome: "Back to Home",
    bookTrip: "Book Your Trip",
    heroTitle: 'Discover <span>Egypt</span> Through Its Map',
    heroText: "Choose a governorate to discover cities, tourist attractions, trips and their locations on the map.",
    govTitle: "Egypt's 27 Governorates",
    searchPlaceholder: "Search governorates...",
    mapTitle: "Interactive Map of Egypt",
    mapNote: "Drag the map with your mouse and use the scroll wheel to zoom. Click any marker to discover a governorate.",
    placesTitle: "Tourist Attractions",
    bookGovernorate: "Book a Trip to This Governorate",
    placeDescription: "Discover this tourist destination and book your trip.",
    gps: "Open GPS Location",
    bookPlace: "Book This Trip",
    popup: "Click to discover this governorate",
    footerText: "Discover the Beauty of Egypt",
    noResults: "No results found",
    day: "☀️ Day Mode",
    night: "🌙 Night Mode"
  }
};

// ==========================================
// المحافظة - الاسم الإنجليزي والوصف والأماكن
// ==========================================

const englishData = {
  "القاهرة": ["Cairo", "Egypt's capital, home to museums, historic landmarks and cultural attractions.", ["Salah El-Din Citadel", "The Egyptian Museum", "Khan El-Khalili", "Al-Muizz Street"]],
  "الإسكندرية": ["Alexandria", "A beautiful historic coastal city on the Mediterranean Sea.", ["Bibliotheca Alexandrina", "Qaitbay Citadel", "Pompey's Pillar", "Alexandria Corniche"]],
  "بورسعيد": ["Port Said", "A coastal city at the northern entrance of the Suez Canal.", ["Port Said Beach", "Port Said Museum", "Suez Canal"]],
  "السويس": ["Suez", "A coastal governorate at the southern entrance of the Suez Canal.", ["Ain Sokhna", "Suez Beach", "Ataka Mountain"]],
  "دمياط": ["Damietta", "A coastal governorate known for its beaches and Nile estuary.", ["Ras El Bar", "New Damietta", "Ras El Bar Promenade"]],
  "الدقهلية": ["Dakahlia", "A governorate in the northeastern Nile Delta.", ["Mansoura", "Lake Manzala"]],
  "الشرقية": ["Sharqia", "A governorate with archaeological and historical sites in the eastern Delta.", ["Tell Basta", "San El-Hagar"]],
  "القليوبية": ["Qalyubia", "Located in the Greater Nile Delta region.", ["Al-Qanater Al-Khayriya", "Al-Qanater Gardens"]],
  "كفر الشيخ": ["Kafr El-Sheikh", "Known for its coastal areas, lakes and natural landscapes.", ["Baltim", "Lake Burullus", "Burullus Tower"]],
  "الغربية": ["Gharbia", "A governorate with historic towns and rural landscapes in the Delta.", ["Tanta", "Samannoud"]],
  "المنوفية": ["Monufia", "A governorate located in the heart of the Nile Delta.", ["Shibin El-Kom", "Menouf", "Sadat City"]],
  "البحيرة": ["Beheira", "Western Nile Delta governorate with historic towns and attractions.", ["Rosetta", "Edku", "Wadi El Natrun", "Damanhur"]],
  "الإسماعيلية": ["Ismailia", "A city on the Suez Canal with lakes and natural attractions.", ["Lake Timsah", "Malaaha Gardens", "Suez Canal"]],
  "الجيزة": ["Giza", "Famous for the Pyramids and ancient Egyptian monuments.", ["Giza Pyramids", "Great Sphinx", "Saqqara", "Dahshur"]],
  "بني سويف": ["Beni Suef", "A governorate in northern Upper Egypt.", ["Meidum Pyramid", "Nile Areas"]],
  "الفيوم": ["Fayoum", "Famous for its lakes, waterfalls and nature reserves.", ["Lake Qarun", "Wadi El Rayan", "Wadi Al-Hitan", "Tunis Village"]],
  "المنيا": ["Minya", "Home to important archaeological sites from ancient Egyptian history.", ["Tell El-Amarna", "Beni Hassan", "Tuna El-Gebel"]],
  "أسيوط": ["Assiut", "A historic governorate in Upper Egypt.", ["Deir El-Muharraq", "El-Qusiya"]],
  "سوهاج": ["Sohag", "Home to important archaeological, Coptic and historic landmarks.", ["Abydos", "Akhmim", "White Monastery"]],
  "قنا": ["Qena", "Home to important temples and archaeological sites in Upper Egypt.", ["Dendera Temple", "Qus", "Naqada"]],
  "الأقصر": ["Luxor", "An open-air museum with world-famous temples and ancient tombs.", ["Karnak Temple", "Luxor Temple", "Valley of the Kings", "Hatshepsut Temple", "West Bank"]],
  "أسوان": ["Aswan", "A Nile destination famous for temples, islands and Nubian culture.", ["Philae Temple", "Aswan High Dam", "Botanical Island", "Abu Simbel Temple", "Nubian Village"]],
  "البحر الأحمر": ["Red Sea", "One of Egypt's leading destinations for beaches, diving and marine tourism.", ["Hurghada", "El Gouna", "Safaga", "El Quseir", "Marsa Alam", "Ras Gharib"]],
  "الوادي الجديد": ["New Valley", "A governorate of oases, deserts and archaeological sites.", ["Kharga Oasis", "Dakhla Oasis", "Farafra Oasis", "White Desert"]],
  "مطروح": ["Matrouh", "A coastal governorate with Mediterranean beaches and Siwa Oasis.", ["Marsa Matrouh", "El Alamein", "Siwa", "Sallum", "Sidi Abdel Rahman"]],
  "شمال سيناء": ["North Sinai", "Home to coastal and natural areas in the northern Sinai Peninsula.", ["Arish", "Lake Bardawil", "Rafah"]],
  "جنوب سيناء": ["South Sinai", "A famous destination for beaches, diving and mountain adventures.", ["Sharm El-Sheikh", "Dahab", "Nuweiba", "Taba", "Saint Catherine"]]
};

// ==========================================
// بيانات المحافظات
// ==========================================

const rawGovernorates = [
  ["القاهرة",30.0444,31.2357,"عاصمة مصر، وتضم المتاحف والمواقع التاريخية والثقافية.",["قلعة صلاح الدين","المتحف المصري","خان الخليلي","شارع المعز"]],
  ["الإسكندرية",31.2001,29.9187,"مدينة ساحلية تاريخية جميلة على البحر المتوسط.",["مكتبة الإسكندرية","قلعة قايتباي","عمود السواري","كورنيش الإسكندرية"]],
  ["بورسعيد",31.2653,32.3019,"مدينة ساحلية عند المدخل الشمالي لقناة السويس.",["شاطئ بورسعيد","متحف بورسعيد","قناة السويس"]],
  ["السويس",29.9668,32.5498,"محافظة ساحلية عند المدخل الجنوبي لقناة السويس.",["العين السخنة","شاطئ السويس","جبل عتاقة"]],
  ["دمياط",31.4175,31.8144,"محافظة ساحلية تشتهر بشواطئها وموقعها عند مصب النيل.",["رأس البر","دمياط الجديدة","لسان رأس البر"]],
  ["الدقهلية",31.0364,31.3807,"محافظة في شمال شرق دلتا النيل.",["المنصورة","بحيرة المنزلة"]],
  ["الشرقية",30.5877,31.502,"تضم مواقع أثرية وتاريخية في شرق الدلتا.",["تل بسطة","صان الحجر"]],
  ["القليوبية",30.4667,31.1833,"تقع في منطقة دلتا النيل الكبرى.",["القناطر الخيرية","حدائق القناطر"]],
  ["كفر الشيخ",31.1107,30.9388,"تضم مناطق ساحلية وبحيرات ومناطق طبيعية.",["بلطيم","بحيرة البرلس","برج البرلس"]],
  ["الغربية",30.7865,31.0004,"تضم مدنًا تاريخية ومناطق ريفية في الدلتا.",["طنطا","سمنود"]],
  ["المنوفية",30.553,31.01,"محافظة تقع في قلب دلتا النيل.",["شبين الكوم","منوف","مدينة السادات"]],
  ["البحيرة",30.8481,30.3436,"محافظة في غرب دلتا النيل وتضم مدنًا ومناطق تاريخية.",["رشيد","إدكو","وادي النطرون","دمنهور"]],
  ["الإسماعيلية",30.5965,32.2715,"مدينة على قناة السويس وتضم بحيرات ومناطق طبيعية.",["بحيرة التمساح","حدائق الملاحة","قناة السويس"]],
  ["الجيزة",29.987,31.2118,"تشتهر بالأهرامات والآثار المصرية القديمة.",["أهرامات الجيزة","أبو الهول","سقارة","دهشور"]],
  ["بني سويف",29.0661,31.0994,"محافظة في شمال صعيد مصر.",["هرم ميدوم","مناطق النيل"]],
  ["الفيوم",29.3084,30.8428,"تشتهر بالبحيرات والشلالات والمحميات الطبيعية.",["بحيرة قارون","وادي الريان","وادي الحيتان","قرية تونس"]],
  ["المنيا",28.1099,30.7503,"تضم مواقع أثرية مهمة من عصور مصر القديمة.",["تل العمارنة","بني حسن","تونا الجبل"]],
  ["أسيوط",27.1783,31.1859,"محافظة تاريخية في صعيد مصر.",["دير المحرق","منطقة القوصية"]],
  ["سوهاج",26.5591,31.6957,"تضم معالم أثرية وقبطية وتاريخية.",["أبيدوس","أخميم","الدير الأبيض"]],
  ["قنا",26.1551,32.716,"تضم معابد ومواقع أثرية مهمة في صعيد مصر.",["معبد دندرة","قوص","نقادة"]],
  ["الأقصر",25.6872,32.6396,"متحف مفتوح يضم معابد ومقابر أثرية عالمية.",["معبد الكرنك","معبد الأقصر","وادي الملوك","معبد حتشبسوت","البر الغربي"]],
  ["أسوان",24.0889,32.8998,"وجهة سياحية على النيل تشتهر بالمعابد والجزر والطبيعة النوبية.",["معبد فيلة","السد العالي","جزيرة النباتات","معبد أبو سمبل","القرية النوبية"]],
  ["البحر الأحمر",27.2579,33.8116,"من أهم مناطق السياحة البحرية والغوص والشواطئ في مصر.",["الغردقة","الجونة","سفاجا","القصير","مرسى علم","رأس غارب"]],
  ["الوادي الجديد",25.439,30.5586,"تضم الواحات والصحاري والمواقع الأثرية.",["واحة الخارجة","واحة الداخلة","واحة الفرافرة","الصحراء البيضاء"]],
  ["مطروح",31.3543,27.2373,"محافظة ساحلية تضم شواطئ البحر المتوسط وواحة سيوة.",["مرسى مطروح","العلمين","سيوة","السلوم","سيدي عبد الرحمن"]],
  ["شمال سيناء",31.1313,33.7984,"تضم مناطق ساحلية وطبيعية في شمال شبه جزيرة سيناء.",["العريش","بحيرة البردويل","رفح"]],
  ["جنوب سيناء",28.438,33.625,"وجهة سياحية مشهورة بالشواطئ والغوص والجبال.",["شرم الشيخ","دهب","نويبع","طابا","سانت كاترين"]]
];

const governorates = rawGovernorates.map((item) => ({
  name: item[0],
  lat: item[1],
  lng: item[2],
  description: item[3],
  places: item[4]
}));

// ==========================================
// اللغة المحفوظة
// ==========================================

let currentLanguage = localStorage.getItem("pharaoh_language") || "ar";

if (!translations[currentLanguage]) {
  currentLanguage = "ar";
}

let selectedGovernorate = null;

function t(key) {
  return translations[currentLanguage][key] || key;
}

function governorateName(gov) {
  return currentLanguage === "en"
    ? englishData[gov.name][0]
    : gov.name;
}

function governorateDescription(gov) {
  return currentLanguage === "en"
    ? englishData[gov.name][1]
    : gov.description;
}

function placeName(gov, index) {
  return currentLanguage === "en"
    ? englishData[gov.name][2][index] || gov.places[index]
    : gov.places[index];
}

// ==========================================
// إعداد الخريطة
// ==========================================

if (typeof L === "undefined") {
  alert("تعذر تحميل الخريطة. تأكد من اتصال الإنترنت.");
  throw new Error("Leaflet library was not loaded.");
}

const map = L.map("map", {
  center: [27.5, 30.8],
  zoom: 5,
  minZoom: 4,
  maxZoom: 16,
  scrollWheelZoom: true
});

const mapTiles = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
).addTo(map);

const markers = new Map();
const list = $("#governorates");

const goldIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:23px;
    height:23px;
    background:#e9bd60;
    border:3px solid white;
    border-radius:50%;
    box-shadow:0 0 15px #e9bd60;
  "></div>`,
  iconSize: [23, 23],
  iconAnchor: [11, 11]
});

// ==========================================
// روابط الحجز
// ==========================================

function createBookingUrl(destination) {
  return "index.html?destination=" +
    encodeURIComponent(destination) +
    "#booking";
}

// ==========================================
// نافذة تفاصيل المحافظة
// ==========================================

function openGovernorate(gov, shouldScroll = true) {
  selectedGovernorate = gov;

  $("#govName").textContent = governorateName(gov);
  $("#govDescription").textContent = governorateDescription(gov);

  const governorateBooking = $("#governorateBooking");

  governorateBooking.href = createBookingUrl(gov.name);
  governorateBooking.textContent = t("bookGovernorate");

  const placesContainer = $("#places");
  placesContainer.innerHTML = "";

  gov.places.forEach((place, index) => {
    const displayPlace = placeName(gov, index);

    const card = document.createElement("article");
    card.className = "place";

    const title = document.createElement("h3");
    title.textContent = displayPlace;

    const description = document.createElement("p");
    description.textContent = t("placeDescription");

    const gpsLink = document.createElement("a");
    gpsLink.className = "gps";
    gpsLink.target = "_blank";
    gpsLink.rel = "noopener noreferrer";

    gpsLink.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(displayPlace + " " + governorateName(gov) + " Egypt");

    gpsLink.textContent = t("gps");

    const bookingLink = document.createElement("a");
    bookingLink.className = "booking-link";
    bookingLink.href = createBookingUrl(place + " - " + gov.name);
    bookingLink.textContent = t("bookPlace");

    const actions = document.createElement("div");
    actions.className = "place-actions";
    actions.append(gpsLink, bookingLink);

    card.append(title, description, actions);
    placesContainer.appendChild(card);
  });

  $("#details").classList.add("show");

  document.querySelectorAll(".gov-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.name === gov.name);
  });

  const marker = markers.get(gov.name);

  if (marker) {
    marker.setPopupContent(
      `<b>${governorateName(gov)}</b><br>${t("popup")}`
    );

    marker.openPopup();

    if (shouldScroll) {
      map.flyTo(marker.getLatLng(), 8, { duration: 1.2 });
    }
  }

  if (shouldScroll) {
    $("#details").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// ==========================================
// إنشاء قائمة المحافظات
// ==========================================

function renderGovernorates() {
  list.innerHTML = "";

  governorates.forEach((gov) => {
    const marker = markers.get(gov.name);

    if (marker) {
      marker.setPopupContent(
        `<b>${governorateName(gov)}</b><br>${t("popup")}`
      );
    }

    const button = document.createElement("button");

    button.className = "gov-btn";
    button.textContent = "📍 " + governorateName(gov);
    button.dataset.name = gov.name;

    if (selectedGovernorate === gov) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      openGovernorate(gov);
    });

    list.appendChild(button);
  });

  filterGovernorates();
}

// ==========================================
// إضافة علامات الخريطة
// ==========================================

governorates.forEach((gov) => {
  const marker = L.marker([gov.lat, gov.lng], {
    icon: goldIcon
  }).addTo(map);

  marker.bindPopup(
    `<b>${governorateName(gov)}</b><br>${t("popup")}`
  );

  marker.on("click", () => {
    openGovernorate(gov);
  });

  markers.set(gov.name, marker);
});

// ==========================================
// البحث بالعربي والإنجليزي
// ==========================================

function filterGovernorates() {
  const value = $("#search").value.trim().toLowerCase();

  let visibleCount = 0;

  document.querySelectorAll(".gov-btn").forEach((button) => {
    const gov = governorates.find(
      (item) => item.name === button.dataset.name
    );

    const arabicName = gov.name.toLowerCase();
    const englishName = englishData[gov.name][0].toLowerCase();

    const matches =
      arabicName.includes(value) ||
      englishName.includes(value);

    button.style.display = matches ? "block" : "none";

    if (matches) visibleCount++;
  });

  let noResults = $("#noResults");

  if (visibleCount === 0) {
    if (!noResults) {
      noResults = document.createElement("p");
      noResults.id = "noResults";
      noResults.style.color = "#aab8cb";
      noResults.style.padding = "10px";
      list.appendChild(noResults);
    }

    noResults.textContent = t("noResults");
  } else if (noResults) {
    noResults.remove();
  }
}

$("#search").addEventListener("input", filterGovernorates);

// ==========================================
// تطبيق اللغة
// ==========================================

function setLanguage(language) {
  if (!translations[language]) return;

  currentLanguage = language;

  localStorage.setItem("pharaoh_language", language);

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translated = translations[language][key];

    if (translated !== undefined) {
      element.innerHTML = translated;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = translations[language][key] || "";
  });

  $("#langBtn").textContent =
    language === "ar" ? "English" : "العربية";

  updateThemeButton();
  renderGovernorates();

  if (selectedGovernorate) {
    openGovernorate(selectedGovernorate, false);
  }

  window.dispatchEvent(
    new CustomEvent("pharaoh-language-change", {
      detail: { language }
    })
  );
}

$("#langBtn").addEventListener("click", () => {
  setLanguage(currentLanguage === "ar" ? "en" : "ar");
});

// ==========================================
// الوضع الليلي والنهاري
// ==========================================

function getSavedTheme() {
  const saved = localStorage.getItem("pharaoh_theme");

  return saved === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  document.documentElement.dataset.theme = selectedTheme;

  localStorage.setItem("pharaoh_theme", selectedTheme);

  const metaTheme = document.querySelector('meta[name="theme-color"]');

  if (metaTheme) {
    metaTheme.content =
      selectedTheme === "light" ? "#eef3f9" : "#061329";
  }

  updateThemeButton();

  window.dispatchEvent(
    new CustomEvent("pharaoh-theme-change", {
      detail: { theme: selectedTheme }
    })
  );
}

function updateThemeButton() {
  const theme = document.documentElement.dataset.theme || "dark";

  $("#themeToggle").textContent =
    theme === "dark" ? t("day") : t("night");
}

$("#themeToggle").addEventListener("click", () => {
  const currentTheme =
    document.documentElement.dataset.theme || "dark";

  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// ==========================================
// مزامنة الإعدادات مع الصفحة الرئيسية
// ==========================================

window.addEventListener("storage", (event) => {
  if (event.key === "pharaoh_language" && event.newValue) {
    if (translations[event.newValue]) {
      setLanguage(event.newValue);
    }
  }

  if (event.key === "pharaoh_theme" && event.newValue) {
    applyTheme(event.newValue);
  }
});

// ==========================================
// تشغيل الموقع
// ==========================================

applyTheme(getSavedTheme());
setLanguage(currentLanguage);

setTimeout(() => {
  map.invalidateSize();
}, 300);

window.addEventListener("resize", () => {
  map.invalidateSize();
});
