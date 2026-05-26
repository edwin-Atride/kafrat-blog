'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

export default function Adherant() {
  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
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

    if (
      data?.role !== 'adherant' &&
      data?.role !== 'admin'
    ) {
      router.push('/')
      return
    }

    setAuthorized(true)

    getPosts()
  }

  async function getPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('visibility', 'adherant')
      .order('id', { ascending: false })

    if (data) {
      setPosts(data)
    }
  }

  if (!authorized) {
    return <h1>Chargement...</h1>
  }

  return (
    <main>
      <Navbar />

      <section style={{ padding: '40px' }}>
        <h1
          style={{
            color: '#f1c40f',
            fontSize: '50px',
          }}
        >
          Blog Adhérant
        </h1>

        <div
          style={{
            display: 'grid',
            gap: '30px',
            marginTop: '40px',
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
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}