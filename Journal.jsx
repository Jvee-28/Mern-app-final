import React, { useEffect, useState } from 'react'
import api from '../services/api.js'

function Editor({ onSaved }) {
  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')
  const [mood,setMood]=useState('neutral')
  const [isPrivate,setIsPrivate]=useState(true)
  const save = async ()=>{
    await api.post('/entries', { title, body, mood, isPrivate })
    setTitle(''); setBody(''); onSaved && onSaved()
  }
  return (
    <div className="card" style={{marginBottom:12}}>
      <h3>New Entry</h3>
      <input className="form-input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="form-input" rows={5} placeholder="Write..." value={body} onChange={e=>setBody(e.target.value)} style={{marginTop:8}} />
      <div style={{marginTop:8,display:'flex',gap:8,alignItems:'center'}}>
        <select className="form-input" value={mood} onChange={e=>setMood(e.target.value)} style={{width:160}}>
          <option value="very-negative">Very negative</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
          <option value="positive">Positive</option>
          <option value="very-positive">Very positive</option>
        </select>
        <label style={{fontSize:13}}><input type="checkbox" checked={!isPrivate} onChange={e=>setIsPrivate(!e.target.checked)} /> Share anonymized</label>
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default function Journal(){
  const [entries,setEntries]=useState([])
  const fetch = async ()=>{
    try{ const res = await api.get('/entries'); setEntries(res.data) }catch(err){ console.error(err); alert('Login required') }
  }
  useEffect(()=>{ fetch() }, [])
  return (
    <div className="container" style={{paddingTop:20}}>
      <div className="grid">
        <div>
          <Editor onSaved={fetch} />
          <div style={{display:'grid',gap:10}}>
            {entries.map(e=>(
              <div key={e._id} className="entry">
                <div style={{fontSize:12,color:'var(--muted)'}}>{new Date(e.createdAt).toLocaleString()}</div>
                <div style={{marginTop:6}}>{e.title && <strong>{e.title}</strong>}</div>
                <div style={{marginTop:6}}>{e.body}</div>
                <div style={{marginTop:6,fontSize:12,color:'var(--muted)'}}>Mood: {e.mood}</div>
              </div>
            ))}
          </div>
        </div>
        <aside className="card">
          <h3>About</h3>
          <p style={{fontSize:13,color:'var(--muted)'}}>This journal supports optional anonymized sharing to help SDG3 analytics.</p>
        </aside>
      </div>
    </div>
  )
}
