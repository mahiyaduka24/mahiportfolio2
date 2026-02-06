
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Resume from './components/Resume.tsx';
import Portfolio from './components/Portfolio.tsx';
import Hobbies from './components/Hobbies.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import Background from './components/Background.tsx';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen selection:bg-rose selection:text-white relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 lg:left-[280px] right-0 h-1.5 z-[10000] bg-rose/10 backdrop-blur-[1px]">
        <div
          className="h-full bg-rose transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <Background />
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 lg:ml-[280px] relative custom-scrollbar overflow-x-hidden">
        <Hero />
        <div className="border-t border-parchment-dark/10 dark:border-ink-light/10">
          <About />
          <Skills />
          <Resume />
          <Portfolio />
          <Hobbies />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;
