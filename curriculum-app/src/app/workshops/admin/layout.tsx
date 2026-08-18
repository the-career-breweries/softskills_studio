"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, CodeSquare, Lock } from 'lucide-react';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [passkey, setPasskey] = useState<string>('');

  if (!isUnlocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '3rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}>
          <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Admin Access Required</h2>
          <input 
            type="password" 
            value={passkey} 
            onChange={(e) => {
              setPasskey(e.target.value);
              if (e.target.value === '2525') setIsUnlocked(true);
            }} 
            autoFocus
            style={{ 
              padding: '1rem', 
              fontSize: '1.5rem', 
              textAlign: 'center', 
              letterSpacing: '0.5em', 
              borderRadius: '0.5rem', 
              border: '2px solid #334155', 
              backgroundColor: '#0f172a',
              color: 'white',
              width: '100%',
              maxWidth: '300px',
              outline: 'none'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <CodeSquare size={24} />
          <span>Admin Portal</span>
        </div>
        
        <nav className="admin-nav">
          <a href="/workshops/admin" className="admin-nav-item active">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="/workshops/admin/batches" className="admin-nav-item">
            <Users size={20} />
            Batches & Students
          </a>
          <a href="/workshops/admin/settings" className="admin-nav-item">
            <Settings size={20} />
            Settings
          </a>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <a href="/" className="admin-nav-item">
            <LogOut size={20} />
            Exit Admin
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Admin User</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              A
            </div>
          </div>
        </header>
        
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
