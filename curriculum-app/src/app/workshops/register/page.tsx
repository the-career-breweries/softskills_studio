"use client";

import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, ChevronRight, BookOpen, Loader2, IndianRupee, ChevronDown, Phone, Mail, FileText, LayoutTemplate, MessageSquare, Briefcase } from 'lucide-react';
import Link from 'next/link';
import './register.css';

const WORKSHOPS = {
  3: {
    title: '3-Day Fast Track Workshop',
    price: 999,
    curriculum: [
      { day: 1, topics: 'Resume Building, LinkedIn Building, Job Search, Targetted Resume Revamp' },
      { day: 2, topics: 'Interview Preparation, Mock Interviews, Situation Handling Questions' },
      { day: 3, topics: 'Problem Solving, Guesstimation' }
    ]
  },
  5: {
    title: '5-Day Masterclass',
    price: 1999,
    curriculum: [
      { day: 1, topics: 'Self-Awareness' },
      { day: 2, topics: 'Resume Building, LinkedIn Building, Networking, Job Search, Targetted Resume Revamp' },
      { day: 3, topics: 'Elocution, Group Discussions' },
      { day: 4, topics: 'Interview Preparation, Mock Interviews, Situation Handling Questions' },
      { day: 5, topics: 'Problem Solving, Guesstimation' }
    ]
  },
  10: {
    title: '10-Day Comprehensive Bootcamp',
    price: 3999,
    curriculum: [
      { day: 1, topics: 'Pyschometric Assessment' },
      { day: 2, topics: 'Psychometric Report Analysis' },
      { day: 3, topics: 'Self-Awareness' },
      { day: 4, topics: 'Elocution' },
      { day: 5, topics: 'Resume Building, LinkedIn Building, Networking, Job Search, Targetted Resume Revamp' },
      { day: 6, topics: 'Group Discussions' },
      { day: 7, topics: 'Interview Preparation, Mock Interviews' },
      { day: 8, topics: 'Situation/Scenario Handling , Problem Solving, Guesstimation' },
      { day: 9, topics: 'Aptitude Training' },
      { day: 10, topics: 'Aptitude Test' }
    ]
  }
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workshopDays: '',
    utr: ''
  });
  
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Navigation Dropdown State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };
  
  const handleWorkshopSelect = (days: string) => {
    setFormData(prev => ({ ...prev, workshopDays: days }));
    setActiveDropdown(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const selectedWorkshop = formData.workshopDays ? WORKSHOPS[parseInt(formData.workshopDays) as keyof typeof WORKSHOPS] : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLockChoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.workshopDays) {
      alert("Please fill all fields before proceeding.");
      return;
    }
    setIsLocked(true);
  };

  const handlePaymentComplete = async () => {
    setIsSubmitting(true);
    try {
      const registrationsRef = collection(db, 'registrations');
      const docRef = await addDoc(registrationsRef, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        workshopDays: parseInt(formData.workshopDays, 10),
        utr: formData.utr,
        status: 'pending_verification',
        createdAt: serverTimestamp()
      });

      // Push to Google Sheets Pipeline
      try {
        const gasUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
        if (gasUrl) {
          await fetch(gasUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
              id: docRef.id,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              workshopDays: formData.workshopDays,
              utr: formData.utr,
              status: 'pending_verification'
            })
          });
        }
      } catch (err) {
        console.error("Failed to push to Google Sheets pipeline:", err);
        // We don't block the user if Sheets fail, as long as it hit Firestore.
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("There was an error processing your registration. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="success-title">Registration Received!</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Thank you, <strong>{formData.name}</strong>. We have received your payment confirmation. Our team will verify the transaction and send your login credentials to <strong>{formData.email}</strong> shortly.
          </p>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      {/* Header */}
      <header className="register-header">
        <Link href="/" className="brand-logo">
          The Career <span>Breweries</span>
        </Link>
        <nav className="nav-links" ref={navRef}>
          
          {/* Programs Dropdown */}
          <div className="nav-item">
            <button 
              className={`nav-btn ${activeDropdown === 'programs' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('programs')}
            >
              Workshops <ChevronDown size={16} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'programs' ? 'open' : ''}`}>
              <div className="dropdown-title">Our Workshops</div>
              <ul className="dropdown-list">
                <li onClick={() => handleWorkshopSelect('3')}><FileText size={16} /> 3-Day Fast Track Workshop</li>
                <li onClick={() => handleWorkshopSelect('5')}><FileText size={16} /> 5-Day Masterclass</li>
                <li onClick={() => handleWorkshopSelect('10')}><FileText size={16} /> 10-Day Comprehensive Bootcamp</li>
              </ul>
            </div>
          </div>

          {/* About Dropdown */}
          <div className="nav-item">
            <button 
              className={`nav-btn ${activeDropdown === 'about' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('about')}
            >
              About <ChevronDown size={16} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'about' ? 'open' : ''}`}>
              <div className="dropdown-title">The Career Breweries</div>
              <p className="dropdown-text">
                We are dedicated to bridging the gap between academia and industry. Our intensive programs build standout profiles, master interview techniques, and help you land your dream job with confidence.
              </p>
            </div>
          </div>

          {/* Products Dropdown */}
          <div className="nav-item">
            <button 
              className={`nav-btn ${activeDropdown === 'products' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('products')}
            >
              Products <ChevronDown size={16} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'products' ? 'open' : ''}`}>
              <div className="dropdown-title">Digital Products</div>
              <ul className="dropdown-list">
                <li><Briefcase size={16} className="text-blue-600" /> Application Brief</li>
                <li><LayoutTemplate size={16} className="text-blue-600" /> Resume Builder</li>
                <li><FileText size={16} className="text-blue-600" /> Resume Rewriter</li>
                <li><CheckCircle2 size={16} className="text-blue-600" /> Resume Audit</li>
                <li><MessageSquare size={16} className="text-blue-600" /> Interview Simulator</li>
                <li><LayoutTemplate size={16} className="text-blue-600" /> LinkedIn Optimizer</li>
              </ul>
            </div>
          </div>

          {/* Contact Dropdown */}
          <div className="nav-item">
            <button 
              className={`nav-btn ${activeDropdown === 'contact' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('contact')}
            >
              Contact <ChevronDown size={16} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'contact' ? 'open' : ''}`}>
              <div className="dropdown-title">Get in Touch</div>
              <ul className="dropdown-list">
                <li><Phone size={16} className="text-blue-600" /> <strong>+91 97437 11584</strong></li>
                <li><Mail size={16} className="text-blue-600" /> <strong>careerbreweries@gmail.com</strong></li>
              </ul>
            </div>
          </div>

        </nav>
      </header>

      {/* Typography Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Good careers aren't rushed.<br/>They're <span>brewed.</span>
        </h1>
        <p className="hero-subtitle">
          Join our intensive workshops to build a standout profile, master interviews, and land your dream job. Apply below to secure your spot in the next cohort.
        </p>
      </section>

      {/* Main Content */}
      <main className="main-container" ref={formRef} style={{ scrollMarginTop: '2rem' }}>
        
        {/* Left Column: Form */}
        <div className="glass-card">
          <h2 className="card-title">
            <span className="step-indicator">1.</span>
            Application Details
          </h2>
          
          <form onSubmit={handleLockChoice}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                disabled={isLocked}
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                disabled={isLocked}
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                required
                disabled={isLocked}
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Workshop</label>
              <select 
                name="workshopDays"
                required
                disabled={isLocked}
                value={formData.workshopDays}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="" disabled>Choose a program...</option>
                <option value="3">3-Day Fast Track Workshop</option>
                <option value="5">5-Day Masterclass</option>
                <option value="10">10-Day Comprehensive Bootcamp</option>
              </select>
            </div>

            {!isLocked && (
              <button type="submit" className="btn-primary" style={{ marginTop: '2rem' }}>
                Proceed to Payment <ChevronRight size={18} />
              </button>
            )}
          </form>
        </div>

        {/* Right Column: Dynamic Info & Payment */}
        <div>
          
          {/* Dynamic Curriculum Display */}
          <div className={`glass-card curriculum-view ${selectedWorkshop ? 'visible' : ''}`} style={{ display: selectedWorkshop ? 'block' : 'none', marginBottom: '2rem' }}>
            {selectedWorkshop && (
              <>
                <div className="curriculum-header">
                  <div>
                    <h3 className="curriculum-title">{selectedWorkshop.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.875rem' }}>Curriculum Outline</p>
                  </div>
                  <div className="price-tag">
                    <IndianRupee size={16} /> {selectedWorkshop.price}
                  </div>
                </div>
                
                <div className="timeline">
                  {selectedWorkshop.curriculum.map((day, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-node">
                        <div className="day-circle">{day.day}</div>
                        {idx !== selectedWorkshop.curriculum.length - 1 && (
                          <div className="timeline-line"></div>
                        )}
                      </div>
                      <div className="timeline-content">
                        <h4>Day {day.day}</h4>
                        <p>{day.topics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {!selectedWorkshop && !isLocked && (
            <div className="glass-card empty-state">
              <BookOpen size={48} />
              <p>Select a workshop to view curriculum details and proceed.</p>
            </div>
          )}

          {/* Payment Section (Revealed upon locking) */}
          {isLocked && (
            <div className="payment-section">
              <h2 className="card-title">
                <span className="step-indicator">2.</span>
                Complete Payment
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to complete your registration.
              </p>
              
              <div className="qr-container">
                <div className="qr-placeholder" style={{ opacity: 1, mixBlendMode: 'normal' }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=9743711584@ybl&pn=The Career Breweries&am=${selectedWorkshop?.price}&cu=INR`)}`} 
                    alt="UPI QR Code" 
                    style={{ opacity: 1, mixBlendMode: 'normal' }}
                  />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '0.5rem' }}>Amount to Pay</div>
                  <div style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-espresso)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                    <IndianRupee size={28} /> {selectedWorkshop?.price}
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Transaction Reference No. (UTR)</span>
                  <span style={{ color: 'var(--accent-copper)' }}>*Required</span>
                </label>
                <input 
                  type="text" 
                  name="utr"
                  required
                  value={formData.utr}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter 12-digit UTR from your UPI app"
                />
              </div>

              <div>
                <button 
                  onClick={handlePaymentComplete}
                  disabled={isSubmitting || formData.utr.length < 5}
                  className="btn-primary"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
                <button 
                  onClick={() => setIsLocked(false)}
                  disabled={isSubmitting}
                  className="btn-outline"
                >
                  Go Back & Edit Details
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
