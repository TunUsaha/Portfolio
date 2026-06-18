import type { Page } from '@/lib/types.ts';
import type { VendorStyle } from '@/lib/utils.ts';
import { magnetMove, magnetReset } from '@/lib/utils.ts';
import { HOME_CARDS } from '@/lib/data.ts';

function titleSheen(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  if (el.dataset.anim === '1') return;
  el.dataset.anim = '1';

  const s = el.style as VendorStyle;
  s.background =
    'linear-gradient(110deg,transparent 42%,rgba(255,255,255,.92) 50%,transparent 58%),linear-gradient(var(--headline),var(--headline))';
  s.backgroundSize = '250% 100%,100% 100%';
  s.backgroundRepeat = 'no-repeat';
  s.backgroundPosition = '235% 0,0 0';
  s.webkitBackgroundClip = 'text';
  s.backgroundClip = 'text';
  s.webkitTextFillColor = 'transparent';
  s.color = 'transparent';

  void el.offsetWidth;
  s.animation = 'chromeTextOnce 1.4s ease-in-out 1';

  const done = () => {
    s.animation = 'none';
    s.background = 'none';
    s.webkitBackgroundClip = '';
    s.backgroundClip = '';
    s.webkitTextFillColor = '';
    s.color = 'var(--headline)';
    el.dataset.anim = '';
    el.removeEventListener('animationend', done);
  };
  el.addEventListener('animationend', done);
}

function heroEnter(e: MouseEvent) {
  const sec = e.currentTarget as HTMLElement;
  if (sec.dataset.anim === '1') return;
  const bands = sec.querySelectorAll<HTMLElement>('[data-sheen-band]');
  if (!bands.length) return;

  sec.dataset.anim = '1';
  let rem = bands.length;
  bands.forEach((b) => {
    b.style.animation = `${b.dataset.kf} ${b.dataset.dur} ease-in-out 1`;
    const done = () => {
      b.style.animation = 'none';
      b.removeEventListener('animationend', done);
      if (--rem === 0) sec.dataset.anim = '';
    };
    b.addEventListener('animationend', done);
  });
}

function heroMove(e: MouseEvent) {
  const sec = e.currentTarget as HTMLElement;
  const blob = sec.querySelector<HTMLElement>('[data-sheen-blob]');
  if (!blob) return;
  const r = sec.getBoundingClientRect();
  blob.style.opacity = '1';
  blob.style.transform =
    `translate(${e.clientX - r.left}px,${e.clientY - r.top}px) translate(-50%,-50%)`;
}

function heroLeave(e: MouseEvent) {
  const blob = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(
    '[data-sheen-blob]',
  );
  if (blob) blob.style.opacity = '0';
}

interface HomePageProps {
  onNav: (p: Page) => void;
}

export default function HomePage({ onNav }: HomePageProps) {
  return (
    <main style='max-width:1320px;margin:0 auto;padding:clamp(32px,6vw,84px) clamp(20px,5vw,72px) 96px'>
      <section class='l-hero-header'>
        <div>
          <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:18px'>
            Portfolio — 2026
          </div>
          <h1
            onMouseEnter={titleSheen}
            style='margin:0;font-weight:800;letter-spacing:-.045em;line-height:.92;color:var(--headline);font-size:clamp(56px,13vw,184px);cursor:default'
          >
            Tun<br />Usaha
          </h1>
        </div>
        <div style='padding-bottom:14px'>
          <p style='margin:0 0 18px;font-size:clamp(18px,1.6vw,23px);line-height:1.45;color:var(--headline);font-weight:500'>
            Business Analyst &amp; Knowledge&nbsp;Management Researcher
          </p>
          <p style='margin:0 0 28px;font-size:15.5px;line-height:1.65;color:var(--body)'>
            Bridging business analysis, AI/ML research, and academic inquiry.
            Currently pursuing an M.S. in Knowledge &amp; Innovation Management
            at Chiang&nbsp;Mai&nbsp;University.{' '}
            <span style='color:var(--muted)'>
              Curious about business, AI, and innovation.
            </span>
          </p>
          <div style='display:flex;gap:12px;flex-wrap:wrap'>
            <button
              onClick={() => onNav('experience')}
              onMouseMove={magnetMove}
              onMouseLeave={magnetReset}
              style='font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:13px 24px;border-radius:999px;border:none;background:var(--accent);color:#fff;transition:transform .25s cubic-bezier(.2,.7,.2,1),filter .2s ease'
            >
              View Experience
            </button>
            <button
              onClick={() => onNav('projects')}
              onMouseMove={magnetMove}
              onMouseLeave={magnetReset}
              style='font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:13px 24px;border-radius:999px;border:1px solid var(--border);background:transparent;color:var(--headline);transition:transform .25s cubic-bezier(.2,.7,.2,1),border-color .2s ease'
            >
              See Projects →
            </button>
          </div>
        </div>
      </section>

      <section
        onMouseEnter={heroEnter}
        onMouseMove={heroMove}
        onMouseLeave={heroLeave}
        style='position:relative;margin-top:clamp(36px,5vw,64px);height:clamp(300px,40vw,540px);border-radius:20px;overflow:hidden;border:1px solid var(--border)'
      >
        <div style='position:absolute;inset:-20%;animation:marbleA 26s ease-in-out infinite alternate;background:radial-gradient(120% 90% at 22% 28%,#ffffff 0%,rgba(255,255,255,0) 55%),radial-gradient(110% 80% at 82% 72%,#9c9c9c 0%,rgba(156,156,156,0) 55%),conic-gradient(from 210deg at 50% 50%,#eaeaea,#bcbcbc,#f5f5f5,#a4a4a4,#dedede,#c9c9c9,#eaeaea)' />
        <div style='position:absolute;inset:-25%;mix-blend-mode:overlay;filter:blur(3px);animation:marbleB 32s ease-in-out infinite alternate;background:radial-gradient(60% 50% at 35% 60%,#ffffff,rgba(255,255,255,0) 60%),radial-gradient(55% 45% at 70% 30%,#7d7d7d,rgba(125,125,125,0) 60%),linear-gradient(120deg,#d2d2d2,#f2f2f2,#b0b0b0)' />
        <div style='position:absolute;inset:0;box-shadow:inset 0 0 120px 20px var(--hero-vignette)' />
        <img
          src='/images/hero-render.webp'
          alt=''
          style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block'
        />
        <div style='position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden'>
          <div
            data-sheen-band=''
            data-kf='chromeOnce1'
            data-dur='1.6s'
            style='position:absolute;inset:-30%;mix-blend-mode:soft-light;opacity:.6;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.9) 50%,transparent 58%);transform:translateX(-80%) skewX(-12deg)'
          />
          <div
            data-sheen-band=''
            data-kf='chromeOnce2'
            data-dur='1.9s'
            style='position:absolute;inset:-30%;mix-blend-mode:overlay;opacity:.32;background:linear-gradient(80deg,transparent 44%,rgba(255,255,255,.75) 50%,transparent 56%);transform:translateX(125%) skewX(10deg)'
          />
          <div
            data-sheen-blob=''
            style='position:absolute;left:0;top:0;width:46%;aspect-ratio:1;border-radius:50%;transform:translate(50%,40%) translate(-50%,-50%);background:radial-gradient(circle,rgba(255,255,255,.9) 0%,rgba(255,255,255,.25) 38%,rgba(255,255,255,0) 66%);mix-blend-mode:soft-light;filter:blur(6px);opacity:0;transition:transform .22s cubic-bezier(.2,.7,.2,1),opacity .5s ease'
          />
        </div>
        <img
          src='/images/statue.png'
          alt=''
          style='position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:96%;max-height:100%;width:auto;z-index:2;pointer-events:none;filter:drop-shadow(0 14px 36px rgba(0,0,0,.28))'
        />
      </section>

      <section style='margin-top:clamp(56px,7vw,104px)'>
        <div style='display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:32px;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) both'>
          <div>
            <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:12px'>
              Interesting
            </div>
            <h2 style='margin:0;font-weight:800;letter-spacing:-.035em;line-height:1;color:var(--headline);font-size:clamp(32px,5vw,64px)'>
              Things that keep<br />me curious
            </h2>
          </div>
          <p style='margin:0;max-width:340px;font-size:14px;line-height:1.6;color:var(--muted)'>
            The questions, fields, and ideas I keep circling back to — the
            stuff that makes the work feel like play.
          </p>
        </div>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px'>
          {HOME_CARDS.map((c, i) => (
            <div
              key={c.num}
              data-reveal=''
              style={`position:relative;overflow:hidden;border:1px solid var(--border);border-radius:16px;background:var(--surface);padding:26px 24px 24px;transition:transform .4s cubic-bezier(.2,.7,.2,1),border-color .35s ease,box-shadow .4s ease;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${
                0.05 + i * 0.07
              }s both`}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-8px)';
                el.style.borderColor = 'var(--headline)';
                el.style.boxShadow = '0 22px 48px rgba(0,0,0,.13)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.borderColor = '';
                el.style.boxShadow = '';
              }}
            >
              <div
                data-deco=''
                style='position:absolute;right:-12px;top:-12px;width:128px;height:128px;background-image:radial-gradient(var(--accent) 1.2px,transparent 1.6px);background-size:11px 11px;opacity:.15;pointer-events:none'
              />
              <div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:18px'>
                <span style='font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:700'>
                  {c.tag}
                </span>
                <span style='font-size:14px;font-weight:800;color:var(--muted)'>
                  {c.num}
                </span>
              </div>
              <h3 style='margin:0 0 10px;font-size:20px;font-weight:700;letter-spacing:-.01em;color:var(--headline)'>
                {c.title}
              </h3>
              <p style='margin:0;font-size:14px;line-height:1.6;color:var(--body)'>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
