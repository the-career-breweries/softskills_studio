import React, { useState, useEffect } from 'react';
import { WeekData } from '@/data/curriculum';
import { X, ChevronLeft, ChevronRight, Loader2, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import PrintTemplates from './PrintTemplates';
import RandomTopicGenerator from './RandomTopicGenerator';
import confetti from 'canvas-confetti';

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
            fontSize: '26px',
            pieTitleTextColor: theme === 'dark' ? '#ffffff' : '#0f172a',
            pieSectionTextColor: theme === 'dark' ? '#ffffff' : '#0f172a',
            pieLegendTextColor: theme === 'dark' ? '#ffffff' : '#0f172a',
            pie1: theme === 'dark' ? '#818cf8' : '#6366f1',
            pie2: theme === 'dark' ? '#c084fc' : '#a855f7',
            pie3: theme === 'dark' ? '#38bdf8' : '#0ea5e9',
            pie4: theme === 'dark' ? '#34d399' : '#10b981',
            pie5: theme === 'dark' ? '#f472b6' : '#ec4899',
            pie6: theme === 'dark' ? '#fbbf24' : '#f59e0b'
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
  activeSection?: string;
  onClose: () => void;
}

export default function SlideViewer({ weekData, program, stream, semester, theme, activeSection, onClose }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [printTemplateId, setPrintTemplateId] = useState<string | null>(null);
  const [isPrintingSlide, setIsPrintingSlide] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (zoomLevel <= 1) setPan({ x: 0, y: 0 });
  }, [zoomLevel]);
  
  const hasMermaid = slides.length > 0 && slides[currentSlide]?.includes('```mermaid');
  const hasPrintSlideMarker = slides.length > 0 && slides[currentSlide]?.includes('<!-- PRINT_SLIDE -->');
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Reset scroll on slide change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [currentSlide]);

  // Check for print tag on slide change
  useEffect(() => {
    if (slides.length > 0) {
      const match = slides[currentSlide].match(/<!-- PRINT: (.*?) -->/);
      setPrintTemplateId(match ? match[1].trim() : null);
    }
  }, [currentSlide, slides]);

  // Save progress when slide changes
  useEffect(() => {
    if (weekData && slides.length > 0 && activeSection) {
      try {
        const data = JSON.parse(localStorage.getItem('tcb-progress') || '{}');
        const key = `${program}-${stream}-${semester}-${activeSection}-week${weekData.week}`;
        const existing = data[key] || {};
        
        // Only update if not already marked as completed
        if (!existing.completed) {
          data[key] = {
            ...existing,
            currentSlide,
            totalSlides: slides.length,
            completed: false
          };
          localStorage.setItem('tcb-progress', JSON.stringify(data));
        }
      } catch (e) {
        console.error("Error saving progress", e);
      }
    }
  }, [currentSlide, slides, weekData, program, stream, semester, activeSection]);

  const handleSessionComplete = () => {
    if (weekData && activeSection) {
      try {
        const data = JSON.parse(localStorage.getItem('tcb-progress') || '{}');
        const key = `${program}-${stream}-${semester}-${activeSection}-week${weekData.week}`;
        data[key] = {
          currentSlide,
          totalSlides: slides.length,
          completed: true
        };
        localStorage.setItem('tcb-progress', JSON.stringify(data));
      } catch (e) {
        console.error("Error completing session", e);
      }
      onClose(); // return to dashboard
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length > 0 ? slides.length - 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
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

  // Confetti effect for Orientation
  useEffect(() => {
    if (weekData?.label === 'Orientation' && currentSlide === 0 && !isLoading) {
      // Fire confetti bomb
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe', '#ffffff', '#fbbf24'],
        disableForReducedMotion: true
      });
    }
  }, [weekData, currentSlide, isLoading]);

  if (!weekData) return null;

  return (
    <div className={`slide-modal-overlay ${isPrintingSlide ? 'is-printing-slide' : ''}`}>
      <div className="slide-container">
        
        {/* Giant Background Watermark */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%) rotate(-20deg)', 
            zIndex: 0, 
            opacity: 0.05,
            textAlign: 'center',
            pointerEvents: 'none',
            color: 'var(--text-main)',
            width: '100%',
            userSelect: 'none'
          }} 
        >
          <div style={{ fontSize: '120px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>S D Sandarsh</div>
          <div style={{ fontSize: '40px', fontWeight: 600, marginTop: '20px', opacity: 0.8 }}>Employability & Softskills Trainer</div>
          <div style={{ fontSize: '40px', fontWeight: 600, opacity: 0.8 }}>Training & Placement Officer</div>
        </div>

        {/* Floating Top Right Controls */}
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 10, alignItems: 'center' }}>
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
              style={{ background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '50%' }}
            >
              <Printer size={32} />
            </button>
          )}
          <button className="nav-btn" onClick={onClose} aria-label="Close Presentation" style={{ background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '50%' }}>
            <X size={32} />
          </button>
        </div>

        {/* Floating Left Arrow */}
        {!isLoading && slides.length > 0 && currentSlide > 0 && (
          <button 
            onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
            className="nav-btn"
            style={{ position: 'absolute', top: '50%', left: '2rem', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '0.5rem' }}
          >
            <ChevronLeft size={48} />
          </button>
        )}

        {/* Floating Right Arrow */}
        {!isLoading && slides.length > 0 && currentSlide < slides.length - 1 && (
          <button 
            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
            className="nav-btn"
            style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '0.5rem' }}
          >
            <ChevronRight size={48} />
          </button>
        )}

        {isLoading ? (
          <div className="slide-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Loader2 size={64} className="spinner" color="#818cf8" />
             <p style={{marginTop: '1rem', color: '#94a3b8'}}>Loading lesson content...</p>
          </div>
        ) : (
          <div ref={scrollRef} className="slide-content markdown-slide">
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
                      },
                      a({ node, children, href, ...props }: any) {
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                            {children}
                          </a>
                        );
                      },
                      p({ node, children, ...props }: any) {
                        // If paragraph contains multiple images, display them as flex
                        const hasMultipleImages = node?.children?.filter((c: any) => c.tagName === 'img').length > 1;
                        if (hasMultipleImages) {
                          return <p style={{ display: 'flex', gap: '2%', justifyContent: 'center', alignItems: 'flex-start' }} {...props}>{children}</p>;
                        }
                        return <p {...props}>{children}</p>;
                      },
                      img({ node, alt, src, ...props }: any) {
                        return (
                          <img 
                            src={src} 
                            alt={alt} 
                            onClick={() => {
                              setZoomedImage(src);
                              setZoomLevel(1);
                            }}
                            style={{ cursor: 'zoom-in' }}
                            {...props} 
                          />
                        );
                      }
                    }}
                  >
                    {slides[currentSlide]
                      .replace(/<!-- PRINT: (.*?) -->/g, '')
                      .replace(/<!-- PRINT_SLIDE -->/g, '')
                      .replace(/<!-- TOPIC_GENERATOR -->/g, '')}
                  </ReactMarkdown>
                )}
                
                {/* Render Custom Components Based on Markdown Markers */}
                {slides.length > 0 && slides[currentSlide].includes('<!-- TOPIC_GENERATOR -->') && (
                  <RandomTopicGenerator />
                )}
                
                {activeSection && currentSlide === slides.length - 1 && (
                  <button onClick={handleSessionComplete} className="session-complete-btn" style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
                    Mark Session Complete
                  </button>
                )}
             </div>
          </div>
        )}
        
        {/* Hidden print templates container */}
        <div className="print-only">
          <PrintTemplates templateId={printTemplateId || ''} />
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '1rem', zIndex: 100000 }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.max(1, prev - 0.5)); }}
              style={{ background: '#333', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ZoomOut size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.min(4, prev + 0.5)); }}
              style={{ background: '#333', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ZoomIn size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); setZoomLevel(1); setPan({x:0, y:0}); }}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={24} />
            </button>
          </div>
          
          <div 
            style={{ 
              width: '100%', height: '100%', overflow: 'hidden', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'zoom-in')
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              setHasDragged(false);
              if (zoomLevel > 1) {
                setIsDragging(true);
                setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
              }
            }}
            onMouseMove={(e) => {
              if (isDragging && zoomLevel > 1) {
                setHasDragged(true);
                setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
              }
            }}
            onMouseUp={() => {
              setIsDragging(false);
              if (!hasDragged) {
                 if (zoomLevel < 3) setZoomLevel(prev => prev + 1);
                 else setZoomLevel(1);
              }
            }}
            onMouseLeave={() => setIsDragging(false)}
          >
            <img 
              src={zoomedImage} 
              alt="Zoomed" 
              style={{ 
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`, 
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                maxWidth: '90%', maxHeight: '90%',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

