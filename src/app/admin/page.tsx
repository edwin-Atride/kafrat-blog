'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    checkAdmin()
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

  if (!authorized) {
    return <h1 style={{ padding: '40px' }}>Chargement...</h1>
  }

  return (
    <main style={{ padding: '40px' }}>
      <h1>Dashboard Admin</h1>

      <p>Seuls les admins peuvent voir ceci.</p>
    </main>
  )
}