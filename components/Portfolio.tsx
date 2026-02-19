
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from 'framer-motion';
import { Paperclip, Briefcase, Wrench, Trophy, X, ChevronRight, ChevronLeft, Eye, BookOpen, ZoomIn, ZoomOut, Maximize2, LayoutGrid, Bookmark, Pin, Star, Scissors, RotateCcw, PenTool } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'The Chromatic Disorder',
    category: 'Magazine Design',
    role: 'Lead Designer',
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'Adobe Photoshop', 'Procreate', 'Typography'],
    outcome: 'Synthesized organic patterns into a digital framework for a local botanical archive.',
    image: 'https://i.ibb.co/VYCsgSs8/Cover-mockup.png?auto=format&fit=crop&q=80&w=800',
    rotation: -3,
    tapeStyle: 'top-left',
    tapeColor: 'bg-rose/40',
    colSpan: 'lg:col-span-7',
    note: "Field study meets digital interface.",
    process: [
      { image: 'https://i.ibb.co/GfbfrcFq/Whats-App-Image-2026-02-19-at-10-29-56-PM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Initial field studies in the local gardens.' },
      { image: 'https://i.ibb.co/bjG4JTY0/Whats-App-Image-2026-02-19-at-10-30-05-PM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Translating stem patterns into wireframe grids.' },
      { image: 'https://i.ibb.co/5gJWv2Kd/Whats-App-Image-2026-02-19-at-10-30-13-PM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Final digital implementation.' }
      { image: 'https://i.ibb.co/27z4J4vt/Whats-App-Image-2026-02-19-at-10-30-20-PM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Final digital implementation.' }
      { image: 'https://i.ibb.co/G4sVbx1d/Whats-App-Image-2026-02-19-at-10-30-27-PM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Final digital implementation.' }
      { image: 'https://i.ibb.co/QvYpvWtW/Whats-App-Image-2026-02-19-at-10-30-33-PM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Final digital implementation.' }
    ],
    final: [
      'https://i.ibb.co/DcvZz1Q/Whats-App-Image-2026-02-19-at-10-56-55-PM.jpg?auto=format&fit=crop&q=80&w=1200',
      'https://i.ibb.co/9mtL9bwC/Whats-App-Image-2026-02-19-at-10-57-02-PM.jpg?auto=format&fit=crop&q=80&w=1200',
      'https://i.ibb.co/4ZnYczQ5/Whats-App-Image-2026-02-19-at-10-57-08-PM.jpg?auto=format&fit=crop&q=80&w=1200',
      'https://i.ibb.co/zV5cZLHv/Whats-App-Image-2026-02-19-at-10-57-13-PM.jpg?auto=format&fit=crop&q=80&w=1200',
      'https://i.ibb.co/hJpDBLHV/Whats-App-Image-2026-02-19-at-10-57-20-PM.jpg?auto=format&fit=crop&q=80&w=1200',
      'https://i.ibb.co/SD89H0vN/Whats-App-Image-2026-02-19-at-10-57-25-PM.jpg?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: '02',
    title: 'Guggulu',
    category: 'Branding',
    role: 'Visual Designer',
    tools: ['Illustrator', 'InDesign', 'Typography'],
    outcome: 'Established a sonic-visual brand language for urban markets.',
    image: 'https://i.ibb.co/MTqkTDG/Screenshot-2026-02-07-212626.png?auto=format&fit=crop&q=80&w=800',
    rotation: 2,
    tapeStyle: 'bottom-right',
    tapeColor: 'bg-sage/30',
    colSpan: 'lg:col-span-5',
    note: "Translating sound into ink.",
    process: [
      { image: 'https://i.ibb.co/DH1fS5xK/Green-Abstract-Baby-Care-Presentation-3.png?auto=format&fit=crop&q=80&w=800', note: 'Visualizing sound frequency as letterforms.' },
      { image: 'https://i.ibb.co/27FVnGRf/25.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/WNHpgnr1/26.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/CCjwcTy/27.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/j985YKmv/28.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/N6XzxgdG/29.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/wN73T5wW/30.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/Xrmby75j/31.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/VfqtKVK/32.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/gNnH3ss/33.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' },
      { image: 'https://i.ibb.co/ymKN1bnL/20.png?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' }
    ],
    final: [
      'https://i.ibb.co/DHSKL7fk/21.png?auto=format&fit=crop&q=80&w=1600',
      'https://i.ibb.co/nMJG7vfx/22.png?auto=format&fit=crop&q=80&w=1600',
      'https://i.ibb.co/7JphZNr4/23.png?auto=format&fit=crop&q=80&w=1600',
      'https://i.ibb.co/x85Z7wFR/24.png?auto=format&fit=crop&q=80&w=1600',
      'https://i.ibb.co/jvyWqSCb/25.png?auto=format&fit=crop&q=80&w=1600'
    ]
  },
  {
    id: '03',
    title: 'PaperBoat Mascot - OTU',
    category: 'Illustration Design',
    role: 'Illustration Designer',
    tools: ['Procreate', 'Adobe Photoshop'],
    outcome: 'Created a series of educational loops for design students.',
    image: 'https://i.ibb.co/V00jz4Dk/cover-otu.jpg?auto=format&fit=crop&q=80&w=800',
    rotation: -1.5,
    tapeStyle: 'center-top',
    tapeColor: 'bg-rose/20',
    colSpan: 'lg:col-span-6',
    note: "Geometry in motion.",
    process: [
      { image: 'https://i.ibb.co/3m2MYvfG/research.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://i.ibb.co/zhKMYDr0/Paperboat-mindmap-page-0001.jpg?auto=format&fit=crop&q=80&w=800', note: 'Iteration #04: Exploring frame rates and friction.' },
      { image: 'https://i.ibb.co/HSn05rC/Scanned-Document-2-page-0001.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://i.ibb.co/zTt5Ph2P/Scanned-Document-2-page-0002.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://i.ibb.co/1GXLwFcf/Whats-App-Image-2026-02-20-at-1-43-18-AM-1.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://i.ibb.co/gbzCBy5L/Whats-App-Image-2026-02-20-at-1-43-18-AM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://i.ibb.co/XrBtQ2QQ/Whats-App-Image-2026-02-20-at-1-43-52-AM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://i.ibb.co/ynLTHqL8/Whats-App-Image-2026-02-20-at-1-48-14-AM.jpg?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' }
    ],
    final: [
      'https://i.ibb.co/PZpYRJtW/paperboat-concept-note-page-0001.jpg?auto=format&fit=crop&q=80&w=1200',
      'https://i.ibb.co/nM5pp3qf/packaging.png?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: '04',
    title: 'Urban Pulse Campaign',
    category: 'Campaign Strategy',
    role: 'Creative Strategist',
    tools: ['Copywriting', 'Layout Design', 'Print Media'],
    outcome: 'Directed a city-wide social awareness campaign.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    rotation: 3,
    tapeStyle: 'two-corners',
    tapeColor: 'bg-sage/20',
    colSpan: 'lg:col-span-6',
    note: "The rhythm of the streets.",
    process: [
      { image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800', note: 'Mapping the pulse of the city through street dialogue.' }
    ],
    final: [
      'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1600'
    ]
  }
];

const assignments = [
  {
    id: 'S1',
    title: 'Chromatophores Study',
    category: 'Assignment: Color Theory',
    outcome: 'An exploration of relative color perception through manual pigment mixing.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    rotation: 2,
  },
  {
    id: 'S2',
    title: 'Typographic Deconstruction',
    category: 'Assignment: Type Design',
    outcome: 'Deconstructing classical serifs to understand structural anatomy.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
    rotation: -3,
  },
  {
    id: 'S3',
    title: 'Semiotic Mapping',
    category: 'Assignment: Visual Language',
    outcome: 'A photographic journey mapping the symbols found in local transit systems.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    rotation: 1.5,
  }
];

const ProjectModal: React.FC<{ project: any; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-10"
      onClick={onClose}
    >
       <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.98 }}
        className="bg-[#fcfbf9] dark:bg-[#1a1a1a] w-full max-w-[95vw] h-full lg:h-[90vh] rounded-sm shadow-2xl relative flex flex-col lg:flex-row overflow-hidden border border-white/50 dark:border-white/5"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-[60] p-3 bg-rose text-white rounded-full hover:rotate-90 transition-all duration-300 shadow-xl hover:bg-rose/90">
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* --- Left Panel: Details (Fixed Sidebar) --- */}
        <div className="w-full lg:w-[35%] lg:min-w-[350px] h-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-white/10 bg-white/60 dark:bg-black/20 p-8 lg:p-12 relative custom-scrollbar">
          
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose mb-8 block">
            Folder {project.id}
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-serif italic text-ink dark:text-white mb-2 leading-[1]"
          >
            {project.title}
          </motion.h2>

          <p className="font-hand text-3xl text-stone-400 dark:text-stone-500 mb-12">
            {project.category}
          </p>

          <div className="space-y-10">
             <div className="flex flex-col gap-2">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Role</h4>
                <p className="font-serif text-xl text-ink dark:text-stone-200">{project.role}</p>
             </div>

             <div className="flex flex-col gap-2">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Outcome</h4>
                <p className="font-serif text-lg leading-relaxed text-ink dark:text-stone-200 opacity-80 max-w-sm">
                  {project.outcome}
                </p>
             </div>

             <div className="flex flex-col gap-3 pt-4 border-t border-stone-100 dark:border-white/5">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools?.map((t: string) => (
                    <span key={t} className="px-4 py-1.5 bg-white dark:bg-stone-800 border border-stone-100 dark:border-white/10 rounded-full text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 shadow-sm">{t}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* --- Right Panel: Content (Scrollable) --- */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dust.png')] dark:bg-none bg-[#f4f4f0] dark:bg-[#222]">
           <div className="p-8 lg:p-16 max-w-5xl mx-auto">
              
              {/* Hero Image */}
              <div className="mb-20 relative transform rotate-1">
                 <div className="absolute -top-4 -right-4 w-32 h-8 bg-rose/30 washi-tape rotate-45 z-20"></div>
                 <div className="bg-white dark:bg-black p-2 shadow-xl">
                    <img src={project.image} alt="Hero" className="w-full h-auto object-cover grayscale-[0.2]" />
                 </div>
              </div>

              {/* Section 1: The Process */}
              <div className="mb-24 relative">
                 <div className="flex items-baseline gap-4 mb-10 border-b border-stone-200 dark:border-white/10 pb-4">
                    <h3 className="text-4xl font-serif text-ink dark:text-white">The Process</h3>
                    <span className="font-hand text-2xl text-stone-400 dark:text-stone-500">Sketches & Iterations</span>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {project.process?.map((proc: any, idx: number) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.1 * idx }}
                         className={`relative bg-white dark:bg-[#333] p-4 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-500`}
                       >
                          {/* Tape */}
                          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-stone-200/50 dark:bg-stone-700/50 washi-tape ${idx % 2 === 0 ? '-rotate-2' : 'rotate-1'}`}></div>
                          
                          <div className="bg-stone-100 dark:bg-black/20 overflow-hidden mb-6">
                             <img src={proc.image} alt="Process" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                          </div>
                          
                          <p className="font-hand text-2xl text-stone-500 dark:text-stone-300 leading-tight text-center px-4">
                            "{proc.note}"
                          </p>
                       </motion.div>
                    ))}
                 </div>
              </div>

              {/* Section 2: Final Outcome */}
              <div className="relative">
                 <div className="flex items-baseline gap-4 mb-10 border-b border-stone-200 dark:border-white/10 pb-4">
                    <h3 className="text-4xl font-serif text-ink dark:text-white">Final Outcome</h3>
                    <span className="font-hand text-2xl text-stone-400 dark:text-stone-400">Polished Result</span>
                 </div>

                 <div className="space-y-16">
                    {project.final?.map((img: string, idx: number) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.2 }}
                         className="relative group"
                       >
                          <div className="absolute -inset-1 bg-stone-200 dark:bg-stone-700/50 rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                          <div className="relative bg-white dark:bg-black shadow-2xl p-3">
                             <img src={img} alt="Final Outcome" className="w-full h-auto object-cover" />
                          </div>
                          
                          {/* Corner Tape */}
                          <div className="absolute -top-4 -right-4 w-40 h-10 bg-rose/30 washi-tape rotate-[30deg] shadow-sm"></div>
                       </motion.div>
                    ))}
                 </div>
              </div>

              <div className="mt-32 mb-12 text-center">
                 <p className="font-hand text-3xl text-stone-400 dark:text-stone-500">"End of Folder {project.id}"</p>
                 <button onClick={onClose} className="mt-8 text-[10px] font-mono uppercase tracking-[0.2em] text-rose hover:text-ink dark:hover:text-white transition-colors">Close Project</button>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const renderTape = (style: string, color: string) => {
  switch (style) {
    case 'top-left': return <div className={`absolute -top-4 -left-6 w-24 h-8 washi-tape opacity-50 z-30 ${color} -rotate-12`}></div>;
    case 'bottom-right': return <div className={`absolute -bottom-4 -right-6 w-24 h-8 washi-tape opacity-50 z-30 ${color} -rotate-6`}></div>;
    case 'center-top': return <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-8 washi-tape opacity-50 z-30 ${color} rotate-2`}></div>;
    case 'two-corners': return (
      <>
        <div className={`absolute -top-4 -left-4 w-16 h-8 washi-tape opacity-40 z-30 ${color} -rotate-45`}></div>
        <div className={`absolute -top-4 -right-4 w-16 h-8 washi-tape opacity-40 z-30 ${color} rotate-45`}></div>
      </>
    );
    default: return <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-8 washi-tape opacity-50 z-30 ${color} rotate-1`}></div>;
  }
};

const ProjectItem: React.FC<{ project: any; index: number; setSelectedProject: (p: any) => void }> = ({ project, index, setSelectedProject }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  const yImage = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateImage = useTransform(scrollYProgress, [0, 0.5, 1], [project.rotation - 3, project.rotation, project.rotation + 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      id={`project-${project.id}`}
      ref={ref} 
      style={{ opacity }}
      className={`min-h-[50vh] flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-start justify-center gap-12 lg:gap-24 mb-32 relative z-10`}
    >
      <div className={`absolute top-1/2 ${isEven ? 'left-[-10%]' : 'right-[-10%]'} w-[20%] h-px border-t-2 border-dashed border-stone-300 dark:border-white/10 hidden lg:block -z-10`}></div>
      
      <motion.div 
        style={{ y: yImage, rotate: rotateImage }}
        className="w-full lg:w-1/2 relative group perspective-1000"
        onClick={() => setSelectedProject(project)}
      >
        <div className="relative cursor-pointer transition-all duration-500 hover:z-20 hover:-translate-y-2 preserve-3d">
          <div className="absolute top-3 left-4 w-full h-full bg-stone-200 dark:bg-stone-800 shadow-md rounded-sm -rotate-3 transition-transform group-hover:-rotate-6"></div>
          <div className="absolute -top-2 -left-3 w-full h-full bg-white dark:bg-stone-700 shadow-sm rounded-sm rotate-2 transition-transform group-hover:rotate-4"></div>
          
          <div className="relative bg-white dark:bg-[#696969] p-3 pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-black/50 border border-stone-50 dark:border-white/5 transition-transform duration-500">
            {renderTape(project.tapeStyle, project.tapeColor)}
            
            <div className="aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900 relative">
               <img 
                 src={project.image} 
                 className={`w-full h-full object-cover filter contrast-[1.1] grayscale group-hover:grayscale-0 transition-all duration-700 ${project.id === '01' ? 'scale-[1.15] -translate-y-[8%]' : project.id === '02' ? 'scale-[0.85]' : ''}`} 
                 alt={project.title} 
               />
               
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center -rotate-12 bg-white/10 backdrop-blur-sm">
                   <Eye className="text-white" size={32} />
                 </div>
               </div>
            </div>

            <div className="absolute bottom-4 left-0 w-full px-6 flex justify-between items-end">
               <span className="font-hand text-2xl text-stone-600 dark:text-stone-300">{project.category}</span>
               <span className="font-mono text-[9px] text-stone-300 dark:text-stone-400 uppercase tracking-widest">Fig. {project.id}</span>
            </div>
            
            <div className="absolute top-12 -right-3 bg-rose text-white text-[9px] font-mono py-1 px-2 uppercase tracking-widest rotate-90 origin-bottom-right shadow-md">
              Case Study
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: yText }}
        className="w-full lg:w-5/12 relative"
      >
         <div 
            onClick={() => setSelectedProject(project)}
            className="relative bg-[#fbfbf9] dark:bg-[#333333] p-8 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-stone-100 dark:border-white/5 rotate-1 cursor-pointer hover:-translate-y-2 transition-transform duration-300 group"
         >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
               <Pin size={32} className="text-stone-400 dark:text-stone-500 fill-stone-400 dark:fill-stone-500 drop-shadow-lg" />
            </div>

            <h3 className="text-4xl lg:text-5xl font-serif font-bold italic mb-6 dark:text-white leading-[0.9] mt-2 group-hover:text-rose transition-colors">
                {project.title}
            </h3>
            
            <div className="w-16 h-[2px] bg-rose/50 mb-6"></div>
            
            <p className="font-serif text-lg lg:text-xl text-stone-600 dark:text-stone-300 leading-relaxed mb-8">
                "{project.note}"
            </p>

            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                    {project.tools.slice(0, 4).map((tool: string) => (
                        <span key={tool} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-sm text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-white/5">
                            {tool}
                        </span>
                    ))}
                </div>
                
                <button 
                    className="self-start group/btn flex items-center gap-3 font-hand text-xl text-rose hover:text-ink dark:hover:text-white transition-colors"
                >
                    Open Folder <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
            
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-50 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-soft-light"></div>
         </div>
      </motion.div>

    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isIndexDragging, setIsIndexDragging] = useState(false);

  const scrollToProject = (id: string) => {
    const element = document.getElementById(`project-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="works" className="py-24 px-6 lg:px-20 relative overflow-visible bg-parchment dark:bg-transparent bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] dark:bg-none transition-colors duration-500">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-parchment-dark to-transparent opacity-0 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="relative mb-32 lg:mb-48">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 lg:gap-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-20 flex-1"
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-[1px] bg-rose dark:bg-rose-light"></div>
                 <span className="font-hand text-2xl text-rose dark:text-rose-light">Archive Volume I</span>
              </div>
              
              <h2 className="text-7xl lg:text-[8rem] font-serif font-bold dark:text-white leading-[0.85] tracking-tight mb-10">
                Curated <br />
                <span className="italic font-light ml-2 lg:ml-6 text-stone-600 dark:text-stone-300">Works</span>
              </h2>
              
              <p className="text-lg lg:text-xl font-serif text-stone-500 dark:text-stone-400 leading-relaxed border-l-2 border-stone-200 dark:border-white/10 pl-8 max-w-lg italic">
                "A curation of professional commissions and academic explorations, pinned onto the fabric of my growth."
              </p>
            </motion.div>

            <motion.div 
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 50 }}
              onDragStart={() => setIsIndexDragging(true)}
              onDragEnd={() => setIsIndexDragging(false)}
              initial={{ opacity: 0, x: 20, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block w-80 relative flex-shrink-0 cursor-grab active:cursor-grabbing"
            >
               <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 washi-tape z-30 transition-all duration-300 ${isIndexDragging ? '-rotate-12 scale-110 shadow-lg opacity-80 -translate-y-2' : '-rotate-2 opacity-60'}`}></div>
               
               <div className={`bg-white dark:bg-[#3a3a3a] p-8 border border-stone-200 dark:border-white/10 transition-all duration-300 relative group ${isIndexDragging ? 'rotate-0 shadow-2xl' : 'shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-1 hover:rotate-0 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]'}`}>
                  <div className="flex justify-between items-center mb-6 border-b border-stone-100 dark:border-white/5 pb-4">
                    <span className="font-hand text-2xl text-ink dark:text-white">Project Index</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">Vol. 01</span>
                  </div>
                  <ul className="space-y-4">
                    {projects.map((p) => (
                       <li 
                         key={p.id} 
                         className="group/item cursor-pointer flex justify-between items-baseline" 
                         onClick={(e) => {
                             e.stopPropagation();
                             scrollToProject(p.id);
                         }}
                       >
                          <span className="font-serif italic text-lg text-stone-600 dark:text-stone-300 group-hover/item:text-rose transition-colors">{p.title}</span>
                          <span className="text-[10px] font-mono text-stone-300 dark:text-stone-500">0{p.id}</span>
                       </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-4 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-stone-300 dark:text-stone-600">
                     <span className="font-mono text-[9px] uppercase tracking-widest">Selected Case Studies</span>
                     <Paperclip size={14} />
                  </div>
               </div>
            </motion.div>

          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-stone-200 dark:border-white/5 hidden lg:block -translate-x-1/2 z-0"></div>
          
          <div className="flex flex-col gap-0">
            {projects.map((project, idx) => (
              <ProjectItem 
                key={project.id} 
                project={project} 
                index={idx} 
                setSelectedProject={setSelectedProject} 
              />
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-32 relative border-t border-stone-200 dark:border-white/10 pt-20 lg:pt-28">
           <div className="absolute top-8 left-1/2 -translate-x-1/2 font-hand text-[6rem] lg:text-[10rem] text-stone-200/50 dark:text-white/5 pointer-events-none select-none whitespace-nowrap z-0">
              Academic Journal
           </div>

           <div className="flex flex-col items-center mb-16 relative z-10">
              <span className="font-hand text-3xl text-rose mb-2 px-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Class Notes & Records</span>
              <h3 className="text-5xl lg:text-7xl font-serif italic text-ink dark:text-white flex items-center gap-6">
                <div className="h-px w-10 lg:w-20 bg-stone-200 dark:bg-stone-800"></div>
                Academic Pursuits
                <div className="h-px w-10 lg:w-20 bg-stone-200 dark:bg-stone-800"></div>
              </h3>
           </div>

           <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-8 xl:gap-12">
              {assignments.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, rotate: item.rotation - 5 }}
                  whileInView={{ opacity: 1, rotate: item.rotation }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProject({ ...item, process: [{ image: item.image, note: item.outcome }], final: [item.image] })}
                  className="group cursor-pointer relative bg-white dark:bg-[#333] p-6 pb-12 shadow-xl hover:shadow-2xl transition-all duration-500 w-full lg:flex-1 lg:max-w-[380px] polaroid"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-stone-100 dark:bg-stone-800 washi-tape rotate-2 opacity-50"></div>
                  
                  <div className="absolute -top-6 -right-4 text-rose opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                     <Bookmark size={48} strokeWidth={0.5} />
                  </div>

                  <div className="aspect-square bg-stone-100 dark:bg-stone-800 overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  
                  <div className="font-mono text-[8px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{item.category}</div>
                  <h4 className="text-xl font-serif italic dark:text-white leading-tight mb-4 whitespace-nowrap">"{item.title}"</h4>
                  <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed">
                    {item.outcome}
                  </p>
                  
                  <div className="absolute bottom-4 right-6 flex items-center gap-2 font-hand text-lg text-rose opacity-0 group-hover:opacity-100 transition-opacity">
                    View Log <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        <div className="absolute top-[40%] right-[-5%] opacity-[0.05] pointer-events-none hidden lg:block rotate-12 dark:text-white">
          <Scissors size={180} strokeWidth={0.3} />
        </div>
        <div className="absolute bottom-0 right-[15%] opacity-[0.05] pointer-events-none hidden lg:block rotate-2">
          <Star size={120} strokeWidth={0.5} className="text-rose" />
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
