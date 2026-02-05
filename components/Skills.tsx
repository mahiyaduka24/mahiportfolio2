
import React from 'react';
import { motion } from 'framer-motion';
import { Type, PenTool, Printer } from 'lucide-react';

const skills = [
  {
    title: 'Typography',
    description: 'Expertise in font pairing, custom lettering, and hierarchical layouts to ensure readability and aesthetic impact.',
    icon: <Type size={32} />,
    color: 'bg-white dark:bg-[#333333]',
    tags: ['Variable Fonts', 'Grid Systems', 'Kerning'],
    index: '01'
  },
  {
    title: 'Illustration',
    description: 'Creating digital and hand-drawn visuals that bring narratives to life, ranging from icons to complex editorial pieces.',
    icon: <PenTool size={32} />,
    color: 'bg-white dark:bg-[#333333]',
    tags: ['Vector Art', 'Charcoal', 'Digital Painting'],
    index: '02'
  },
  {
    title: 'Design for Print',
    description: 'Understanding prepress, material selection, and finishing techniques to produce tactile and enduring print media.',
    icon: <Printer size={32} />,
    color: 'bg-white dark:bg-[#333333]',
    tags: ['Editorial Design', 'Packaging', 'Branding'],
    index: '03'
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="pt-12 pb-24 lg:pt-16 lg:pb-32 px-6 lg:px-20 relative border-b border-stone-200 dark:border-white/10 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="text-4xl font-serif italic text-rose dark:text-rose-light opacity-30 block mb-4">02.</span>
            <h2 className="text-6xl lg:text-8xl font-serif font-bold tracking-tighter mb-6 text-ink dark:text-white leading-none">Expertise</h2>
            <p className="text-xl lg:text-2xl text-stone-500 dark:text-stone-200 leading-relaxed italic">
              Bridging traditional communication principles with <span className="text-ink dark:text-white font-medium">contemporary digital craft</span>.
            </p>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-6 opacity-60 h-fit self-end">
            <div className="text-right font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-300 leading-relaxed select-none">
              <p>Discipline</p>
              <p>Index</p>
              <p className="text-rose/80 dark:text-rose-light/80">— 2026</p>
            </div>
            <div className="h-14 w-[2px] bg-rose dark:bg-rose-light rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-200 dark:border-white/10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-[#333333] transition-all duration-500">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-10 lg:p-14 ${skill.color} border-stone-100 dark:border-white/5 md:border-r last:border-r-0 group hover:bg-rose dark:hover:bg-rose transition-all duration-500 ease-in-out cursor-default relative`}
            >
              <div className="flex justify-between items-start mb-10 lg:mb-14 relative z-10">
                <div className="p-4 bg-stone-50 dark:bg-white/5 rounded-2xl group-hover:bg-white group-hover:text-rose transition-all text-rose dark:text-rose-light shadow-sm">
                  {skill.icon}
                </div>
                <span className="font-mono text-[14px] text-stone-300 dark:text-stone-200 group-hover:text-white/40">{skill.index}</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-6 group-hover:text-white dark:text-white transition-colors relative z-10">{skill.title}</h3>
              <p className="text-stone-500 dark:text-stone-100 group-hover:text-white/90 mb-10 leading-relaxed text-lg italic font-serif transition-colors relative z-10">
                {skill.description}
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 relative z-10">
                {skill.tags.map(tag => (
                  <span key={tag} className="font-hand text-xl lg:text-2xl text-rose dark:text-rose-light group-hover:text-white transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
