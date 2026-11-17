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

/** Lock / unlock page scrolling (menu panel). Overlays add data-lenis-prevent. */
export function lockScroll(locked: boolean): void {
  document.documentElement.classList.toggle('is-locked', locked);
  if (locked) lenis?.stop();
  else lenis?.start();
}
