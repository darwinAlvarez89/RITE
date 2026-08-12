/* ==========================================================================
   APP-RITE — Common Utility Functions
   ========================================================================== */

/**
 * Fisher-Yates shuffle algorithm for array randomization.
 * Returns a new shuffled array without mutating the original array.
 */
function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const copy = [...array];
  let currentIndex = copy.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
  }
  return copy;
}

/**
 * Normalizes string identifiers for robust block matching.
 * E.g., "IT 1.1" -> "IT-1.1", "Articulado" -> "ARTICULADO"
 */
function normalizeBlockId(id) {
  if (!id) return '';
  return id
    .toString()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Gets query parameter from current URL window location.
 */
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Formats time in seconds to MM:SS format.
 */
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  return `${mm}:${ss}`;
}

/**
 * LocalStorage wrapper with JSON serialization safety.
 */
const StorageUtil = {
  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (err) {
      console.error('LocalStorage Save Error:', err);
      return false;
    }
  },
  load(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('LocalStorage Load Error:', err);
      return null;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('LocalStorage Remove Error:', err);
      return false;
    }
  }
};
