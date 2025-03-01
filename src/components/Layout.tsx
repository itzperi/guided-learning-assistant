
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic, MicOff, BookOpen, Atom, Beaker, Calculator, Computer, Leaf } from 'lucide-react';
import { useAssistant } from '@/context/AssistantContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { listening, toggleListening, processCommand } = useAssistant();
  const [recognitionActive, setRecognitionActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Set up speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setRecognitionActive(true);
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcript = result[0].transcript;
        setTranscript(transcript);
        
        if (result.isFinal) {
          processCommand(transcript);
          setTranscript('');
        }
      };
      
      recognition.onend = () => {
        setRecognitionActive(false);
        if (listening) {
          recognition.start();
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setRecognitionActive(false);
      };
      
      if (listening && !recognitionActive) {
        recognition.start();
      } else if (!listening && recognitionActive) {
        recognition.stop();
      }
      
      return () => {
        if (recognitionActive) {
          recognition.stop();
        }
      };
    }
  }, [listening, recognitionActive, processCommand]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 sticky top-0 z-10">
        <div className="container mx-auto py-3 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-lg">Learning Assistant</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/physics" className={`relative px-2 py-1 transition-all-200 ${isActive('/physics') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1.5">
                <Atom className="h-4 w-4" />
                Physics
              </span>
              {isActive('/physics') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
            </Link>
            
            <Link to="/chemistry" className={`relative px-2 py-1 transition-all-200 ${isActive('/chemistry') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1.5">
                <Beaker className="h-4 w-4" />
                Chemistry
              </span>
              {isActive('/chemistry') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
            </Link>
            
            <Link to="/math" className={`relative px-2 py-1 transition-all-200 ${isActive('/math') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1.5">
                <Calculator className="h-4 w-4" />
                Math
              </span>
              {isActive('/math') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
            </Link>
            
            <Link to="/computer-science" className={`relative px-2 py-1 transition-all-200 ${isActive('/computer-science') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1.5">
                <Computer className="h-4 w-4" />
                Computer Science
              </span>
              {isActive('/computer-science') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
            </Link>
            
            <Link to="/biology" className={`relative px-2 py-1 transition-all-200 ${isActive('/biology') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1.5">
                <Leaf className="h-4 w-4" />
                Biology
              </span>
              {isActive('/biology') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
            </Link>
          </nav>
          
          <button
            onClick={toggleListening}
            className={`relative p-2 rounded-full transition-all duration-300 ${
              listening ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
            aria-label={listening ? 'Stop listening' : 'Start listening'}
          >
            {listening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            {transcript && (
              <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-900 p-2 rounded shadow-lg text-sm whitespace-nowrap">
                {transcript}
              </div>
            )}
          </button>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors">
        {children}
      </main>
      
      <footer className="py-4 px-4 text-center text-sm text-muted-foreground border-t border-white/10 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30">
        <p>Learning Assistant &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
