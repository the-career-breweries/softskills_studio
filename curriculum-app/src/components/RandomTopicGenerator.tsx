import React, { useState } from 'react';

const TOPICS = [
  "Is AI making students lazier?",
  "Should college attendance be mandatory?",
  "Is a B.Com degree enough in 2026?",
  "Should companies ban remote work for entry-level roles?",
  "Are traditional resumes dead?",
  "Is social media a net positive for career growth?",
  "Should the gig economy replace traditional employment?",
  "Is the 4-day workweek viable in India?",
  "Are soft skills more important than technical skills?",
  "Should practical internships replace the final year of college?"
];

export default function RandomTopicGenerator() {
  const [currentTopic, setCurrentTopic] = useState("Click 'Spin' to Generate a Topic");
  const [isSpinning, setIsSpinning] = useState(false);

  const spinTopic = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    let spins = 0;
    const maxSpins = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TOPICS.length);
      setCurrentTopic(TOPICS[randomIndex]);
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      background: 'rgba(30, 41, 59, 0.7)',
      borderRadius: '24px',
      border: '2px solid rgba(148, 163, 184, 0.2)',
      margin: '2rem auto',
      textAlign: 'center',
      width: '100%',
      maxWidth: '800px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '2.5rem', 
          margin: 0, 
          color: isSpinning ? '#94a3b8' : '#38bdf8',
          transition: 'color 0.3s ease',
          textShadow: isSpinning ? 'none' : '0 0 20px rgba(56, 189, 248, 0.5)'
        }}>
          {currentTopic}
        </h3>
      </div>
      
      <button 
        onClick={spinTopic}
        disabled={isSpinning}
        style={{
          background: isSpinning ? '#475569' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: 'white',
          border: 'none',
          padding: '1rem 3rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderRadius: '50px',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          boxShadow: isSpinning ? 'none' : '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
          transition: 'all 0.2s ease',
          transform: isSpinning ? 'scale(0.95)' : 'scale(1)'
        }}
        onMouseOver={(e) => { if (!isSpinning) e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseOut={(e) => { if (!isSpinning) e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {isSpinning ? 'Selecting...' : 'Spin the Wheel'}
      </button>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', color: '#94a3b8', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <span style={{ color: '#ef4444' }}>FOR</span>
        <span>VS</span>
        <span style={{ color: '#22c55e' }}>AGAINST</span>
      </div>
    </div>
  );
}
