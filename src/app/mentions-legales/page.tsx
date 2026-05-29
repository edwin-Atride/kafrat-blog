import Navbar from '../../components/Navbar'

export default function Mentions() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: '100vh',
          background: '#111',
          color: 'white',
          padding: '60px 20px',
        }}
      >
        <h1
          style={{
            color: '#2ecc71',
            fontSize: '50px',
            marginBottom: '40px',
          }}
        >
          Mentions légales
        </h1>

        <div
          style={{
            background: '#1a1a1a',
            padding: '40px',
            borderRadius: '20px',
            lineHeight: '1.8',
            color: '#ccc',
          }}
        >
          <p>
            Nom de l’association : Kafrat
          </p>

          <p>
            Responsable : Association Kafrat
          </p>

          <p>
            Site hébergé par Vercel
          </p>

          <p>
            Les données utilisateurs sont
            stockées via Supabase.
          </p>

          <p>
            Toute reproduction du contenu sans
            autorisation est interdite.
          </p>
        </div>
      </main>
    </>
  )
}