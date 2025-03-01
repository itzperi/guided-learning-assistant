
import { useEffect } from 'react';
import { useAssistant } from '@/context/AssistantContext';

interface ContentReaderProps {
  autoRead?: boolean;
  title?: string;
}

const ContentReader = ({ autoRead = false, title = '' }: ContentReaderProps) => {
  const { speak } = useAssistant();

  useEffect(() => {
    if (autoRead && title) {
      // Small delay to ensure page is loaded
      const timeoutId = setTimeout(() => {
        speak(`Welcome to ${title}`);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [autoRead, speak, title]);

  // This component doesn't render anything visible
  return null;
};

export default ContentReader;
