import React from 'react';

export default function QRCodeForm() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '2rem auto',
      textAlign: 'center',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0', background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Scan to Access the Session Form
      </h2>
      <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem', marginTop: 0 }}>
        Please open this form now and keep it ready.<br/>You will need it for:
      </p>
      <ul style={{ textAlign: 'left', color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '0.5rem' }}>✅ Placement Interest (Yes/No)</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Your Future Plans</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Optional: Upload Your Draft Resume</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Session Feedback (Submit at the end)</li>
      </ul>
      <div style={{
        background: '#fff',
        padding: '1rem',
        borderRadius: '12px',
        display: 'inline-block'
      }}>
        {/* Placeholder for actual QR code image - using a generic SVG for now */}
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="white"/>
          <path d="M10 10H40V40H10V10ZM20 20V30H30V20H20Z" fill="black"/>
          <path d="M60 10H90V40H60V10ZM70 20V30H80V20H70Z" fill="black"/>
          <path d="M10 60H40V90H10V60ZM20 70V80H30V70H20Z" fill="black"/>
          <path d="M60 60H70V70H60V60Z" fill="black"/>
          <path d="M80 60H90V70H80V60Z" fill="black"/>
          <path d="M70 70H80V80H70V70Z" fill="black"/>
          <path d="M60 80H70V90H60V80Z" fill="black"/>
          <path d="M80 80H90V90H80V80Z" fill="black"/>
          <path d="M50 10H60V20H50V10Z" fill="black"/>
          <path d="M50 30H60V50H50V30Z" fill="black"/>
          <path d="M10 50H30V60H10V50Z" fill="black"/>
          <path d="M40 50H50V60H40V50Z" fill="black"/>
          <path d="M70 50H90V60H70V50Z" fill="black"/>
          <path d="M40 70H50V90H40V70Z" fill="black"/>
        </svg>
      </div>
      <p style={{ marginTop: '1.5rem', marginBottom: 0, fontSize: '0.9rem', color: '#64748b' }}>
        Point your phone camera here to begin.
      </p>
    </div>
  );
}
