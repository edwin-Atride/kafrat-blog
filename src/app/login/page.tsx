'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login(){
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')

 async function login(){
  await supabase.auth.signInWithPassword({
   email,
   password
  })
 }

 return(
  <main style={{
   minHeight:'100vh',
   display:'flex',
   justifyContent:'center',
   alignItems:'center'
  }}>
   <div style={{
    width:'400px',
    background:'#222',
    padding:'30px',
    borderRadius:'20px'
   }}>

    <h1>Connexion</h1>

    <input
     placeholder='Email'
     onChange={(e)=>setEmail(e.target.value)}
    />

    <input
     type='password'
     placeholder='Mot de passe'
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button onClick={login}>
     Se connecter
    </button>
   </div>
  </main>
 )
}