import type { Page, Theme } from '@/lib/types.ts';
import { THEME_LABELS } from '@/lib/theme.ts';
import { magnetMove, magnetReset } from '@/lib/utils.ts';

const NAV_LINKS: [Page, string][] = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
];

interface NavBarProps {
  page: Page;
  theme: Theme;
  onNav: (p: Page) => void;
  onCycleTheme: () => void;
}

function navIndicator(active: boolean): string {
  return `height:2px;margin-top:5px;border-radius:2px;background:var(--accent);transform:scaleX(${
    active ? 1 : 0
  });transform-origin:left;transition:transform .28s ease`;
}

export default function NavBar(
  { page, theme, onNav, onCycleTheme }: NavBarProps,
) {
  return (
    <nav style='position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,72px);height:68px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--hair)'>
      <button
        onClick={() => onNav('home')}
        style='background:none;border:none;cursor:pointer;padding:0;display:flex;flex-direction:column;align-items:flex-start;font:inherit'
      >
        <span style='font-size:15px;font-weight:700;letter-spacing:-.01em;color:var(--headline)'>
          Tun Usaha
        </span>
        <span style='font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:1px'>
          Portfolio
        </span>
      </button>

      <div style='display:flex;align-items:center;gap:clamp(14px,3vw,40px)'>
        {NAV_LINKS.map(([p, label]) => (
          <button
            key={p}
            onClick={() => onNav(p)}
            onMouseMove={magnetMove}
            onMouseLeave={magnetReset}
            style='background:none;border:none;cursor:pointer;padding:0;font:inherit;font-size:14px;color:var(--body)'
          >
            {label}
            <div style={navIndicator(page === p)} />
          </button>
        ))}
        <button
          onClick={onCycleTheme}
          title='Toggle theme'
          style='display:flex;align-items:center;gap:7px;background:none;cursor:pointer;font:inherit;font-size:12px;letter-spacing:.04em;color:var(--muted);border:1px solid var(--border);border-radius:999px;padding:6px 13px'
        >
          <span style='width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block' />
          {THEME_LABELS[theme]}
        </button>
      </div>
    </nav>
  );
}
