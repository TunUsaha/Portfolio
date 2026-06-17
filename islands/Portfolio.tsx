import { useEffect, useRef, useState } from 'preact/hooks';

type Page = 'home' | 'about' | 'experience' | 'projects';
type Theme = 'auto' | 'light' | 'dark';

interface Repo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  updated: string;
}

function fmtDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function fallbackRepos(): Repo[] {
  return [
    { name: '[repo-name]', description: 'Business analysis tooling.', language: 'Python', stars: 0, url: '#', updated: '2025' },
    { name: '[repo-name]', description: 'ML / data preprocessing notebook.', language: 'Jupyter Notebook', stars: 0, url: '#', updated: '2025' },
    { name: '[repo-name]', description: 'Web portfolio source.', language: 'JavaScript', stars: 0, url: '#', updated: '2025' },
    { name: '[repo-name]', description: 'Research script.', language: 'Python', stars: 0, url: '#', updated: '2024' },
    { name: '[repo-name]', description: 'Coursework / experiment.', language: 'TypeScript', stars: 0, url: '#', updated: '2024' },
    { name: '[repo-name]', description: 'Sustainable innovation camp project.', language: 'Other', stars: 0, url: '#', updated: '2024' },
  ];
}

function NavBar({ page, theme, onNav, onCycleTheme }: {
  page: Page; theme: Theme; onNav: (p: Page) => void; onCycleTheme: () => void;
}) {
  const themeLabel = theme === 'auto' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark';
  const bar = (active: boolean) =>
    `height:2px;margin-top:5px;border-radius:2px;background:var(--accent);transform:scaleX(${active ? 1 : 0});transform-origin:left;transition:transform .28s ease`;

  const magnet = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * 0.3).toFixed(1)}px,${((e.clientY - (r.top + r.height / 2)) * 0.45).toFixed(1)}px)`;
  };
  const reset = (e: MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'; };

  return (
    <nav style='position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,72px);height:68px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--hair)'>
      <button onClick={() => onNav('home')} style='background:none;border:none;cursor:pointer;padding:0;display:flex;flex-direction:column;align-items:flex-start;font:inherit'>
        <span style='font-size:15px;font-weight:700;letter-spacing:-.01em;color:var(--headline)'>Tun Usaha</span>
        <span style='font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:1px'>Portfolio</span>
      </button>
      <div style='display:flex;align-items:center;gap:clamp(14px,3vw,40px)'>
        {([['home', 'Home'], ['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects']] as [Page, string][]).map(([p, label]) => (
          <button key={p} onClick={() => onNav(p)} onMouseMove={magnet} onMouseLeave={reset} style='background:none;border:none;cursor:pointer;padding:0;font:inherit;font-size:14px;color:var(--body)'>
            {label}<div style={bar(page === p)} />
          </button>
        ))}
        <button onClick={onCycleTheme} title='Toggle theme' style='display:flex;align-items:center;gap:7px;background:none;cursor:pointer;font:inherit;font-size:12px;letter-spacing:.04em;color:var(--muted);border:1px solid var(--border);border-radius:999px;padding:6px 13px'>
          <span style='width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block' />
          {themeLabel}
        </button>
      </div>
    </nav>
  );
}

function titleSheen(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  if (el.dataset.anim === '1') return;
  el.dataset.anim = '1';
  el.style.background = 'linear-gradient(110deg,transparent 42%,rgba(255,255,255,.92) 50%,transparent 58%),linear-gradient(var(--headline),var(--headline))';
  el.style.backgroundSize = '250% 100%,100% 100%';
  el.style.backgroundRepeat = 'no-repeat';
  el.style.backgroundPosition = '235% 0,0 0';
  (el.style as any).webkitBackgroundClip = 'text';
  el.style.backgroundClip = 'text';
  (el.style as any).webkitTextFillColor = 'transparent';
  el.style.color = 'transparent';
  void el.offsetWidth;
  el.style.animation = 'chromeTextOnce 1.4s ease-in-out 1';
  const done = () => {
    el.style.animation = 'none';
    el.style.background = 'none';
    (el.style as any).webkitBackgroundClip = '';
    el.style.backgroundClip = '';
    (el.style as any).webkitTextFillColor = '';
    el.style.color = 'var(--headline)';
    el.dataset.anim = '';
    el.removeEventListener('animationend', done);
  };
  el.addEventListener('animationend', done);
}

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  const magnet = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * 0.3).toFixed(1)}px,${((e.clientY - (r.top + r.height / 2)) * 0.45).toFixed(1)}px)`;
  };
  const reset = (e: MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'; };

  const heroEnter = (e: MouseEvent) => {
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
  };
  const heroMove = (e: MouseEvent) => {
    const sec = e.currentTarget as HTMLElement;
    const b = sec.querySelector<HTMLElement>('[data-sheen-blob]');
    if (!b) return;
    const r = sec.getBoundingClientRect();
    b.style.opacity = '1';
    b.style.transform = `translate(${e.clientX - r.left}px,${e.clientY - r.top}px) translate(-50%,-50%)`;
  };
  const heroLeave = (e: MouseEvent) => {
    const b = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('[data-sheen-blob]');
    if (b) b.style.opacity = '0';
  };

  const cards = [
    { num: '01', tag: 'Curious about', title: 'Knowledge Management', body: 'How organizations remember, share, and actually act on what they know.' },
    { num: '02', tag: 'Curious about', title: 'Applied AI & Machine Learning', body: 'Turning messy, real-world data into decisions people can trust.' },
    { num: '03', tag: 'Curious about', title: 'Data Storytelling', body: 'Making analysis legible — charts and narratives that actually land.' },
    { num: '04', tag: 'Curious about', title: 'Sustainable Innovation', body: 'From the LeX SP × CMU camps — designing ideas built to last.' },
    { num: '05', tag: 'Curious about', title: 'Business & Human Systems', body: 'Why processes, people, and incentives behave the way they do.' },
    { num: '06', tag: 'Off the clock', title: 'Basketball', body: 'A San Antonio Spurs fan for 10 years and counting — drawn to the patient, team-first way they play the game.' },
  ];

  return (
    <main style='max-width:1320px;margin:0 auto;padding:clamp(32px,6vw,84px) clamp(20px,5vw,72px) 96px'>
      {/* Hero header */}
      <section style='display:grid;grid-template-columns:1.25fr .9fr;gap:clamp(24px,5vw,64px);align-items:end'>
        <div>
          <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:18px'>Portfolio — 2026</div>
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
            Bridging business analysis, AI/ML research, and academic inquiry. Currently pursuing an M.S. in Knowledge &amp; Innovation Management at Chiang&nbsp;Mai&nbsp;University.{' '}
            <span style='color:var(--muted)'>Curious about business, AI, and innovation.</span>
          </p>
          <div style='display:flex;gap:12px;flex-wrap:wrap'>
            <button onClick={() => onNav('experience')} onMouseMove={magnet} onMouseLeave={reset} style='font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:13px 24px;border-radius:999px;border:none;background:var(--accent);color:#fff;transition:transform .25s cubic-bezier(.2,.7,.2,1),filter .2s ease'>
              View Experience
            </button>
            <button onClick={() => onNav('projects')} onMouseMove={magnet} onMouseLeave={reset} style='font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:13px 24px;border-radius:999px;border:1px solid var(--border);background:transparent;color:var(--headline);transition:transform .25s cubic-bezier(.2,.7,.2,1),border-color .2s ease'>
              See Projects →
            </button>
          </div>
        </div>
      </section>

      {/* Liquid-metal hero */}
      <section
        onMouseEnter={heroEnter}
        onMouseMove={heroMove}
        onMouseLeave={heroLeave}
        style='position:relative;margin-top:clamp(36px,5vw,64px);height:clamp(300px,40vw,540px);border-radius:20px;overflow:hidden;border:1px solid var(--border)'
      >
        <div style='position:absolute;inset:-20%;animation:marbleA 26s ease-in-out infinite alternate;background:radial-gradient(120% 90% at 22% 28%,#ffffff 0%,rgba(255,255,255,0) 55%),radial-gradient(110% 80% at 82% 72%,#9c9c9c 0%,rgba(156,156,156,0) 55%),conic-gradient(from 210deg at 50% 50%,#eaeaea,#bcbcbc,#f5f5f5,#a4a4a4,#dedede,#c9c9c9,#eaeaea)' />
        <div style='position:absolute;inset:-25%;mix-blend-mode:overlay;filter:blur(3px);animation:marbleB 32s ease-in-out infinite alternate;background:radial-gradient(60% 50% at 35% 60%,#ffffff,rgba(255,255,255,0) 60%),radial-gradient(55% 45% at 70% 30%,#7d7d7d,rgba(125,125,125,0) 60%),linear-gradient(120deg,#d2d2d2,#f2f2f2,#b0b0b0)' />
        <div style='position:absolute;inset:0;box-shadow:inset 0 0 120px 20px var(--hero-vignette)' />
        <img src='/images/hero-render.webp' alt='' style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block' />
        {/* Sheen bands + cursor blob */}
        <div style='position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden'>
          <div data-sheen-band='' data-kf='chromeOnce1' data-dur='1.6s' style='position:absolute;inset:-30%;mix-blend-mode:soft-light;opacity:.6;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.9) 50%,transparent 58%);transform:translateX(-80%) skewX(-12deg)' />
          <div data-sheen-band='' data-kf='chromeOnce2' data-dur='1.9s' style='position:absolute;inset:-30%;mix-blend-mode:overlay;opacity:.32;background:linear-gradient(80deg,transparent 44%,rgba(255,255,255,.75) 50%,transparent 56%);transform:translateX(125%) skewX(10deg)' />
          <div data-sheen-blob='' style='position:absolute;left:0;top:0;width:46%;aspect-ratio:1;border-radius:50%;transform:translate(50%,40%) translate(-50%,-50%);background:radial-gradient(circle,rgba(255,255,255,.9) 0%,rgba(255,255,255,.25) 38%,rgba(255,255,255,0) 66%);mix-blend-mode:soft-light;filter:blur(6px);opacity:0;transition:transform .22s cubic-bezier(.2,.7,.2,1),opacity .5s ease' />
        </div>
        <img src='/images/statue.png' alt='' style='position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:96%;max-height:100%;width:auto;z-index:2;pointer-events:none;filter:drop-shadow(0 14px 36px rgba(0,0,0,.28))' />
      </section>

      {/* Banner */}
      <section style='margin-top:clamp(36px,5vw,64px);border-radius:20px;overflow:hidden;border:1px solid var(--border);animation:revealSoft .9s ease both'>
        <img src='/images/banner.png' alt='' style='width:100%;height:auto;display:block' />
      </section>

      {/* Interesting */}
      <section style='margin-top:clamp(56px,7vw,104px)'>
        <div style='display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:32px;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) both'>
          <div>
            <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:12px'>Interesting</div>
            <h2 style='margin:0;font-weight:800;letter-spacing:-.035em;line-height:1;color:var(--headline);font-size:clamp(32px,5vw,64px)'>Things that keep<br />me curious</h2>
          </div>
          <p style='margin:0;max-width:340px;font-size:14px;line-height:1.6;color:var(--muted)'>The questions, fields, and ideas I keep circling back to — the stuff that makes the work feel like play.</p>
        </div>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px'>
          {cards.map((c, i) => (
            <div
              key={c.num}
              data-reveal=''
              style={`position:relative;overflow:hidden;border:1px solid var(--border);border-radius:16px;background:var(--surface);padding:26px 24px 24px;transition:transform .4s cubic-bezier(.2,.7,.2,1),border-color .35s ease,box-shadow .4s ease;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${0.05 + i * 0.07}s both`}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-8px)'; el.style.borderColor = 'var(--headline)'; el.style.boxShadow = '0 22px 48px rgba(0,0,0,.13)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.borderColor = ''; el.style.boxShadow = ''; }}
            >
              <div data-deco='' style='position:absolute;right:-12px;top:-12px;width:128px;height:128px;background-image:radial-gradient(var(--accent) 1.2px,transparent 1.6px);background-size:11px 11px;opacity:.15;pointer-events:none' />
              <div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:18px'>
                <span style='font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:700'>{c.tag}</span>
                <span style='font-size:14px;font-weight:800;color:var(--muted)'>{c.num}</span>
              </div>
              <h3 style='margin:0 0 10px;font-size:20px;font-weight:700;letter-spacing:-.01em;color:var(--headline)'>{c.title}</h3>
              <p style='margin:0;font-size:14px;line-height:1.6;color:var(--body)'>{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function AboutPage({ onNav }: { onNav: (p: Page) => void }) {
  const magnet = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * 0.3).toFixed(1)}px,${((e.clientY - (r.top + r.height / 2)) * 0.45).toFixed(1)}px)`;
  };
  const reset = (e: MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'; };

  const journey = [
    { num: '01', year: '2026', accent: true, title: 'Where it started', body: 'B.S. in Modern Management Information Technology at Chiang Mai University — the place where I learned that the interesting problems live between the business and the system, not inside either one. A class project taught me how small improvements in systems can create meaningful business impact.' },
    { num: '02', year: 'Now', accent: false, title: 'Choosing knowledge', body: 'Pursuing an M.S. in Knowledge & Innovation Management. I chose it because during my internship, I saw that knowledge management was one of the key challenges in organizations, yet it was often overlooked. It made me keep asking: how can organizations turn what they know into something that creates lasting value?' },
    { num: '03', year: "What's next", accent: false, title: "What I'm chasing", body: 'Currently exploring my curiosity and building on ideas from my undergraduate project, with a focus on creating value through knowledge and technology.' },
  ];

  const skills = [
    { title: 'Business Analysis', tags: ['Requirements', 'Process mapping', 'CRM', 'UI/UX Wireframing', 'System Testing & QA', 'Technical Documentation', 'User Training', 'Post-Implementation Support'] },
    { title: 'Research & AI', tags: ['Machine learning', 'Data preprocessing', 'Academic writing'] },
    { title: 'Technical Tools', tags: ['Python', 'SQL', 'Git', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Power BI', 'Excel', 'Figma'] },
  ];

  const offClock = [
    { label: 'Currently learning', value: 'UX/UI and Knowledge Management' },
    { label: 'Always up for', value: 'A challenge.' },
    { label: 'Can talk for hours about', value: 'Basketball' },
    { label: "Off-screen, you'll find me", value: 'Walking around Ang Kaew Reservoir, just taking in the moment.' },
  ];

  return (
    <main style='padding:0 0 96px;overflow:hidden'>
      {/* Opening */}
      <section style='max-width:1140px;margin:0 auto;padding:clamp(32px,6vw,80px) clamp(20px,5vw,72px) clamp(36px,5vw,64px)'>
        <div style='display:grid;grid-template-columns:clamp(168px,24vw,288px) 1fr;gap:clamp(28px,5vw,64px);align-items:center'>
          <div style='position:relative;aspect-ratio:1;border-radius:50%;background:#f2f2f2;border:1px solid var(--border);overflow:hidden;box-shadow:0 26px 60px rgba(0,0,0,.18);animation:revealIn .85s cubic-bezier(.2,.7,.2,1) both'>
            <div style='position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.13) 1.1px,transparent 1.5px);background-size:13px 13px;opacity:.55' />
            <div style='position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(transparent,rgba(0,0,0,.05))' />
            <img src='/images/avatar.png' alt='Tun' style='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transform:scale(1.34);transform-origin:50% 62%;animation:avatarBob 6.5s ease-in-out infinite' />
          </div>
          <div style='animation:revealIn .85s cubic-bezier(.2,.7,.2,1) .1s both'>
            <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:16px'>About — the person behind the work</div>
            <h1 style='margin:0 0 22px;font-weight:800;letter-spacing:-.045em;line-height:.9;color:var(--headline);font-size:clamp(46px,8.5vw,116px)'>Hi, I'm<br />Tun.</h1>
            <p style='margin:0 0 24px;max-width:540px;font-size:clamp(16px,1.5vw,19px);line-height:1.6;color:var(--body)'>
              A recent graduate, still early in the journey — happiest digging through a messy spreadsheet just to understand what's really going on. Business analyst by training, researcher by curiosity.
            </p>
            <div style='display:flex;flex-wrap:wrap;gap:10px'>
              <span style='display:flex;align-items:center;gap:8px;font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:7px 14px'><span style='width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block' />Chiang Mai, Thailand</span>
              <span style='font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:7px 14px'>Business Analyst · KM Researcher</span>
              <span style='font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:7px 14px'>M.S. candidate · CMU</span>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section style='max-width:1140px;margin:0 auto;padding:clamp(18px,3vw,32px) clamp(20px,5vw,72px) clamp(40px,5vw,72px)'>
        <p style='margin:0;max-width:960px;font-size:clamp(24px,3.6vw,48px);line-height:1.3;letter-spacing:-.022em;font-weight:600;color:var(--headline);animation:revealIn .8s cubic-bezier(.2,.7,.2,1) both'>
          I'm drawn to where{' '}
          <span style='color:var(--accent)'>business analysis</span>,{' '}
          <span style='color:var(--accent)'>applied AI</span>, and{' '}
          <span style='color:var(--accent)'>academic research</span>{' '}
          meet — still learning, and genuinely curious about how organizations capture, structure, and act on what they know.
        </p>
      </section>

      {/* Journey */}
      <section style='max-width:1140px;margin:0 auto;padding:clamp(28px,4vw,48px) clamp(20px,5vw,72px) clamp(20px,3vw,40px);border-top:1px solid var(--border)'>
        <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:10px'>The journey so far</div>
        <h2 style='margin:0 0 clamp(28px,4vw,48px);font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--headline);font-size:clamp(30px,4.4vw,56px)'>How I got here</h2>
        <div style='display:flex;flex-direction:column;gap:clamp(20px,3vw,32px)'>
          {journey.map((j, i) => (
            <article
              key={j.num}
              style={`display:grid;grid-template-columns:clamp(96px,14vw,150px) 1fr;gap:clamp(18px,3vw,40px);padding-left:clamp(14px,2vw,22px);border-left:2px solid ${j.accent ? 'var(--accent)' : 'var(--border)'};animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${0.05 + i * 0.09}s both`}
            >
              <div>
                <div style='font-size:clamp(34px,4vw,52px);font-weight:800;letter-spacing:-.04em;color:var(--headline);line-height:1'>{j.num}</div>
                <div style='font-size:13px;color:var(--muted);margin-top:6px'>{j.year}</div>
              </div>
              <div style='max-width:640px'>
                <h3 style='margin:0 0 10px;font-size:clamp(20px,2.4vw,28px);font-weight:700;letter-spacing:-.01em;color:var(--headline)'>{j.title}</h3>
                <p style='margin:0;font-size:16px;line-height:1.7;color:var(--body)'>{j.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Philosophy — full-bleed accent */}
      <section style='position:relative;margin:clamp(40px,5vw,72px) 0;background:var(--accent);overflow:hidden'>
        <div style='position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.22) 1.2px,transparent 1.6px);background-size:14px 14px;opacity:.5;pointer-events:none' />
        <img src='/images/avatar.png' alt='' style='position:absolute;right:-2%;bottom:-14%;height:128%;width:auto;opacity:.1;mix-blend-mode:luminosity;pointer-events:none' />
        <div style='position:relative;max-width:1140px;margin:0 auto;padding:clamp(48px,7vw,96px) clamp(20px,5vw,72px)'>
          <div style='font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.8);font-weight:700;margin-bottom:22px'>What drives me</div>
          <blockquote style='margin:0;max-width:880px;font-size:clamp(26px,3.6vw,50px);line-height:1.28;letter-spacing:-.02em;font-weight:700;color:#fff'>
            "I'm driven by curiosity — understanding why things work the way they do, and how knowledge can be transformed into something useful for people and organizations."
          </blockquote>
          <div style='margin-top:26px;font-size:14px;letter-spacing:.04em;color:rgba(255,255,255,.85);font-weight:600'>— Tun</div>
        </div>
      </section>

      {/* Skills */}
      <section style='max-width:1140px;margin:0 auto;padding:clamp(8px,2vw,24px) clamp(20px,5vw,72px) 0'>
        <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:10px'>What I bring</div>
        <h2 style='margin:0 0 clamp(24px,3.5vw,40px);font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--headline);font-size:clamp(30px,4.4vw,56px)'>Skills &amp; toolkit</h2>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px'>
          {skills.map((s, i) => (
            <div
              key={s.title}
              data-reveal=''
              style={`position:relative;overflow:hidden;border:1px solid var(--border);border-radius:16px;padding:24px;background:var(--surface);transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease,box-shadow .35s ease;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${0.05 + i * 0.07}s both`}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-8px)'; el.style.borderColor = 'var(--headline)'; el.style.boxShadow = '0 22px 48px rgba(0,0,0,.13)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.borderColor = ''; el.style.boxShadow = ''; }}
            >
              <div data-deco='' style='position:absolute;right:-12px;top:-12px;width:110px;height:110px;background-image:radial-gradient(var(--accent) 1.2px,transparent 1.6px);background-size:11px 11px;opacity:.14;pointer-events:none' />
              <div style='font-size:17px;font-weight:700;color:var(--headline);margin-bottom:16px'>{s.title}</div>
              <div data-skillrow='' style='display:flex;flex-wrap:wrap;gap:8px'>
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    style='font-size:13px;color:var(--body);border:1px solid var(--border);border-radius:999px;padding:5px 12px;background:var(--bg);transition:transform .22s cubic-bezier(.2,.7,.2,1),border-color .22s ease,color .22s ease,box-shadow .22s ease'
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.borderColor = 'var(--accent)'; el.style.color = 'var(--headline)'; el.style.boxShadow = '0 8px 18px rgba(0,0,0,.1)'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.borderColor = ''; el.style.color = ''; el.style.boxShadow = ''; }}
                  >{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Off the clock */}
      <section style='max-width:1140px;margin:0 auto;padding:clamp(40px,5vw,72px) clamp(20px,5vw,72px) 0'>
        <div style='display:flex;align-items:center;gap:18px;margin-bottom:clamp(22px,3vw,36px)'>
          <div style='position:relative;flex:0 0 auto;width:clamp(54px,7vw,72px);height:clamp(54px,7vw,72px);border-radius:50%;background:#f2f2f2;border:1px solid var(--border);overflow:hidden'>
            <div style='position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.13) .9px,transparent 1.3px);background-size:9px 9px;opacity:.5' />
            <img src='/images/avatar.png' alt='' style='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transform:scale(1.32)' />
          </div>
          <div>
            <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:6px'>Off the clock</div>
            <h2 style='margin:0;font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--headline);font-size:clamp(26px,4vw,48px)'>Beyond the work</h2>
          </div>
        </div>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px'>
          {offClock.map((o) => (
            <div
              key={o.label}
              style='border:1px solid var(--border);border-radius:14px;padding:20px;background:var(--surface);transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease,box-shadow .35s ease'
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.borderColor = 'var(--headline)'; el.style.boxShadow = '0 18px 40px rgba(0,0,0,.12)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.borderColor = ''; el.style.boxShadow = ''; }}
            >
              <div style='font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:8px'>{o.label}</div>
              <div style='font-size:15px;color:var(--headline);font-weight:600'>{o.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style='max-width:1140px;margin:0 auto;padding:clamp(44px,6vw,80px) clamp(20px,5vw,72px) 0'>
        <div style='display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;padding-top:clamp(28px,4vw,40px);border-top:1px solid var(--border)'>
          <p style='margin:0;max-width:520px;font-size:clamp(18px,1.8vw,24px);line-height:1.4;font-weight:600;color:var(--headline)'>Want the receipts? The work, the milestones, and the code.</p>
          <div style='display:flex;gap:12px;flex-wrap:wrap'>
            <button onClick={() => onNav('experience')} onMouseMove={magnet} onMouseLeave={reset} style='font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:13px 24px;border-radius:999px;border:none;background:var(--accent);color:#fff;transition:transform .25s cubic-bezier(.2,.7,.2,1),filter .2s ease'>View Experience</button>
            <button onClick={() => onNav('projects')} onMouseMove={magnet} onMouseLeave={reset} style='font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:13px 24px;border-radius:999px;border:1px solid var(--border);background:transparent;color:var(--headline);transition:transform .25s cubic-bezier(.2,.7,.2,1),border-color .2s ease'>See Projects →</button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExperiencePage() {
  const ticketRef = useRef<HTMLElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const scanTicket = (container: HTMLElement | null) => {
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
  };

  useEffect(() => {
    const el = ticketRef.current;
    if (el) setTimeout(() => scanTicket(el), 650);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const certCards = [
    { id: 'cert-lex-1', title: 'LeX SP × CMU — Cohort 1', sub: 'Sustainable Innovation Camp · participation', src: '/images/cert-lex-1.webp' },
    { id: 'cert-lex-2', title: 'LeX SP × CMU — Cohort 2', sub: 'Sustainable Innovation Camp · participation', src: '/images/cert-lex-2.webp' },
    { id: 'cert-award', title: 'APacCHRIE 2025', sub: 'Award certificate', src: '/images/cert-award.webp' },
  ];

  return (
    <main style='max-width:1100px;margin:0 auto;padding:clamp(32px,6vw,84px) clamp(20px,5vw,72px) 96px'>
      <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:14px'>Experience</div>
      <h1 style='margin:0 0 56px;font-weight:800;letter-spacing:-.04em;line-height:.95;color:var(--headline);font-size:clamp(48px,9vw,128px)'>Experience</h1>

      {/* Timeline */}
      <div style='position:relative;padding-left:28px'>
        <div style='position:absolute;left:5px;top:6px;bottom:6px;width:1px;background:var(--border)' />

        <article style='position:relative;padding:0 0 44px'>
          <div style='position:absolute;left:-27px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--accent)' />
          <div style='font-size:13px;letter-spacing:.04em;color:var(--muted);margin-bottom:6px'>May 2025 — Feb 2026</div>
          <h3 style='margin:0 0 4px;font-size:22px;font-weight:700;color:var(--headline)'>Business Analyst — CRM Consulting Internship</h3>
          <div style='font-size:14px;color:var(--body);margin-bottom:12px'>CRM Consulting</div>
          <p style='margin:0;max-width:660px;font-size:15px;line-height:1.65;color:var(--body)'>Analyzed business processes and customer requirements to bridge the gap between business needs and CRM solutions. Contributed to end-to-end CRM implementation, from system design and testing to user training and continuous support.</p>
        </article>

        <article style='position:relative;padding:0 0 44px'>
          <div style='position:absolute;left:-27px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--headline)' />
          <div style='font-size:13px;letter-spacing:.04em;color:var(--muted);margin-bottom:6px'>12 Jul 2024 — 18 Apr 2025</div>
          <h3 style='margin:0 0 4px;font-size:22px;font-weight:700;color:var(--headline)'>Student Research Assistant</h3>
          <div style='font-size:14px;color:var(--body);margin-bottom:12px'>College of Arts Media and Technology, Chiang Mai University</div>
          <p style='margin:0;max-width:660px;font-size:15px;line-height:1.65;color:var(--body)'>ML model support and data preprocessing. <span style='color:var(--muted)'>[dataset / technique / contribution]</span></p>
        </article>

        <article style='position:relative;padding:0 0 8px'>
          <div style='position:absolute;left:-27px;top:6px;width:11px;height:11px;border-radius:50%;background:var(--headline)' />
          <div style='font-size:13px;letter-spacing:.04em;color:var(--muted);margin-bottom:6px'>Sep 2024 &amp; Mar–Apr 2025 (2 cohorts)</div>
          <h3 style='margin:0 0 4px;font-size:22px;font-weight:700;color:var(--headline)'>LeX SP × CMU Sustainable Innovation Camp</h3>
          <div style='font-size:14px;color:var(--body);margin-bottom:12px'>Participant — 2 cohorts</div>
          <p style='margin:0;max-width:660px;font-size:15px;line-height:1.65;color:var(--body)'>Explored community challenges through field research and developed prototype solutions using Design Thinking and sustainable innovation approaches.</p>
        </article>
      </div>

      {/* Award — boarding pass */}
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
          <div data-scan-bar='' style='position:absolute;top:0;bottom:0;width:45%;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.6) 50%,transparent 65%);mix-blend-mode:soft-light;transform:translateX(-130%) skewX(-12deg);opacity:0' />
        </div>
        <div style='position:relative;flex:1;padding:clamp(28px,4vw,48px)'>
          <div style='position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent)' />
          <div style='display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:14px'>
            <span style='width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block' />
            Award · 2025
          </div>
          <h2 style='margin:0 0 12px;font-size:clamp(26px,3.4vw,44px);font-weight:800;letter-spacing:-.03em;color:var(--headline);line-height:1.05'>APacCHRIE 2025 Award</h2>
          <p style='margin:0;max-width:680px;font-size:16px;line-height:1.65;color:var(--body)'>
            1st Runner-up, Youth Conference — APacCHRIE 2025, Chiang Mai, Esports Event Research
          </p>
        </div>
        <div style='position:relative;flex:0 0 0;width:0;border-left:2px dashed var(--border)'>
          <div style='position:absolute;left:-13px;top:-13px;width:26px;height:26px;border-radius:50%;background:var(--bg)' />
          <div style='position:absolute;left:-13px;bottom:-13px;width:26px;height:26px;border-radius:50%;background:var(--bg)' />
        </div>
        <div style='flex:0 0 clamp(118px,18%,180px);padding:clamp(20px,2.5vw,30px) clamp(14px,2vw,22px);display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:18px;text-align:center'>
          <div style='font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);font-weight:700'>Boarding · Award</div>
          <div style='display:flex;flex-direction:column;align-items:center;line-height:1'>
            <span style='font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:7px'>Year</span>
            <span style='font-size:clamp(34px,4vw,52px);font-weight:800;letter-spacing:-.02em;color:var(--headline)'>2025</span>
          </div>
          <div style='width:100%;height:42px;background:repeating-linear-gradient(90deg,var(--headline) 0 2px,transparent 2px 4px,var(--headline) 4px 5px,transparent 5px 9px,var(--headline) 9px 11px,transparent 11px 13px);opacity:.7' />
        </div>
      </section>

      {/* Credentials */}
      <section style='margin-top:clamp(36px,4.5vw,56px)'>
        <div style='display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:24px;padding-top:clamp(28px,4vw,40px);border-top:1px solid var(--hair);animation:revealIn .7s cubic-bezier(.2,.7,.2,1) both'>
          <div>
            <div style='font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:10px'>Credentials</div>
            <h3 style='margin:0;font-weight:700;letter-spacing:-.02em;line-height:1.05;color:var(--headline);font-size:clamp(22px,2.6vw,32px)'>Certificates &amp; recognition</h3>
          </div>
          <p style='margin:0;max-width:380px;font-size:14px;line-height:1.6;color:var(--muted)'>Supporting documents behind the milestones above — participation in the LeX SP × CMU innovation camps and the APacCHRIE 2025 award. Click any certificate to view it full size.</p>
        </div>
        <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(238px,1fr));gap:16px'>
          {certCards.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setLightboxSrc(c.src)}
              style={`cursor:zoom-in;animation:revealIn .7s cubic-bezier(.2,.7,.2,1) ${0.05 + i * 0.09}s both`}
            >
              <div
                style='position:relative;border:1px solid var(--border);border-radius:14px;background:var(--surface);aspect-ratio:297/210;overflow:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .3s ease'
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'var(--headline)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.borderColor = ''; }}
              >
                <img src={c.src} alt={c.title} style='position:absolute;inset:12px;width:calc(100% - 24px);height:calc(100% - 24px);object-fit:contain;display:block;border-radius:6px' />
                <div style='position:absolute;top:9px;right:9px;z-index:3;width:28px;height:28px;border-radius:50%;background:rgba(20,20,20,.5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;pointer-events:none;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)'>⤢</div>
              </div>
              <div style='margin-top:12px'>
                <div style='font-size:14px;font-weight:700;color:var(--headline)'>{c.title}</div>
                <div style='font-size:13px;color:var(--muted);margin-top:2px'>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div onClick={() => setLightboxSrc(null)} style='position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:clamp(20px,5vw,72px);background:rgba(8,8,8,.84);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:lightFade .25s ease both;cursor:zoom-out'>
          <img src={lightboxSrc} alt='Certificate' onClick={(e) => e.stopPropagation()} style='max-width:100%;max-height:100%;border-radius:10px;box-shadow:0 30px 90px rgba(0,0,0,.6);animation:lightPop .32s cubic-bezier(.2,.7,.2,1) both;cursor:default' />
          <button onClick={(e) => { e.stopPropagation(); setLightboxSrc(null); }} aria-label='Close' style='position:fixed;top:clamp(16px,3vw,30px);right:clamp(16px,3vw,30px);width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.12);color:#fff;font-size:24px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center'>×</button>
        </div>
      )}
    </main>
  );
}

function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredRepo, setHoveredRepo] = useState<number | null>(null);
  const [cardWidths, setCardWidths] = useState<Record<number, number>>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/TunUsaha/repos?sort=updated&per_page=100');
        if (!res.ok) throw new Error('status ' + res.status);
        const data = await res.json();
        const list: Repo[] = (data as any[])
          .filter((r) => !r.fork)
          .map((r) => ({
            name: r.name,
            description: r.description || '[no description yet]',
            language: r.language || 'Other',
            stars: r.stargazers_count || 0,
            url: r.html_url,
            updated: fmtDate(r.pushed_at || r.updated_at),
          }));
        setRepos(list.length ? list : fallbackRepos());
        setError(false);
      } catch {
        setRepos(fallbackRepos());
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const spikeStyles = (i: number) => {
    const hovered = hoveredRepo === i;
    const cw = cardWidths[i] || 300;
    const W = 84;
    const distX = Math.max(40, cw - 48);
    const trans = 'transform .8s cubic-bezier(.22,.68,.2,1)';
    return {
      orbitTop: { position: 'absolute' as const, width: W + 'px', zIndex: 0, pointerEvents: 'none' as const, lineHeight: '0', top: '-24px', right: '-18px', transform: hovered ? `translateX(${-distX}px)` : 'translateX(0px)', transition: trans },
      orbitBot: { position: 'absolute' as const, width: W + 'px', zIndex: 0, pointerEvents: 'none' as const, lineHeight: '0', bottom: '-24px', left: '-18px', transform: hovered ? `translateX(${distX}px)` : 'translateX(0px)', transition: trans },
      spinTop: { width: W + 'px', height: 'auto', display: 'block', opacity: 0.95, filter: 'drop-shadow(0 3px 7px rgba(0,0,0,.18))', transformOrigin: 'center', transform: hovered ? 'rotate(50deg)' : 'rotate(180deg)', transition: trans },
      spinBot: { width: W + 'px', height: 'auto', display: 'block', opacity: 0.95, filter: 'drop-shadow(0 3px 7px rgba(0,0,0,.18))', transformOrigin: 'center', transform: hovered ? 'rotate(-130deg)' : 'rotate(0deg)', transition: trans },
    };
  };

  return (
    <main style='max-width:1320px;margin:0 auto;padding:clamp(32px,6vw,84px) clamp(20px,5vw,72px) 96px'>
      <div style='font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:14px'>Projects</div>
      <div style='display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:44px'>
        <h1 style='margin:0;font-weight:800;letter-spacing:-.04em;line-height:.95;color:var(--headline);font-size:clamp(48px,9vw,128px)'>Projects</h1>
        <a href='https://github.com/TunUsaha' target='_blank' rel='noreferrer' style='font-size:14px;color:var(--body);text-decoration:none;border:1px solid var(--border);border-radius:999px;padding:9px 16px;transition:border-color .2s ease,color .2s ease;white-space:nowrap'>
          Live from GitHub · @TunUsaha ↗
        </a>
      </div>

      {loading && (
        <div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px'>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style='height:158px;border:1px solid var(--hair);border-radius:16px;background:var(--surface);opacity:.6' />
          ))}
        </div>
      )}

      {!loading && (
        <>
          {error && (
            <div style='font-size:14px;color:var(--muted);border:1px dashed var(--border);border-radius:12px;padding:16px 18px;margin-bottom:18px'>
              Couldn't reach the GitHub API just now — showing representative cards.
            </div>
          )}
          <div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px'>
            {repos.map((repo, i) => {
              const sp = spikeStyles(i);
              return (
                <div key={repo.name + i} style={{ animation: 'floatUp .5s ease both', animationDelay: `${i * 110}ms` }}>
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
                    <div style={sp.orbitTop}><img src='/images/spike.png' alt='' style={sp.spinTop} /></div>
                    <div style={sp.orbitBot}><img src='/images/spike.png' alt='' style={sp.spinBot} /></div>
                    <div style='position:relative;z-index:1;display:flex;flex-direction:column;height:100%;flex:1'>
                      <div style='display:flex;align-items:center;gap:9px;margin-bottom:10px'>
                        <span style='font-size:11px;letter-spacing:.04em;color:var(--muted)'>repo</span>
                        <span style='flex:1' />
                        <span style='font-size:13px;color:var(--muted)'>★ {repo.stars}</span>
                      </div>
                      <h3 style='margin:0 0 8px;font-size:18px;font-weight:700;color:var(--headline);letter-spacing:-.01em;word-break:break-word'>{repo.name}</h3>
                      <p style='margin:0 0 18px;font-size:14px;line-height:1.55;color:var(--body);flex:1'>{repo.description}</p>
                      <div style='display:flex;align-items:center;gap:14px'>
                        <span style='display:flex;align-items:center;gap:7px;font-size:13px;color:var(--body)'>
                          <span style='width:9px;height:9px;border-radius:50%;background:var(--accent);display:inline-block' />
                          {repo.language}
                        </span>
                        <span style='flex:1' />
                        <span style='font-size:13px;color:var(--muted)'>{repo.updated}</span>
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
    const order: Theme[] = ['auto', 'light', 'dark'];
    setTheme((cur) => order[(order.indexOf(cur) + 1) % 3]);
  };

  const themeVars = (() => {
    const accent = '#d72638';
    if (theme === 'light') {
      return { '--bg': '#ffffff', '--surface': '#fafafa', '--headline': '#1a1a1a', '--body': '#454545', '--muted': '#8c8c8c', '--hair': '#ededed', '--border': '#e4e4e4', '--glass': 'rgba(255,255,255,.72)', '--accent': accent, '--hero-vignette': 'rgba(0,0,0,.18)' };
    }
    if (theme === 'dark') {
      return { '--bg': '#161616', '--surface': '#2e2e2e', '--headline': '#f6f6f6', '--body': '#d2d2d2', '--muted': '#a0a0a0', '--hair': '#3a3a3a', '--border': '#525252', '--glass': 'rgba(22,22,22,.6)', '--accent': accent, '--hero-vignette': 'rgba(0,0,0,.04)', '--chrome-grad': 'linear-gradient(176deg,#cfcfcf 0%,#ffffff 32%,#8c8c8c 52%,#ededed 70%,#a0a0a0 100%)' };
    }
    return { '--accent': accent };
  })();

  const rootStyle = {
    minHeight: '100vh',
    background: 'var(--bg)',
    color: 'var(--body)',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    transition: 'background .4s ease, color .4s ease',
    ...themeVars,
  };

  return (
    <div style={rootStyle}>
      <NavBar page={page} theme={theme} onNav={nav} onCycleTheme={cycleTheme} />
      <div style={{ opacity: entering ? 0 : 1, transform: entering ? 'translateY(12px)' : 'translateY(0)', transition: 'opacity .42s ease, transform .42s ease' }}>
        {page === 'home' && <HomePage onNav={nav} />}
        {page === 'about' && <AboutPage onNav={nav} />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'projects' && <ProjectsPage />}
      </div>
      <footer style='border-top:1px solid var(--hair);padding:34px clamp(20px,5vw,72px);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px'>
        <span style='font-size:13px;color:var(--muted)'>© 2026 Tun Usaha — Portfolio</span>
        <div style='display:flex;align-items:center;gap:22px;flex-wrap:wrap'>
          <a href='https://github.com/TunUsaha' target='_blank' rel='noreferrer' style='font-size:13px;color:var(--body);text-decoration:none'>GitHub @TunUsaha ↗</a>
          <a href='https://www.kaggle.com/tunusaha' target='_blank' rel='noreferrer' style='font-size:13px;color:var(--body);text-decoration:none'>Kaggle @tunusaha ↗</a>
        </div>
      </footer>
    </div>
  );
}
