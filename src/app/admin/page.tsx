'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

export default function Admin() {
  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [visibility, setVisibility] =
    useState('adherant')

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

    setTitle('')
    setContent('')
    setImageUrl('')
    setYoutubeUrl('')

    getPosts()

    alert('Article publié')
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
    return (
      <h1 style={{ padding: '40px' }}>
        Chargement...
      </h1>
    )
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(to bottom right,#000,#111,#1b4332)',
          padding: '40px',
        }}
      >
        <h1
          style={{
            color: '#2ecc71',
            fontSize: '50px',
            marginBottom: '10px',
          }}
        >
          Dashboard Admin
        </h1>

        <p
          style={{
            color: '#aaa',
            marginBottom: '40px',
          }}
        >
          Création et gestion des articles.
        </p>

        <div
          style={{
            background: '#111',
            border: '1px solid #2ecc71',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '50px',
          }}
        >
          <h2
            style={{
              color: '#2ecc71',
              marginBottom: '20px',
            }}
          >
            Créer un article
          </h2>

          <input
            placeholder='Titre'
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder='Contenu'
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            style={{
              ...inputStyle,
              minHeight: '150px',
            }}
          />

          <input
            placeholder='Lien image'
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder='Lien vidéo YouTube'
            value={youtubeUrl}
            onChange={(e) =>
              setYoutubeUrl(e.target.value)
            }
            style={inputStyle}
          />

          <label
            style={{
              display: 'block',
              marginBottom: '10px',
              color: '#2ecc71',
              fontWeight: 'bold',
            }}
          >
            Où publier l’article ?
          </label>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value)
            }
            style={inputStyle}
          >
            <option value='adherant'>
              🔒 Blog Adhérant
            </option>

            <option value='public'>
              🌍 Blog Public
            </option>
          </select>

          <button
            onClick={createPost}
            style={buttonStyle}
          >
            Publier l’article
          </button>
        </div>

        <h2
          style={{
            color: '#2ecc71',
            marginBottom: '30px',
          }}
        >
          Articles publiés
        </h2>

        <div
          style={{
            display: 'grid',
            gap: '30px',
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: '#1a1a1a',
                padding: '30px',
                borderRadius: '20px',
              }}
            >
              <h2>{post.title}</h2>

              <p
                style={{
                  color: '#aaa',
                  marginTop: '15px',
                }}
              >
                {post.content}
              </p>

              <p
                style={{
                  marginTop: '20px',
                  color:
                    post.visibility ===
                    'adherant'
                      ? '#f1c40f'
                      : '#2ecc71',
                }}
              >
                {post.visibility ===
                'adherant'
                  ? '🔒 Article Adhérant'
                  : '🌍 Article Public'}
              </p>

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
                  style={{
                    marginTop: '20px',
                    borderRadius: '20px',
                  }}
                  src={post.youtube_url.replace(
                    'watch?v=',
                    'embed/'
                  )}
                />
              )}

              <button
                onClick={() =>
                  deletePost(post.id)
                }
                style={{
                  marginTop: '20px',
                  background: '#e74c3c',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

const inputStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '20px',
  borderRadius: '12px',
  border: '1px solid #333',
  background: '#222',
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