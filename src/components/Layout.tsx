
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Menu, X, Moon, Sun, Atom, Calculator, Computer, Leaf, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceAssistant from '@/components/VoiceAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') === 'dark');
  
  // Navigation items with icons
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { path: '/physics', label: 'Physics', icon: <Atom className="h-4 w-4" /> },
    { path: '/chemistry', label: 'Chemistry', icon: <Beaker className="h-4 w-4" /> },
    { path: '/math', label: 'Math', icon: <Calculator className="h-4 w-4" /> },
    { path: '/computer-science', label: 'Computer Science', icon: <Computer className="h-4 w-4" /> },
    { path: '/biology', label: 'Biology', icon: <Leaf className="h-4 w-4" /> },
  ];
  
  // Toggle dark theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  // Set theme based on preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);
  
  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  return (
    <div className={`flex min-h-screen flex-col ${isDarkTheme ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass border-b shadow-soft backdrop-blur-lg dark:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">OLabs</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center text-sm font-medium transition-all-200 hover:text-primary gap-1 ${
                  location.pathname === item.path ? 'text-primary underline underline-offset-4' : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            {/* Dark theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDarkTheme ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-30 glass animate-fade-in md:hidden dark:bg-black/80 backdrop-blur-lg">
          <nav className="container py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center text-lg font-medium py-2 transition-all-200 hover:text-primary gap-2 ${
                  location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {/* Dark theme toggle in mobile menu */}
            <button 
              onClick={toggleTheme}
              className="flex items-center text-lg font-medium py-2 transition-all-200 hover:text-primary gap-2 text-muted-foreground"
            >
              {isDarkTheme ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Theme</span>
                </>
              )}
            </button>
          </nav>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 container py-6 fade-slide-in">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t py-6 dark:border-gray-800">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OLabs. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Voice assistant - always present */}
      <VoiceAssistant />
    </div>
  );
};

export default Layout;
