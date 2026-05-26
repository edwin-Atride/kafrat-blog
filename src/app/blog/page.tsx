'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar'

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('visibility', 'public')
      .order('id', { ascending: false })

    if (data) {
      setPosts(data)
    }
  }

  return (
    <main>
      <Navbar />

      <section style={{ padding: '40px' }}>
        <h1
          style={{
            fontSize: '50px',
            color: '#2ecc71',
          }}
        >
          Blog Public
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