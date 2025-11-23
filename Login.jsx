import React, { useState } from 'react'
import api from '../services/api.js'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const nav = useNavigate()
  const submit = async e => {
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      nav('/journal')
    }catch(err){ alert(err.response?.data?.error || 'Login failed') }
  }
  return (
    <div className="container" style={{paddingTop:20}}>
      <div className="card" style={{maxWidth:480,margin:'0 auto'}}>
        <h2>Login</h2>
        <form onSubmit={submit} style={{display:'grid',gap:10}}>
          <input className="form-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="form-input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
        <p style={{fontSize:12,color:'var(--muted)',marginTop:8}}>Tip: use seeded user after running seed script</p>
      </div>
    </div>
  )
}
