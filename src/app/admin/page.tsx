'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Admin(){
 const [title,setTitle] = useState('')
 const [content,setContent] = useState('')
 const [visibility,setVisibility] = useState('public')

 async function createPost(){
  await supabase.from('posts').insert({
   title,
   content,
   visibility
  })
 }

 return(
  <main style={{padding:'40px'}}>
   <h1>Dashboard Admin</h1>

   <input
    placeholder='Titre'
    onChange={(e)=>setTitle(e.target.value)}
   />

   <textarea
    placeholder='Contenu'
    onChange={(e)=>setContent(e.target.value)}
   />

   <select onChange={(e)=>setVisibility(e.target.value)}>
    <option value='public'>Public</option>
    <option value='adherant'>Adhérant</option>
   </select>

   <button onClick={createPost}>
    Créer un article
   </button>
  </main>
 )
}