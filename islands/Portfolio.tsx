import { useState } from 'preact/hooks';
import type { Page, Theme } from '@/lib/types.ts';
import { buildThemeVars, THEME_ORDER } from '@/lib/theme.ts';
import NavBar from '@/components/NavBar.tsx';
import HomePage from '@/components/pages/HomePage.tsx';
import AboutPage from '@/components/pages/AboutPage.tsx';
import ExperiencePage from '@/components/pages/ExperiencePage.tsx';
import ProjectsPage from '@/components/pages/ProjectsPage.tsx';

export default function Portfolio() {
  const [page, setPage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>('auto');
  const [entering, setEntering] = useState(false);

  const nav = (p: Page) => {
    if (p === page) return;
    setEntering(true);
    setPage(p);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
  };

  const cycleTheme = () => {
    setTheme((cur) => THEME_ORDER[(THEME_ORDER.indexOf(cur) + 1) % THEME_ORDER.length]);
  };

  const rootStyle = {
    minHeight: '100vh',
    background: 'var(--bg)',
    color: 'var(--body)',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    transition: 'background .4s ease, color .4s ease',
    ...buildThemeVars(theme),
  };

  const pageStyle = {
    opacity: entering ? 0 : 1,
    transform: entering ? 'translateY(12px)' : 'translateY(0)',
    transition: 'opacity .42s ease, transform .42s ease',
  };

  return (
    <div style={rootStyle}>
      <NavBar page={page} theme={theme} onNav={nav} onCycleTheme={cycleTheme} />
      <div style={pageStyle}>
        {page === 'home' && <HomePage onNav={nav} />}
        {page === 'about' && <AboutPage onNav={nav} />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'projects' && <ProjectsPage />}
      </div>
      <footer style='border-top:1px solid var(--hair);padding:34px clamp(20px,5vw,72px);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px'>
        <span style='font-size:13px;color:var(--muted)'>
          © 2026 Tun Usaha — Portfolio
        </span>
        <div style='display:flex;align-items:center;gap:22px;flex-wrap:wrap'>
          <a
            href='https://github.com/TunUsaha'
            target='_blank'
            rel='noreferrer'
            style='font-size:13px;color:var(--body);text-decoration:none'
          >
            GitHub @TunUsaha ↗
          </a>
          <a
            href='https://www.kaggle.com/tunusaha'
            target='_blank'
            rel='noreferrer'
            style='font-size:13px;color:var(--body);text-decoration:none'
          >
            Kaggle @tunusaha ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
