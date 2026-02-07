
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from 'framer-motion';
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
    rotation: -2,
    tapeStyle: 'top-left',
    tapeColor: 'bg-rose/40',
    colSpan: 'lg:col-span-7',
    note: "Field study meets digital interface.",
    process: [
      { image: 'https://images.unsplash.com/photo-1581291518062-c9a79e7e9f33?auto=format&fit=crop&q=80&w=800', note: 'Initial field studies in the local gardens.' },
      { image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800', note: 'Translating stem patterns into wireframe grids.' },
      { image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=800', note: 'Typography selection process.' },
    ],
    final: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1581291518062-c9a79e7e9f33?auto=format&fit=crop&q=80&w=1600'
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
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1600'
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
    rotation: -1,
    tapeStyle: 'center-top',
    tapeColor: 'bg-rose/20',
    colSpan: 'lg:col-span-6',
    note: "Geometry in motion.",
    process: [
      { image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=800', note: 'Deconstructing theory into geometric primitives.' },
      { image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800', note: 'Iteration #04: Exploring frame rates and friction.' }
    ],
    final: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600'
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

const ImageLightbox: React.FC<{ images: string[]; initialIndex: number; onClose: () => void }> = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(0);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => Math.min(s + 0.5, 3));
  };
  
  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => Math.max(s - 0.5, 1));
  };

  const navigate = (newIndex: number) => {
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
    setScale(1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index < images.length - 1) navigate(index + 1);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index > 0) navigate(index - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, images.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
      onClick={onClose}
    >
       {/* Controls */}
       <div className="absolute top-6 right-6 flex gap-4 z-50">
          <button onClick={handleZoomOut} className="p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"><ZoomOut size={24}/></button>
          <button onClick={handleZoomIn} className="p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"><ZoomIn size={24}/></button>
          <button onClick={onClose} className="p-4 bg-rose text-white rounded-full hover:bg-rose/80 transition-colors"><X size={24}/></button>
       </div>

       {/* Navigation Buttons */}
       {index > 0 && (
         <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-50 hover:scale-110">
           <ChevronLeft size={32} />
         </button>
       )}
       {index < images.length - 1 && (
         <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-50 hover:scale-110">
           <ChevronRight size={32} />
         </button>
       )}

       <div className="w-full h-full overflow-hidden flex items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img 
              key={index}
              src={images[index]} 
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0,
                  scale: 0.8
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  scale: scale
                },
                exit: (direction: number) => ({
                  zIndex: 0,
                  x: direction < 0 ? 1000 : -1000,
                  opacity: 0,
                  scale: 0.8
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              // Only enable drag for panning when zoomed in. Use drag="x" for swipe detection when zoomed out.
              drag={scale > 1 ? true : "x"}
              dragConstraints={scale > 1 ? { left: -1000, right: 1000, top: -800, bottom: 800 } : { left: 0, right: 0 }}
              dragElastic={scale > 1 ? 0.1 : 0.8}
              onDragEnd={(e, { offset, velocity }) => {
                if (scale === 1) {
                  const swipeThreshold = 50;
                  const swipeVelocity = 0.2;
                  if (offset.x > swipeThreshold || velocity.x > swipeVelocity) {
                    handlePrev();
                  } else if (offset.x < -swipeThreshold || velocity.x < -swipeVelocity) {
                    handleNext();
                  }
                }
              }}
              className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl touch-none"
              style={{ cursor: scale > 1 ? 'grab' : 'default' }}
            />
          </AnimatePresence>
       </div>
       
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] pointer-events-none select-none bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">
          {index + 1} / {images.length} • Swipe to navigate • Buttons to Zoom
       </div>
    </motion.div>
  )
}

const ProjectModal: React.FC<{ project: any; onClose: () => void }> = ({ project, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open
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
        className="bg-[#fcfbf9] dark:bg-[#1a1a1a] w-full max-w-[95vw] h-full lg:h-[90vh] rounded-lg shadow-2xl relative flex flex-col lg:flex-row overflow-hidden border border-white/50 dark:border-white/5"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-[60] p-3 bg-rose text-white rounded-full hover:rotate-90 transition-all shadow-xl hover:bg-rose/90">
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* --- Left Panel: Details (Fixed Sidebar) --- */}
        <div className="w-full lg:w-[28%] lg:min-w-[320px] h-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-white/10 bg-white/60 dark:bg-black/20 p-8 lg:p-12 relative">
          
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose mb-8 block">
            Folder {project.id}
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-serif italic text-ink dark:text-white mb-4 leading-[1.1]"
          >
            {project.title}
          </motion.h2>

          <p className="font-hand text-2xl text-stone-400 dark:text-stone-500 mb-12">
            {project.category}
          </p>

          <div className="space-y-8">
             <div className="flex flex-col gap-2">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400 font-bold">Role</h4>
                <p className="font-serif text-lg text-ink dark:text-stone-200">{project.role}</p>
             </div>

             <div className="flex flex-col gap-2">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400 font-bold">Outcome</h4>
                <p className="font-serif text-lg leading-relaxed text-ink dark:text-stone-200 opacity-80">
                  {project.outcome}
                </p>
             </div>

             <div className="flex flex-col gap-3 pt-4 border-t border-stone-100 dark:border-white/5">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400 font-bold">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools?.map((t: string) => (
                    <span key={t} className="px-3 py-1 bg-white dark:bg-stone-800 border border-stone-100 dark:border-white/10 rounded-full text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">{t}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* --- Right Panel: Content (Scrollable) --- */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dust.png')] dark:bg-none bg-[#f4f4f0] dark:bg-[#222]">
           <div className="p-8 lg:p-16 max-w-5xl mx-auto">
              
              {/* Section 1: The Process */}
              <div className="mb-24 relative">
                 <div className="flex items-baseline gap-4 mb-10 border-b border-stone-200 dark:border-white/10 pb-4">
                    <h3 className="text-3xl font-serif font-bold text-ink dark:text-white">The Process</h3>
                    <span className="font-hand text-xl text-stone-400 dark:text-stone-500">Sketches & Iterations</span>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {project.process?.map((proc: any, idx: number) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.1 * idx }}
                         className={`relative bg-white dark:bg-[#333] p-4 pb-12 shadow-lg rotate-${idx % 2 === 0 ? '1' : '-1'} hover:rotate-0 transition-transform duration-500`}
                       >
                          {/* Tape */}
                          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-stone-200/50 dark:bg-stone-700/50 washi-tape ${idx % 2 === 0 ? '-rotate-2' : 'rotate-1'}`}></div>
                          
                          <div className="bg-stone-100 dark:bg-black/20 overflow-hidden mb-4">
                             <img src={proc.image} alt="Process" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                          </div>
                          
                          <p className="font-hand text-xl text-stone-500 dark:text-stone-300 leading-tight text-center px-4">
                            "{proc.note}"
                          </p>
                       </motion.div>
                    ))}
                 </div>
              </div>

              {/* Section 2: Final Outcome */}
              <div className="relative">
                 <div className="flex items-baseline gap-4 mb-10 border-b border-stone-200 dark:border-white/10 pb-4">
                    <h3 className="text-3xl font-serif font-bold text-ink dark:text-white">Final Outcome</h3>
                    <span className="font-hand text-xl text-stone-400 dark:text-stone-400">Polished Result</span>
                 </div>

                 <div className="space-y-16">
                    {project.final?.map((img: string, idx: number) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.2 }}
                         className="relative group cursor-zoom-in"
                         onDoubleClick={() => setLightboxIndex(idx)}
                       >
                          <div className="absolute -inset-1 bg-stone-200 dark:bg-stone-700/50 rounded-sm rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                          <div className="relative bg-white dark:bg-black shadow-2xl p-2 rounded-sm overflow-hidden">
                             <img src={img} alt="Final Outcome" className="w-full h-auto object-cover" />
                             
                             {/* Hint Overlay */}
                             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                   <Maximize2 size={16} className="text-rose" />
                                   <span className="font-mono text-[10px] uppercase tracking-widest text-ink dark:text-white font-bold">Double Click to Expand</span>
                                </div>
                             </div>
                          </div>
                          
                          {/* Corner Tape */}
                          <div className="absolute -top-3 -right-3 w-32 h-8 bg-rose/40 washi-tape rotate-[30deg] shadow-sm"></div>
                          <div className="absolute -bottom-3 -left-3 w-32 h-8 bg-rose/40 washi-tape rotate-[30deg] shadow-sm"></div>
                       </motion.div>
                    ))}
                 </div>
              </div>

              <div className="mt-24 pt-12 border-t border-dashed border-stone-300 dark:border-white/10 text-center">
                 <p className="font-hand text-2xl text-stone-400 dark:text-stone-500">"End of Folder {project.id}"</p>
                 <button onClick={onClose} className="mt-6 text-xs font-mono uppercase tracking-widest text-rose hover:underline">Close Project</button>
              </div>
           </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox 
            images={project.final} 
            initialIndex={lightboxIndex} 
            onClose={() => setLightboxIndex(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectItem: React.FC<{ project: any; index: number; setSelectedProject: (p: any) => void }> = ({ project, index, setSelectedProject }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Parallax Values
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
      {/* Decorative dashed line connector */}
      <div className={`absolute top-1/2 ${isEven ? 'left-[-10%]' : 'right-[-10%]'} w-[20%] h-px border-t-2 border-dashed border-stone-300 dark:border-white/10 hidden lg:block -z-10`}></div>
      
      {/* Image Pile */}
      <motion.div 
        style={{ y: yImage, rotate: rotateImage }}
        className="w-full lg:w-1/2 relative group perspective-1000"
        onClick={() => setSelectedProject(project)}
      >
        <div className="relative cursor-pointer transition-all duration-500 hover:z-20 hover:-translate-y-2 preserve-3d">
          {/* Backing Papers for messy pile look */}
          <div className="absolute top-3 left-4 w-full h-full bg-stone-200 dark:bg-stone-800 shadow-md rounded-sm -rotate-3 transition-transform group-hover:-rotate-6"></div>
          <div className="absolute -top-2 -left-3 w-full h-full bg-white dark:bg-stone-700 shadow-sm rounded-sm rotate-2 transition-transform group-hover:rotate-4"></div>
          
          {/* Main Polaroid Card */}
          <div className="relative bg-white dark:bg-[#696969] p-3 pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-black/50 border border-stone-50 dark:border-white/5 transition-transform duration-500">
            {renderTape(project.tapeStyle, project.tapeColor)}
            
            <div className="aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900 relative">
               {/* Specifically shift Image 01 as per request */}
               <img 
                 src={project.image} 
                 className={`w-full h-full object-cover filter contrast-[1.1] grayscale group-hover:grayscale-0 transition-all duration-700 ${project.id === '01' ? 'scale-[1.15] -translate-y-[8%]' : ''}`} 
                 alt={project.title} 
               />
               
               {/* Hidden 'View' Stamp overlay */}
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
            
            {/* Tag sticking out */}
            <div className="absolute top-12 -right-3 bg-rose text-white text-[9px] font-mono py-1 px-2 uppercase tracking-widest rotate-90 origin-bottom-right shadow-md">
              Case Study
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description Note - Made Interactive */}
      <motion.div 
        style={{ y: yText }}
        className="w-full lg:w-5/12 relative"
      >
         <div 
            onClick={() => setSelectedProject(project)}
            className="relative bg-[#fbfbf9] dark:bg-[#333333] p-8 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-stone-100 dark:border-white/5 rotate-1 cursor-pointer hover:-translate-y-2 transition-transform duration-300 group"
         >
            {/* Pin Graphic */}
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
                    {project.tools.map((tool: string) => (
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
            
            {/* Paper Texture Overlay for the note - Updated to Rice Paper for better dark mode blending */}
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
      {/* Subtle blend overlay for dark mode to ensure perfect seamless transition */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-parchment-dark to-transparent opacity-0 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* REPLACED HEADER LAYOUT */}
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

            {/* Right Side - Index Card to fill space */}
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
               {/* Tape Element */}
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

        {/* --- New Interactive Scrapbook Layout --- */}
        <div className="relative">
          {/* Central Thread Line */}
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

        {/* Academic Pursuits Section */}
        <div className="mt-20 lg:mt-32 relative border-t border-stone-200 dark:border-white/10 pt-20 lg:pt-28">
           <div className="absolute top-8 left-1/2 -translate-x-1/2 font-hand text-[6rem] lg:text-[10rem] text-stone-200/50 dark:text-white/5 pointer-events-none select-none whitespace-nowrap z-0">
              Academic Journal
           </div>

           <div className="flex flex-col items-center mb-16 relative z-10">
              <span className="font-hand text-3xl text-rose mb-2 bg-parchment dark:bg-parchment-dark px-6">Class Notes & Records</span>
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
                  
                  {/* Pinned artifact detail */}
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

        {/* Marginalia - Scattered sketches throughout the section */}
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
