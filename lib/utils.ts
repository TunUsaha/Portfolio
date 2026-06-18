export type VendorStyle = CSSStyleDeclaration & {
  webkitBackgroundClip: string;
  webkitTextFillColor: string;
};

export function fmtDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function magnetMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  const dx = ((e.clientX - (r.left + r.width / 2)) * 0.3).toFixed(1);
  const dy = ((e.clientY - (r.top + r.height / 2)) * 0.45).toFixed(1);
  el.style.transform = `translate(${dx}px,${dy}px)`;
}

export function magnetReset(e: MouseEvent) {
  (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)';
}
