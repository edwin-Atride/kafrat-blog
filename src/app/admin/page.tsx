'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [visibility, setVisibility] = useState('public')

  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    checkAdmin()
    getPosts()
  }, [])

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (data?.role !== 'admin') {
      router.push('/')
      return
    }

    setAuthorized(true)
  }

  async function createPost() {
    await supabase.from('posts').insert({
      title,
      content,
      image_url: imageUrl,
      youtube_url: youtubeUrl,
      visibility,
    })

    alert('Article créé')

    getPosts()
  }

  async function getPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })

    if (data) {
      setPosts(data)
    }
  }

  async function deletePost(id: number) {
    await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    getPosts()
  }

  if (!authorized) {
    return <h1 style={{ padding: '40px' }}>Chargement...</h1>
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
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          width: '400px',
          background: '#111',
          border: '1px solid #2ecc71',
          borderRadius: '20px',
          padding: '20px',
          zIndex: 1000,
        }}
      >
        <h2 style={{ color: '#2ecc71' }}>
          Dashboard Admin
        </h2>

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
            minHeight: '120px',
          }}
        />

        <input
          placeholder='Lien image'
          onChange={(e) => setImageUrl(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder='Lien YouTube'
          onChange={(e) => setYoutubeUrl(e.target.value)}
          style={inputStyle}
        />

        <select
          onChange={(e) => setVisibility(e.target.value)}
          style={inputStyle}
        >
          <option value='public'>
            Public
          </option>

          <option value='adherant'>
            Adhérant
          </option>
        </select>

        <button
          onClick={createPost}
          style={buttonStyle}
        >
          Publier
        </button>
      </div>

      <h1
        style={{
          color: '#2ecc71',
          fontSize: '50px',
        }}
      >
        Gestion des Blogs
      </h1>

      <div
        style={{
          marginTop: '40px',
          display: 'grid',
          gap: '20px',
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: '#1a1a1a',
              padding: '20px',
              borderRadius: '20px',
            }}
          >
            <h2>{post.title}</h2>

            <p>{post.content}</p>

            {post.image_url && (
              <img
                src={post.image_url}
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  marginTop: '20px',
                }}
              />
            )}

            {post.youtube_url && (
              <iframe
                width='100%'
                height='400'
                src={post.youtube_url.replace(
                  'watch?v=',
                  'embed/'
                )}
              />
            )}

            <button
              onClick={() => deletePost(post.id)}
              style={{
                marginTop: '20px',
                background: '#e74c3c',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                color: 'white',
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '10px',
  border: '1px solid #333',
  background: '#222',
  color: 'white',
}

const buttonStyle = {
  width: '100%',
  padding: '15px',
  border: 'none',
  borderRadius: '12px',
  background: '#2ecc71',
  color: 'black',
  fontWeight: 'bold',
}