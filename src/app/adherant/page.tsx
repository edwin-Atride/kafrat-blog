'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Adherant() {
  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)

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
  }

  if (!authorized) {
    return <h1 style={{ padding: '40px' }}>Chargement...</h1>
  }

  return (
    <main style={{ padding: '40px' }}>
      <h1>Blog Adhérant</h1>

      <p>Contenu privé réservé aux adhérants.</p>
    </main>
  )
}