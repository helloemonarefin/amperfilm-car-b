// Scroll reveal (BOILERPLATE §1.5 + §7.6): one data-reveal per visual item.
// Plays once. Items that enter together reveal one by one in READING order
// (DOM order: heading → intro on the right → the content below; inside a
// two-column block the left column first, then the right) — owner,
// 2026-11-17. Stagger --m-reveal-stagger, capped at --m-reveal-stagger-max.
export function initReveal(): void {
  const root = document.documentElement;
  if (!root.classList.contains('reveal-on')) return;

  // Time tokens may compute as "0.05s" or "50ms": convert both to seconds.
  const readSeconds = (name: string, fallback: number) => {
    const raw = getComputedStyle(root).getPropertyValue(name).trim();
    const n = parseFloat(raw);
    if (Number.isNaN(n)) return fallback;
    return raw.endsWith('ms') ? n / 1000 : n;
  };

  const show = (els: HTMLElement[]) => {
    const s = readSeconds('--m-reveal-stagger', 0.05);
    const max = readSeconds('--m-reveal-stagger-max', 0.4);
    els
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .forEach(({ el, r }, i) => {
        // Items outside the screen horizontally (scroll-snap rows) don't wait.
        const offscreen = r.right < 0 || r.left > window.innerWidth;
        el.style.setProperty('--reveal-delay', `${offscreen ? 0 : Math.min(i * s, max)}s`);
        el.classList.add('is-revealed');
      });
  };

  const io = new IntersectionObserver(
    (entries) => {
      const batch: HTMLElement[] = [];
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (el.hasAttribute('data-reveal-group')) {
          batch.push(...el.querySelectorAll<HTMLElement>('[data-reveal]'));
        } else {
          batch.push(el);
        }
      }
      if (batch.length) show(batch);
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.01 },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((g) => io.observe(g));
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!el.closest('[data-reveal-group]')) io.observe(el);
  });
}
