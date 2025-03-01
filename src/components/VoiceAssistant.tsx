
import React, { useEffect } from 'react';
import { useAssistant } from '@/context/AssistantContext';
import { Mic, MicOff, Volume2, VolumeX, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

type VoiceAssistantProps = {
  className?: string;
};

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ className = '' }) => {
  const { listening: isListening, toggleListening, speak, stopSpeaking, transcript: recognized, isSpeaking } = useAssistant();
  
  // For the status message
  const assistantMessage = isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Ready";

  // Automatically start listening when component mounts
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isListening) {
        toggleListening();
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  // Intentionally not including toggleListening and isListening as dependencies
  // We want this to run only once when the component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${className}`}>
      {/* Assistant status message */}
      <div className="glass px-4 py-3 rounded-full shadow-soft animate-fade-in max-w-xs backdrop-blur-xl dark:bg-black/50 dark:text-white dark:border-purple-500/30 border border-white/50">
        <span className="text-sm font-medium flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary animate-pulse" />
          {assistantMessage || "Assistant ready"}
        </span>
      </div>
      
      {/* Recognized speech */}
      {recognized && isListening && (
        <div className="glass px-4 py-2 rounded-full shadow-soft animate-fade-in max-w-xs backdrop-blur-xl dark:bg-black/50 dark:text-white dark:border-purple-500/30 border border-white/50">
          <p className="text-sm italic opacity-75">{recognized}</p>
        </div>
      )}
      
      {/* Voice waves animation when speaking */}
      {isSpeaking && (
        <div className="glass px-4 py-3 rounded-full shadow-soft animate-fade-in flex items-center justify-center backdrop-blur-xl dark:bg-black/50 dark:text-white dark:border-purple-500/30 border border-white/50">
          <div className="flex items-end h-6 px-2">
            <div className="voice-wave dark:bg-purple-400"></div>
            <div className="voice-wave dark:bg-purple-400"></div>
            <div className="voice-wave dark:bg-purple-400"></div>
            <div className="voice-wave dark:bg-purple-400"></div>
            <div className="voice-wave dark:bg-purple-400"></div>
          </div>
        </div>
      )}
      
      {/* Control buttons */}
      <div className="flex items-center gap-3">
        {isSpeaking && (
          <Button
            variant="outline"
            size="icon"
            onClick={stopSpeaking}
            className="glass h-12 w-12 rounded-full shadow-soft transition-all-200 hover:scale-105 dark:bg-black/50 dark:text-white dark:border-purple-500/30 border border-white/50"
            aria-label="Stop speaking"
          >
            <VolumeX className="h-5 w-5" />
          </Button>
        )}
        
        <Button
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={toggleListening}
          className={`glass h-14 w-14 rounded-full shadow-soft transition-all-200 hover:scale-105 backdrop-blur-xl dark:border-purple-500/30 border border-white/50 ${
            isListening ? 'bg-primary text-primary-foreground assistant-pulse dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600' : 'dark:bg-black/50 dark:text-white'
          }`}
          aria-label={isListening ? "Turn off voice commands" : "Turn on voice commands"}
        >
          {isListening ? (
            <Mic className="h-6 w-6" />
          ) : (
            <MicOff className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoiceAssistant;
