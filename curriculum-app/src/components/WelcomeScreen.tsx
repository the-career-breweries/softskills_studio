import React, { useEffect } from 'react';
import { ChevronRight, Target, Compass, Zap, Award, BookOpen, Presentation, Briefcase, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeScreenProps {
  program: 'ug' | 'pg';
  onProgramChange: (program: 'ug' | 'pg') => void;
  onNext: () => void;
}

export default function WelcomeScreen({ program, onProgramChange, onNext }: WelcomeScreenProps) {
  // Keyboard navigation for 'Next'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext]);

  // 10-second firecracker animation on load
  useEffect(() => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const isUG = program === 'ug';

  return (
    <div className="welcome-overlay">
      <div className="welcome-container">
        
        {/* Header Section */}
        <div className="welcome-header">
          <div className="welcome-badge">
            <GraduationCap size={32} />
            <span>Orientation</span>
          </div>
          <h1 className="welcome-title">
            Soft Skills Studio <br/>
            <span className="welcome-subtitle">The {isUG ? 'Undergraduate' : 'Postgraduate'} Journey</span>
          </h1>
          <p className="welcome-mission">
            {isUG 
              ? "Transforming technical knowledge into professional impact. Master the core competencies required to thrive in a modern corporate environment."
              : "Elevating professional presence and strategic leadership. Master the advanced executive skills required to lead, negotiate, and drive organizational impact."}
          </p>
        </div>

        {/* Roadmap / Infographic Section */}
        <div className="welcome-roadmap">
          
          <div className="roadmap-node">
            <div className="node-icon"><Compass size={40} /></div>
            <div className="node-content">
              <h3>{isUG ? 'Phase 1: Foundation' : 'Phase 1: Strategy'}</h3>
              <p>{isUG ? 'Semesters 1-2' : 'Semester 1'}</p>
              <span className="node-detail">
                {isUG ? 'Self-awareness, learning habits, and basic communication etiquette.' : 'Personal branding, digital presence, and strategic goal setting.'}
              </span>
            </div>
          </div>

          <div className="roadmap-connector"></div>

          <div className="roadmap-node">
            <div className="node-icon"><Target size={40} /></div>
            <div className="node-content">
              <h3>{isUG ? 'Phase 2: Execution' : 'Phase 2: Leadership'}</h3>
              <p>{isUG ? 'Semesters 3-4' : 'Semester 2'}</p>
              <span className="node-detail">
                {isUG ? 'Time management, teamwork, emotional intelligence, and business writing.' : 'Conflict resolution, advanced networking, and team leadership.'}
              </span>
            </div>
          </div>

          <div className="roadmap-connector"></div>

          <div className="roadmap-node">
            <div className="node-icon"><Zap size={40} /></div>
            <div className="node-content">
              <h3>{isUG ? 'Phase 3: Application' : 'Phase 3: Impact'}</h3>
              <p>{isUG ? 'Semesters 5-6' : 'Semester 3'}</p>
              <span className="node-detail">
                {isUG ? 'Interview prep, mock GDs, resume building, and transition to corporate life.' : 'Data narrative, crisis management, negotiation, and corporate ethics.'}
              </span>
            </div>
          </div>

          {!isUG && (
            <>
              <div className="roadmap-connector"></div>
              <div className="roadmap-node">
                <div className="node-icon"><Briefcase size={40} /></div>
                <div className="node-content">
                  <h3>Phase 4: Transition</h3>
                  <p>Semester 4</p>
                  <span className="node-detail">
                    Agile methodology, cross-cultural competence, and executive final deliverables.
                  </span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Navigation Prompt */}
        <div className="welcome-footer">
          <div className="welcome-program-toggle" style={{ display: 'flex', gap: '1rem', background: 'var(--bg-app)', padding: '0.5rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => onProgramChange('ug')}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                border: 'none',
                background: isUG ? 'var(--accent-primary)' : 'transparent',
                color: isUG ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Undergraduate (UG)
            </button>
            <button 
              onClick={() => onProgramChange('pg')}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                border: 'none',
                background: !isUG ? 'var(--accent-primary)' : 'transparent',
                color: !isUG ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Postgraduate (PG)
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="/workshops/admin" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              background: '#f0f4f8',
              color: 'var(--accent-primary)',
              borderRadius: '30px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid #cce0ff',
              transition: 'all 0.2s'
            }}>
              <Briefcase size={20} />
              Paid Workshops
            </a>
            <button className="welcome-next-btn" onClick={onNext}>
              Enter Platform <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
