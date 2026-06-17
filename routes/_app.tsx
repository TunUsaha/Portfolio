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

a{color:inherit}
button{font-family:inherit}
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
