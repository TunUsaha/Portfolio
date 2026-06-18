import { useEffect, useRef, useState } from 'preact/hooks';
import { CERT_CARDS } from '@/lib/data.ts';

function scanTicket(container: HTMLElement | null) {
  if (!container || container.dataset.scan === '1') return;
  const bar = container.querySelector<HTMLElement>('[data-scan-bar]');
  if (!bar) return;

  container.dataset.scan = '1';
  bar.style.animation = 'none';
  void bar.offsetWidth;
  bar.style.animation = 'ticketScan 1.6s cubic-bezier(.4,.05,.4,.95) 1';

  const done = () => {
    bar.style.animation = '';
    container.dataset.scan = '';
    bar.removeEventListener('animationend', done);
  };
  bar.addEventListener('animationend', done);
}

export default function ExperiencePage() {
  const ticketRef = useRef<HTMLElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = ticketRef.current;
    if (el) setTimeout(() => scanTicket(el), 650);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main style='max-width:1100px;margin:0 auto;padding:clamp(32px,6vw,84px) clamp(20px,5vw,72px) 96px'>
      <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:14px'>
        Experience
      </div>
      <h1 style='margin:0 0 56px;font-weight:800;letter-spacing:-.04em;line-height:.95;color:var(--headline);font-size:clamp(48px,9vw,128px)'>
        Experience
      </h1>

      <div style='position:relative;padding-left:28px'>
        <div style='position:absolute;left:5px;top:6px;bottom:6px;width:1px;background:var(--border)' />

        <article style='position:relative;padding:0 0 44px'>
          <div style='position:absolute;left:-27px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--accent)' />
          <div style='font-size:13px;letter-spacing:.04em;color:var(--muted);margin-bottom:6px'>
            May 2025 — Feb 2026
          </div>
          <h3 style='margin:0 0 4px;font-size:22px;font-weight:700;color:var(--headline)'>
            Business Analyst — CRM Consulting Internship
          </h3>
          <div style='font-size:14px;color:var(--body);margin-bottom:12px'>
            CRM Consulting
          </div>
          <p style='margin:0;max-width:660px;font-size:15px;line-height:1.65;color:var(--body)'>
            Analyzed business processes and customer requirements to bridge the
            gap between business needs and CRM solutions. Contributed to
            end-to-end CRM implementation, from system design and testing to
            user training and continuous support.
          </p>
        </article>

        <article style='position:relative;padding:0 0 44px'>
          <div style='position:absolute;left:-27px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--headline)' />
          <div style='font-size:13px;letter-spacing:.04em;color:var(--muted);margin-bottom:6px'>
            12 Jul 2024 — 18 Apr 2025
          </div>
          <h3 style='margin:0 0 4px;font-size:22px;font-weight:700;color:var(--headline)'>
            Student Research Assistant
          </h3>
          <div style='font-size:14px;color:var(--body);margin-bottom:12px'>
            College of Arts Media and Technology, Chiang Mai University
          </div>
          <p style='margin:0;max-width:660px;font-size:15px;line-height:1.65;color:var(--body)'>
            ML model support and data preprocessing.{' '}
            <span style='color:var(--muted)'>[dataset / technique / contribution]</span>
          </p>
        </article>

        <article style='position:relative;padding:0 0 8px'>
          <div style='position:absolute;left:-27px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--headline)' />
          <div style='font-size:13px;letter-spacing:.04em;color:var(--muted);margin-bottom:6px'>
            Sep 2024 &amp; Mar–Apr 2025 (2 cohorts)
          </div>
          <h3 style='margin:0 0 4px;font-size:22px;font-weight:700;color:var(--headline)'>
            LeX SP × CMU Sustainable Innovation Camp
          </h3>
          <div style='font-size:14px;color:var(--body);margin-bottom:12px'>
            Participant — 2 cohorts
          </div>
          <p style='margin:0;max-width:660px;font-size:15px;line-height:1.65;color:var(--body)'>
            Explored community challenges through field research and developed
            prototype solutions using Design Thinking and sustainable innovation
            approaches.
          </p>
        </article>
      </div>

      <section
        ref={ticketRef}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'translateY(-4px)';
          el.style.borderColor = 'var(--headline)';
          scanTicket(el);
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = '';
          el.style.borderColor = '';
        }}
        style='position:relative;margin-top:clamp(40px,5vw,64px);border-radius:20px;overflow:hidden;border:1px solid var(--border);background:var(--surface);display:flex;align-items:stretch;transition:transform .42s cubic-bezier(.2,.7,.2,1),border-color .3s ease;animation:revealSoft .7s ease both'
      >
        <div style='position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden'>
          <div
            data-scan-bar=''
            style='position:absolute;top:0;bottom:0;width:45%;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.6) 50%,transparent 65%);mix-blend-mode:soft-light;transform:translateX(-130%) skewX(-12deg);opacity:0'
          />
        </div>
        <div style='position:relative;flex:1;padding:clamp(28px,4vw,48px)'>
          <div style='position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent)' />
          <div style='display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:14px'>
            <span style='width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block' />
            Award · 2025
          </div>
          <h2 style='margin:0 0 12px;font-size:clamp(26px,3.4vw,44px);font-weight:800;letter-spacing:-.03em;color:var(--headline);line-height:1.05'>
            APacCHRIE 2025 Award
          </h2>
          <p style='margin:0;max-width:680px;font-size:16px;line-height:1.65;color:var(--body)'>
            1st Runner-up, Youth Conference — APacCHRIE 2025, Chiang Mai,
            Esports Event Research
          </p>
        </div>
        <div style='position:relative;flex:0 0 0;width:0;border-left:2px dashed var(--border)'>
          <div style='position:absolute;left:-13px;top:-13px;width:26px;height:26px;border-radius:50%;background:var(--bg)' />
          <div style='position:absolute;left:-13px;bottom:-13px;width:26px;height:26px;border-radius:50%;background:var(--bg)' />
        </div>
        <div style='flex:0 0 clamp(118px,18%,180px);padding:clamp(20px,2.5vw,30px) clamp(14px,2vw,22px);display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:18px;text-align:center'>
          <div style='font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);font-weight:700'>
            Boarding · Award
          </div>
          <div style='display:flex;flex-direction:column;align-items:center;line-height:1'>
            <span style='font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:7px'>
              Year
            </span>
            <span style='font-size:clamp(34px,4vw,52px);font-weight:800;letter-spacing:-.02em;color:var(--headline)'>
              2025
            </span>
          </div>
          <div style='width:100%;height:42px;background:repeating-linear-gradient(90deg,var(--headline) 0 2px,transparent 2px 4px,var(--headline) 4px 5px,transparent 5px 9px,var(--headline) 9px 11px,transparent 11px 13px);opacity:.7' />
        </div>
      </section>

      <section style='margin-top:clamp(36px,4.5vw,56px)'>
        <div style='display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:24px;padding-top:clamp(28px,4vw,40px);border-top:1px solid var(--hair);animation:revealIn .7s cubic-bezier(.2,.7,.2,1) both'>
          <div>
            <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:10px'>
              Credentials
            </div>
            <h3 style='margin:0;font-weight:700;letter-spacing:-.02em;line-height:1.05;color:var(--headline);font-size:clamp(22px,2.6vw,32px)'>
              Certificates &amp; recognition
            </h3>
          </div>
          <p style='margin:0;max-width:380px;font-size:14px;line-height:1.6;color:var(--muted)'>
            Supporting documents behind the milestones above — participation
            in the LeX SP × CMU innovation camps and the APacCHRIE 2025 award.
            Click any certificate to view it full size.
          </p>
        </div>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(238px,1fr));gap:16px'>
          {CERT_CARDS.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setLightboxSrc(c.src)}
              style={`cursor:zoom-in;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${
                0.05 + i * 0.09
              }s both`}
            >
              <div
                style='position:relative;border:1px solid var(--border);border-radius:14px;background:var(--surface);aspect-ratio:297/210;overflow:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease'
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.borderColor = 'var(--headline)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                  el.style.borderColor = '';
                }}
              >
                <img
                  src={c.src}
                  alt={c.title}
                  style='position:absolute;inset:12px;width:calc(100% - 24px);height:calc(100% - 24px);object-fit:contain;display:block;border-radius:6px'
                />
                <div style='position:absolute;top:9px;right:9px;z-index:3;width:28px;height:28px;border-radius:50%;background:rgba(20,20,20,.5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;pointer-events:none;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)'>
                  ⤢
                </div>
              </div>
              <div style='margin-top:12px'>
                <div style='font-size:14px;font-weight:700;color:var(--headline)'>
                  {c.title}
                </div>
                <div style='font-size:13px;color:var(--muted);margin-top:2px'>
                  {c.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style='position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:clamp(20px,5vw,72px);background:rgba(8,8,8,.84);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:lightFade .25s ease both;cursor:zoom-out'
        >
          <img
            src={lightboxSrc}
            alt='Certificate'
            onClick={(e) => e.stopPropagation()}
            style='max-width:100%;max-height:100%;border-radius:10px;box-shadow:0 30px 90px rgba(0,0,0,.6);animation:lightPop .32s cubic-bezier(.2,.7,.2,1) both;cursor:default'
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxSrc(null);
            }}
            aria-label='Close'
            style='position:fixed;top:clamp(16px,3vw,30px);right:clamp(16px,3vw,30px);width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.12);color:#fff;font-size:24px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center'
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
