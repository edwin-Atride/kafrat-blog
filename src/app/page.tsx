import Navbar from '../components/Navbar'

export default function Home(){
 return(
  <main>
   <Navbar />

   <section style={{
    minHeight:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    textAlign:'center'
   }}>
    <h1 style={{
     fontSize:'60px',
     color:'#2ecc71'
    }}>
     Bienvenue chez Kafrat
    </h1>

    <p style={{color:'#ccc'}}>
     Site style dark Guadeloupe avec Supabase.
    </p>
   </section>
  </main>
 )
}
