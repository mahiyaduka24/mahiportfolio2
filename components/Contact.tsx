import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Instagram, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xqebplgz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Oops! There was a problem. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full px-0 py-4 bg-transparent border-b border-stone-200 dark:border-stone-700 focus:border-rose transition-all outline-none text-lg placeholder:text-stone-300 dark:placeholder:text-stone-500 dark:text-white";

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="text-rose font-medium uppercase tracking-[0.3em] text-xs mb-6 block">Get in Touch</span>
              <h2 className="text-6xl md:text-7xl font-serif font-bold mb-8 leading-tight dark:text-white">
                Let's start <br /> something <span className="italic font-normal text-rose">new</span>.
              </h2>
              <p className="text-xl text-stone-500 dark:text-stone-300 mb-12 max-w-sm leading-relaxed">
                I'm always looking for interesting collaborations and creative opportunities. 
              </p>
            </div>

            <div className="space-y-10">
              <a href="mailto:mahiyaduka24k5@gmail.com" className="group flex items-center gap-6 text-2xl font-serif italic hover:text-rose transition-all dark:text-white dark:hover:text-rose">
                <span className="p-4 bg-white dark:bg-[#333333] rounded-full border border-stone-100 dark:border-stone-700 group-hover:bg-rose group-hover:text-white transition-all shadow-sm">
                  <Mail size={24} />
                </span>
                mahiyaduka24k5@gmail.com
              </a>
              
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/mahi-yaduka-318a36365/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 rounded-2xl bg-white dark:bg-[#333333] border border-stone-100 dark:border-stone-700 hover:border-rose transition-all dark:text-white"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/yadukamahi/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 rounded-2xl bg-white dark:bg-[#333333] border border-stone-100 dark:border-stone-700 hover:border-rose transition-all dark:text-white"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-[#3a3a3a] p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 dark:shadow-black/30 border border-stone-100 dark:border-stone-700 transition-colors duration-500"
                >
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-400">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className={inputClasses}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-400">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className={inputClasses}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-400">Your Message</label>
                      <textarea 
                        name="message"
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell me about your vision..." 
                        className={`${inputClasses} resize-none`}
                        disabled={isLoading}
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="group w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-rose dark:hover:bg-rose dark:hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          Sending...
                          <Loader2 size={20} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-[#3a3a3a] p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[500px] border border-stone-100 dark:border-stone-700 transition-colors duration-500"
                >
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold dark:text-white">Message Sent!</h3>
                  <p className="text-stone-500 dark:text-stone-300 max-w-xs mx-auto">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-rose font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;