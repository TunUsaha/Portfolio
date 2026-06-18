import { type PageProps } from '$fresh/server.ts';

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Tun Usaha — Portfolio</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
::selection{background:var(--accent);color:#fff}

:root{
  --bg:#ffffff;--surface:#fafafa;--headline:#1a1a1a;--body:#454545;--muted:#8c8c8c;
  --hair:#ededed;--border:#e4e4e4;--glass:rgba(255,255,255,.72);--accent:#d72638;
  --hero-vignette:rgba(0,0,0,.18);
  --chrome-grad:linear-gradient(176deg,#2b2b2b 0%,#7d7d7d 26%,#ffffff 47%,#5a5a5a 63%,#141414 100%);
}
@media(prefers-color-scheme:dark){
  :root{
    --bg:#161616;--surface:#2e2e2e;--headline:#f6f6f6;--body:#d2d2d2;--muted:#a0a0a0;
    --hair:#3a3a3a;--border:#525252;--glass:rgba(22,22,22,.6);
    --hero-vignette:rgba(0,0,0,.04);
    --chrome-grad:linear-gradient(176deg,#cfcfcf 0%,#ffffff 32%,#8c8c8c 52%,#ededed 70%,#a0a0a0 100%);
  }
}

@keyframes marbleA{0%{transform:scale(1.15) rotate(0deg)}100%{transform:scale(1.22) rotate(7deg)}}
@keyframes marbleB{0%{transform:translate(-4%,2%) scale(1.2)}100%{transform:translate(5%,-3%) scale(1.32)}}
@keyframes floatUp{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
@keyframes chromeOnce1{0%{transform:translateX(-80%) skewX(-12deg)}100%{transform:translateX(125%) skewX(-12deg)}}
@keyframes chromeOnce2{0%{transform:translateX(125%) skewX(10deg)}100%{transform:translateX(-95%) skewX(10deg)}}
@keyframes chromeTextOnce{0%{background-position:235% 0,0 0}100%{background-position:-85% 0,0 0}}
@keyframes ticketScan{0%{transform:translateX(-130%) skewX(-12deg);opacity:0}12%{opacity:.85}88%{opacity:.85}100%{transform:translateX(130%) skewX(-12deg);opacity:0}}
@keyframes revealIn{from{opacity:0;transform:translateY(26px) scale(.95);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes revealSoft{from{opacity:0;filter:blur(5px)}to{opacity:1;filter:none}}
@keyframes avatarBob{0%{transform:scale(1.34) translateY(0) rotate(0deg)}20%{transform:scale(1.345) translateY(-2.6%) rotate(-1.6deg)}50%{transform:scale(1.35) translateY(-1.1%) rotate(.4deg)}75%{transform:scale(1.345) translateY(-3.2%) rotate(1.6deg)}100%{transform:scale(1.34) translateY(0) rotate(0deg)}}
@keyframes lightFade{from{opacity:0}to{opacity:1}}
@keyframes lightPop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes chipIn{from{opacity:0;filter:blur(3px)}to{opacity:1;filter:none}}

[data-deco]{transition:transform .55s cubic-bezier(.2,.7,.2,1),opacity .45s ease}
[data-reveal]:hover [data-deco]{transform:scale(1.3) rotate(9deg);opacity:.34}
[data-skillrow] span{animation:chipIn .5s ease both}
[data-skillrow] span:nth-child(1){animation-delay:.04s}
[data-skillrow] span:nth-child(2){animation-delay:.09s}
[data-skillrow] span:nth-child(3){animation-delay:.14s}
[data-skillrow] span:nth-child(4){animation-delay:.19s}
[data-skillrow] span:nth-child(5){animation-delay:.24s}
[data-skillrow] span:nth-child(6){animation-delay:.29s}
[data-skillrow] span:nth-child(7){animation-delay:.34s}
[data-skillrow] span:nth-child(8){animation-delay:.39s}
[data-skillrow] span:nth-child(9){animation-delay:.44s}
[data-skillrow] span:nth-child(10){animation-delay:.49s}
[data-skillrow] span:nth-child(n+11){animation-delay:.54s}

a{color:inherit}
button{font-family:inherit}

/* ─── Responsive layout utilities ───────────────────────────── */

/* Desktop defaults — these become the layout source of truth     */
/* so @media overrides can beat inline styles with lower effort.  */
.l-nav-links{display:flex;align-items:center;gap:clamp(14px,3vw,40px)}
.l-hero-header{display:grid;grid-template-columns:1.25fr .9fr;gap:clamp(24px,5vw,64px);align-items:end}
.l-about-intro{display:grid;grid-template-columns:clamp(168px,24vw,288px) 1fr;gap:clamp(28px,5vw,64px);align-items:center}

/* Hamburger button — hidden on desktop */
.l-burger{display:none;flex-direction:column;justify-content:center;gap:5.5px;background:none;border:none;cursor:pointer;padding:8px;margin-right:-8px}
.l-burger span{display:block;width:22px;height:2px;border-radius:2px;background:var(--headline);transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .25s ease}
.l-burger[aria-expanded=true] span:nth-child(1){transform:translateY(7.5px) rotate(45deg)}
.l-burger[aria-expanded=true] span:nth-child(2){opacity:0}
.l-burger[aria-expanded=true] span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg)}

/* Mobile full-screen menu */
.l-mmenu{display:none;position:fixed;inset:68px 0 0;z-index:49;background:var(--bg);flex-direction:column;padding:8px clamp(20px,5vw,40px) 48px;overflow-y:auto;border-top:1px solid var(--hair)}
.l-mmenu.open{display:flex;animation:revealSoft .18s ease both}

/* ─── Mobile breakpoint ──────────────────────────────────────── */
@media(max-width:640px){
  /* Nav */
  .l-nav-links{display:none}
  .l-burger{display:flex}

  /* Hero header — stack columns */
  .l-hero-header{grid-template-columns:1fr}

  /* About intro — stack avatar above text */
  .l-about-intro{grid-template-columns:1fr}
  .l-about-avatar{width:min(200px,55vw)!important;height:min(200px,55vw)!important;margin:0 auto}

  /* Boarding-pass ticket — hide decorative stub */
  .l-ticket-divider{display:none!important}
  .l-ticket-stub{display:none!important}
}
`,
          }}
        />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
