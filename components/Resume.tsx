
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, FileText, GraduationCap, Briefcase, Award } from 'lucide-react';

const Resume: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer springs for viscous feel
  const mouseXSpring = useSpring(x, { damping: 40, stiffness: 120 });
  const mouseYSpring = useSpring(y, { damping: 40, stiffness: 120 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);
  
  const sheenOpacity = useTransform(mouseYSpring, [-0.5, 0, 0.5], [0.15, 0.05, 0.15]);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["-25%", "25%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const experiences = [
    {
      period: '2024 — Present',
      role: 'Communication Design Intern',
      company: 'Studio Archive',
      details: 'Focusing on brand identity systems and tactile editorial design.'
    },
    {
      period: '2023 — 2024',
      role: 'Freelance Visual Designer',
      company: 'Independent',
      details: 'Crafted visual narratives with a focus on typography.'
    }
  ];

  return (
    <section id="resume" className="py-20 lg:py-24 px-6 lg:px-20 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3">
            <span className="font-hand text-2xl text-rose dark:text-rose-light block mb-4">The Credentials</span>
            <h2 className="text-5xl lg:text-6xl font-serif italic mb-8 dark:text-white leading-tight">Professional <br/>Records</h2>
            <p className="text-stone-500 dark:text-stone-300 mb-10 leading-relaxed italic text-lg">
              Summation of academic pursuits and professional milestones documenting my growth.
            </p>
            
            <motion.a 
              href="#" 
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 px-8 py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-full font-mono text-xs uppercase tracking-widest hover:bg-rose dark:hover:bg-rose-light dark:hover:text-ink transition-all shadow-md"
            >
              <Download size={16} />
              Download Full CV
            </motion.a>
          </div>

          <div className="lg:w-2/3 w-full" style={{ perspective: "1500px" }}>
            <motion.div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#333333] shadow-2xl p-8 md:p-16 rounded-sm border border-stone-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500 cursor-default will-change-transform"
            >
              {/* Thick paper edge / inner shadow effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] pointer-events-none z-[50]"></div>

              <div className="relative z-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-100 dark:border-white/10 pb-10 mb-12">
                  <div>
                    <h3 className="text-4xl font-serif font-bold dark:text-white">Mahi Yaduka</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-400 mt-2">Communication Designer</p>
                  </div>
                  <div className="mt-4 md:mt-0 font-hand text-rose dark:text-rose-light text-xl">mahi@design.edu</div>
                </div>

                <div className="space-y-12">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase size={18} className="text-rose dark:text-rose-light" />
                      <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Experience</h4>
                    </div>
                    <div className="space-y-8 pl-8 border-l border-stone-100 dark:border-white/10">
                      {experiences.map((exp, i) => (
                        <div key={i} className="relative">
                          <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-1">
                            <h5 className="text-xl font-serif font-bold dark:text-white italic">{exp.role}</h5>
                            <span className="font-mono text-[10px] text-stone-300 dark:text-stone-400">{exp.period}</span>
                          </div>
                          <p className="text-rose dark:text-rose-light font-medium text-sm mb-2">{exp.company}</p>
                          <p className="text-stone-500 dark:text-stone-200 text-sm italic">{exp.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap size={18} className="text-rose dark:text-rose-light" />
                      <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Education</h4>
                    </div>
                    <div className="space-y-2 pl-8 border-l border-stone-100 dark:border-white/10">
                      <div className="flex justify-between items-baseline">
                        <h5 className="text-xl font-serif font-bold dark:text-white italic">B.Des Communication Design</h5>
                        <span className="font-mono text-[10px] text-stone-300 dark:text-stone-400">2022 — 2026</span>
                      </div>
                      <p className="text-stone-500 dark:text-stone-300 text-sm">National Institute of Design</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Icon Artifact - Moved to z-0 and adjusted position to avoid overlap with text */}
              <div className="absolute bottom-4 right-4 opacity-[0.05] dark:opacity-10 pointer-events-none z-0">
                <FileText size={100} strokeWidth={0.5} className="dark:text-white" />
              </div>

              {/* OVERLAYS: Placed last to sit on top of everything */}
              
              {/* Dynamic Sheen / Light reflection */}
              <motion.div 
                className="absolute inset-0 z-[60] pointer-events-none bg-gradient-to-tr from-transparent via-white/30 to-transparent dark:via-white/10"
                style={{ opacity: sheenOpacity, x: sheenX }}
              />

              {/* Consistent Paper Texture Overlay */}
              <div 
                className="absolute inset-0 z-[70] pointer-events-none opacity-[0.12] dark:opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply dark:mix-blend-overlay"
                style={{ backgroundSize: '200px' }}
              ></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
