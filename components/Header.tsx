
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Instagram, Linkedin, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  const navLinks = [
    { name: 'Introduction', href: '#top', id: 'top' },
    { name: 'Memoirs', href: '#about', id: 'about' },
    { name: 'Essays', href: '#skills', id: 'skills' },
    { name: 'Records', href: '#resume', id: 'resume' },
    { name: 'Curations', href: '#works', id: 'works' },
    { name: 'Ephemera', href: '#hobbies', id: 'hobbies' },
    { name: 'Correspondence', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Bookmark Nav */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] flex-col justify-between p-10 z-50 border-r border-stone-200/60 dark:border-white/10 bg-parchment dark:bg-[#1e1e1e] shadow-[20px_0_60px_rgba(0,0,0,0.06)] dark:shadow-[10px_0_40px_rgba(0,0,0,0.3)] transition-all duration-500">
        <div className="relative">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-serif font-light tracking-tight leading-none italic dark:text-white">
              Mahi <br /><span className="text-rose font-hand text-4xl block mt-1">Yaduka</span>
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] mt-4 opacity-40 dark:text-white">Portfolio Volume I</p>
          </motion.div>

          <nav className="flex flex-col gap-5">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`group relative flex items-center text-xl font-serif italic transition-all duration-300 ${isActive ? 'text-ink dark:text-white translate-x-2' : 'text-stone-400'}`}
                >
                  <motion.span 
                    animate={{ width: isActive ? 16 : 0, marginRight: isActive ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-[1px] bg-rose"
                  ></motion.span>
                  {link.name}
                  <span className={`absolute -right-6 font-hand text-base text-rose transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {idx + 1}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="space-y-8">
          <div className="flex gap-4 items-center">
            <button 
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-white dark:hover:bg-stone-800 hover:border-rose transition-all dark:text-white"
              title="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <div className="h-px w-8 bg-stone-200 dark:bg-stone-800"></div>
            <div className="flex gap-4 dark:text-white">
              <a href="https://www.instagram.com/yadukamahi/" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 hover:text-rose transition-all">
                <Instagram size={16} className="cursor-pointer" />
              </a>
              <a href="https://www.linkedin.com/in/mahi-yaduka-318a36365/" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 hover:text-rose transition-all">
                <Linkedin size={16} className="cursor-pointer" />
              </a>
            </div>
          </div>
          <div className="font-hand text-base text-rose/60 flex items-center gap-2">
            Made with <Heart size={12} className="text-rose" /> in Kolkata
          </div>
        </div>
      </aside>

      {/* Mobile Bar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-parchment/80 dark:bg-[#1e1e1e]/90 backdrop-blur-md flex items-center justify-between px-6 z-50 border-b border-stone-100 dark:border-white/10 transition-colors duration-500">
        <h1 className="font-serif italic text-xl dark:text-white">M. Yaduka</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center dark:text-white"
          >
            {isDark ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          <button onClick={() => setMobileMenuOpen(true)} className="dark:text-white">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-parchment dark:bg-[#1e1e1e] z-[100] p-10 flex flex-col justify-center items-center text-center gap-8 transition-colors duration-500"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-10 dark:text-white p-2 hover:rotate-90 transition-transform duration-300">
              <X size={24} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-4xl font-serif italic transition-colors ${activeSection === link.id ? 'text-rose' : 'dark:text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
