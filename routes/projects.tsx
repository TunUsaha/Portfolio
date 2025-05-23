import { Head } from '$fresh/runtime.ts';
import GitHubRepos from '@/islands/GitHubRepos.tsx';

export default function Projects() {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Portfolio of Tun Usaha, a data engineer and AI developer specializing in machine learning applications and cybersecurity.'
        />
        <title>Projects</title>

        {/* ใช้ parameter เดียวกันทุกหน้า */}
        <link rel='icon' href='static/logo.svg?v=2' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='static/logo.svg' />

        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
          rel='stylesheet'
        />
        <link rel='stylesheet' href='/style.css' type='text/css' />
        <script type='module' src='/script.js'></script>
        <link rel='stylesheet' href='/smoothScroll.css' type='text/css' />
        <script type='module' src='/smoothScroll.js'></script>
      </Head>

      <header>
        <div className='container'>
          <h1>My Portfolio</h1>
          <nav>
            <ul>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/projects'>Projects</a>
              </li>
              <li>
                <a href='/aboutme'>About Me</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className='home-page'>
        <section className='home-banner'>
          <div className='home-content'>
            <h1 className='left'>Projects</h1>
            <div className='information'>
              <h2 className='right'>Tun Usaha</h2>
              <p className='right'>Web Portfolio</p>
              <div className='banner-title'>
                <p>
                  This is my project. Over the past three years, I have been
                  pursuing a Bachelor of Science in Modern Management
                  Information Technology at Chiang Mai University.
                </p>
                <p>
                  This project reflects my learning journey, combining knowledge
                  and skills to create impactful tools while showcasing my
                  growth in the field.
                </p>
              </div>
            </div>
            <div className='image'>
              <img src='/images/klipartz.png' alt='Tun Usaha' />
            </div>
          </div>
        </section>

        <section className='projects'>
          <GitHubRepos />
        </section>

        <section className='grid grid-3'>
          <div className='autoBLur'>TUN USAHA</div>
          <div className='autoBLur'>AI DEVELOPER</div>
          <div className='autoBLur'>DATA ENGINEER</div>
        </section>

        <footer>
          <div className='container'>
            <a href='https://github.com/TunUsaha' target='_blank'>
              GitHub: @TunUsaha
            </a>
            {' | '}
            <a href='https://www.kaggle.com/tunusaha' target='_blank'>
              Kaggle: @tunusaha
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
