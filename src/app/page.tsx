'use client'

import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        style={{
          background: '#111',
          minHeight: '100vh',
          color: 'white',
        }}
      >
        <section
          style={{
            padding: '100px 20px',
            textAlign: 'center',
            background:
              'linear-gradient(to bottom,#1b4332,#111)',
          }}
        >
          <h1
            style={{
              fontSize: '70px',
              color: '#2ecc71',
              marginBottom: '20px',
            }}
          >
            Bienvenue chez Kafrat
          </h1>

          <p
            style={{
              maxWidth: '900px',
              margin: 'auto',
              fontSize: '22px',
              color: '#ddd',
              lineHeight: '1.7',
            }}
          >
            Une association culturelle et
            communautaire mettant en avant
            l’entraide, les événements et la
            culture guadeloupéenne.
          </p>
        </section>

        <section
          style={{
            padding: '70px 20px',
          }}
        >
          <h2
            style={{
              color: '#2ecc71',
              fontSize: '40px',
              marginBottom: '30px',
            }}
          >
            Découvrez Kafrat
          </h2>

          <div
            style={{
              borderRadius: '25px',
              overflow: 'hidden',
            }}
          >
            <iframe
              width='100%'
              height='600'
              src='https://www.youtube.com/embed/dQw4w9WgXcQ'
              title='YouTube video player'
              allowFullScreen
            />
          </div>
        </section>

        <section
          style={{
            padding: '70px 20px',
          }}
        >
          <h2
            style={{
              color: '#2ecc71',
              fontSize: '40px',
              marginBottom: '30px',
            }}
          >
            Galerie Photos
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit,minmax(250px,1fr))',
              gap: '20px',
            }}
          >
            <img
              src='https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f'
              style={imageStyle}
            />

            <img
              src='https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
              style={imageStyle}
            />

            <img
              src='https://images.unsplash.com/photo-1492684223066-81342ee5ff30'
              style={imageStyle}
            />

            <img
              src='https://images.unsplash.com/photo-1529156069898-49953e39b3ac'
              style={imageStyle}
            />
          </div>
        </section>

        <section
          style={{
            padding: '70px 20px',
          }}
        >
          <h2
            style={{
              color: '#2ecc71',
              fontSize: '40px',
              marginBottom: '30px',
            }}
          >
            Qui sommes-nous ?
          </h2>

          <div
            style={{
              background: '#1a1a1a',
              padding: '40px',
              borderRadius: '25px',
              lineHeight: '1.8',
              color: '#ccc',
              fontSize: '18px',
            }}
          >
            Kafrat est une association visant à
            promouvoir la culture, l’entraide et
            les événements communautaires à
            travers différentes activités et
            projets culturels.
          </div>
        </section>

        <footer
          style={{
            background: '#000',
            padding: '50px 20px',
            marginTop: '80px',
            borderTop: '2px solid #2ecc71',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '30px',
            }}
          >
            <div>
              <h2 style={{ color: '#2ecc71' }}>
                Kafrat
              </h2>

              <p style={{ color: '#aaa' }}>
                Association culturelle et
                communautaire.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#2ecc71' }}>
                Navigation
              </h3>

              <p>
                <a href='/'>
                  Accueil
                </a>
              </p>

              <p>
                <a href='/blog'>
                  Blog Public
                </a>
              </p>

              <p>
                <a href='/adherant'>
                  Blog Adhérant
                </a>
              </p>
            </div>

            <div>
              <h3 style={{ color: '#2ecc71' }}>
                Légal
              </h3>

              <p>
                <a href='/mentions-legales'>
                  Mentions légales
                </a>
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: '40px',
              color: '#666',
              textAlign: 'center',
            }}
          >
            © 2026 Kafrat - Tous droits
            réservés
          </p>
        </footer>
      </main>
    </>
  )
}

const imageStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover' as const,
  borderRadius: '20px',
}