import Navbar from '../../components/Navbar'

export default function Blog() {
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
            color: '#2ecc71',
            marginBottom: '40px',
          }}
        >
          Blog Public
        </h1>

        <div
          style={{
            background: '#1a1a1a',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '20px',
          }}
        >
          <h2>Premier Article</h2>

          <p style={{ color: '#aaa' }}>
            Accessible à tous les visiteurs.
          </p>
        </div>
      </section>
    </main>
  )
}