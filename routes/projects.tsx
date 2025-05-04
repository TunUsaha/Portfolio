import { Head } from '$fresh/runtime.ts';
import GitHubRepos from '@/islands/GitHubRepos.tsx';

export default function Projects() {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Projects</title>
        <link rel='icon' href='/icon/logo.svg' type='image/svg+xml' />
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
          rel='stylesheet'
        />
        <link rel='stylesheet' href='/style.css' type='text/css' />
        <script type='module' src='/script.js'></script>
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
