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
    textAlign:'center',
    padding:'20px'
   }}>

    <div style={{
     padding:'10px 20px',
     border:'1px solid #2ecc71',
     borderRadius:'50px',
     background:'rgba(46,204,113,0.2)',
     marginBottom:'20px'
    }}>
     Association Guadeloupéenne
    </div>

    <h1 style={{
     fontSize:'60px',
     color:'#2ecc71'
    }}>
     Kafrat
    </h1>

    <p style={{
     maxWidth:'700px',
     color:'#ccc'
    }}>
     Plateforme culturelle moderne avec espace adhérant.
    </p>
   </section>
  </main>
 )
}