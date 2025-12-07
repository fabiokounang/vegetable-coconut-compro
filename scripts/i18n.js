i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init(
    {
      fallbackLng: "en",
      debug: false,
      backend: {
        loadPath: "/locales/{{lng}}/translation.json",
      },
    },
    function (err, t) {
      const currentLang = i18next.resolvedLanguage || "en";
      updateContent(currentLang);
    }
  );

const ACTIVE_CLASSES = [
  "bg-gradient-to-r",
  "from-green-500",
  "to-green-600",
  "text-white",
  "shadow-md",
  "scale-105"
];
const INACTIVE_CLASSES = ["text-gray-600", "scale-100"];

const LANGS = ["en", "zh"]; // kalau nanti ada 'id', tinggal tambah di sini

function animateClick(el) {
  if (!el) return;

  el.classList.add("scale-110", "opacity-80");

  setTimeout(() => {
    el.classList.remove("scale-110", "opacity-80");
  }, 300); // sesuai duration transition
}

function setActiveLang(lng) {
  LANGS.forEach(code => {
    const btn = document.getElementById(`lang-${code}`);
    const btnMobile = document.getElementById(`lang-${code}-mobile`);
    
    [btn, btnMobile].forEach(el => {
      if (!el) return;
      el.classList.remove(...ACTIVE_CLASSES);
      el.classList.add(...INACTIVE_CLASSES);
    });
  });

  const activeBtn = document.getElementById(`lang-${lng}`);
  const activeBtnMobile = document.getElementById(`lang-${lng}-mobile`);

  [activeBtn, activeBtnMobile].forEach(el => {
    if (!el) return;
    el.classList.remove(...INACTIVE_CLASSES);
    el.classList.add(...ACTIVE_CLASSES);

    /// ⚡ ANIMASI KLIK
    animateClick(el);
  });
}


function updateContent(lng) {
  if (lng) {
    setActiveLang(lng);
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = i18next.t(key);
  });
}

// Change language function
function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent(lng);
  });
}
