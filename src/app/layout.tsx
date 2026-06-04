import './globals.css'

export default function RootLayout({
  children,
}: any) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

<footer style={{
  background: '#111',
  padding: '30px',
  textAlign: 'center',
  color: '#aaa',
  marginTop: '50px'
}}>
  <p>© {new Date().getFullYear()} KaFrat</p>

  <a
    href="/mentions-legales"
    style={{ color: '#2ecc71', textDecoration: 'none' }}
  >
    Mentions légales
  </a>
</footer>