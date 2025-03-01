
import React, { useEffect, useRef } from 'react';
import { useAssistant } from '@/context/AssistantContext';
import { Volume2, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentReaderProps {
  contentSelector?: string;
  autoRead?: boolean;
  title?: string;
}

const ContentReader: React.FC<ContentReaderProps> = ({
  contentSelector = '.content-readable',
  autoRead = false,
  title,
}) => {
  const { speak, stopSpeaking, isSpeaking } = useAssistant();
  const contentRef = useRef<HTMLDivElement>(null);
  const hasReadRef = useRef(false);

  // Function to read the content
  const readContent = () => {
    if (!contentRef.current) return;
    
    // Find all readable content elements
    const elements = document.querySelectorAll(contentSelector);
    
    if (elements.length === 0) {
      speak("No readable content found on this page.");
      return;
    }
    
    // Start with title if provided
    let textToRead = title ? `${title}. ` : '';
    
    // Concatenate all text content
    elements.forEach(element => {
      textToRead += element.textContent + '. ';
    });
    
    // Clean up the text a bit
    textToRead = textToRead
      .replace(/\s+/g, ' ')
      .replace(/\.\s+\./g, '.')
      .trim();
    
    speak(textToRead);
  };

  // Auto-read on mount if enabled
  useEffect(() => {
    if (autoRead && !hasReadRef.current) {
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        readContent();
        hasReadRef.current = true;
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [autoRead]);

  // Make readContent available to the global window object for easy access by voice commands
  useEffect(() => {
    // @ts-ignore - Adding a custom property to window
    window.readPageContent = readContent;
    
    return () => {
      // @ts-ignore - Cleanup
      delete window.readPageContent;
    };
  }, []);

  return (
    <div className="flex items-center gap-2 mb-4" ref={contentRef}>
      {isSpeaking ? (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm" 
            onClick={stopSpeaking}
            className="flex items-center gap-2 shadow-soft bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 dark:from-red-600 dark:to-orange-600"
            aria-label="Pause reading"
          >
            <Pause className="h-4 w-4" />
            <span>Pause</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="shadow-soft dark:bg-black/50 dark:text-white dark:border-white/10"
            aria-label="Skip forward"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline"
          size="sm" 
          onClick={readContent}
          className="flex items-center gap-2 shadow-soft bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:opacity-90 dark:from-blue-600 dark:to-purple-600"
          aria-label="Read content aloud"
        >
          <Volume2 className="h-4 w-4" />
          <span>Read Aloud</span>
        </Button>
      )}
    </div>
  );
};

export default ContentReader;
