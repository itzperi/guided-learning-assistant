
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AssistantContextType {
  listening: boolean;
  setListening: (listening: boolean) => void;
  toggleListening: () => void;
  speak: (text: string) => void;
  processCommand: (command: string) => void;
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
  const navigate = useNavigate();

  // Toggle listening state
  const toggleListening = useCallback(() => {
    setListening(prev => !prev);
  }, []);

  // Text-to-speech functionality
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Process voice commands
  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    console.log('Processing command:', lowerCommand);
    
    // Navigation commands
    if (lowerCommand.includes('physics')) {
      navigate('/physics');
    } else if (lowerCommand.includes('chemistry')) {
      navigate('/chemistry');
    } else if (lowerCommand.includes('math')) {
      navigate('/math');
    } else if (lowerCommand.includes('computer') || lowerCommand.includes('science')) {
      navigate('/computer-science');
    } else if (lowerCommand.includes('biology')) {
      navigate('/biology');
    }
    
    // Chapter navigation
    if (lowerCommand.includes('chapter 1')) {
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
    if (lowerCommand.includes('read')) {
      const readableContent = document.querySelectorAll('.content-readable');
      let textToRead = '';
      readableContent.forEach(element => {
        textToRead += element.textContent + ' ';
      });
      speak(textToRead);
    }
  }, [navigate, speak]);

  return (
    <AssistantContext.Provider
      value={{
        listening,
        setListening,
        toggleListening,
        speak,
        processCommand
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};
