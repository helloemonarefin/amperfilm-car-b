// Scroll reveal (BOILERPLATE §1.5 + §7.6): one data-reveal per visual item.
// Plays once. Batches stagger top → bottom, left → right, capped at
// --m-reveal-stagger-max so big batches don't trickle in.
export function initReveal(): void {
  const root = document.documentElement;
  if (!root.classList.contains('reveal-on')) return;

  const readSeconds = (name: string, fallback: number) =>
    parseFloat(getComputedStyle(root).getPropertyValue(name)) || fallback;

  const show = (els: HTMLElement[]) => {
    const s = readSeconds('--m-reveal-stagger', 0.05);
    const max = readSeconds('--m-reveal-stagger-max', 0.4);
    els
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .sort((a, b) => Math.round(a.r.top - b.r.top) || a.r.left - b.r.left)
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
