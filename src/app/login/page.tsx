'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function login() {
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    router.push('/')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom right,#000,#111,#1b4332)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '25px',
          padding: '40px',
          boxShadow: '0 0 30px rgba(0,255,120,0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '40px',
            textAlign: 'center',
            color: '#2ecc71',
            marginBottom: '10px',
          }}
        >
          Kafrat
        </h1>

        <p
          style={{
            textAlign: 'center',
            color: '#aaa',
            marginBottom: '30px',
          }}
        >
          Connexion
        </p>

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: 'red', marginBottom: '20px' }}>
            {error}
          </p>
        )}

        <button onClick={login} style={buttonStyle}>
          Se connecter
        </button>
      </div>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '20px',
  borderRadius: '12px',
  border: '1px solid #333',
  background: '#111',
  color: 'white',
  fontSize: '16px',
}

const buttonStyle = {
  width: '100%',
  padding: '15px',
  borderRadius: '12px',
  border: 'none',
  background: '#2ecc71',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
}