
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const paperY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const paperRotate = useTransform(scrollYProgress, [0, 1], [0.5, -0.5]);
  
  const title = "The Philosophy of Simple Things";
  
  return (
    <section id="about" className="pt-20 pb-12 lg:pt-24 lg:pb-16 px-6 lg:px-24 overflow-visible" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          style={{ 
            y: paperY, 
            rotate: paperRotate,
            filter: 'drop-shadow(0 35px 50px rgba(0, 0, 0, 0.14))' 
          }}
          className="relative transition-all duration-500 will-change-transform z-20"
        >
          {/* Boost shadow intensity for dark mode */}
          <style dangerouslySetInnerHTML={{ __html: `
            .dark .about-paper-card {
              filter: drop-shadow(0 40px 70px rgba(0, 0, 0, 0.5)) !important;
            }
          `}} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="about-paper-card relative bg-white dark:bg-[#3a3a3a] p-8 md:p-12 lg:p-20 pb-20 border border-stone-100 dark:border-white/10 torn-edge transition-colors duration-500 will-change-[clip-path]"
          >
            <div className="absolute -top-3 left-10 w-24 h-8 washi-tape z-30 opacity-60"></div>
            
            <div className="flex items-center gap-4 mb-10">
              <span className="font-hand text-2xl md:text-3xl text-rose dark:text-rose-light">Journal Entry #01</span>
              <div className="h-[1px] flex-1 bg-stone-100 dark:bg-white/10 origin-left"></div>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-10 leading-none dark:text-white">
              {title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (i * 0.015) }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6 text-lg md:text-xl font-serif leading-relaxed text-stone-600 dark:text-stone-200">
                <p>
                  My work is less about 'designing' and more about <span className="text-ink dark:text-white italic">curating moments</span>. I find that the most profound communications often happen in the quiet spaces—the margins of a page, the breath between words.
                </p>
                <p>
                  Studying in Ahmedabad has taught me to find order in chaos. I take the vibrant energy of the city and distill it into minimal, meaningful structures.
                </p>
              </div>
              <div className="space-y-8 flex flex-col justify-between">
                <div className="p-6 bg-parchment dark:bg-[#2a2a2a] border-l-4 border-rose/40 dark:border-rose-light/40 transition-colors duration-500 shadow-inner">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-400 mb-4">Core Ethos</h4>
                  <ul className="font-hand text-2xl text-ink dark:text-white space-y-2">
                    <li>— Sincerity in craft</li>
                    <li>— Intentional silence</li>
                    <li>— Tactile digitality</li>
                  </ul>
                </div>
                <p className="font-hand text-xl md:text-2xl text-rose dark:text-rose-light mt-8 md:mt-0 pb-4 text-right italic opacity-80">
                  "Design is a letter to the future."
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
