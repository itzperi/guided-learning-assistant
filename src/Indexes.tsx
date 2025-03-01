
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Atom, 
  Beaker, 
  Calculator, 
  Computer, 
  Leaf, 
  Mic, 
  ArrowRight
} from 'lucide-react';
import Layout from '@/components/Layout';
import ContentReader from '@/components/ContentReader';
import { useAssistant } from '@/context/AssistantContext';

const Indexr = () => {
  const { speak } = useAssistant();
  
  useEffect(() => {
    // Introduce the learning assistant when the page loads
    const timeoutId = setTimeout(() => {
      speak("Welcome to the Learning Assistant. You can navigate through different subjects by clicking on the cards or using voice commands like 'Open Physics' or 'Go to Chemistry'");
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [speak]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ContentReader autoRead={true} title="Learning Assistant" />
        
        <section className="mb-12 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            Interactive Learning
          </span>
          <h1 className="text-5xl font-bold tracking-tight mt-2 mb-4">
            Welcome to Your Learning Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore interactive lessons in multiple subjects with voice-guided navigation and content reading.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Try saying "Open Physics" or "Go to Chemistry"
            </p>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link to="/physics" className="glass rounded-lg p-6 shadow-soft transition-all-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-lg border border-white/10 dark:border-gray-700/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-soft">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Physics</h2>
            <p className="text-muted-foreground">Explore mechanics, thermodynamics, and more with interactive lessons.</p>
          </Link>
          
          <Link to="/chemistry" className="glass rounded-lg p-6 shadow-soft transition-all-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-lg border border-white/10 dark:border-gray-700/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-soft">
                <Beaker className="h-6 w-6 text-white" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Chemistry</h2>
            <p className="text-muted-foreground">Learn about atomic structure, chemical bonding, and reactions.</p>
          </Link>
          
          <Link to="/math" className="glass rounded-lg p-6 shadow-soft transition-all-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-lg border border-white/10 dark:border-gray-700/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-soft">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Math</h2>
            <p className="text-muted-foreground">Master calculus, algebra, and more with step-by-step guidance.</p>
          </Link>
          
          <Link to="/computer-science" className="glass rounded-lg p-6 shadow-soft transition-all-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-lg border border-white/10 dark:border-gray-700/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-soft">
                <Computer className="h-6 w-6 text-white" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Computer Science</h2>
            <p className="text-muted-foreground">Discover algorithms, data structures, and programming concepts.</p>
          </Link>
          
          <Link to="/biology" className="glass rounded-lg p-6 shadow-soft transition-all-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-lg border border-white/10 dark:border-gray-700/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-soft">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Biology</h2>
            <p className="text-muted-foreground">Explore cells, genetics, evolution, and human biology.</p>
          </Link>
        </section>
        
        <section className="glass rounded-lg p-6 backdrop-blur-lg border border-white/10 dark:border-gray-700/50 dark:bg-gray-800/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Navigation Guide
          </h2>
          <p className="mb-4">
            You can use the following voice commands to navigate through the app:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-lg p-4 shadow-soft dark:bg-gray-800/50">
              <p className="font-medium">"Open Physics" - Navigate to Physics section</p>
            </div>
            <div className="glass rounded-lg p-4 shadow-soft dark:bg-gray-800/50">
              <p className="font-medium">"Go to Chemistry" - Navigate to Chemistry section</p>
            </div>
            <div className="glass rounded-lg p-4 shadow-soft dark:bg-gray-800/50">
              <p className="font-medium">"Chapter 1" - Open first chapter of current subject</p>
            </div>
            <div className="glass rounded-lg p-4 shadow-soft dark:bg-gray-800/50">
              <p className="font-medium">"Read" - Read the content of the current page</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Indexr;
