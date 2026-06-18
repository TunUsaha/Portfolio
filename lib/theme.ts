import type { Theme } from './types.ts';

const ACCENT = '#d72638';

export const THEME_ORDER: Theme[] = ['auto', 'light', 'dark'];

export const THEME_LABELS: Record<Theme, string> = {
  auto: 'Auto',
  light: 'Light',
  dark: 'Dark',
};

export function buildThemeVars(theme: Theme): Record<string, string> {
  if (theme === 'light') {
    return {
      '--bg': '#ffffff',
      '--surface': '#fafafa',
      '--headline': '#1a1a1a',
      '--body': '#454545',
      '--muted': '#8c8c8c',
      '--hair': '#ededed',
      '--border': '#e4e4e4',
      '--glass': 'rgba(255,255,255,.72)',
      '--accent': ACCENT,
      '--hero-vignette': 'rgba(0,0,0,.18)',
    };
  }
  if (theme === 'dark') {
    return {
      '--bg': '#161616',
      '--surface': '#2e2e2e',
      '--headline': '#f6f6f6',
      '--body': '#d2d2d2',
      '--muted': '#a0a0a0',
      '--hair': '#3a3a3a',
      '--border': '#525252',
      '--glass': 'rgba(22,22,22,.6)',
      '--accent': ACCENT,
      '--hero-vignette': 'rgba(0,0,0,.04)',
      '--chrome-grad':
        'linear-gradient(176deg,#cfcfcf 0%,#ffffff 32%,#8c8c8c 52%,#ededed 70%,#a0a0a0 100%)',
    };
  }
  return { '--accent': ACCENT };
}
