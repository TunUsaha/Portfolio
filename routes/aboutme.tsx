import { Head } from '$fresh/runtime.ts';

export default function About() {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>About Me</title>
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
            <h1 className='left'>About Me</h1>
            <div className='information'>
              <h2 className='right'>Tun Usaha</h2>
              <p className='right'>Web Portfolio</p>
              <div className='banner-title'>
                <p>
                  I am a passionate student pursuing a Bachelor of Science in
                  Modern Management Information Technology at Chiang Mai
                  University, with a focus on machine learning development.
                </p>
                <p className='quote'>
                  "Don't tell me the sky's the limit when there are footprints
                  on the moon."
                </p>
              </div>
            </div>
            <div className='profile'>
              <img src='/images/IMG_4639.PNG' alt='Tun Usaha' />
            </div>
          </div>
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
