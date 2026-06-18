import { useEffect, useState } from 'preact/hooks';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (p: Page) => {
    onNav(p);
    setMenuOpen(false);
  };

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav style='position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,72px);height:68px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--hair)'>
        <button
          onClick={() => handleNav('home')}
          style='background:none;border:none;cursor:pointer;padding:0;display:flex;flex-direction:column;align-items:flex-start;font:inherit'
        >
          <span style='font-size:15px;font-weight:700;letter-spacing:-.01em;color:var(--headline)'>
            Tun Usaha
          </span>
          <span style='font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:1px'>
            Portfolio
          </span>
        </button>

        {/* Desktop nav — hidden on mobile via CSS */}
        <div class='l-nav-links'>
          {NAV_LINKS.map(([p, label]) => (
            <button
              key={p}
              onClick={() => handleNav(p)}
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

        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          class='l-burger'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        class={`l-mmenu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
        role='dialog'
        aria-modal='true'
      >
        {NAV_LINKS.map(([p, label]) => (
          <button
            key={p}
            onClick={() => handleNav(p)}
            style={`background:none;border:none;border-bottom:1px solid var(--hair);cursor:pointer;width:100%;text-align:left;font:inherit;font-size:32px;font-weight:700;letter-spacing:-.035em;color:${
              page === p ? 'var(--accent)' : 'var(--headline)'
            };padding:22px 0;transition:color .2s ease`}
          >
            {label}
          </button>
        ))}
        <div style='margin-top:32px'>
          <button
            onClick={onCycleTheme}
            style='display:inline-flex;align-items:center;gap:8px;background:none;cursor:pointer;font:inherit;font-size:14px;letter-spacing:.04em;color:var(--muted);border:1px solid var(--border);border-radius:999px;padding:10px 18px'
          >
            <span style='width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block' />
            {THEME_LABELS[theme]}
          </button>
        </div>
      </div>
    </>
  );
}
