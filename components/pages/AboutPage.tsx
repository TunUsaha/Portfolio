import type { Page } from '@/lib/types.ts';
import { magnetMove, magnetReset } from '@/lib/utils.ts';
import { JOURNEY, OFF_CLOCK, SKILLS } from '@/lib/data.ts';

interface AboutPageProps {
  onNav: (p: Page) => void;
}

export default function AboutPage({ onNav }: AboutPageProps) {
  return (
    <main style='padding:0 0 96px;overflow:hidden'>
      <section style='max-width:1140px;margin:0 auto;padding:clamp(32px,6vw,80px) clamp(20px,5vw,72px) clamp(36px,5vw,64px)'>
        <div class='l-about-intro'>
          <div class='l-about-avatar' style='position:relative;aspect-ratio:1;border-radius:50%;background:#f2f2f2;border:1px solid var(--border);overflow:hidden;box-shadow:0 26px 60px rgba(0,0,0,.18);animation:revealIn .85s cubic-bezier(.2,.7,.2,1) both'>
            <div style='position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.13) 1.1px,transparent 1.5px);background-size:13px 13px;opacity:.55' />
            <div style='position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(transparent,rgba(0,0,0,.05))' />
            <img
              src='/images/avatar.png'
              alt='Tun'
              style='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transform:scale(1.34);transform-origin:50% 62%;animation:avatarBob 6.5s ease-in-out infinite'
            />
          </div>
          <div style='animation:revealIn .85s cubic-bezier(.2,.7,.2,1) .1s both'>
            <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:16px'>
              About — the person behind the work
            </div>
            <h1 style='margin:0 0 22px;font-weight:800;letter-spacing:-.045em;line-height:.9;color:var(--headline);font-size:clamp(46px,8.5vw,116px)'>
              Hi, I'm<br />Tun.
            </h1>
            <p style='margin:0 0 24px;max-width:540px;font-size:clamp(16px,1.5vw,19px);line-height:1.6;color:var(--body)'>
              A recent graduate, still early in the journey — happiest digging
              through a messy spreadsheet just to understand what's really
              going on. Business analyst by training, researcher by curiosity.
            </p>
            <div style='display:flex;flex-wrap:wrap;gap:10px'>
              <span style='display:flex;align-items:center;gap:8px;font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:7px 14px'>
                <span style='width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block' />
                Chiang Mai, Thailand
              </span>
              <span style='font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:7px 14px'>
                Business Analyst · KM Researcher
              </span>
              <span style='font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:7px 14px'>
                M.S. candidate · CMU
              </span>
            </div>
          </div>
        </div>
      </section>

      <section style='max-width:1140px;margin:0 auto;padding:clamp(18px,3vw,32px) clamp(20px,5vw,72px) clamp(40px,5vw,72px)'>
        <p style='margin:0;max-width:960px;font-size:clamp(24px,3.6vw,48px);line-height:1.3;letter-spacing:-.022em;font-weight:600;color:var(--headline);animation:revealIn .8s cubic-bezier(.2,.7,.2,1) both'>
          I'm drawn to where{' '}
          <span style='color:var(--accent)'>business analysis</span>,{' '}
          <span style='color:var(--accent)'>applied AI</span>, and{' '}
          <span style='color:var(--accent)'>academic research</span>{' '}
          meet — still learning, and genuinely curious about how organizations
          capture, structure, and act on what they know.
        </p>
      </section>

      <section style='max-width:1140px;margin:0 auto;padding:clamp(28px,4vw,48px) clamp(20px,5vw,72px) clamp(20px,3vw,40px);border-top:1px solid var(--border)'>
        <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:10px'>
          The journey so far
        </div>
        <h2 style='margin:0 0 clamp(28px,4vw,48px);font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--headline);font-size:clamp(30px,4.4vw,56px)'>
          How I got here
        </h2>
        <div style='display:flex;flex-direction:column;gap:clamp(20px,3vw,32px)'>
          {JOURNEY.map((j, i) => (
            <article
              key={j.num}
              style={`display:grid;grid-template-columns:clamp(96px,14vw,150px) 1fr;gap:clamp(18px,3vw,40px);padding-left:clamp(14px,2vw,22px);border-left:2px solid ${
                j.accent ? 'var(--accent)' : 'var(--border)'
              };animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${
                0.05 + i * 0.09
              }s both`}
            >
              <div>
                <div style='font-size:clamp(34px,4vw,52px);font-weight:800;letter-spacing:-.04em;color:var(--headline);line-height:1'>
                  {j.num}
                </div>
                <div style='font-size:13px;color:var(--muted);margin-top:6px'>
                  {j.year}
                </div>
              </div>
              <div style='max-width:640px'>
                <h3 style='margin:0 0 10px;font-size:clamp(20px,2.4vw,28px);font-weight:700;letter-spacing:-.01em;color:var(--headline)'>
                  {j.title}
                </h3>
                <p style='margin:0;font-size:16px;line-height:1.7;color:var(--body)'>
                  {j.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style='position:relative;margin:clamp(40px,5vw,72px) 0;background:var(--accent);overflow:hidden'>
        <div style='position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.22) 1.2px,transparent 1.6px);background-size:14px 14px;opacity:.5;pointer-events:none' />
        <img
          src='/images/avatar.png'
          alt=''
          style='position:absolute;right:-2%;bottom:-14%;height:128%;width:auto;opacity:.1;mix-blend-mode:luminosity;pointer-events:none'
        />
        <div style='position:relative;max-width:1140px;margin:0 auto;padding:clamp(48px,7vw,96px) clamp(20px,5vw,72px)'>
          <div style='font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.8);font-weight:700;margin-bottom:22px'>
            What drives me
          </div>
          <blockquote style='margin:0;max-width:880px;font-size:clamp(26px,3.6vw,50px);line-height:1.28;letter-spacing:-.02em;font-weight:700;color:#fff'>
            "I'm driven by curiosity — understanding why things work the way
            they do, and how knowledge can be transformed into something useful
            for people and organizations."
          </blockquote>
          <div style='margin-top:26px;font-size:14px;letter-spacing:.04em;color:rgba(255,255,255,.85);font-weight:600'>
            — Tun
          </div>
        </div>
      </section>

      <section style='max-width:1140px;margin:0 auto;padding:clamp(8px,2vw,24px) clamp(20px,5vw,72px) 0'>
        <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:10px'>
          What I bring
        </div>
        <h2 style='margin:0 0 clamp(24px,3.5vw,40px);font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--headline);font-size:clamp(30px,4.4vw,56px)'>
          Skills &amp; toolkit
        </h2>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px'>
          {SKILLS.map((s, i) => (
            <div
              key={s.title}
              data-reveal=''
              style={`position:relative;overflow:hidden;border:1px solid var(--border);border-radius:16px;padding:24px;background:var(--surface);transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease,box-shadow .35s ease;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${
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
                style='position:absolute;right:-12px;top:-12px;width:110px;height:110px;background-image:radial-gradient(var(--accent) 1.2px,transparent 1.6px);background-size:11px 11px;opacity:.14;pointer-events:none'
              />
              <div style='font-size:17px;font-weight:700;color:var(--headline);margin-bottom:16px'>
                {s.title}
              </div>
              <div data-skillrow='' style='display:flex;flex-wrap:wrap;gap:8px'>
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    style='font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:5px 12px;background:var(--bg);transition:transform .22s cubic-bezier(.2,.7,.2,1),border-color .22s ease,color .22s ease,box-shadow .22s ease'
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translateY(-3px)';
                      el.style.borderColor = 'var(--accent)';
                      el.style.color = 'var(--headline)';
                      el.style.boxShadow = '0 8px 18px rgba(0,0,0,.1)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = '';
                      el.style.borderColor = '';
                      el.style.color = '';
                      el.style.boxShadow = '';
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style='max-width:1140px;margin:0 auto;padding:clamp(40px,5vw,72px) clamp(20px,5vw,72px) 0'>
        <div style='display:flex;align-items:center;gap:18px;margin-bottom:clamp(22px,3vw,36px)'>
          <div style='position:relative;flex:0 0 auto;width:clamp(54px,7vw,72px);height:clamp(54px,7vw,72px);border-radius:50%;background:#f2f2f2;border:1px solid var(--border);overflow:hidden'>
            <div style='position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.13) .9px,transparent 1.3px);background-size:9px 9px;opacity:.5' />
            <img
              src='/images/avatar.png'
              alt=''
              style='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transform:scale(1.32)'
            />
          </div>
          <div>
            <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:6px'>
              Off the clock
            </div>
            <h2 style='margin:0;font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--headline);font-size:clamp(26px,4vw,48px)'>
              Beyond the work
            </h2>
          </div>
        </div>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px'>
          {OFF_CLOCK.map((o) => (
            <div
              key={o.label}
              style='border:1px solid var(--border);border-radius:14px;padding:20px;background:var(--surface);transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease,box-shadow .35s ease'
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-6px)';
                el.style.borderColor = 'var(--headline)';
                el.style.boxShadow = '0 18px 40px rgba(0,0,0,.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.borderColor = '';
                el.style.boxShadow = '';
              }}
            >
              <div style='font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:8px'>
                {o.label}
              </div>
              <div style='font-size:15px;color:var(--headline);font-weight:600'>
                {o.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style='max-width:1140px;margin:0 auto;padding:clamp(44px,6vw,80px) clamp(20px,5vw,72px) 0'>
        <div style='display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;padding-top:clamp(28px,4vw,40px);border-top:1px solid var(--border)'>
          <p style='margin:0;max-width:520px;font-size:clamp(18px,1.8vw,24px);line-height:1.4;font-weight:600;color:var(--headline)'>
            Want the receipts? The work, the milestones, and the code.
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
    </main>
  );
}
