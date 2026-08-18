"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Plus, PlayCircle, Settings2, Users, Download, Eye, Loader2, X, FileSpreadsheet, Mail, CheckCircle2 } from 'lucide-react';
import { createBatchAction, uploadStudentsCSVAction, CSVStudentData, getBatchesAction, getRegistrationsAction, approveRegistrationAction, getStudentsByBatchAction } from '@/app/actions/adminOps';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type TabType = 'batches' | 'builder' | 'roster' | 'registrations';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('batches');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchEmails, setNewBatchEmails] = useState('');
  const [newBatchDays, setNewBatchDays] = useState(5);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadMode, setUploadMode] = useState<'manual' | 'csv'>('manual');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [batches, setBatches] = useState<any[]>([]);
  const [isLoadingBatches, setIsLoadingBatches] = useState(true);

  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(true);
  const [isApproving, setIsApproving] = useState<string | null>(null);

  const [batchStudents, setBatchStudents] = useState<any[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isGeneratingPdfs, setIsGeneratingPdfs] = useState(false);

  // Email Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailBatchId, setEmailBatchId] = useState('');
  const [emailSubject, setEmailSubject] = useState('Your Workshop Credentials');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [isSendingEmails, setIsSendingEmails] = useState(false);

  useEffect(() => {
    fetchBatches();
    fetchRegistrations();
  }, []);

  const fetchBatches = async () => {
    setIsLoadingBatches(true);
    const res = await getBatchesAction();
    if (res.success && res.batches) {
      setBatches(res.batches);
    }
    setIsLoadingBatches(false);
  };

  const fetchRegistrations = async () => {
    setIsLoadingRegistrations(true);
    const res = await getRegistrationsAction();
    if (res.success && res.registrations) {
      setRegistrations(res.registrations);
    }
    setIsLoadingRegistrations(false);
  };

  const handleCreateBatch = async () => {
    if (!newBatchName || !newBatchEmails) return;
    setIsCreating(true);
    const emailsList = newBatchEmails.split('\n').map(e => e.trim()).filter(e => e);
    
    const result = await createBatchAction(newBatchName, emailsList, newBatchDays);
    
    if (result.success && result.students) {
      // Generate CSV
      let csvContent = "data:text/csv;charset=utf-8,Email,Password,Status\n";
      result.students.forEach((row: any) => {
        csvContent += `${row.email},${row.password},${row.success ? 'Success' : row.error}\n`;
      });
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${newBatchName.replace(/\s+/g, '_')}_credentials.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsCreateModalOpen(false);
      setNewBatchName('');
      setNewBatchEmails('');
      fetchBatches();
      alert('Batch created successfully! Credentials downloaded.');
    } else {
      alert('Error creating batch: ' + result.error);
    }
    setIsCreating(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!newBatchName) {
      alert("Please provide a Base Batch Name first (e.g. 'August Intake').");
      return;
    }

    setIsCreating(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const students: CSVStudentData[] = results.data.map((row: any) => ({
          name: row['Name'] || row['name'] || '',
          email: row['Email'] || row['email'] || row['Email ID'] || '',
          phone: row['Phone'] || row['phone'] || row['Phone Number'] || '',
          workshopDays: parseInt(row['Workshop Chosen'] || row['Workshop'] || row['Days'] || '5', 10)
        })).filter(s => s.email);

        const res = await uploadStudentsCSVAction(newBatchName, students);
        
        if (res.success && res.students) {
          // Generate CSV response
          let csvContent = "data:text/csv;charset=utf-8,Name,Email,Password,Batch Days,Status\n";
          res.students.forEach((row: any) => {
            csvContent += `${row.name},${row.email},${row.password},${row.days},${row.success ? 'Success' : row.error}\n`;
          });
          
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", `${newBatchName.replace(/\s+/g, '_')}_Master_Credentials.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setIsCreateModalOpen(false);
          setNewBatchName('');
          if (fileInputRef.current) fileInputRef.current.value = '';
          fetchBatches();
          alert('Batches created successfully! Master Credentials downloaded.');
        } else {
          alert('Error processing CSV: ' + res.error);
        }
        setIsCreating(false);
      },
      error: (error) => {
        console.error(error);
        alert('Error parsing CSV file');
        setIsCreating(false);
      }
    });
  };

  const openEmailModal = (batch: any) => {
    setEmailBatchId(batch.id);
    setEmailTemplate(batch.emailTemplate || '');
    setIsEmailModalOpen(true);
  };

  const handleSendEmails = async () => {
    setIsSendingEmails(true);
    try {
      const res = await fetch('/api/send-invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchId: emailBatchId, template: emailTemplate, subject: emailSubject })
      });
      const data = await res.json();
      if (data.success) {
        alert('Emails dispatched successfully!');
        setIsEmailModalOpen(false);
      } else {
        alert('Error sending emails: ' + data.error);
      }
    } catch (e: any) {
      alert('Error sending emails: ' + e.message);
    }
    setIsSendingEmails(false);
  };

  const handleApproveRegistration = async (id: string) => {
    if (!confirm('Are you sure you want to approve this registration? This will generate a user account, assign them to a Master Batch, and send them an email instantly.')) return;
    setIsApproving(id);
    const res = await approveRegistrationAction(id);
    if (res.success) {
      alert('Student approved and enrolled successfully!');
      fetchRegistrations();
    } else {
      alert('Error: ' + res.error);
    }
    setIsApproving(null);
  };

  const loadBatchStudents = async (batchId: string) => {
    setIsLoadingStudents(true);
    const res = await getStudentsByBatchAction(batchId);
    if (res.success && res.students) {
      setBatchStudents(res.students);
    }
    setIsLoadingStudents(false);
  };

  useEffect(() => {
    if (activeTab === 'roster' && selectedBatch) {
      loadBatchStudents(selectedBatch);
    }
  }, [activeTab, selectedBatch]);

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleGenerateReports = async () => {
    if (selectedStudents.length === 0) return;
    setIsGeneratingPdfs(true);
    
    try {
      const studentsToReport = batchStudents.filter(s => selectedStudents.includes(s.id));
      
      for (const student of studentsToReport) {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(44, 40, 38); // Espresso
        doc.text('The Career Breweries', 14, 20);
        
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text('Student Progress Report', 14, 30);
        
        // Student Info
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Name: ${student.name || 'Student'}`, 14, 45);
        doc.text(`Email: ${student.email}`, 14, 52);
        doc.text(`Phone: ${student.phone || 'N/A'}`, 14, 59);
        
        // Progress Info
        doc.setFontSize(14);
        doc.setTextColor(44, 40, 38);
        doc.text('Current Status', 14, 75);
        
        const progress = student.progress || { day: 1, state: 'NOT_STARTED' };
        
        autoTable(doc, {
          startY: 80,
          head: [['Metric', 'Value']],
          body: [
            ['Current Day', `Day ${progress.day}`],
            ['Current State', progress.state],
            ['Enrolled On', new Date(student.createdAt).toLocaleDateString()]
          ],
          theme: 'grid',
          headStyles: { fillColor: [44, 40, 38] }
        });
        
        // Save PDF
        doc.save(`${student.name || 'Student'}_Progress_Report.pdf`);
        
        // Small delay so browser handles multiple downloads smoothly
        await new Promise(r => setTimeout(r, 500));
      }
      
      setSelectedStudents([]);
      alert('Reports generated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error generating reports');
    }
    
    setIsGeneratingPdfs(false);
  };

  const viewBatch = (batchId: string) => {
    setSelectedBatch(batchId);
    setActiveTab('builder');
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          {activeTab === 'batches' && 'Workshop Batches'}
          {activeTab === 'registrations' && 'Public Registrations'}
          {activeTab === 'builder' && 'Workshop Builder'}
          {activeTab === 'roster' && 'Student Roster'}
        </h1>
        
        {(activeTab === 'batches' || activeTab === 'registrations') && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="admin-btn" 
              style={{ backgroundColor: activeTab === 'batches' ? '#e2e8f0' : 'transparent', border: '1px solid #cbd5e1' }}
              onClick={() => setActiveTab('batches')}
            >
              Batches
            </button>
            <button 
              className="admin-btn" 
              style={{ backgroundColor: activeTab === 'registrations' ? '#e2e8f0' : 'transparent', border: '1px solid #cbd5e1' }}
              onClick={() => setActiveTab('registrations')}
            >
              Public Registrations
            </button>
            <button 
              className="admin-btn admin-btn-primary"
              onClick={() => setIsCreateModalOpen(true)}
              style={{ marginLeft: '1rem' }}
            >
              <Plus size={18} />
              Create New Batch
            </button>
          </div>
        )}
        {(activeTab === 'builder' || activeTab === 'roster') && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="admin-btn" 
              style={{ backgroundColor: activeTab === 'builder' ? '#e2e8f0' : 'transparent', border: '1px solid #cbd5e1' }}
              onClick={() => setActiveTab('builder')}
            >
              <Settings2 size={18} /> Builder
            </button>
            <button 
              className="admin-btn" 
              style={{ backgroundColor: activeTab === 'roster' ? '#e2e8f0' : 'transparent', border: '1px solid #cbd5e1' }}
              onClick={() => setActiveTab('roster')}
            >
              <Users size={18} /> Roster & Submissions
            </button>
            <button 
              className="admin-btn" 
              style={{ border: '1px solid #cbd5e1' }}
              onClick={() => { setSelectedBatch(null); setActiveTab('batches'); }}
            >
              Back to Batches
            </button>
          </div>
        )}
      </div>

      {/* View: Batch Manager */}
      {activeTab === 'batches' && (
        <div className="admin-table-container admin-card" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Enrolled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingBatches ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}><Loader2 className="animate-spin" /> Loading batches...</td></tr>
              ) : batches.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No batches created yet.</td></tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{batch.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{batch.id}</div>
                    </td>
                    <td><span className="admin-badge badge-green">Active</span></td>
                    <td>{batch.totalDays || 5}-Day Workshop</td>
                    <td>{batch.studentCount || 0} Students</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => viewBatch(batch.id)} className="admin-btn" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', border: '1px solid #cbd5e1' }}>
                          Manage
                        </button>
                        <button onClick={() => openEmailModal(batch)} className="admin-btn" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none' }}>
                          <Mail size={14} style={{ marginRight: '0.25rem' }} /> Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View: Public Registrations */}
      {activeTab === 'registrations' && (
        <div className="admin-table-container admin-card" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Student Details</th>
                <th>Workshop</th>
                <th>Status</th>
                <th>Payment UTR</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingRegistrations ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}><Loader2 className="animate-spin" /> Loading registrations...</td></tr>
              ) : registrations.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No public registrations yet.</td></tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <div style={{ fontSize: '0.875rem' }}>{new Date(reg.createdAt).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{new Date(reg.createdAt).toLocaleTimeString()}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{reg.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{reg.email}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{reg.phone}</div>
                    </td>
                    <td>{reg.workshopDays}-Day Workshop</td>
                    <td>
                      {reg.status === 'approved' ? (
                        <span className="admin-badge badge-green">Approved</span>
                      ) : reg.status === 'rejected' ? (
                        <span className="admin-badge badge-gray">Rejected</span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <span className="admin-badge badge-blue" style={{ backgroundColor: '#fef08a', color: '#854d0e', width: 'fit-content' }}>Pending Verification</span>
                          <button 
                            onClick={() => handleApproveRegistration(reg.id)}
                            disabled={isApproving === reg.id}
                            className="admin-btn admin-btn-primary" 
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'fit-content' }}
                          >
                            {isApproving === reg.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                            Approve & Enroll
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <code style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.25rem' }}>
                        {reg.utr || 'N/A'}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View: Workshop Builder */}
      {activeTab === 'builder' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          <div className="admin-card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Day 1 Configuration</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Builder Block */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PlayCircle size={18} style={{ color: '#3b82f6' }} />
                    Module 1: Morning Briefing Video
                  </div>
                  <span className="admin-badge badge-blue">Video Block</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>YouTube Unlisted URL</label>
                  <input type="text" defaultValue="https://youtu.be/placeholder_id_1" style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1', width: '100%' }} />
                </div>
              </div>

              {/* Builder Block */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Settings2 size={18} style={{ color: '#8b5cf6' }} />
                    Module 2: Deep Work A
                  </div>
                  <span className="admin-badge" style={{ backgroundColor: '#ede9fe', color: '#8b5cf6' }}>Activity Block</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Activity Description</label>
                  <textarea rows={3} defaultValue="Spend the next 2 hours drafting your master resume..." style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1', width: '100%' }} />
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input type="checkbox" id="ai-tool" defaultChecked />
                    <label htmlFor="ai-tool" style={{ fontSize: '0.875rem' }}>Enable AI Resume Builder Token</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* View: Student Roster & Submissions */}
      {activeTab === 'roster' && (
        <div className="admin-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Enrolled Students</h2>
            {selectedStudents.length > 0 && (
              <button 
                onClick={handleGenerateReports}
                disabled={isGeneratingPdfs}
                className="admin-btn admin-btn-primary"
              >
                {isGeneratingPdfs ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                Generate Progress Reports ({selectedStudents.length})
              </button>
            )}
          </div>

          <div className="admin-table-container" style={{ padding: 0, border: '1px solid #e2e8f0' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents(batchStudents.map(s => s.id));
                        } else {
                          setSelectedStudents([]);
                        }
                      }}
                      checked={batchStudents.length > 0 && selectedStudents.length === batchStudents.length}
                    />
                  </th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Current Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingStudents ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}><Loader2 className="animate-spin" /> Loading students...</td></tr>
                ) : batchStudents.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No students enrolled in this batch.</td></tr>
                ) : (
                  batchStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                        />
                      </td>
                      <td><div style={{ fontWeight: 500 }}>{student.name || 'N/A'}</div></td>
                      <td>{student.email}</td>
                      <td>
                        <span className="admin-badge badge-blue">Day {student.progress?.day || 1}: {student.progress?.state || 'Not Started'}</span>
                      </td>
                      <td>
                        <button 
                          className="admin-btn" 
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid #cbd5e1' }}
                          onClick={() => {
                            setSelectedStudents([student.id]);
                            setTimeout(() => handleGenerateReports(), 100);
                          }}
                        >
                          <Download size={14} /> PDF Report
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Batch Modal */}
      {isCreateModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px', margin: '1rem', position: 'relative' }}>
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Create New Cohort Batch</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem' }}>
                <button 
                  onClick={() => setUploadMode('manual')}
                  style={{ background: 'none', border: 'none', fontWeight: uploadMode === 'manual' ? 600 : 400, color: uploadMode === 'manual' ? '#0f172a' : '#64748b', cursor: 'pointer', padding: '0 0.5rem' }}
                >
                  Manual Entry
                </button>
                <button 
                  onClick={() => setUploadMode('csv')}
                  style={{ background: 'none', border: 'none', fontWeight: uploadMode === 'csv' ? 600 : 400, color: uploadMode === 'csv' ? '#0f172a' : '#64748b', cursor: 'pointer', padding: '0 0.5rem' }}
                >
                  CSV Upload
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Batch Name / Prefix</label>
                <input 
                  type="text" 
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="e.g., September Intake"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                />
              </div>

              {uploadMode === 'manual' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Workshop Length (Days)</label>
                    <select 
                      value={newBatchDays}
                      onChange={(e) => setNewBatchDays(parseInt(e.target.value, 10))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                    >
                      <option value={3}>3-Day Workshop</option>
                      <option value={5}>5-Day Workshop</option>
                      <option value={10}>10-Day Workshop</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Student Emails (one per line)</label>
                    <textarea 
                      rows={6}
                      value={newBatchEmails}
                      onChange={(e) => setNewBatchEmails(e.target.value)}
                      placeholder="student1@example.com\nstudent2@example.com"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                  </div>
                  <button 
                    onClick={handleCreateBatch}
                    disabled={isCreating || !newBatchName || !newBatchEmails}
                    className="admin-btn admin-btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: (isCreating || !newBatchName || !newBatchEmails) ? 0.7 : 1 }}
                  >
                    {isCreating ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                    {isCreating ? 'Generating Accounts...' : 'Generate Batch & Download CSV'}
                  </button>
                </>
              )}

              {uploadMode === 'csv' && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ border: '2px dashed #cbd5e1', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
                    <FileSpreadsheet size={32} style={{ color: '#94a3b8', margin: '0 auto 1rem auto' }} />
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                      Upload CSV file with columns: <strong>Name, Email, Phone, Workshop Chosen</strong> (Days).
                    </p>
                    <input 
                      type="file" 
                      accept=".csv, .xlsx" 
                      id="csv-upload" 
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      disabled={isCreating}
                    />
                    <label 
                      htmlFor="csv-upload"
                      className="admin-btn admin-btn-primary"
                      style={{ display: 'inline-flex', cursor: isCreating ? 'not-allowed' : 'pointer', opacity: isCreating ? 0.7 : 1 }}
                    >
                      {isCreating ? <Loader2 size={18} className="animate-spin" /> : 'Select CSV File'}
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Email Dispatch Modal */}
      {isEmailModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '600px', margin: '1rem', position: 'relative' }}>
            <button 
              onClick={() => setIsEmailModalOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={24} style={{ color: '#3b82f6' }} /> Dispatch Credentials
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                This will send an email to all students in this batch. You can use placeholders like <strong>{`{{email}}`}</strong>, <strong>{`{{password}}`}</strong>, and <strong>{`{{name}}`}</strong>.
              </p>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Subject Line</label>
                <input 
                  type="text" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Email Body</label>
                <textarea 
                  rows={10}
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem' }}
                />
              </div>

              <button 
                onClick={handleSendEmails}
                disabled={isSendingEmails}
                className="admin-btn admin-btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: isSendingEmails ? 0.7 : 1 }}
              >
                {isSendingEmails ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
                {isSendingEmails ? 'Dispatching...' : 'Confirm & Send to All Students'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
