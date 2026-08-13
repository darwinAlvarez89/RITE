/* ==========================================================================
   APP-RITE — Google Analytics 4 + Theme Manager
   Measurement ID: G-ZS8D1W000D
   ========================================================================== */

(function initAnalytics() {
  const MEASUREMENT_ID = 'G-ZS8D1W000D';

  if (window.__appRiteAnalyticsInitialized) return;
  window.__appRiteAnalyticsInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
})();

/* ==========================================================================
   APP-RITE — Theme Manager (Dark / Light Mode)
   Persists choice in localStorage ('rite_theme')
   ========================================================================== */

(function initTheme() {
  const savedTheme = localStorage.getItem('rite_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');

  function updateIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    if (lightIcon && darkIcon) {
      if (isDark) {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      } else {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    }
  }

  updateIcons();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('rite_theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('rite_theme', 'dark');
      }
      updateIcons();
    });
  }
});
