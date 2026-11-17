// Scroll-linked text reveal (owner, 2026-11-17; ref: Framer "Text Reveal").
// Each word of a [data-text-reveal] element is a .tr-word span (rendered by
// the component, so the text reads normally without JS). As the element
// scrolls from --tr-start to --tr-end of the viewport height, words fill in
// one by one from a ghost opacity (--tr-dim) to their own colour. Scrolling
// back un-reveals them. Skipped under reduced motion.
export function initTextReveal(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...document.querySelectorAll<HTMLElement>('[data-text-reveal]')];
  if (!els.length) return;

  const css = getComputedStyle(document.documentElement);
  const num = (name: string, fallback: number) => parseFloat(css.getPropertyValue(name)) || fallback;
  const start = num('--tr-start', 0.9);
  const end = num('--tr-end', 0.35);

  const active = new Set<HTMLElement>();
  let raf = 0;

  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    for (const el of active) {
      const words = el.querySelectorAll<HTMLElement>('.tr-word');
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (vh * start - top) / (vh * (start - end))));
      const n = words.length;
      words.forEach((w, i) => {
        const local = Math.min(1, Math.max(0, p * n - i));
        w.style.setProperty('--p', local.toFixed(3));
      });
    }
  };
  const request = () => { if (!raf) raf = requestAnimationFrame(update); };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) active.add(e.target as HTMLElement);
      else active.delete(e.target as HTMLElement);
    }
    request();
  }, { rootMargin: '10% 0px' });

  els.forEach((el) => { el.classList.add('is-text-reveal'); io.observe(el); });
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}
