
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AssistantContextType {
  listening: boolean;
  setListening: (listening: boolean) => void;
  toggleListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  processCommand: (command: string) => void;
  transcript: string;
  isSpeaking: boolean;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const navigate = useNavigate();

  // Toggle listening state
  const toggleListening = useCallback(() => {
    setListening(prev => !prev);
  }, []);

  // Text-to-speech functionality
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const newUtterance = new SpeechSynthesisUtterance(text);
      setUtterance(newUtterance);
      setIsSpeaking(true);
      
      newUtterance.onend = () => {
        setIsSpeaking(false);
        setUtterance(null);
      };
      
      newUtterance.onerror = () => {
        setIsSpeaking(false);
        setUtterance(null);
      };
      
      window.speechSynthesis.speak(newUtterance);
    }
  }, []);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setUtterance(null);
    }
  }, []);

  // Process voice commands
  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    console.log('Processing command:', lowerCommand);
    setTranscript(command);
    
    // Navigation commands with improved partial matching
    if (lowerCommand.includes('phy') || lowerCommand.includes('physics') || lowerCommand.includes('physical')) {
      navigate('/physics');
    } else if (lowerCommand.includes('chem') || lowerCommand.includes('chemistry') || lowerCommand.includes('chemical')) {
      navigate('/chemistry');
    } else if (lowerCommand.includes('math') || lowerCommand.includes('mathematics')) {
      navigate('/math');
    } else if (lowerCommand.includes('comp') || lowerCommand.includes('computer') || lowerCommand.includes('science')) {
      navigate('/computer-science');
    } else if (lowerCommand.includes('bio') || lowerCommand.includes('biology') || lowerCommand.includes('biological')) {
      navigate('/biology');
    } else if (lowerCommand.includes('home') || lowerCommand.includes('main') || lowerCommand.includes('index')) {
      navigate('/');
    }
    
    // Chapter navigation with improved partial matching
    if (lowerCommand.includes('chapter 1') || lowerCommand.includes('chapter one') || lowerCommand.includes('first chapter')) {
      // Determine which subject's chapter 1 to navigate to based on current path
      const currentPath = window.location.pathname;
      if (currentPath.includes('physics')) {
        navigate('/physics/chapter-1');
      } else if (currentPath.includes('chemistry')) {
        navigate('/chemistry/chapter-1');
      } else if (currentPath.includes('math')) {
        navigate('/math/chapter-1');
      } else if (currentPath.includes('computer-science')) {
        navigate('/computer-science/chapter-1');
      } else if (currentPath.includes('biology')) {
        navigate('/biology/chapter-1');
      } else {
        // Default to physics if not on a subject page
        navigate('/physics/chapter-1');
      }
    }
    
    // Reading commands
    if (lowerCommand.includes('read') || lowerCommand.includes('speak')) {
      // Try to use the global readContent function if it exists
      // @ts-ignore - window.readPageContent might not exist
      if (typeof window.readPageContent === 'function') {
        // @ts-ignore
        window.readPageContent();
      } else {
        // Fallback to manual reading
        const readableContent = document.querySelectorAll('.content-readable');
        let textToRead = '';
        readableContent.forEach(element => {
          textToRead += element.textContent + ' ';
        });
        
        if (textToRead.trim()) {
          speak(textToRead);
        } else {
          speak("No readable content found on this page.");
        }
      }
    }
    
    // Stop speaking command
    if (lowerCommand.includes('stop') || lowerCommand.includes('pause') || lowerCommand.includes('quiet')) {
      stopSpeaking();
    }
    
    // Clear transcript after processing
    setTimeout(() => {
      setTranscript('');
    }, 3000);
  }, [navigate, speak, stopSpeaking]);

  // Set up speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // Properly access the webkitSpeechRecognition constructor
      // @ts-ignore - We need to access the constructor directly from window
      const recognition = new window.webkitSpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
        
        if (result.isFinal) {
          processCommand(transcriptText);
        }
      };
      
      recognition.onend = () => {
        if (listening) {
          // Restart recognition if it ends but we're still supposed to be listening
          try {
            recognition.start();
          } catch (e) {
            console.error('Error restarting speech recognition', e);
          }
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (listening) {
          // Try to restart on error
          setTimeout(() => {
            try {
              recognition.start();
            } catch (e) {
              console.error('Failed to restart speech recognition', e);
            }
          }, 1000);
        }
      };
      
      if (listening) {
        try {
          recognition.start();
        } catch (e) {
          console.error('Error starting speech recognition', e);
        }
      }
      
      return () => {
        try {
          recognition.stop();
        } catch (e) {
          console.error('Error stopping speech recognition', e);
        }
      };
    }
  }, [listening, processCommand]);

  return (
    <AssistantContext.Provider
      value={{
        listening,
        setListening,
        toggleListening,
        speak,
        stopSpeaking,
        processCommand,
        transcript,
        isSpeaking
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};
