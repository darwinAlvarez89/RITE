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
