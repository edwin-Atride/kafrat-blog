import Navbar from '../../components/Navbar'

export default function Adherant() {
  return (
    <main>
      <Navbar />

      <section
        style={{
          padding: '50px',
        }}
      >
        <h1
          style={{
            fontSize: '50px',
            color: '#f1c40f',
            marginBottom: '40px',
          }}
        >
          Blog Adhérant
        </h1>

        <div
          style={{
            background: '#1a1a1a',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>Contenu privé</h2>

          <p style={{ color: '#aaa' }}>
            Visible uniquement pour les adhérants connectés.
          </p>
        </div>
      </section>
    </main>
  )
}