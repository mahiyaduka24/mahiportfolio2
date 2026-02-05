import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 lg:px-20 border-t border-parchment-dark/10 dark:border-ink-light/10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div>
            <h2 className="text-7xl lg:text-9xl font-serif font-bold tracking-tighter mb-8 leading-none dark:text-white">
              MAHI<br/>YADUKA.
            </h2>
            <p className="text-stone-600 dark:text-stone-200 font-mono text-[14px] tracking-[0.25em] uppercase">
              Visual Communication & Interaction Design Portfolio
            </p>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-widest text-rose"
          >
            Back to top 
            <div className="w-12 h-12 rounded-full border border-rose flex items-center justify-center group-hover:bg-rose group-hover:text-white transition-all">
              <ArrowUp size={20} />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-parchment-dark/10 dark:border-ink-light/10">
          <div>
             <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose mb-6 font-bold">Inquiries</h4>
             <a href="mailto:mahiyaduka24k5@gmail.com" className="text-base font-bold uppercase hover:text-rose transition-colors dark:text-white">mahiyaduka24k5@gmail.com</a>
          </div>
          <div>
             <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose mb-6 font-bold">Connect</h4>
             <div className="flex flex-col gap-2 text-base font-bold uppercase dark:text-white">
               <a href="#" className="hover:text-rose transition-colors">Behance</a>
               <a href="https://www.linkedin.com/in/mahi-yaduka-318a36365/" target="_blank" rel="noopener noreferrer" className="hover:text-rose transition-colors">LinkedIn</a>
               <a href="https://www.instagram.com/yadukamahi/" target="_blank" rel="noopener noreferrer" className="hover:text-rose transition-colors">Instagram</a>
             </div>
          </div>
          <div>
             <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose mb-6 font-bold">Status</h4>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span className="text-sm font-bold uppercase tracking-widest dark:text-white">Available 2026</span>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose mb-6 font-bold">Legal</h4>
             <p className="text-[12px] text-stone-400 dark:text-stone-300 uppercase tracking-widest text-right">
               © {currentYear} All Rights Reserved.<br/>Built with Precision.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;