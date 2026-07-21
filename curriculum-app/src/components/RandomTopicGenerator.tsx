import React, { useState } from 'react';
import { Sparkles, Dices } from 'lucide-react';

const TOPICS = [
  "Book Smart vs. Street Smart: Which is actually more important for success today?",
  "Should college attendance be strictly mandatory, or completely optional?",
  "Work-from-home vs. Office: Which is better for a fresher's first job?",
  "Are social media influencers actual 'entrepreneurs'?",
  "Is Artificial Intelligence going to make us smarter or lazier?",
  "Should a person's social media profile be checked by employers before hiring?",
  "Is the 4-day work week a realistic future for India?"
];

export default function RandomTopicGenerator() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTopic = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    // Quick shuffle animation effect
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TOPICS.length);
      setCurrentTopic(TOPICS[randomIndex]);
      count++;
      
      if (count > 10) {
        clearInterval(interval);
        setIsGenerating(false);
        // Ensure final topic isn't just a flicker of the last animation frame
        const finalIndex = Math.floor(Math.random() * TOPICS.length);
        setCurrentTopic(TOPICS[finalIndex]);
      }
    }, 80);
  };

  return (
    <div style={{
      marginTop: '2rem',
      padding: '2rem',
      borderRadius: '16px',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        {currentTopic ? (
          <h2 style={{
            fontSize: '1.8rem',
            color: 'var(--accent-primary)',
            lineHeight: '1.4',
            margin: 0,
            transition: 'all 0.3s ease',
            opacity: isGenerating ? 0.5 : 1,
            transform: isGenerating ? 'scale(0.98)' : 'scale(1)'
          }}>
            "{currentTopic}"
          </h2>
        ) : (
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            margin: 0
          }}>
            Click the button below to generate a random topic for the next group.
          </p>
        )}
      </div>

      <button
        onClick={generateTopic}
        disabled={isGenerating}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          fontWeight: '600',
          color: 'white',
          background: 'var(--accent-primary)',
          border: 'none',
          borderRadius: '12px',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
          opacity: isGenerating ? 0.8 : 1
        }}
        onMouseOver={(e) => {
          if (!isGenerating) e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          if (!isGenerating) e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Dices size={24} className={isGenerating ? 'spin-animation' : ''} />
        {isGenerating ? 'Selecting...' : 'Generate Random Topic'}
      </button>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}} />
    </div>
  );
}
