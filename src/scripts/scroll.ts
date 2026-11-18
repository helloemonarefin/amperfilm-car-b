// Smooth scroll + scroll lock, shared by the menu panel (BOILERPLATE §1.13).
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;

export function initScroll(): Lenis | null {
  if (lenis) return lenis;
  // Lenis is skipped under reduced motion so native scrolling is used as-is.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  lenis = new Lenis({
    autoRaf: true,
    // The compact sticky header only shows while scrolling up, so anchors
    // (always reached by scrolling down) need no offset.
    anchors: true,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
  });
  return lenis;
}

// Page keys that scroll. Space is left alone: on the menu's buttons and links
// it activates them, and focus never leaves the menu while it's open.
const SCROLL_KEYS = new Set(['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);
const inScrollArea = (t: EventTarget | null) => t instanceof Element && !!t.closest('[data-lenis-prevent]');
const blockWheel = (e: Event) => { if (!inScrollArea(e.target)) e.preventDefault(); };
const blockKeys = (e: KeyboardEvent) => {
  const t = e.target as Element | null;
  if (SCROLL_KEYS.has(e.key) && !t?.closest('input, select, textarea, [data-lenis-prevent]')) e.preventDefault();
};

/**
 * Lock / unlock page scrolling (menu panel). Overlays add data-lenis-prevent.
 * Where the scrollbar takes space (Windows, macOS with a mouse), hiding it
 * would make the page ~15px wider and re-lay everything out under the menu's
 * open animation — the flicker the owner saw (2026-11-18). There the
 * scrollbar stays and wheel / touch / scroll keys are blocked instead.
 * Overlay scrollbars (phones, trackpad Macs) keep the plain overflow lock.
 */
export function lockScroll(locked: boolean): void {
  const root = document.documentElement;
  if (locked) {
    const keepBar = window.innerWidth - root.clientWidth > 0;
    root.classList.toggle('is-scrollbar-lock', keepBar);
    if (keepBar) {
      window.addEventListener('wheel', blockWheel, { passive: false });
      window.addEventListener('touchmove', blockWheel, { passive: false });
      window.addEventListener('keydown', blockKeys);
    }
    root.classList.add('is-locked');
    lenis?.stop();
  } else {
    window.removeEventListener('wheel', blockWheel);
    window.removeEventListener('touchmove', blockWheel);
    window.removeEventListener('keydown', blockKeys);
    root.classList.remove('is-locked', 'is-scrollbar-lock');
    lenis?.start();
  }
}
