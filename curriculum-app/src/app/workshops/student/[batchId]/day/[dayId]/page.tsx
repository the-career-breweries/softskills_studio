"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, PlayCircle, Clock, UploadCloud, CheckCircle2 } from 'lucide-react';
import { getStudentProgress, updateStudentProgress, WorkState } from '@/lib/firebase/studentOps';
import '../../../../workshops.css';

export default function WorkshopDayView() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  
  const [currentState, setCurrentState] = useState<WorkState>('MORNING_VIDEO');
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(1800); 
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/workshops/student');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        const progress = await getStudentProgress(user.uid);
        if (progress) {
          setCurrentState(progress.state);
          if (progress.state === 'BREAK' && progress.breakStartTime) {
            const elapsed = Math.floor((Date.now() - new Date(progress.breakStartTime).getTime()) / 1000);
            const remaining = Math.max(1800 - elapsed, 0);
            setBreakTimeRemaining(remaining);
            if (remaining === 0) {
              handleStateChange('DEEP_WORK_2');
            }
          }
        }
        setIsInitializing(false);
      }
    };
    if (user && !loading) fetchProgress();
  }, [user, loading]);

  const handleStateChange = async (newState: WorkState) => {
    setCurrentState(newState);
    if (!user) return;
    
    const updates: any = { state: newState };
    if (newState === 'BREAK') {
      updates.breakStartTime = new Date().toISOString();
      setBreakTimeRemaining(1800);
    }
    
    await updateStudentProgress(user.uid, updates);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentState === 'BREAK' && breakTimeRemaining > 0) {
      interval = setInterval(() => {
        setBreakTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (currentState === 'BREAK' && breakTimeRemaining === 0) {
      handleStateChange('DEEP_WORK_2');
    }
    return () => clearInterval(interval);
  }, [currentState, breakTimeRemaining]);

  if (loading || !user || isInitializing) return (
    <div className="wk-container wk-center-layout"><Loader2 size={32} className="animate-spin text-blue-600"/></div>
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="wk-container">
      <header className="wk-dashboard-header">
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--wk-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Day {params.dayId as string}</p>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Resume & Profile Building</h1>
        </div>
        <button onClick={() => router.push('/workshops/student')} className="wk-link-btn">
          Back to Dashboard
        </button>
      </header>

      <main className="wk-dashboard-main">
        
        {/* Timeline Tracker */}
        <div className="wk-timeline-container">
          <div className="wk-timeline">
            <div className={`wk-timeline-pill ${currentState === 'MORNING_VIDEO' ? 'active' : ''}`}>1. Briefing</div>
            <div className="wk-timeline-line"></div>
            <div className={`wk-timeline-pill ${currentState === 'DEEP_WORK_1' ? 'active' : ''}`}>2. Block A</div>
            <div className="wk-timeline-line"></div>
            <div className={`wk-timeline-pill ${currentState === 'BREAK' ? 'active' : ''}`}>3. Break</div>
            <div className="wk-timeline-line"></div>
            <div className={`wk-timeline-pill ${currentState === 'DEEP_WORK_2' ? 'active' : ''}`}>4. Block B</div>
            <div className="wk-timeline-line"></div>
            <div className={`wk-timeline-pill ${currentState === 'SUBMISSION' ? 'active' : ''}`}>5. Submit</div>
          </div>
        </div>

        {/* Dynamic State Rendering */}
        
        {/* State 1: Morning Video */}
        {currentState === 'MORNING_VIDEO' && (
          <div className="wk-block-card">
            <div className="wk-video-placeholder">
              <PlayCircle size={64} style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <p style={{ fontWeight: 500, zIndex: 10 }}>Morning Kickoff Video (Placeholder)</p>
            </div>
            <div className="wk-block-content">
              <h2 className="wk-title" style={{ textAlign: 'left' }}>Welcome to Day 1</h2>
              <p className="wk-subtitle" style={{ textAlign: 'left' }}>Watch this 15-minute briefing to understand today's objectives before unlocking your deep work materials.</p>
              <button 
                onClick={() => handleStateChange('DEEP_WORK_1')}
                className="wk-btn-primary"
              >
                I have finished the video. Start Block A
              </button>
            </div>
          </div>
        )}

        {/* State 2: Deep Work 1 */}
        {currentState === 'DEEP_WORK_1' && (
          <div className="wk-block-card">
            <div className="wk-block-content">
              <h2 className="wk-title" style={{ textAlign: 'left' }}>Block A: Master Resume Drafting</h2>
              <p className="wk-subtitle" style={{ textAlign: 'left' }}>Spend the next 2 hours drafting your master resume using the STAR method.</p>
              
              <div className="wk-promo-box">
                <div>
                  <h3 style={{ fontWeight: 700, color: 'var(--wk-accent-hover)', margin: '0 0 0.25rem 0' }}>Premium Tool Access</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--wk-accent)', margin: 0 }}>Use your 1-time token to generate your resume.</p>
                </div>
                <button className="wk-btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  Launch AI Builder
                </button>
              </div>

              <button 
                onClick={() => handleStateChange('BREAK')}
                className="wk-btn-primary"
                style={{ backgroundColor: '#0f172a' }}
              >
                Complete Block A & Take Break
              </button>
            </div>
          </div>
        )}

        {/* State 3: Mandatory Break */}
        {currentState === 'BREAK' && (
          <div className="wk-break-screen">
            <Clock size={64} style={{ color: 'var(--wk-accent)', margin: '0 auto 1rem auto' }} />
            <h2 className="wk-title">Mandatory Screen Break</h2>
            <p className="wk-subtitle">Step away from your laptop. Your next block unlocks in:</p>
            <div className="wk-timer">
              {formatTime(breakTimeRemaining)}
            </div>
            <button 
              onClick={() => setBreakTimeRemaining(0)}
              className="wk-link-btn"
              style={{ fontSize: '0.75rem', textDecoration: 'underline' }}
            >
              [Dev Override: Skip Break]
            </button>
          </div>
        )}

        {/* State 4: Deep Work 2 */}
        {currentState === 'DEEP_WORK_2' && (
          <div className="wk-block-card">
            <div className="wk-block-content">
             <h2 className="wk-title" style={{ textAlign: 'left' }}>Block B: LinkedIn Optimization</h2>
             <p className="wk-subtitle" style={{ textAlign: 'left' }}>Update your LinkedIn based on your new master resume.</p>
             <button 
                onClick={() => handleStateChange('SUBMISSION')}
                className="wk-btn-primary"
              >
                Proceed to Daily Submission
              </button>
            </div>
          </div>
        )}

        {/* State 5: Submission Gateway */}
        {currentState === 'SUBMISSION' && (
          <div className="wk-block-card">
            <div className="wk-block-content">
             <div className="wk-header-icon" style={{ marginLeft: 0 }}>
               <UploadCloud size={24} />
             </div>
             <h2 className="wk-title" style={{ textAlign: 'left' }}>Submit Your Work</h2>
             <p className="wk-subtitle" style={{ textAlign: 'left' }}>Upload your finalized Master Resume (PDF) to complete Day 1.</p>
             
             <div className="wk-upload-box">
                <input type="file" style={{ display: 'none' }} id="file-upload" accept=".pdf" />
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                  <span style={{ padding: '0.5rem 1rem', border: '1px solid var(--wk-border)', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Choose File
                  </span>
                </label>
                <p style={{ fontSize: '0.75rem', color: 'var(--wk-text-secondary)', marginTop: '0.5rem' }}>PDF files only (Max 5MB)</p>
             </div>

             <button 
                onClick={() => alert("Submission Complete! You have finished Day 1.")}
                className="wk-btn-primary"
                style={{ backgroundColor: '#16a34a' }}
              >
                <CheckCircle2 size={20} /> Submit & Complete Day
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
