import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio</title>
        <link rel="icon" href="/icon/logo.svg" type="image/svg+xml" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" type="text/css" />
        <script type="module" src="/script.js"></script>
      </Head>

      <header>
        <div className="container">
          <h1>My Portfolio</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/aboutme">About Me</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="home-page">
        <section className="home-banner">
          <div className="home-content">
            <h1 className="left">Portfolio</h1>
            <div className="information">
              <h2 className="right">Tun Usaha</h2>
              <p className="right">Web Portfolio</p>
              <div className="banner-title">
                <p>
                  Welcome to my portfolio! I am currently pursuing a Bachelor of
                  Science in Modern Management Information Technology at Chiang
                  Mai University.
                </p>
                <p>
                  This website showcases my journey and passion for technology,
                  and I continuously strive to improve and share my progress.
                </p>
              </div>
            </div>
            <div className="image">
              <img src="/images/content1.png" alt="Tun Usaha" />
            </div>
          </div>
        </section>

        <section className="grid grid-1">
          <figure>
            <img src="/images/sich.png" alt="AI and Machine Learning" />
          </figure>
          <figure>
            <img src="/images/3.png" alt="Project Work" className="autoRotate" />
          </figure>
          <h2 className="autoShow">Introduce</h2>
        </section>

        <section className="grid grid-2">
          <div className="autoShow">
            <figure>
              <img src="/images/6.png" alt="Design Thinking" />
            </figure>
            <p>
              I have gained hands-on experience in solving real-world challenges,
              particularly through the Sustainable Innovation Camp with Singapore
              Polytechnic. This camp allowed me to apply Design Thinking to create
              sustainable solutions for communities in Chiang Mai and Lamphun. My
              interests include blending creativity with data analytics to solve
              complex problems.
            </p>
          </div>

          <div className="autoShow">
            <p>
              Cybersecurity is one of my key interests in the digital world. I am
              fascinated by the field's dynamic nature and the ongoing challenges
              of securing information and systems. My passion for cybersecurity
              aligns with my desire to make the digital world safer for
              individuals and businesses alike.
            </p>
          </div>

          <div className="autoShow">
            <figure>
              <img src="/images/Content2.png" alt="" />
            </figure>
            <p>
              Throughout my academic journey, I have focused on machine learning
              applications and AI development. I am actively expanding my skill
              set through personal projects on Kaggle, working on real-world
              datasets and experimenting with various machine learning algorithms
              to improve model performance.
            </p>
          </div>

          <div className="autoBLur">
            <figure>
              <img src="/images/candy.png" alt="AI Tools" />
            </figure>
          </div>
        </section>

        <section className="grid grid-3">
          <div className="autoBLur">TUN USAHA</div>
          <div className="autoBLur">AI DEVELOPER</div>
          <div className="autoBLur">DATA ENGINEER</div>
        </section>
        
        <footer>
          <div className="container">
            <a href="https://github.com/TunUsaha" target="_blank">
              GitHub: @TunUsaha
            </a>
            {" | "}
            <a href="https://www.kaggle.com/tunusaha" target="_blank">
              Kaggle: @tunusaha
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}