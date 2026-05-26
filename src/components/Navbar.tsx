export default function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: 'rgba(0,0,0,0.9)',
        borderBottom: '1px solid #2ecc71',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <h1
        style={{
          color: '#2ecc71',
          fontSize: '30px',
        }}
      >
        Kafrat
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <a href='/'>Accueil</a>

        <a href='/blog'>Blog Public</a>

        <a href='/adherant'>Blog Adhérant</a>

        <a href='/login'>Connexion</a>

        <a
          href='/admin'
          style={{
            background: '#2ecc71',
            color: 'black',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 'bold',
          }}
        >
          Dashboard
        </a>
      </div>
    </nav>
  )
}