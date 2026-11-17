// Count-up numbers (owner, 2026-11-17): every [data-count] element counts
// from 0 to its own value when it scrolls into view (Proof strip: "4.9★",
// "2,100+", "48 hrs"). The server renders the final text, so without JS or
// with reduced motion the real number shows. The first number in the text
// animates; anything before/after it (★, +, " hrs") stays. Decimals and
// thousands separators follow the original. Screen readers get the final
// value once (sr-only copy) instead of a stream of numbers.
export function initCountUp(): void {
  const root = document.documentElement;
  if (!root.classList.contains('reveal-on')) return; // reduced motion: no count

  const raw = getComputedStyle(root).getPropertyValue('--m-count-time').trim();
  const n = parseFloat(raw);
  const duration = Number.isNaN(n) ? 1600 : raw.endsWith('ms') ? n : n * 1000;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

  const items = [...document.querySelectorAll<HTMLElement>('[data-count]')].flatMap((el) => {
    const text = el.textContent ?? '';
    const m = text.match(/^(.*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s);
    if (!m) return [];
    const [, before, num, after] = m;
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    const fmt = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: num.includes(','),
    });
    const target = parseFloat(num.replace(/,/g, ''));
    const render = (v: number) => { el.textContent = `${before}${fmt.format(v)}${after}`; };

    // Final value for assistive tech; the animated text is hidden from it.
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    el.after(sr);
    el.setAttribute('aria-hidden', 'true');

    // Hold the final width so the number doesn't jitter while it counts.
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    el.classList.add('is-counting');
    render(0);
    return [{ el, target, render, text }];
  });
  if (!items.length) return;

  const run = (item: (typeof items)[number]) => {
    // Start together with the element's own reveal (its stagger delay).
    const delay = (parseFloat(item.el.style.getPropertyValue('--reveal-delay')) || 0) * 1000;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      if (t >= 1) {
        item.el.textContent = item.text; // exact original text at the end
        item.el.classList.remove('is-counting');
        return;
      }
      item.render(item.target * easeOut(t));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const item = items.find((i) => i.el === entry.target);
        // Let reveal.ts set this element's --reveal-delay first.
        if (item) requestAnimationFrame(() => run(item));
      }
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.01 },
  );
  items.forEach((i) => io.observe(i.el));
}
