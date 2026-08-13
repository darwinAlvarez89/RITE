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

/* ==========================================================================
   APP-RITE — Navegación contextual de los test
   Añade el origen al enlace para que "Cancelar y Salir" devuelva al alumno
   al lugar desde el que comenzó el test, evitando saltos inesperados de UX.
   ========================================================================== */

function getRiteTestSource() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/repasar_articulado.html')) return 'articulado';
  if (path.endsWith('/repasar_it_rite.html')) return 'it';
  if (path.endsWith('/test_por_it_rite.html')) return 'menu';
  return '';
}

function decorateRiteTestLinks() {
  const source = getRiteTestSource();
  if (!source) return;

  document.querySelectorAll('a[href*="plantilla/plantilla_test.html"]').forEach(link => {
    try {
      const url = new URL(link.getAttribute('href'), window.location.href);
      url.searchParams.set('from', source);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    } catch (e) {
      console.warn('APP-RITE: no se pudo contextualizar un enlace de test.', e);
    }
  });
}

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
  decorateRiteTestLinks();

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

/*
 * La plantilla de test declara cancelarYSalir() después de cargar theme.js.
 * Al evento load la función ya existe, por lo que podemos sustituir únicamente
 * su destino sin tocar el motor de preguntas, puntuación, temporizador o banco.
 */
window.addEventListener('load', () => {
  const path = window.location.pathname.toLowerCase();
  if (!path.endsWith('/plantilla/plantilla_test.html')) return;

  window.cancelarYSalir = function cancelarYSalirContextual() {
    if (typeof window.borrarProgreso === 'function') {
      window.borrarProgreso();
    }

    const params = new URLSearchParams(window.location.search);
    const source = params.get('from');
    const testId = (params.get('id') || '').toUpperCase();

    const destinos = {
      articulado: '../Repasar_Articulado.html',
      it: '../Repasar_IT_RITE.html',
      menu: '../Test_por_IT_RITE.html'
    };

    // Compatibilidad con enlaces antiguos sin parámetro "from".
    const fallback = testId === 'ARTICULADO'
      ? '../Repasar_Articulado.html'
      : '../Test_por_IT_RITE.html';

    window.location.href = destinos[source] || fallback;
  };
});
