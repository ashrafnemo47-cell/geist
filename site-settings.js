
"use strict";

// ==================================
// PHARAOH EGYPT - SETTINGS SYSTEM
// ==================================

const SETTINGS = {
  languageKey: "pharaoh_language",
  themeKey: "pharaoh_theme"
};

// قراءة الإعدادات المحفوظة
function getSiteSettings() {
  return {
    language: localStorage.getItem(SETTINGS.languageKey) || "ar",
    theme: localStorage.getItem(SETTINGS.themeKey) || "dark"
  };
}

// تطبيق اللغة
function applySiteLanguage(language) {
  const lang = language === "en" ? "en" : "ar";

  localStorage.setItem(SETTINGS.languageKey, lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.body.classList.toggle("english-mode", lang === "en");

  window.dispatchEvent(
    new CustomEvent("pharaoh-language-change", {
      detail: { language: lang }
    })
  );
}

// تطبيق الوضع الليلي أو النهاري
function applySiteTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  localStorage.setItem(SETTINGS.themeKey, selectedTheme);

  document.body.classList.toggle(
    "light-mode",
    selectedTheme === "light"
  );

  document.body.classList.toggle(
    "dark-mode",
    selectedTheme === "dark"
  );

  window.dispatchEvent(
    new CustomEvent("pharaoh-theme-change", {
      detail: { theme: selectedTheme }
    })
  );
}

// تغيير اللغة من الصفحة الرئيسية
function setSiteLanguage(language) {
  applySiteLanguage(language);
}

// تغيير المظهر من الصفحة الرئيسية
function setSiteTheme(theme) {
  applySiteTheme(theme);
}

// تحميل الإعدادات عند فتح أي صفحة
document.addEventListener("DOMContentLoaded", () => {
  const settings = getSiteSettings();

  applySiteLanguage(settings.language);
  applySiteTheme(settings.theme);
});

// إتاحة الدوال لباقي ملفات الموقع
window.setSiteLanguage = setSiteLanguage;
window.setSiteTheme = setSiteTheme;
window.getSiteSettings = getSiteSettings;
