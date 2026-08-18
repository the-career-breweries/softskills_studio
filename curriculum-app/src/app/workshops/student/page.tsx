"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Lock, LogIn, PlayCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import '../workshops.css';

export default function WorkshopsDashboard() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [batchData, setBatchData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      if (user) {
        setIsLoadingData(true);
        try {
          const studentDoc = await getDoc(doc(db, 'students', user.uid));
          if (studentDoc.exists()) {
            const sData = studentDoc.data();
            setStudentData(sData);
            if (sData.batchId) {
              const batchDoc = await getDoc(doc(db, 'batches', sData.batchId));
              if (batchDoc.exists()) {
                setBatchData({ id: batchDoc.id, ...batchDoc.data() });
              }
            }
          }
        } catch (err) {
          console.error("Error loading student data", err);
        } finally {
          setIsLoadingData(false);
        }
      }
    };
    loadData();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setLoginError(err.message || 'Failed to login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="wk-container wk-center-layout">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--wk-accent)' }} />
      </div>
    );
  }

  // If not logged in, show login screen
  if (!user) {
    return (
      <div className="wk-container wk-center-layout">
        <div className="wk-card">
          <div className="wk-header-icon">
            <Lock size={32} />
          </div>
          <h1 className="wk-title">Workshop Access</h1>
          <p className="wk-subtitle">Sign in to access your registered bootcamps.</p>
          
          <form onSubmit={handleLogin}>
            <div className="wk-form-group">
              <label className="wk-label">Email</label>
              <input
                type="email"
                required
                className="wk-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="wk-form-group">
              <label className="wk-label">Password</label>
              <input
                type="password"
                required
                className="wk-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{loginError}</p>}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="wk-btn-primary"
            >
              {isLoggingIn ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />}
              {isLoggingIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--wk-border)', paddingTop: '1.5rem' }}>
            <a href="/workshops/admin" className="wk-link-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <Lock size={16} />
              Admin Access
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingData) {
    return (
      <div className="wk-container wk-center-layout">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--wk-accent)' }} />
      </div>
    );
  }

  // Dashboard for logged-in user
  return (
    <div className="wk-container">
      <header className="wk-dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>My Workshops</h1>
          <p style={{ color: 'var(--wk-text-secondary)', fontSize: '0.875rem', margin: 0 }}>{user.email}</p>
        </div>
        <button 
          onClick={() => auth.signOut()}
          className="wk-link-btn"
        >
          Sign Out
        </button>
      </header>

      <main className="wk-dashboard-main">
        {studentData && batchData ? (
          <div className="wk-cohort-card">
            <div>
              <span className="wk-badge">Active Cohort</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{batchData.name || 'Bootcamp'}</h2>
              <p style={{ color: 'var(--wk-text-secondary)', margin: 0 }}>Batch ID: {batchData.id}</p>
              
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--wk-accent)' }}></div>
                Current Day: {studentData.progress?.day || 1}
              </div>
            </div>
            
            <a href={`/workshops/student/${batchData.id}/day/${studentData.progress?.day || 1}`} className="wk-btn-primary" style={{ textDecoration: 'none', width: 'auto' }}>
              <PlayCircle size={20} />
              Continue Workshop
            </a>
          </div>
        ) : (
          <div className="wk-cohort-card">
            <p>No active workshop batch found for your account.</p>
          </div>
        )}
      </main>
    </div>
  );
}
