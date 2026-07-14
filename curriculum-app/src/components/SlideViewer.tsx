import React, { useState, useEffect } from 'react';
import { WeekData } from '@/data/curriculum';
import { X, ChevronLeft, ChevronRight, Loader2, Printer } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import PrintTemplates from './PrintTemplates';



const Mermaid = ({ chart, theme }: { chart: string, theme: 'light' | 'dark' }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      document.fonts.ready.then(() => {
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: 'base',
          themeVariables: {
            fontFamily: '"Outfit", sans-serif',
            primaryColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.7)',
            primaryTextColor: theme === 'dark' ? '#ffffff' : '#0f172a',
            primaryBorderColor: theme === 'dark' ? '#a5b4fc' : '#4f46e5',
            lineColor: theme === 'dark' ? '#a5b4fc' : '#4f46e5',
            secondaryColor: theme === 'dark' ? '#d8b4fe' : '#9333ea',
            tertiaryColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
            fontSize: '26px'
          },
          fontFamily: '"Outfit", sans-serif',
          flowchart: {
            htmlLabels: true
          }
        });
        mermaid.render(`mermaid-${Math.random().toString(36).substring(7)}`, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        });
      });
    }
  }, [chart, theme]);

  return <div ref={ref} className="mermaid-diagram" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', width: '100%' }} />;
};

interface SlideViewerProps {
  weekData: WeekData | null;
  program: string;
  stream: string;
  semester: number;
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function SlideViewer({ weekData, program, stream, semester, theme, onClose }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [printTemplateId, setPrintTemplateId] = useState<string | null>(null);
  const [isPrintingSlide, setIsPrintingSlide] = useState(false);
  const hasMermaid = slides.length > 0 && slides[currentSlide]?.includes('```mermaid');
  const hasPrintSlideMarker = slides.length > 0 && slides[currentSlide]?.includes('<!-- PRINT_SLIDE -->');

  // Check for print tag on slide change
  useEffect(() => {
    if (slides.length > 0) {
      const match = slides[currentSlide].match(/<!-- PRINT: (.*?) -->/);
      setPrintTemplateId(match ? match[1].trim() : null);
    }
  }, [currentSlide, slides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length > 0 ? slides.length - 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, slides.length]);

  // Fetch Markdown content
  useEffect(() => {
    async function fetchLesson() {
      if (!weekData) return;
      
      setIsLoading(true);
      setError(null);
      setCurrentSlide(0);

      try {
        const url = `/api/lesson?program=${program}&stream=${encodeURIComponent(stream)}&semester=${semester}&week=${weekData.week}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch lesson');
        }

        // Split markdown by '---' on its own line
        const contentBlocks = data.content.split(/(?:\r?\n|^)---(?:\r?\n|$)/).map((block: string) => block.trim()).filter(Boolean);
        setSlides(contentBlocks);
      } catch (err: any) {
        // Fallback to basic curriculum metadata if markdown file doesn't exist
        const fallbackSlides = [
          `# Week ${weekData.week}\n## ${weekData.theme}`,
          `# Core Focus\n${weekData.focus}`,
          `# Learning Task\n${weekData.task}`,
          `# Evaluation Rubric\n${weekData.rubric}`
        ];
        setSlides(fallbackSlides);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLesson();
  }, [weekData, program, stream, semester]);

  if (!weekData) return null;

  return (
    <div className={`slide-modal-overlay ${isPrintingSlide ? 'is-printing-slide' : ''}`}>
      <div className="slide-container">
        <button className="close-btn" onClick={onClose} aria-label="Close Presentation">
          <X size={40} />
        </button>

        {isLoading ? (
          <div className="slide-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Loader2 size={64} className="spinner" color="#818cf8" />
             <p style={{marginTop: '1rem', color: '#94a3b8'}}>Loading lesson content...</p>
          </div>
        ) : (
          <div className="slide-content markdown-slide">
             {error && currentSlide === 0 && (
               <div style={{
                 background: 'rgba(239, 68, 68, 0.1)', 
                 border: '1px solid #ef4444', 
                 padding: '1rem', 
                 borderRadius: '8px',
                 marginBottom: '2rem',
                 color: '#fca5a5',
                 fontSize: '1rem'
               }}>
                 ⚠️ {error}. Displaying fallback curriculum data.
               </div>
             )}
             <div className="slide-body">
                {slides.length > 0 && (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match && match[1] === 'mermaid') {
                          return (
                            <>
                              <div className="mermaid-screen">
                                <Mermaid chart={String(children).replace(/\n$/, '')} theme={theme} />
                              </div>
                              <div className="mermaid-print">
                                <Mermaid chart={String(children).replace(/\n$/, '')} theme="light" />
                              </div>
                            </>
                          );
                        }
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {slides[currentSlide].replace(/<!-- PRINT: (.*?) -->/g, '').replace(/<!-- PRINT_SLIDE -->/g, '')}
                  </ReactMarkdown>
                )}
             </div>
          </div>
        )}

        {!isLoading && slides.length > 0 && (
          <div className="slide-controls">
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="nav-btn"
            >
              <ChevronLeft size={48} />
            </button>
            
            <div className="slide-indicators">
              {slides.map((_, i) => (
                <div key={i} className={`indicator ${i === currentSlide ? 'active' : ''}`} />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {(printTemplateId || hasMermaid || hasPrintSlideMarker) && (
                <button 
                  onClick={() => {
                    if ((hasMermaid || hasPrintSlideMarker) && !printTemplateId) {
                      setIsPrintingSlide(true);
                      setTimeout(() => {
                        window.print();
                        setIsPrintingSlide(false);
                      }, 100);
                    } else {
                      window.print();
                    }
                  }}
                  className="nav-btn print-btn-trigger"
                  title="Print Slide or Worksheet"
                >
                  <Printer size={32} />
                </button>
              )}
              <button 
                onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
                disabled={currentSlide === slides.length - 1}
                className="nav-btn"
              >
                <ChevronRight size={48} />
              </button>
            </div>
          </div>
        )}
        
        {/* Hidden print templates container */}
        <div className="print-only">
          <PrintTemplates templateId={printTemplateId || ''} />
        </div>
      </div>
    </div>
  );
}

