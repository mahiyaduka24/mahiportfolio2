
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Briefcase, Wrench, Trophy, X, ChevronRight, ChevronLeft, Eye, BookOpen, ZoomIn, ZoomOut, Maximize2, LayoutGrid, Bookmark, Pin, Star, Scissors, RotateCcw, PenTool } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'The Grid & The Grove',
    category: 'UI/UX Design',
    role: 'Lead Designer',
    tools: ['Figma', 'Adobe XD', 'Prototyping'],
    outcome: 'Synthesized organic patterns into a digital framework for a local botanical archive.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    rotation: -3,
    tapeStyle: 'top-left',
    tapeColor: 'bg-rose/40',
    colSpan: 'lg:col-span-7',
    note: "Field study meets digital interface.",
    process: [
      { image: 'https://images.unsplash.com/photo-1581291518062-c9a79e7e9f33?auto=format&fit=crop&q=80&w=800', note: 'Initial field studies in the local gardens.' },
      { image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800', note: 'Translating stem patterns into wireframe grids.' },
      { image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800', note: 'Final digital implementation.' }
    ],
    final: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581291518062-c9a79e7e9f33?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: '02',
    title: 'Echo Identity System',
    category: 'Branding',
    role: 'Visual Designer',
    tools: ['Illustrator', 'InDesign', 'Typography'],
    outcome: 'Established a sonic-visual brand language for urban markets.',
    image: 'https://i.ibb.co/zTYN6hqh/Screenshot-2026-02-07-043217.png',
    rotation: 2,
    tapeStyle: 'bottom-right',
    tapeColor: 'bg-sage/30',
    colSpan: 'lg:col-span-5',
    note: "Translating sound into ink.",
    process: [
      { image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800', note: 'Visualizing sound frequency as letterforms.' },
      { image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800', note: 'Testing legibility across heavy industrial textures.' }
    ],
    final: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: '03',
    title: 'Kinetic Narratives',
    category: 'Motion Design',
    role: 'Motion Designer',
    tools: ['After Effects', 'Cinema 4D'],
    outcome: 'Created a series of educational loops for design students.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    rotation: -1.5,
    tapeStyle: 'center-top',
    tapeColor: 'bg-rose/20',
    colSpan: 'lg:col-span-6',
    note: "Geometry in motion.",
    process: [
      { image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800', note: 'Iteration #04: Exploring frame rates and friction.' }
    ],
    final: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200'
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
    rotation: 4,
    tapeStyle: 'two-corners',
    tapeColor: 'bg-sage/20',
    colSpan: 'lg:col-span-6',
    note: "The rhythm of the streets.",
    process: [
      { image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800', note: 'Mapping the pulse of the city through street dialogue.' }
    ],
    final: [
      'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200'
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
  const [activeTab, setActiveTab] = useState<'process' | 'final'>('process');
  const [currentPage, setCurrentPage] = useState(0);

  const images = activeTab === 'process' 
    ? project.process 
    : project.final.map((img: string) => ({ image: img, note: 'Final Outcome' }));
  
  const totalPages = images.length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-ink/70 dark:bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-12 overflow-y-auto"
      onClick={onClose}
    >
       <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="bg-parchment dark:bg-[#2a2a2a] w-full max-w-6xl rounded-sm overflow-hidden shadow-2xl relative flex flex-col lg:flex-row min-h-[70vh] border border-stone-200 dark:border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-3 bg-rose text-white rounded-full hover:rotate-90 transition-all shadow-lg">
          <X size={20} />
        </button>

        <div className="lg:w-3/5 bg-stone-900 relative overflow-hidden flex items-center justify-center h-[400px] lg:h-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeTab + currentPage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={images[currentPage].image || images[currentPage]} 
              className="w-full h-full object-cover" 
              alt="Project detail"
            />
          </AnimatePresence>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
            <button onClick={() => setCurrentPage(p => (p - 1 + totalPages) % totalPages)} className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-rose hover:text-white transition-all"><ChevronLeft size={18} /></button>
            <div className="px-4 py-2 bg-white/90 rounded-full text-xs font-mono tracking-widest">{currentPage + 1} / {totalPages}</div>
            <button onClick={() => setCurrentPage(p => (p + 1) % totalPages)} className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-rose hover:text-white transition-all"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="lg:w-2/5 p-8 lg:p-12 bg-white dark:bg-[#2a2a2a] overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-2">{project.category}</div>
            <h3 className="text-4xl font-serif italic mb-6 dark:text-white leading-tight">"{project.title}"</h3>
            <p className="text-lg text-stone-500 dark:text-stone-300 italic mb-10 leading-relaxed">{project.outcome}</p>
          </div>

          <div className="flex gap-2 mb-10">
            <button onClick={() => { setActiveTab('process'); setCurrentPage(0); }} className={`flex-1 py-3 font-mono text-[10px] uppercase tracking-widest transition-all rounded-sm ${activeTab === 'process' ? 'bg-rose text-white' : 'bg-stone-50 text-stone-400'}`}>Process</button>
            <button onClick={() => { setActiveTab('final'); setCurrentPage(0); }} className={`flex-1 py-3 font-mono text-[10px] uppercase tracking-widest transition-all rounded-sm ${activeTab === 'final' ? 'bg-rose text-white' : 'bg-stone-50 text-stone-400'}`}>Outcome</button>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-parchment dark:bg-stone-800 border-l-4 border-rose italic font-serif">
              <h5 className="font-hand text-2xl text-rose mb-2">Designer's Log</h5>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Documentation of the iterative cycle. Every sketch informs the final digital architecture. Sincerity lies in the process.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4">
              {project.tools?.map((t: string) => (
                <span key={t} className="px-3 py-1 bg-stone-50 dark:bg-stone-800 rounded-full text-[10px] uppercase tracking-wider dark:text-stone-400">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

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

  return (
    <section id="works" className="py-24 px-6 lg:px-20 relative overflow-visible bg-parchment dark:bg-parchment-dark bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] dark:bg-none transition-colors duration-500">
      {/* Subtle blend overlay for dark mode to ensure perfect seamless transition */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-parchment-dark to-transparent opacity-0 dark:opacity-100 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Scrapbook Header */}
        <div className="relative mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 relative z-20"
          >
            <span className="font-hand text-4xl text-rose dark:text-rose-light ml-4">Archive Volume I</span>
            <div className="flex items-center gap-6">
              <h2 className="text-7xl lg:text-9xl font-serif font-bold dark:text-white leading-none tracking-tighter">
                Selected <br /><span className="italic font-normal">Works</span>
              </h2>
              <div className="hidden lg:block">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-stone-200 dark:text-stone-800">
                  <Paperclip size={120} strokeWidth={0.5} />
                </motion.div>
              </div>
            </div>
            <p className="mt-8 text-2xl lg:text-3xl font-serif italic text-stone-400 dark:text-stone-300 max-w-2xl leading-relaxed">
              "A curation of professional commissions and academic explorations, pinned onto the fabric of my growth."
            </p>
          </motion.div>
          
          {/* Decorative Stamp */}
          <div className="absolute top-0 right-10 opacity-10 dark:opacity-20 pointer-events-none select-none">
             <div className="w-32 h-32 border-4 border-ink dark:border-white rounded-full flex flex-col items-center justify-center p-4 rotate-12">
               <span className="font-mono text-[10px] uppercase font-bold text-center">MAHI DESIGN LAB</span>
               <div className="w-full h-px bg-ink dark:bg-white my-1"></div>
               <span className="font-hand text-xl">2026.02.04</span>
             </div>
          </div>
        </div>

        {/* Main Projects - Non-linear layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-32 lg:gap-x-16 items-center">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer ${project.colSpan} relative flex flex-col transition-all duration-700`}
              style={{ rotate: `${project.rotation}deg`, marginTop: idx % 2 === 0 ? '0' : '4rem' }}
            >
              <div className="polaroid relative z-10 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                {renderTape(project.tapeStyle, project.tapeColor)}
                
                <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden relative">
                  <img src={project.image} className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.98] grayscale group-hover:grayscale-0 transition-all duration-700" alt={project.title} />
                  <div className="absolute top-4 left-4 font-mono text-[9px] bg-white/90 dark:bg-stone-900/90 px-2 py-1 shadow-sm uppercase tracking-widest font-bold dark:text-white">
                    Case Entry #{project.id}
                  </div>
                </div>

                <div className="mt-8 px-2 pb-2">
                   <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-stone-300 dark:text-stone-500 mb-2">{project.category}</div>
                   <h3 className="text-3xl font-serif italic text-ink dark:text-white group-hover:text-rose transition-colors">{project.title}</h3>
                </div>
              </div>

              {/* Annotation */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                className="absolute -bottom-12 -left-4 font-hand text-2xl text-[#8b4513] dark:text-rose/80 whitespace-nowrap hidden lg:block"
              >
                "{project.note}"
              </motion.div>
              
              {/* Paper Background behind Polaroid */}
              <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800/30 -z-10 translate-x-3 translate-y-3 rotate-[2deg] opacity-20 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Academic Pursuits Section - Redesigned for Scrapbook theme */}
        <div className="mt-72 relative">
           <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 font-hand text-[12rem] opacity-[0.03] pointer-events-none select-none whitespace-nowrap dark:text-white">
              Academic Journals
           </div>

           <div className="flex flex-col items-center mb-24 relative z-10">
              <span className="font-hand text-3xl text-rose mb-2">Class Notes & Records</span>
              <h3 className="text-5xl lg:text-7xl font-serif italic text-ink dark:text-white flex items-center gap-6">
                <div className="h-px w-20 bg-stone-200 dark:bg-stone-800"></div>
                Academic Pursuits
                <div className="h-px w-20 bg-stone-200 dark:bg-stone-800"></div>
              </h3>
           </div>

           <div className="flex flex-wrap justify-center gap-16 lg:gap-24">
              {assignments.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, rotate: item.rotation - 5 }}
                  whileInView={{ opacity: 1, rotate: item.rotation }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProject({ ...item, process: [{ image: item.image, note: item.outcome }], final: [item.image] })}
                  className="group cursor-pointer relative bg-white dark:bg-[#333] p-6 pb-12 shadow-xl hover:shadow-2xl transition-all duration-500 w-full md:w-[320px] polaroid"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-stone-100 dark:bg-stone-800 washi-tape rotate-2 opacity-50"></div>
                  
                  {/* Pinned artifact detail */}
                  <div className="absolute -top-6 -right-4 text-rose opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                     <Bookmark size={48} strokeWidth={0.5} />
                  </div>

                  <div className="aspect-square bg-stone-100 dark:bg-stone-800 overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  
                  <div className="font-mono text-[8px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{item.category}</div>
                  <h4 className="text-2xl font-serif italic dark:text-white leading-tight mb-4">"{item.title}"</h4>
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

        {/* Marginalia - Scattered sketches throughout the section */}
        <div className="absolute top-[40%] right-[-5%] opacity-[0.05] pointer-events-none hidden lg:block rotate-12 dark:text-white">
          <Scissors size={180} strokeWidth={0.3} />
        </div>
        <div className="absolute bottom-40 left-[-5%] opacity-[0.05] pointer-events-none hidden lg:block -rotate-45 dark:text-white">
          <PenTool size={220} strokeWidth={0.3} />
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
