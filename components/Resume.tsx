
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, FileText, GraduationCap, Briefcase, Award, User, PenTool, Camera, Star, Layers, Palette } from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';

const Resume: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer springs for viscous feel
  const mouseXSpring = useSpring(x, { damping: 40, stiffness: 120 });
  const mouseYSpring = useSpring(y, { damping: 40, stiffness: 120 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);
  
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

  const handleDownload = () => {
    const element = document.getElementById("cv-section");
    if (!element) return;

    // @ts-ignore
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: "Mahi-Yaduka-CV.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" }
      })
      .save();
  };

  const experiences = [
    {
      period: '2024 — Present',
      role: 'Academic & Self-Initiated Design Work',
      details: 'Developing projects across editorial layout, typography, illustrated storytelling, and icon-based digital explorations as part of academic coursework.'
    },
    {
      period: '2017 — Present',
      role: 'Event & Family Function Design Support',
      details: 'Designed invitation layouts and small visual materials, building early experience in composition, type hierarchy, and layout balance.'
    }
  ];

  const skills = [
    "Typography & Layout Composition",
    "Editorial Design Systems",
    "Visual Storytelling through Page Design",
    "Icon Design for Digital Interfaces"
  ];

  const tools = [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Adobe AfterEffects",
    "Procreate"
  ];

  const projectFocus = [
    "Editorial and magazine layouts",
    "Typography-driven compositions",
    "Illustrated book layout & page structuring",
    "Icon exploration for digital interfaces"
  ];

  return (
    <section id="resume" className="py-20 lg:py-24 px-6 lg:px-20 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3 sticky top-32 z-30 resume-sidebar-content">
            <span className="font-hand text-2xl text-rose dark:text-rose-light block mb-4">The Credentials</span>
            <h2 className="text-5xl lg:text-6xl font-serif italic mb-8 dark:text-white leading-tight">Professional <br/>Records</h2>
            <p className="text-stone-500 dark:text-stone-300 mb-10 leading-relaxed italic text-lg">
              Summation of academic pursuits and professional milestones documenting my growth.
            </p>
            
            <button 
              onClick={handleDownload}
              type="button"
              className="resume-download-btn inline-flex items-center gap-4 px-8 py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-full font-mono text-xs uppercase tracking-widest hover:bg-rose dark:hover:bg-rose-light dark:hover:text-ink transition-all shadow-md group cursor-pointer z-50"
            >
              <Download size={16} className="group-hover:translate-y-1 transition-transform" />
              Download Full CV
            </button>
          </div>

          <div className="lg:w-2/3 w-full" style={{ perspective: "1500px" }}>
            <motion.div 
              id="cv-section"
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="resume-card bg-white dark:bg-[#333333] shadow-2xl p-8 md:p-12 lg:p-16 rounded-sm border border-stone-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500 cursor-default will-change-transform z-20"
            >
              {/* Thick paper edge / inner shadow effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] pointer-events-none z-[50]"></div>

              <div className="relative z-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-100 dark:border-white/10 pb-10 mb-10">
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-serif font-bold dark:text-white">Mahi Yaduka</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-400 mt-3">Communication Design Student</p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <a href="mailto:mahiyaduka24k5@gmail.com" className="font-hand text-rose dark:text-rose-light text-xl hover:underline">mahiyaduka24k5@gmail.com</a>
                  </div>
                </div>

                {/* Profile */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <User size={18} className="text-rose dark:text-rose-light" />
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Profile</h4>
                  </div>
                  <div className="pl-8 border-l border-stone-300 dark:border-white/30 text-stone-600 dark:text-stone-300 space-y-4 text-base leading-relaxed">
                    <p>
                      Communication Design student at Unitedworld Institute of Design, Gandhinagar, with a strong interest in layout, typography, and structured visual composition. My work focuses on creating clear, balanced, and visually engaging designs through editorial layouts, illustrated narratives, and digital explorations.
                    </p>
                    <p>
                      Currently building skills in interface-based design alongside strong fundamentals in typography.
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase size={18} className="text-rose dark:text-rose-light" />
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Experience</h4>
                  </div>
                  <div className="space-y-8 pl-8 border-l border-stone-300 dark:border-white/30">
                    {experiences.map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-2">
                          <h5 className="text-lg font-serif font-bold dark:text-white italic leading-tight">{exp.role}</h5>
                          <span className="font-mono text-[10px] text-stone-500 dark:text-stone-300 shrink-0 mt-1 md:mt-0">{exp.period}</span>
                        </div>
                        <p className="text-stone-500 dark:text-stone-200 text-sm leading-relaxed">{exp.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap size={18} className="text-rose dark:text-rose-light" />
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Education</h4>
                  </div>
                  <div className="space-y-2 pl-8 border-l border-stone-300 dark:border-white/30">
                    <div className="flex flex-col md:flex-row md:justify-between items-baseline">
                      <h5 className="text-lg font-serif font-bold dark:text-white italic">B.Des (Hons.) in Communication Design</h5>
                      <span className="font-mono text-[10px] text-stone-500 dark:text-stone-300">2024 — 2028</span>
                    </div>
                    <p className="text-rose dark:text-rose-light font-medium text-sm">Unitedworld Institute of Design (UID), Gandhinagar</p>
                    <p className="text-stone-500 dark:text-stone-300 text-sm italic">Currently in 2nd Year</p>
                  </div>
                </div>

                {/* Two Column Section for Skills & Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  {/* Skills */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Star size={18} className="text-rose dark:text-rose-light" />
                      <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Skills</h4>
                    </div>
                    <ul className="pl-8 border-l border-stone-300 dark:border-white/30 space-y-2">
                      {skills.map(s => (
                        <li key={s} className="text-stone-600 dark:text-stone-300 text-sm font-serif">{s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <PenTool size={18} className="text-rose dark:text-rose-light" />
                      <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Tools</h4>
                    </div>
                    <div className="pl-8 border-l border-stone-300 dark:border-white/30 flex flex-wrap gap-2">
                      {tools.map(t => (
                        <span key={t} className="px-3 py-1 bg-stone-50 dark:bg-stone-700/50 rounded-sm border border-stone-100 dark:border-white/5 text-[11px] font-mono text-stone-600 dark:text-stone-300 uppercase tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Focus */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers size={18} className="text-rose dark:text-rose-light" />
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Project Focus</h4>
                  </div>
                  <ul className="pl-8 border-l border-stone-300 dark:border-white/30 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {projectFocus.map(p => (
                      <li key={p} className="text-stone-600 dark:text-stone-300 text-sm flex items-start gap-2">
                        <span className="text-rose mt-1.5 w-1 h-1 rounded-full bg-rose block"></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Supporting Practice & Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Camera size={18} className="text-rose dark:text-rose-light" />
                      <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Supporting Practice</h4>
                    </div>
                    <div className="pl-8 border-l border-stone-300 dark:border-white/30">
                      <p className="text-stone-600 dark:text-stone-300 text-sm">Photography (composition & visual observation)</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Award size={18} className="text-rose dark:text-rose-light" />
                      <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Achievements</h4>
                    </div>
                    <div className="pl-8 border-l border-stone-300 dark:border-white/30">
                      <p className="text-stone-600 dark:text-stone-300 text-sm">UID Academic Merit (Semesters 1-2)</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
