export default function Navbar(){
 return(
  <nav style={{
   display:'flex',
   justifyContent:'space-between',
   padding:'20px',
   background:'#000',
   borderBottom:'1px solid #2ecc71'
  }}>
   <h1 style={{color:'#2ecc71'}}>Kafrat</h1>

   <div style={{display:'flex',gap:'20px'}}>
    <a href="/">Accueil</a>
    <a href="/blog">Blog</a>
   </div>
  </nav>
 )
}
