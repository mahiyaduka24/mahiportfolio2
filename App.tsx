
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
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen selection:bg-rose selection:text-white relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 lg:left-[280px] right-0 h-1 bg-rose z-[100] origin-left"
        style={{ scaleX }}
      />
      
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
