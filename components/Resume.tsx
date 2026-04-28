
import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, GraduationCap, Briefcase, Award, User, PenTool, Camera, Star, Layers, Palette } from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';

const Resume: React.FC = () => {
  const handleDownload = () => {
    const element = document.getElementById("cv-section-pdf");
    if (!element) return;

    // We temporarily unhide it, generate PDF, then re-hide it to avoid capturing issues
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.display = 'block';

    // @ts-ignore
    html2pdf()
      .set({
        margin: 0,
        filename: "Mahi-Yaduka-CV.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "avoid-all" }
      })
      .from(element)
      .save()
      .then(() => {
        // We do not set display back to none here because it's naturally hidden via class,
        // but restoring left/top if needed (optional)
      });
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
    <section id="resume" className="py-20 lg:py-32 px-6 lg:px-20 relative bg-[#fdfaf6] dark:bg-[#2a2a2a] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
          <div>
            <span className="font-hand text-2xl text-rose dark:text-rose-light block mb-4">The Credentials</span>
            <h2 className="text-5xl lg:text-6xl font-serif italic mb-4 dark:text-white leading-tight">Professional <br/>Records</h2>
            <p className="text-stone-500 dark:text-stone-300 max-w-lg leading-relaxed italic text-lg">
              Summation of academic pursuits and professional milestones documenting my growth.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            type="button"
            className="resume-download-btn shrink-0 inline-flex items-center gap-4 px-8 py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-full font-mono text-xs uppercase tracking-widest hover:bg-rose dark:hover:bg-rose-light dark:hover:text-ink transition-all shadow-md group cursor-pointer z-50"
          >
            <Download size={16} className="group-hover:translate-y-1 transition-transform" />
            Download Full CV
          </button>
        </div>

        {/* Tabular / Bento Box Layout for Web View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="polaroid -rotate-1 relative z-10 hover:z-20"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-6 washi-tape"></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-2xl font-serif font-bold dark:text-white">Mahi Yaduka</h3>
                   <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose dark:text-rose-light mt-2">Communication Design Student</p>
                </div>
                <div className="p-3 bg-stone-50 dark:bg-white/5 rounded-2xl text-rose dark:text-rose-light">
                  <User size={20} />
                </div>
              </div>
              <div className="text-stone-600 dark:text-stone-300 space-y-4 text-sm leading-relaxed">
                <p>
                  Communication Design student at Unitedworld Institute of Design, Gandhinagar, with a strong interest in layout, typography, and structured visual composition. My work focuses on creating clear, balanced, and visually engaging designs through editorial layouts, illustrated narratives, and digital explorations.
                </p>
                <p>
                  Currently building skills in interface-based design alongside strong fundamentals in typography.
                </p>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#f9f5f0] dark:bg-[#2d2926] p-8 shadow-md rotate-1 relative z-10 hover:z-20 border border-stone-200 dark:border-white/5"
            >
              <div className="absolute bottom-4 right-4 text-stone-300 dark:text-stone-600 opacity-20">
                <Star size={48} />
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Star size={18} className="text-rose dark:text-rose-light" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Skills</h4>
              </div>
              <ul className="space-y-4 relative z-10">
                {skills.map(s => (
                  <li key={s} className="text-stone-600 dark:text-stone-300 text-sm font-serif border-b border-stone-100 dark:border-white/10 pb-4 last:border-0 last:pb-0">{s}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {/* Experience Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-stone-800 p-8 shadow-xl relative -rotate-[0.5deg] z-10 hover:z-30 border border-stone-100 dark:border-white/5"
            >
              <div className="absolute -top-2 left-10 w-20 h-6 washi-tape"></div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase size={18} className="text-rose dark:text-rose-light" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Experience</h4>
              </div>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pb-8 border-b border-stone-100 dark:border-white/10 last:border-0 last:pb-0">
                    <span className="font-mono text-[10px] text-rose dark:text-rose-light uppercase tracking-widest block mb-2">{exp.period}</span>
                    <h5 className="text-xl font-serif font-bold dark:text-white italic mb-3">{exp.role}</h5>
                    <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">{exp.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Focus Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#f2ece4] dark:bg-[#3a3530] p-8 shadow-lg torn-edge rotate-1 relative z-10 hover:z-20"
            >
              <div className="absolute -top-3 -right-3 w-16 h-5 washi-tape rotate-45"></div>
              <div className="flex items-center gap-3 mb-6">
                <Layers size={18} className="text-rose dark:text-rose-light" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Project Focus</h4>
              </div>
              <ul className="space-y-3">
                {projectFocus.map(p => (
                  <li key={p} className="text-stone-600 dark:text-stone-300 text-sm flex items-start gap-3">
                    <span className="text-rose mt-1.5 w-1.5 h-1.5 rounded-full bg-rose block shrink-0"></span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {/* Education Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="polaroid rotate-1 relative z-10 hover:z-20"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape rotate-2"></div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={18} className="text-rose dark:text-rose-light" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Education</h4>
              </div>
              <div>
                <span className="font-mono text-[10px] text-rose dark:text-rose-light uppercase tracking-widest block mb-2">2024 — 2028</span>
                <h5 className="text-xl font-serif font-bold dark:text-white italic mb-2">B.Des (Hons.) in Communication Design</h5>
                <p className="text-stone-600 dark:text-stone-300 text-sm mb-1 font-medium">Unitedworld Institute of Design (UID), Gandhinagar</p>
                <p className="text-stone-500 dark:text-stone-400 text-sm italic">Currently in 2nd Year</p>
              </div>
            </motion.div>

            {/* Tools Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="polaroid -rotate-2 relative z-10 hover:z-20"
            >
              <div className="absolute -top-3 right-8 w-20 h-6 washi-tape -rotate-6"></div>
              <div className="flex items-center gap-3 mb-6">
                <PenTool size={18} className="text-rose dark:text-rose-light" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Tools</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-stone-50 dark:bg-stone-700/50 rounded-md border border-stone-100 dark:border-white/5 text-[10px] font-mono text-stone-600 dark:text-stone-300 uppercase tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Accommodations Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-rose-100/50 dark:bg-rose-900/20 p-8 torn-edge -rotate-1 relative z-10 hover:z-20"
            >
              <div className="absolute top-0 right-0 w-16 h-5 washi-tape rotate-[35deg] translate-x-2 -translate-y-2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-5 washi-tape rotate-[40deg] -translate-x-2 translate-y-2"></div>
              <div className="flex items-center gap-3 mb-4">
                <Award size={18} className="text-rose dark:text-rose-light" />
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Achievements</h4>
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-sm">UID Academic Merit (Semesters 1-2)</p>
              
              <div className="mt-8 pt-6 border-t border-rose-200 dark:border-rose-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Camera size={18} className="text-rose dark:text-rose-light" />
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold dark:text-white">Practice</h4>
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-sm">Photography (composition & visual observation)</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* --- HIDDEN PDF TEMPLATE --- 
          This will strictly apply light-mode classes explicitly so that the printed PDF always looks correct,
          bypassing the user's current choice (since PDF represents a static document) 
      */}
      <div id="cv-section-pdf" className="hidden" aria-hidden="true">
        <div style={{ width: '800px', backgroundColor: '#ffffff', color: '#1c1917', padding: '60px' }}>
          {/* Header */}
          <div style={{ borderBottom: '1px solid #f5f5f4', paddingBottom: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '48px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 'bold', margin: '0' }}>Mahi Yaduka</h3>
              <p style={{ fontFamily: '"Courier Prime", monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#a8a29e', marginTop: '12px' }}>Communication Design Student</p>
            </div>
            <div>
              <span style={{ fontFamily: '"La Belle Aurore", cursive', color: '#d4a3a3', fontSize: '24px' }}>mahiyaduka24k5@gmail.com</span>
            </div>
          </div>

          {/* Profile */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <User size={18} color="#d4a3a3" />
              <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Profile</h4>
            </div>
            <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1', color: '#57534e', fontSize: '16px', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 16px 0' }}>
                Communication Design student at Unitedworld Institute of Design, Gandhinagar, with a strong interest in layout, typography, and structured visual composition. My work focuses on creating clear, balanced, and visually engaging designs through editorial layouts, illustrated narratives, and digital explorations.
              </p>
              <p style={{ margin: '0' }}>
                Currently building skills in interface-based design alongside strong fundamentals in typography.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Briefcase size={18} color="#d4a3a3" />
              <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Experience</h4>
            </div>
            <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1' }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: i === experiences.length - 1 ? '0' : '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '18px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 'bold', fontStyle: 'italic', margin: '0', color: '#1c1917' }}>{exp.role}</h5>
                    <span style={{ fontFamily: '"Courier Prime", monospace', fontSize: '10px', color: '#78716c' }}>{exp.period}</span>
                  </div>
                  <p style={{ color: '#57534e', fontSize: '14px', lineHeight: '1.6', margin: '0' }}>{exp.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <GraduationCap size={18} color="#d4a3a3" />
              <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Education</h4>
            </div>
            <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h5 style={{ fontSize: '18px', fontFamily: '"Cormorant Garamond", serif', fontWeight: 'bold', fontStyle: 'italic', margin: '0', color: '#1c1917' }}>B.Des (Hons.) in Communication Design</h5>
                <span style={{ fontFamily: '"Courier Prime", monospace', fontSize: '10px', color: '#78716c' }}>2024 — 2028</span>
              </div>
              <p style={{ color: '#d4a3a3', fontWeight: '500', fontSize: '14px', margin: '0 0 4px 0' }}>Unitedworld Institute of Design (UID), Gandhinagar</p>
              <p style={{ color: '#78716c', fontSize: '14px', fontStyle: 'italic', margin: '0' }}>Currently in 2nd Year</p>
            </div>
          </div>

          {/* Two Column Section for Skills & Tools */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
            {/* Skills */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Star size={18} color="#d4a3a3" />
                <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Skills</h4>
              </div>
              <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1' }}>
                {skills.map((s, i) => (
                  <p key={s} style={{ color: '#57534e', fontSize: '14px', fontFamily: '"Cormorant Garamond", serif', margin: i === skills.length - 1 ? '0' : '0 0 8px 0' }}>{s}</p>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <PenTool size={18} color="#d4a3a3" />
                <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Tools</h4>
              </div>
              <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tools.map(t => (
                  <span key={t} style={{ padding: '4px 12px', backgroundColor: '#fafaf9', border: '1px solid #f5f5f4', borderRadius: '4px', fontSize: '10px', fontFamily: '"Courier Prime", monospace', color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Focus */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Layers size={18} color="#d4a3a3" />
              <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Project Focus</h4>
            </div>
            <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {projectFocus.map((p, i) => (
                <div key={p} style={{ width: 'calc(50% - 8px)', color: '#57534e', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#d4a3a3', marginTop: '6px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d4a3a3', flexShrink: 0 }}></span>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Practice & Achievements */}
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Camera size={18} color="#d4a3a3" />
                <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Supporting Practice</h4>
              </div>
              <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1' }}>
                <p style={{ color: '#57534e', fontSize: '14px', margin: '0' }}>Photography (composition & visual observation)</p>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Award size={18} color="#d4a3a3" />
                <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold', margin: '0' }}>Achievements</h4>
              </div>
              <div style={{ paddingLeft: '32px', borderLeft: '1px solid #d6d3d1' }}>
                <p style={{ color: '#57534e', fontSize: '14px', margin: '0' }}>UID Academic Merit (Semesters 1-2)</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Resume;
