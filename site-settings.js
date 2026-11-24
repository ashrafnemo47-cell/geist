
"use strict";

// PHARAOH EGYPT - CENTRAL SETTINGS

const PHARAOH_SETTINGS = {
  language: "pharaoh_language",
  theme: "pharaoh_theme"
};

// حفظ الإعدادات
function saveCurrentSettings() {
  const language =
    document.documentElement.lang === "en" ? "en" : "ar";

  const theme = document.body.classList.contains("light-mode")
    ? "light"
    : "dark";

  localStorage.setItem(PHARAOH_SETTINGS.language, language);
  localStorage.setItem(PHARAOH_SETTINGS.theme, theme);
}

// تطبيق اللغة
window.setSiteLanguage = function(language) {
  const lang = language === "en" ? "en" : "ar";

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  localStorage.setItem(PHARAOH_SETTINGS.language, lang);

  window.dispatchEvent(
    new CustomEvent("pharaoh-language-change", {
      detail: { language: lang }
    })
  );
};

// تطبيق المظهر
window.setSiteTheme = function(theme) {
  const selected = theme === "light" ? "light" : "dark";

  document.body.classList.toggle("light-mode", selected === "light");
  document.body.classList.toggle("dark-mode", selected === "dark");

  localStorage.setItem(PHARAOH_SETTINGS.theme, selected);

  window.dispatchEvent(
    new CustomEvent("pharaoh-theme-change", {
      detail: { theme: selected }
    })
  );
};

// تحميل الإعدادات المحفوظة
const savedLanguage =
  localStorage.getItem(PHARAOH_SETTINGS.language) || "ar";

const savedTheme =
  localStorage.getItem(PHARAOH_SETTINGS.theme) || "dark";

window.setSiteLanguage(savedLanguage);
window.setSiteTheme(savedTheme);

// مراقبة تغييرات اللغة والمظهر من script.js
const settingsObserver = new MutationObserver(saveCurrentSettings);

settingsObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang", "dir"]
});

settingsObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});
