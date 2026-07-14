"use client";

import { useState, useEffect } from 'react';
import { curriculumData, WeekData } from '@/data/curriculum';
import { Search, Loader2, Sparkles, Presentation } from 'lucide-react';
import SlideViewer from '@/components/SlideViewer';
import './globals.css';

export default function CurriculumApp() {
  const [program, setProgram] = useState<'ug' | 'pg'>('ug');
  const streams = curriculumData[program].streams;
  
  const [selectedStream, setSelectedStream] = useState<string>(streams[0].streamName);
  
  // Semesters depend on the program
  const maxSemesters = program === 'ug' ? 6 : 4;
  const semesters = Array.from({ length: maxSemesters }, (_, i) => i + 1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  
  // Real-time search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{title: string, link: string, snippet: string}[] | null>(null);

  // Presentation State
  const [presentingWeek, setPresentingWeek] = useState<WeekData | null>(null);

  // Fullscreen Keybinding (f/F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;

      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Could not enable fullscreen: ${err.message}`);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle program change
  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProgram = e.target.value as 'ug' | 'pg';
    setProgram(newProgram);
    setSelectedStream(curriculumData[newProgram].streams[0].streamName);
    setSelectedSemester(1);
    setSearchResults(null);
  };

  const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStream(e.target.value);
    setSearchResults(null);
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(Number(e.target.value));
    setSearchResults(null);
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
    <div className="app-container">
      <header className="topbar">
        <div className="brand">
          <div className="logo">🎓</div>
          <div>
            <h1>Soft Skills Studio</h1>
            <p>Interactive Curriculum Planner</p>
          </div>
        </div>
        <div className="controls">
          <select value={program} onChange={handleProgramChange}>
            <option value="ug">Undergraduate (UG)</option>
            <option value="pg">Postgraduate (PG)</option>
          </select>
          <select value={selectedStream} onChange={handleStreamChange}>
            {streams.map(s => (
              <option key={s.streamName} value={s.streamName}>{s.streamName}</option>
            ))}
          </select>
          <select value={selectedSemester} onChange={handleSemesterChange}>
            {semesters.map(s => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="content">
        <div className="overview">
          <h2>{program.toUpperCase()} - {selectedStream} - Semester {selectedSemester}</h2>
          <p>Displaying the curriculum for Level {activeWeeks[0]?.level || 1}.</p>
        </div>

        {isLevel4 && (
          <div className="realtime-card">
            <div className="card-header">
              <h3><Sparkles size={24} color="#c084fc"/> Live Career Intelligence</h3>
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

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Theme</th>
                <th>Core Focus</th>
                <th>Learning Task</th>
                <th>Evaluation Rubric</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeWeeks.map(w => (
                <tr key={w.week}>
                  <td className="hours">Week {w.week}</td>
                  <td><strong>{w.theme}</strong></td>
                  <td>{w.focus}</td>
                  <td>{w.task}</td>
                  <td>{w.rubric}</td>
                  <td>
                    <button 
                      className="present-btn" 
                      onClick={() => setPresentingWeek(w)}
                      title="Present Slides"
                    >
                      <Presentation size={20} />
                      Present
                    </button>
                  </td>
                </tr>
              ))}
              {activeWeeks.length === 0 && (
                <tr>
                  <td colSpan={6} style={{textAlign: 'center'}}>No curriculum mapped for this semester.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Fullscreen Slide Viewer Modal */}
      {presentingWeek && (
        <SlideViewer 
          weekData={presentingWeek} 
          program={program}
          stream={selectedStream}
          semester={selectedSemester}
          onClose={() => setPresentingWeek(null)} 
        />
      )}
    </div>
  );
}
