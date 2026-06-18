import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import type { Repo } from '@/lib/types.ts';
import { fallbackRepos } from '@/lib/data.ts';
import { fmtDate } from '@/lib/utils.ts';

type CSSProps = JSX.CSSProperties;

const SPIKE_W = 84;

interface SpikeStyles {
  orbitTop: CSSProps;
  orbitBot: CSSProps;
  spinTop: CSSProps;
  spinBot: CSSProps;
}

function spikeStyles(hovered: boolean, cardWidth: number): SpikeStyles {
  const distX = Math.max(40, cardWidth - 48);
  const trans = 'transform .8s cubic-bezier(.22,.68,.2,1)';
  const orbitBase: CSSProps = {
    position: 'absolute',
    width: SPIKE_W + 'px',
    zIndex: 0,
    pointerEvents: 'none',
    lineHeight: '0',
  };
  const imgBase: CSSProps = {
    width: SPIKE_W + 'px',
    height: 'auto',
    display: 'block',
    opacity: 0.95,
    filter: 'drop-shadow(0 3px 7px rgba(0,0,0,.18))',
    transformOrigin: 'center',
    transition: trans,
  };
  return {
    orbitTop: {
      ...orbitBase,
      top: '-24px',
      right: '-18px',
      transform: hovered ? `translateX(${-distX}px)` : 'translateX(0px)',
      transition: trans,
    },
    orbitBot: {
      ...orbitBase,
      bottom: '-24px',
      left: '-18px',
      transform: hovered ? `translateX(${distX}px)` : 'translateX(0px)',
      transition: trans,
    },
    spinTop: {
      ...imgBase,
      transform: hovered ? 'rotate(50deg)' : 'rotate(180deg)',
    },
    spinBot: {
      ...imgBase,
      transform: hovered ? 'rotate(-130deg)' : 'rotate(0deg)',
    },
  };
}

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(
    'https://api.github.com/users/TunUsaha/repos?sort=updated&per_page=100',
  );
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);

  const data = await res.json() as Record<string, unknown>[];
  const list = data
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name as string,
      description: (r.description as string) || '[no description yet]',
      language: (r.language as string) || 'Other',
      stars: (r.stargazers_count as number) || 0,
      url: r.html_url as string,
      updated: fmtDate((r.pushed_at as string) || (r.updated_at as string)),
    }));

  return list.length ? list : fallbackRepos();
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredRepo, setHoveredRepo] = useState<number | null>(null);
  const [cardWidths, setCardWidths] = useState<Record<number, number>>({});

  useEffect(() => {
    fetchRepos()
      .then((list) => {
        setRepos(list);
        setError(false);
      })
      .catch(() => {
        setRepos(fallbackRepos());
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style='max-width:1320px;margin:0 auto;padding:clamp(32px,6vw,84px) clamp(20px,5vw,72px) 96px'>
      <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:14px'>
        Projects
      </div>
      <div style='display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:44px'>
        <h1 style='margin:0;font-weight:800;letter-spacing:-.04em;line-height:.95;color:var(--headline);font-size:clamp(48px,9vw,128px)'>
          Projects
        </h1>
        <a
          href='https://github.com/TunUsaha'
          target='_blank'
          rel='noreferrer'
          style='font-size:14px;color:var(--body);text-decoration:none;border:1px solid var(--border);border-radius:999px;padding:9px 16px;transition:border-color .2s ease,color .2s ease;white-space:nowrap'
        >
          Live from GitHub · @TunUsaha ↗
        </a>
      </div>

      {loading && (
        <div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px'>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style='height:158px;border:1px solid var(--hair);border-radius:16px;background:var(--surface);opacity:.6'
            />
          ))}
        </div>
      )}

      {!loading && (
        <>
          {error && (
            <div style='font-size:14px;color:var(--muted);border:1px dashed var(--border);border-radius:12px;padding:16px 18px;margin-bottom:18px'>
              Couldn't reach the GitHub API just now — showing representative
              cards.
            </div>
          )}
          <div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px'>
            {repos.map((repo, i) => {
              const sp = spikeStyles(hoveredRepo === i, cardWidths[i] ?? 300);
              return (
                <div
                  key={repo.name + i}
                  style={{ animation: 'floatUp .5s ease both', animationDelay: `${i * 110}ms` }}
                >
                  <a
                    href={repo.url}
                    target='_blank'
                    rel='noreferrer'
                    onMouseEnter={(e) => {
                      const card = e.currentTarget as HTMLElement;
                      setCardWidths((prev) => ({ ...prev, [i]: card.offsetWidth }));
                      setHoveredRepo(i);
                      card.style.transform = 'translateY(-4px)';
                      card.style.borderColor = 'var(--headline)';
                    }}
                    onMouseLeave={(e) => {
                      setHoveredRepo(null);
                      const card = e.currentTarget as HTMLElement;
                      card.style.transform = '';
                      card.style.borderColor = '';
                    }}
                    style='display:flex;flex-direction:column;position:relative;overflow:visible;text-decoration:none;border:1px solid var(--border);border-radius:16px;padding:22px;background:var(--bg);min-height:158px;transition:transform .25s ease,border-color .25s ease'
                  >
                    <div style={sp.orbitTop}>
                      <img src='/images/spike.png' alt='' style={sp.spinTop} />
                    </div>
                    <div style={sp.orbitBot}>
                      <img src='/images/spike.png' alt='' style={sp.spinBot} />
                    </div>
                    <div style='position:relative;z-index:1;display:flex;flex-direction:column;height:100%;flex:1'>
                      <div style='display:flex;align-items:center;gap:9px;margin-bottom:10px'>
                        <span style='font-size:11px;letter-spacing:.04em;color:var(--muted)'>
                          repo
                        </span>
                        <span style='flex:1' />
                        <span style='font-size:13px;color:var(--muted)'>
                          ★ {repo.stars}
                        </span>
                      </div>
                      <h3 style='margin:0 0 8px;font-size:18px;font-weight:700;color:var(--headline);letter-spacing:-.01em;word-break:break-word'>
                        {repo.name}
                      </h3>
                      <p style='margin:0 0 18px;font-size:14px;line-height:1.55;color:var(--body);flex:1'>
                        {repo.description}
                      </p>
                      <div style='display:flex;align-items:center;gap:14px'>
                        <span style='display:flex;align-items:center;gap:7px;font-size:13px;color:var(--body)'>
                          <span style='width:9px;height:9px;border-radius:50%;background:var(--accent);display:inline-block' />
                          {repo.language}
                        </span>
                        <span style='flex:1' />
                        <span style='font-size:13px;color:var(--muted)'>
                          {repo.updated}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
