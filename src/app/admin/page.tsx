'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

export default function Admin() {
  const router = useRouter()

  const [authorized, setAuthorized] =
    useState(false)

  // BLOG
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [youtubeUrl, setYoutubeUrl] =
    useState('')
  const [imageUrl, setImageUrl] =
    useState('')

  const [visibility, setVisibility] =
    useState('adherant')

  const [posts, setPosts] = useState<any[]>(
    []
  )

  // HOME PAGE
  const [heroTitle, setHeroTitle] =
    useState('')

  const [heroText, setHeroText] =
    useState('')

  const [youtubeHome, setYoutubeHome] =
    useState('')

  const [aboutText, setAboutText] =
    useState('')

  useEffect(() => {
    checkAdmin()
    getPosts()
    getHomeContent()
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

  async function getHomeContent() {
    const { data } = await supabase
      .from('home_content')
      .select('*')
      .eq('id', 1)
      .single()

    if (data) {
      setHeroTitle(data.hero_title || '')
      setHeroText(data.hero_text || '')
      setYoutubeHome(data.youtube_url || '')
      setAboutText(data.about_text || '')
    }
  }

  async function updateHome() {
    await supabase
      .from('home_content')
      .update({
        hero_title: heroTitle,
        hero_text: heroText,
        youtube_url: youtubeHome,
        about_text: aboutText,
      })
      .eq('id', 1)

    alert('Accueil modifié')
  }

  async function uploadImage(file: File) {
    const fileName =
      Date.now() + '-' + file.name

    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error) {
      alert(error.message)
      return
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    setImageUrl(data.publicUrl)
  }

  async function createPost() {
    await supabase.from('posts').insert({
      title,
      content,
      youtube_url: youtubeUrl,
      image_url: imageUrl,
      visibility,
    })

    setTitle('')
    setContent('')
    setYoutubeUrl('')
    setImageUrl('')

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
            marginBottom: '40px',
          }}
        >
          Dashboard Admin
        </h1>

        {/* HOME PAGE */}

        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '50px',
          }}
        >
          <h2
            style={{
              color: '#2ecc71',
              marginBottom: '20px',
            }}
          >
            Modifier l'accueil
          </h2>

          <input
            placeholder='Titre accueil'
            value={heroTitle}
            onChange={(e) =>
              setHeroTitle(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder='Texte accueil'
            value={heroText}
            onChange={(e) =>
              setHeroText(e.target.value)
            }
            style={{
              ...inputStyle,
              minHeight: '120px',
            }}
          />

          <input
            placeholder='Lien vidéo YouTube accueil'
            value={youtubeHome}
            onChange={(e) =>
              setYoutubeHome(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder='Présentation association'
            value={aboutText}
            onChange={(e) =>
              setAboutText(e.target.value)
            }
            style={{
              ...inputStyle,
              minHeight: '120px',
            }}
          />

          <button
            onClick={updateHome}
            style={buttonStyle}
          >
            Sauvegarder l'accueil
          </button>
        </div>

        {/* BLOG */}

        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
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
            type='file'
            onChange={(e) => {
              const file =
                e.target.files?.[0]

              if (file) {
                uploadImage(file)
              }
            }}
            style={inputStyle}
          />

          <input
            placeholder='Lien YouTube'
            value={youtubeUrl}
            onChange={(e) =>
              setYoutubeUrl(e.target.value)
            }
            style={inputStyle}
          />

          <label
            style={{
              color: '#2ecc71',
              fontWeight: 'bold',
            }}
          >
            Où publier ?
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
            Publier
          </button>
        </div>

        {/* POSTS */}

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

              {post.image_url && (
                <img
                  src={post.image_url}
                  style={{
                    width: '100%',
                    marginTop: '20px',
                    borderRadius: '20px',
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