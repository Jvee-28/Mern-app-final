import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1 style={{margin:0,color:'#0f172a'}}>Mental Journal — Pastel CSS UI</h1>
          <p style={{marginTop:6,color:'var(--muted)'}}>Private journaling supporting SDG3</p>
        </div>
      </header>
      <main className="container" style={{paddingTop:20}}>
        <div className="grid">
          <div className="card">
            <h2>Welcome</h2>
            <p className="muted">Capture private entries and optionally share anonymized data.</p>
            <div style={{marginTop:12}}>
              <Link to="/login"><button className="btn btn-accent">Login / Signup</button></Link>
              <Link to="/journal" style={{marginLeft:8}}><button className="btn btn-primary">My Journal</button></Link>
            </div>
          </div>
          <aside className="card">
            <h3>Preview</h3>
            <p style={{fontSize:13,color:'var(--muted)'}}>Quick snapshot of the app.</p>
          </aside>
        </div>
        <div className="footer">Built for SDG3 — Good Health & Well-being</div>
      </main>
    </div>
  )
}
