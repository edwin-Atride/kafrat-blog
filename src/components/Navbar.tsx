'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState('')

  useEffect(() => {
    getSession()

    supabase.auth.onAuthStateChange(() => {
      getSession()
    })
  }, [])

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      setUser(null)
      setRole('')
      return
    }

    setUser(session.user)

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    console.log(data)
    console.log(error)

    if (data?.role) {
      setRole(data.role)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: '#000',
        borderBottom: '1px solid #2ecc71',
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

        {(role === 'admin' ||
          role === 'adherant') && (
          <a href='/adherant'>
            Blog Adhérant
          </a>
        )}

        {role === 'admin' && (
          <a href='/admin'>
            Dashboard
          </a>
        )}

        {!user ? (
          <a
            href='/login'
            style={{
              background: '#2ecc71',
              color: 'black',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
          >
            Connexion
          </a>
        ) : (
          <>
            <span style={{ color: '#aaa' }}>
              {user.email}
            </span>

            <button
              onClick={logout}
              style={{
                background: '#e74c3c',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  )
}