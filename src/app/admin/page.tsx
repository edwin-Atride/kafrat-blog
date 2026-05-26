'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState('public')

  async function createPost() {
    await supabase.from('posts').insert({
      title,
      content,
      visibility,
    })

    alert('Article créé')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom right,#000,#111,#1b4332)',
        padding: '40px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: 'auto',
        }}
      >
        <h1
          style={{
            fontSize: '50px',
            color: '#2ecc71',
            marginBottom: '30px',
          }}
        >
          Dashboard Admin
        </h1>

        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '25px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <input
            placeholder='Titre'
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder='Contenu'
            onChange={(e) => setContent(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: '200px',
            }}
          />

          <select
            onChange={(e) => setVisibility(e.target.value)}
            style={inputStyle}
          >
            <option value='public'>Public</option>
            <option value='adherant'>Adhérant</option>
          </select>

          <button onClick={createPost} style={buttonStyle}>
            Publier l'article
          </button>
        </div>
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