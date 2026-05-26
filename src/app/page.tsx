import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />

      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          background:
            'linear-gradient(to bottom right,#000,#111,#1b4332)',
          padding: '20px',
        }}
      >
        <div
          style={{
            padding: '10px 20px',
            border: '1px solid #2ecc71',
            borderRadius: '50px',
            marginBottom: '20px',
            background: 'rgba(46,204,113,0.2)',
          }}
        >
          Association Guadeloupéenne
        </div>

        <h1
          style={{
            fontSize: '80px',
            color: '#2ecc71',
            marginBottom: '20px',
          }}
        >
          Kafrat
        </h1>

        <p
          style={{
            maxWidth: '700px',
            color: '#ccc',
            marginBottom: '40px',
          }}
        >
          Plateforme culturelle moderne avec espace public et adhérant.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href='/blog'
            style={buttonStyle}
          >
            Blog Public
          </a>

          <a
            href='/adherant'
            style={{
              ...buttonStyle,
              background: '#f1c40f',
            }}
          >
            Blog Adhérant
          </a>
        </div>
      </section>
    </main>
  )
}

const buttonStyle = {
  padding: '15px 30px',
  borderRadius: '15px',
  background: '#2ecc71',
  color: 'black',
  fontWeight: 'bold',
}