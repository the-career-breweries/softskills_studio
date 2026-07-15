"use client";

import { useState, useEffect } from 'react';
import { curriculumData, WeekData } from '@/data/curriculum';
import { Search, Loader2, Sparkles, Sun, Moon, BookOpen, GraduationCap, LayoutDashboard, ChevronRight } from 'lucide-react';
import SlideViewer from '@/components/SlideViewer';
import WelcomeScreen from '@/components/WelcomeScreen';
import './globals.css';

export default function CurriculumApp() {
  const [program, setProgram] = useState<'ug' | 'pg'>('ug');
  const streams = curriculumData[program].streams;
  
  const [selectedStream, setSelectedStream] = useState<string>(streams[0].streamName);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  
  // Semesters depend on the program
  const maxSemesters = program === 'ug' ? 6 : 4;
  const semesters = Array.from({ length: maxSemesters }, (_, i) => i + 1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Default to light theme for LMS style
    const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Real-time search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{title: string, link: string, snippet: string}[] | null>(null);

  // Active Lesson State
  const [activeLesson, setActiveLesson] = useState<WeekData | null>(null);

  // Keyboard Shortcuts (Fullscreen, Light/Dark mode, Navigation)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft') {
        // Return to welcome screen if on dashboard
        if (!showWelcome && !activeLesson) {
          setShowWelcome(true);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => console.error(err));
        } else {
          document.exitFullscreen().catch(err => console.error(err));
        }
      } else if (e.key === 'l' || e.key === 'L') {
        setTheme('light');
        localStorage.setItem('app-theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
      } else if (e.key === 'd' || e.key === 'D') {
        setTheme('dark');
        localStorage.setItem('app-theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [showWelcome, activeLesson]);

  // Handle program change
  const changeProgram = (newProgram: 'ug' | 'pg') => {
    setProgram(newProgram);
    setSelectedStream(curriculumData[newProgram].streams[0].streamName);
    setSelectedSemester(1);
    setSearchResults(null);
    setActiveLesson(null);
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeProgram(e.target.value as 'ug' | 'pg');
  };

  const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStream(e.target.value);
    setSearchResults(null);
    setActiveLesson(null);
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(Number(e.target.value));
    setSearchResults(null);
    setActiveLesson(null);
  };

  // Filter weeks
  const activeStreamData = streams.find(s => s.streamName === selectedStream);
  const activeWeeks = activeStreamData?.weeks.filter(w => w.semester === selectedSemester) || [];
  
  const isLevel4 = activeWeeks.some(w => w.level === 4);

  const fetchLatestPaths = async () => {
    setIsSearching(true);
    setSearchResults(null);
    try {
      const query = `latest career paths roles and certifications for ${selectedStream} 2024`;
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen program={program} onProgramChange={changeProgram} onNext={() => setShowWelcome(false)} />
      ) : (
        <div className="lms-container">
          {/* Top Navbar */}
          <header className="lms-topbar">
            <div className="lms-brand">
              <div className="lms-logo"><GraduationCap size={28} /></div>
              <h1>Soft Skills Studio</h1>
            </div>
            
            <div className="lms-topbar-actions">
              <div className="lms-program-toggle">
                <button 
                  className={`toggle-btn ${program === 'ug' ? 'active' : ''}`}
                  onClick={() => changeProgram('ug')}
                >
                  UG
                </button>
                <button 
                  className={`toggle-btn ${program === 'pg' ? 'active' : ''}`}
                  onClick={() => changeProgram('pg')}
                >
                  PG
                </button>
              </div>
              <button 
                className="theme-toggle-btn" 
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          <div className="lms-layout">
            {/* Sidebar Navigation */}
            <aside className="lms-sidebar">
              <div className="lms-sidebar-section">
                <h3 className="sidebar-heading">Course Selection</h3>
                <div className="sidebar-select-group">
                  <label>Specialization</label>
                  <select value={selectedStream} onChange={handleStreamChange}>
                    {streams.map(s => (
                      <option key={s.streamName} value={s.streamName}>{s.streamName}</option>
                    ))}
                  </select>
                </div>
                <div className="sidebar-select-group">
                  <label>Semester</label>
                  <select value={selectedSemester} onChange={handleSemesterChange}>
                    {semesters.map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lms-sidebar-section modules-section">
                <h3 className="sidebar-heading">Modules</h3>
                <ul className="module-list">
                  <li 
                    className={`module-item ${activeLesson === null ? 'active' : ''}`}
                    onClick={() => setActiveLesson(null)}
                  >
                    <LayoutDashboard size={18} />
                    <span>Semester Overview</span>
                  </li>
                  {activeWeeks.map((week) => (
                    <li 
                      key={week.week} 
                      className={`module-item ${activeLesson?.week === week.week ? 'active' : ''}`}
                      onClick={() => setActiveLesson(week)}
                    >
                      <BookOpen size={18} />
                      <div className="module-item-text">
                        <span className="module-week-label">Week {week.week}</span>
                        <span className="module-theme-label" title={week.theme}>{week.theme}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lms-main">
              <div className="lms-dashboard">
                <div className="dashboard-header">
                  <h2>{program.toUpperCase()} / {selectedStream} / Semester {selectedSemester}</h2>
                  <p>Select a module from the sidebar to begin learning.</p>
                </div>

                  {isLevel4 && (
                    <div className="realtime-card">
                      <div className="card-header">
                        <h3><Sparkles size={24} color="#6366f1"/> Live Career Intelligence</h3>
                        <button className="search-btn" onClick={fetchLatestPaths} disabled={isSearching}>
                          {isSearching ? <Loader2 className="spinner" size={18} /> : <Search size={18} />}
                          Check for latest updates
                        </button>
                      </div>
                      {searchResults && (
                        <div className="search-results">
                          {searchResults.length === 0 ? (
                            <p>No results found.</p>
                          ) : (
                            searchResults.map((res, i) => (
                              <div key={i} className="result-item">
                                <a href={res.link} target="_blank" rel="noreferrer"><h4>{res.title}</h4></a>
                                <p>{res.snippet}</p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                      {!searchResults && !isSearching && (
                        <p className="hint-text">Click the button to fetch real-time certifications and career paths from the web for {selectedStream}.</p>
                      )}
                    </div>
                  )}

                  <div className="modules-grid">
                    {activeWeeks.map((week) => (
                      <div key={week.week} className="module-card" onClick={() => setActiveLesson(week)}>
                        <div className="module-card-header">
                          <span className="week-badge">Week {week.week}</span>
                        </div>
                        <h3>{week.theme}</h3>
                        <p className="module-focus">{week.focus}</p>
                        <div className="module-card-footer">
                          <span>Begin Module</span>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </main>
          </div>

          {/* Presentation Slide Viewer Modal */}
          {activeLesson && (
            <SlideViewer
              weekData={activeLesson}
              program={program}
              stream={selectedStream}
              semester={selectedSemester}
              theme={theme}
              onClose={() => setActiveLesson(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
