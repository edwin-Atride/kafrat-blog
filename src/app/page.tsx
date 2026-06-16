'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'
import './responsive.css'

export default function Home() {
  const [content, setContent] = useState<any>(
    null
  )

  useEffect(() => {
    getContent()
  }, [])

  async function getContent() {
    const { data } = await supabase
      .from('home_content')
      .select('*')
      .single()

    if (data) {
      setContent(data)
    }
  }

  if (!content) {
    return <h1>Chargement...</h1>
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          background: '#111',
          minHeight: '100vh',
          color: 'white',
        }}
      >
        <section
          style={{
            padding: '100px 20px',
            textAlign: 'center',
            background:
              'linear-gradient(to bottom,#1b4332,#111)',
          }}
        >
          <h1
            style={{
              fontSize: '70px',
              color: '#2ecc71',
            }}
          >
            {content.hero_title}
          </h1>

          <p
            style={{
              maxWidth: '900px',
              margin: '30px auto',
              fontSize: '22px',
              color: '#ddd',
              lineHeight: '1.7',
            }}
          >
            {content.hero_text}
          </p>
        </section>

        <section
          style={{
            padding: '70px 20px',
          }}
        >
          <iframe
            width='100%'
            height='600'
            src={content.youtube_url.replace(
              'watch?v=',
              'embed/'
            )}
            allowFullScreen
            style={{
              borderRadius: '25px',
            }}
          />
        </section>

        <section
          style={{
            padding: '70px 20px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit,minmax(250px,1fr))',
              gap: '20px',
            }}
          >
            {content.image1 && (
              <img
                src={content.image1}
                style={imageStyle}
              />
            )}

            {content.image2 && (
              <img
                src={content.image2}
                style={imageStyle}
              />
            )}

            {content.image3 && (
              <img
                src={content.image3}
                style={imageStyle}
              />
            )}

            {content.image4 && (
              <img
                src={content.image4}
                style={imageStyle}
              />
            )}
          </div>
        </section>

        <section
          style={{
            padding: '70px 20px',
          }}
        >
          <div
            style={{
              background: '#1a1a1a',
              padding: '40px',
              borderRadius: '25px',
              color: '#ccc',
              lineHeight: '1.8',
            }}
          >
            {content.about_text}
          </div>
        </section>
      </main>
    </>
  )
}

const imageStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover' as const,
  borderRadius: '20px',
}