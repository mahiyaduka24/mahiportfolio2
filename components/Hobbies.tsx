
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Camera, Music, Compass, Film, X, Maximize2, Volume2, Heart, Activity, ZoomOut, Maximize, Search, Map, Sparkles, CheckCircle2, Info, Eye, MapPin, Ticket, Bookmark, History, Briefcase, Zap, Gift, Sun, Book, Camera as CameraIconLucide, Check, Coffee, CloudRain, Clock, Radio, Sunrise, User, Layers, Wind, Footprints, Smartphone, Headphones, Send, Globe, Plane, Anchor, Map as MapIcon, Scissors, Star, Tag, MousePointer2, Clapperboard, RefreshCw, Trophy, Ghost, Clapperboard as ClapperIcon, Quote, Square, Play, Pause, ChevronDown, Music2, Bus } from 'lucide-react';

const movies = [
  "Dilwale Dulhania Le Jayenge",
  "Zindagi Na Milegi Dobara",
  "Kabhi Khushi Kabhie Gham",
  "Lagaan",
  "Jab We Met",
  "Queen",
  "Yeh Jawaani Hai Deewani",
  "Taare Zameen Par",
  "Andhadhun",
  "Bajrangi Bhaijaan",
  "Munna Bhai M.B.B.S.",
  "Chak De India",
  "Dangal",
  "Kal Ho Naa Ho",
  "Devdas",
  "Sholay",
  "Gully Boy",
  "Om Shanti Om",
  "Drishyam",
  "Kuch Kuch Hota Hai"
];

const GuessTheMovieGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentMovie, setCurrentMovie] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [lives, setLives] = useState(5);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  const consonants = "BCDFGHJKLMNPQRSTVWXYZ".split("");
  const vowels = "AEIOU";

  useEffect(() => {
    startNewGame();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const startNewGame = () => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setCurrentMovie(randomMovie);
    setGuessedLetters(new Set());
    setLives(5);
    setGameState('playing');
  };

  const handleGuess = (letter: string) => {
    if (gameState !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!currentMovie.toUpperCase().includes(letter)) {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) setGameState('lost');
    } else {
      const movieLetters = currentMovie.toUpperCase().split("");
      const hasWon = movieLetters.every(char => {
        if (char === " " || /[^A-Z]/.test(char)) return true;
        if (vowels.includes(char)) return true;
        return newGuessed.has(char);
      });
      if (hasWon) setGameState('won');
    }
  };

  const isRevealed = (char: string) => {
    const upperChar = char.toUpperCase();
    if (upperChar === " " || /[^A-Z]/.test(upperChar)) return true;
    if (vowels.includes(upperChar)) return true;
    return guessedLetters.has(upperChar);
  };

  const getCharStyle = (wordIdx: number, charIdx: number) => {
    const seed = (wordIdx * 17) + (charIdx * 23);
    const rotation = (seed % 6 - 3);
    const offset = (seed % 2 - 1);
    return { rotation, offset };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-parchment dark:bg-[#1e1e1e] flex flex-col overflow-hidden transition-colors duration-500"
    >
      {/* Header */}
      <div className="relative z-[110] flex items-center justify-between px-6 py-4 md:px-12 w-full border-b border-stone-200 dark:border-white/10 bg-white/70 dark:bg-[#1e1e1e]/80 backdrop-blur-xl transition-colors duration-500">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-rose/10 text-rose rounded-lg border border-rose/20">
            <ClapperIcon size={20} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-serif italic text-ink dark:text-white leading-tight">Guess the Movie</h2>
            <p className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Cinematic Journal — Vol. 01</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  scale: i < lives ? 1 : 0.8,
                  opacity: i < lives ? 1 : 0.2
                }}
              >
                <Heart size={20} className={i < lives ? "text-rose fill-rose" : "text-stone-300"} />
              </motion.div>
            ))}
          </div>
          <button onClick={onClose} className="p-3 bg-rose text-white rounded-full hover:rotate-90 transition-all shadow-xl">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative w-full bg-[#f9f7f2] dark:bg-[#1e1e1e] overflow-y-auto custom-scrollbar transition-colors duration-500">
        <div className="min-h-full flex flex-col items-center justify-center p-4 md:p-6 pb-20">
          {/* Cinematic Backdrop - Enhanced film strip motif */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between opacity-[0.05] dark:opacity-[0.03]">
             <div className="h-28 border-b-12 border-dashed border-ink dark:border-white w-full flex items-center px-10 gap-20">
               {[...Array(10)].map((_, i) => <div key={i} className="w-8 h-10 border-2 border-ink dark:border-white rounded-sm opacity-20"></div>)}
             </div>
             <div className="h-28 border-t-12 border-dashed border-ink dark:border-white w-full flex items-center px-10 gap-20">
               {[...Array(10)].map((_, i) => <div key={i} className="w-8 h-10 border-2 border-ink dark:border-white rounded-sm opacity-20"></div>)}
             </div>
          </div>
        
          {/* Floating Decorative Film Quotes & Elements */}
          <div className="absolute left-[5%] top-[25%] max-w-[200px] hidden xl:block opacity-40">
            <motion.div initial={{ rotate: -5 }} animate={{ rotate: -3 }} className="p-4 bg-white dark:bg-stone-800 shadow-lg border border-stone-100 dark:border-white/5 rounded-sm relative">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 washi-tape rotate-2"></div>
               <p className="font-hand text-xl text-ink dark:text-white leading-tight">"Cinema is a matter of what's in the frame and what's out."</p>
               <span className="font-mono text-[8px] uppercase tracking-widest block mt-4 text-stone-400">— Martin Scorsese</span>
            </motion.div>
            <div className="mt-20 flex justify-center text-rose opacity-20">
              <Film size={80} strokeWidth={0.5} />
            </div>
          </div>

          <div className="absolute right-[5%] bottom-[20%] max-w-[200px] hidden xl:block opacity-40">
            <div className="mb-20 flex justify-center text-rose opacity-20 rotate-12">
              <Ticket size={80} strokeWidth={0.5} />
            </div>
            <motion.div initial={{ rotate: 5 }} animate={{ rotate: 3 }} className="p-4 bg-white dark:bg-stone-800 shadow-lg border border-stone-100 dark:border-white/5 rounded-sm relative">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 washi-tape -rotate-2"></div>
               <p className="font-hand text-xl text-ink dark:text-white leading-tight">"Every scene is a canvas of light and shadow."</p>
               <span className="font-mono text-[8px] uppercase tracking-widest block mt-4 text-stone-400">— DP Journal Notes</span>
            </motion.div>
          </div>

          {/* Added Movie Posters on Sides - Positioned to avoid overlapping text */}
          <div className="absolute left-8 lg:left-12 top-[60%] hidden xl:block z-0 opacity-90 pointer-events-none">
             <motion.div 
               initial={{ opacity: 0, x: -50, rotate: -4 }}
               animate={{ opacity: 1, x: 0, rotate: -4 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="p-3 bg-white dark:bg-stone-800 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-stone-100 dark:border-white/5 rounded-sm w-48 2xl:w-56"
             >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-rose/20 backdrop-blur-sm -rotate-2 z-10"></div>
                <div className="aspect-[2/3] overflow-hidden bg-stone-100 dark:bg-stone-900 relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600" 
                    alt="Cinema Poster 1" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white font-serif italic text-xl">The Classics</div>
                </div>
             </motion.div>
          </div>

          <div className="absolute right-8 lg:right-12 top-6 hidden xl:block z-0 opacity-90 pointer-events-none">
             <motion.div 
               initial={{ opacity: 0, x: 50, rotate: 4 }}
               animate={{ opacity: 1, x: 0, rotate: 4 }}
               transition={{ delay: 0.8, duration: 0.8 }}
               className="p-3 bg-white dark:bg-stone-800 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-stone-100 dark:border-white/5 rounded-sm w-48 2xl:w-56"
             >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-rose/20 backdrop-blur-sm rotate-2 z-10"></div>
                <div className="aspect-[2/3] overflow-hidden bg-stone-100 dark:bg-stone-900 relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600" 
                    alt="Cinema Poster 2" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white font-serif italic text-xl">Now Playing</div>
                </div>
             </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-rose/5 blur-[160px] pointer-events-none"></div>

          <div className="max-w-5xl w-full relative z-10 flex flex-col items-center">
            
            {/* Narrative Context Label */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="px-5 py-2 border border-stone-200 dark:border-white/10 rounded-full font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-3 bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm">
                Scene: 01 / Curation
              </div>
              <div className="font-hand text-2xl md:text-3xl lg:text-4xl text-rose/70 text-center px-4">"Frame the title within the reel..."</div>
            </motion.div>

            {/* New Game Layout */}
            <div className="bg-[#fcfbf9] dark:bg-[#2a2a2a] p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 dark:border-white/5 w-full flex flex-col items-center relative transition-colors duration-500">
              
              {/* Word Display - Optimized for mobile/long words */}
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-8 md:gap-y-8 mb-8 md:mb-12 w-full max-w-7xl">
                {currentMovie.split(" ").map((word, wIdx) => (
                  <div key={wIdx} className="flex flex-wrap justify-center gap-1 md:gap-2">
                    {word.split("").map((char, cIdx) => {
                      const revealed = isRevealed(char);
                      const isPunctuation = /[^A-Za-z]/.test(char);
                      const { rotation } = getCharStyle(wIdx, cIdx);
                      
                      if (revealed || isPunctuation) {
                        return (
                          <div key={cIdx} className="relative group">
                             <motion.div 
                               initial={{ scale: 0.8, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1, rotate: rotation }}
                               className="w-6 h-8 sm:w-10 sm:h-14 md:w-14 md:h-20 bg-white dark:bg-stone-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-[2px] flex items-center justify-center border border-stone-50 dark:border-white/5"
                             >
                                <div className="absolute -top-1.5 md:-top-2 w-4 md:w-6 h-2 md:h-4 bg-rose/20 backdrop-blur-sm -rotate-1"></div>
                                <span className={`font-serif italic text-lg sm:text-2xl md:text-4xl ${vowels.includes(char.toUpperCase()) ? 'text-rose' : 'text-ink dark:text-white'}`}>{char}</span>
                             </motion.div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={cIdx} className="w-6 h-8 sm:w-10 sm:h-14 md:w-14 md:h-20 flex items-end justify-center pb-2 md:pb-3">
                             <div className="w-3 md:w-8 border-b-2 border-dashed border-stone-300 dark:border-stone-600"></div>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))}
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-stone-100 dark:bg-white/5 mb-8 md:mb-10"></div>

              {/* Keyboard */}
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 max-w-3xl">
                {consonants.map((letter) => {
                  const isUsed = guessedLetters.has(letter);
                  return (
                    <button
                      key={letter}
                      disabled={isUsed || gameState !== 'playing'}
                      onClick={() => handleGuess(letter)}
                      className={`
                          w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center font-mono text-xs md:text-base transition-all duration-300
                          ${isUsed 
                              ? 'opacity-40 cursor-not-allowed scale-95' 
                              : 'bg-white dark:bg-stone-800 shadow-sm border border-stone-100 dark:border-white/5 hover:-translate-y-1 hover:shadow-md text-stone-600 dark:text-stone-300 hover:text-rose dark:hover:text-rose'
                          }
                      `}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* End Screens - Responsive & Themed */}
            <AnimatePresence>
              {gameState !== 'playing' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-parchment/60 dark:bg-black/70 backdrop-blur-md rounded-[3rem]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="text-center p-8 md:p-14 bg-white dark:bg-[#222] rounded-[2rem] md:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-stone-100 dark:border-white/10 max-w-md w-full relative overflow-hidden"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape opacity-50 -rotate-2"></div>
                    
                    {gameState === 'won' ? (
                      <>
                        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 md:w-20 md:h-20 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                          <Trophy className="w-8 h-8 md:w-10 md:h-10" />
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-serif italic mb-3 dark:text-white leading-tight">Full House!</h3>
                        <p className="font-hand text-2xl md:text-3xl text-rose mb-8 md:mb-12">"Every scene was clear."</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-rose/10 text-rose rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                          <Ghost className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif italic mb-3 dark:text-white leading-tight">Intermission...</h3>
                        <p className="font-hand text-2xl md:text-3xl text-stone-400 mb-8 md:mb-12">"The reel ran out of tape."</p>
                        <div className="mb-8 md:mb-12 p-6 md:p-8 bg-parchment dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-white/5 relative">
                          <div className="absolute top-2 left-6 font-mono text-[9px] uppercase tracking-[0.4em] text-stone-400">Hidden Title</div>
                          <p className="text-2xl md:text-3xl font-serif italic dark:text-white leading-tight mt-4">{currentMovie}</p>
                        </div>
                      </>
                    )}
                    
                    <button
                      onClick={startNewGame}
                      className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-4 md:py-5 rounded-2xl font-serif italic text-xl md:text-2xl flex items-center justify-center gap-4 hover:bg-rose hover:text-white transition-all shadow-xl"
                    >
                      <RefreshCw className="w-5 h-5 md:w-6 md:h-6" /> Play Another
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OrdinaryDesignBingo: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [marked, setMarked] = useState<boolean[]>(new Array(12).fill(false));

  const items = [
    { icon: <Bus size={20} />, text: "Watched city lights from a moving bus", note: "Motion blur memories.", color: "bg-[#fdf6f6]" },
    { icon: <Coffee size={20} />, text: "Sat alone at a café just observing people", note: "The art of being invisible.", color: "bg-[#fcfbf9]" },
    { icon: <CloudRain size={20} />, text: "Got caught in unexpected rain", note: "Nature's unplanned texture.", color: "bg-[#f4f8fa]" },
    { icon: <Layers size={20} />, text: "Noticed textures on old walls", note: "History in peeling paint.", color: "bg-[#fcfbf9]" },
    { icon: <Footprints size={20} />, text: "Walked without a destination", note: "Drifting as a method.", color: "bg-[#fdf6f6]" },
    { icon: <Clock size={20} />, text: "Waited somewhere unfamiliar", note: "Time feels different here.", color: "bg-[#fafbf6]" },
    { icon: <User size={20} />, text: "Saw your reflection in shop glass", note: "A ghost in the window.", color: "bg-[#fcfbf9]" },
    { icon: <Radio size={20} />, text: "Heard unfamiliar street sounds", note: "The city's raw soundtrack.", color: "bg-[#f4f8fa]" },
    { icon: <Sunrise size={20} />, text: "Watched a sunset from a random spot", note: "Light changes everything.", color: "bg-[#fdf6f6]" },
    { icon: <Pause size={20} />, text: "Sat quietly in a public place", note: "Stillness in chaos.", color: "bg-[#fafbf6]" },
    { icon: <Smartphone size={20} />, text: "Checked your phone just to look busy in a new place", note: "Digital shield.", color: "bg-[#fcfbf9]" },
    { icon: <Headphones size={20} />, text: "Put on music and pretended you were in a movie scene", note: "Main character energy.", color: "bg-[#f4f8fa]" }
  ];

  const score = marked.filter(Boolean).length;

  const toggle = (i: number) => {
    const n = [...marked];
    n[i] = !n[i];
    setMarked(n);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[1000] bg-ink/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        className="bg-[#fcfbf9] dark:bg-[#1e1e1e] p-6 md:p-12 rounded-[2px] max-w-5xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative border border-stone-200 dark:border-white/10 transition-colors duration-500 my-auto overflow-hidden"
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

        {/* --- Background Doodles & Quotes --- */}
        <div className="absolute inset-0 pointer-events-none z-0">
           {/* Plane sketch */}
           <div className="absolute top-10 right-10 opacity-10 rotate-12 text-rose">
              <Plane size={120} strokeWidth={0.8} />
              <div className="absolute -bottom-4 left-0 font-hand text-sm text-ink dark:text-white -rotate-6">Let's go somewhere</div>
           </div>
           
           {/* Globe sketch */}
           <div className="absolute bottom-20 left-6 opacity-10 -rotate-12 text-sage">
              <Globe size={140} strokeWidth={0.6} />
           </div>

           {/* Camera sketch */}
           <div className="absolute bottom-10 right-10 opacity-10 rotate-6 text-stone-600">
              <Camera size={100} strokeWidth={0.6} />
           </div>

           {/* Map sketch */}
           <div className="absolute top-40 -left-10 opacity-5 rotate-45 text-ink dark:text-white">
              <MapIcon size={180} strokeWidth={0.4} />
           </div>

           {/* Handwritten Quotes */}
           <div className="absolute top-20 left-8 max-w-[150px] font-hand text-xl text-stone-400 -rotate-6 opacity-60 hidden md:block">
              "To travel is to discover that everyone is wrong about other countries."
           </div>
           
           <div className="absolute bottom-32 right-24 max-w-[150px] font-hand text-xl text-stone-400 rotate-3 opacity-60 hidden md:block text-right">
              "I haven't been everywhere, but it's on my list."
           </div>

           {/* Stamp Effect */}
           <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-20 rotate-[-5deg]">
              <div className="w-32 h-12 border-2 border-rose rounded-sm flex items-center justify-center">
                 <span className="font-mono text-xs text-rose uppercase tracking-widest font-bold">Observation Log</span>
              </div>
           </div>
        </div>

        {/* Tape */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 bg-rose/30 backdrop-blur-sm rotate-1 shadow-sm z-20"></div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-rose transition-colors z-30">
          <X size={24} />
        </button>

        <div className="mb-10 text-center relative z-10 mt-4">
          <h2 className="font-serif italic text-4xl md:text-5xl text-ink dark:text-white mb-2">Finding Design in the Ordinary</h2>
          <p className="font-hand text-xl md:text-2xl text-stone-500 dark:text-stone-300">"Everyday moments shape how I see and design."</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 relative z-10">
          {items.map((item, i) => (
            <motion.button 
              key={i} 
              whileHover={{ scale: 1.03, rotate: Math.random() * 2 - 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(i)} 
              className={`
                aspect-square p-4 flex flex-col items-center justify-between text-center relative transition-all duration-300 shadow-sm hover:shadow-lg group overflow-hidden
                ${marked[i] ? 'bg-white dark:bg-[#252525]' : item.color + ' dark:bg-[#2a2a2a]'}
              `}
              style={{
                transform: `rotate(${Math.random() * 2 - 1}deg)`,
                borderRadius: '2px',
                border: marked[i] ? '2px solid #d4a3a3' : '1px solid rgba(0,0,0,0.05)'
              }}
            >
              {/* Corner tapes for some items */}
              {i % 3 === 0 && !marked[i] && <div className="absolute -top-3 -left-8 w-20 h-5 bg-stone-200/60 dark:bg-white/10 -rotate-45 pointer-events-none"></div>}
              {i % 5 === 0 && !marked[i] && <div className="absolute -bottom-3 -right-8 w-20 h-5 bg-rose/10 dark:bg-rose/10 rotate-45 pointer-events-none"></div>}
              
              {/* Thumbtack for others */}
              {i % 2 !== 0 && i % 3 !== 0 && <div className="absolute top-2 w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-600 shadow-inner mx-auto left-0 right-0"></div>}

              <div className={`transition-all duration-500 flex flex-col items-center justify-center flex-1 w-full gap-3 h-full ${marked[i] ? 'opacity-20 blur-[1px] grayscale' : 'opacity-100'}`}>
                <div className="text-stone-400 dark:text-stone-400 group-hover:text-rose dark:group-hover:text-rose-light group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                </div>
                <p className="text-[11px] md:text-[13px] font-serif text-stone-600 dark:text-stone-300 leading-snug">
                  {item.text}
                </p>
              </div>
              
              <AnimatePresence>
                {marked[i] && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.2, rotate: Math.random() * 10 - 5 }} 
                    animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }} 
                    className="absolute inset-0 flex flex-col items-center justify-center p-3 z-10"
                  >
                    <div className="border-2 border-rose rounded-full w-12 h-12 flex items-center justify-center mb-2 bg-rose/10 backdrop-blur-sm">
                        <Check size={24} strokeWidth={3} className="text-rose" />
                    </div>
                    <p className="font-hand text-lg md:text-xl text-ink dark:text-white leading-tight font-bold rotate-[-2deg] drop-shadow-sm">
                      {item.note}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 border-t-2 border-dashed border-stone-200 dark:border-white/10 pt-6 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-400 bg-white/50 dark:bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
             <span>Awareness Score</span>
             <span className="w-8 h-[1px] bg-stone-300 dark:bg-white/20"></span>
             <span className="text-xl text-rose font-serif italic font-bold">{score} / 12</span>
          </div>
          <p className="font-hand text-lg text-stone-500 dark:text-stone-400">
            "Your score reflects awareness, not achievement."
          </p>
          <button 
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-ink text-white dark:bg-white dark:text-ink hover:bg-rose dark:hover:bg-rose hover:text-white transition-all rounded-full font-serif italic text-sm shadow-md"
          >
            Close Journal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const scrapbookPhotos = [
  { id: '6', url: 'https://i.ibb.co/C3qmqkgG/Whats-App-Image-2026-02-07-at-1-44-55-AM.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Shadow and geometry', tip: 'Look for patterns in architecture.', x: -320, y: -100, rotation: -5, width: 270 },
  { id: '5', url: 'https://i.ibb.co/yccP4Cz7/Whats-App-Image-2026-02-07-at-3-48-36-AM.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Street narratives', tip: 'Capturing the decisive moment.', x: 0, y: -50, rotation: -3, width: 320 },
  { id: '1', url: 'https://i.ibb.co/1GDPbFnt/Whats-App-Image-2026-02-07-at-1-44-56-AM-1.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Kolkata, 2024', tip: 'Leading lines in the city.', x: 350, y: -120, rotation: 3, width: 280 },
  { id: '8', url: 'https://i.ibb.co/8gRv6gWF/Whats-App-Image-2026-02-07-at-3-48-38-AM.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Vantage point', tip: 'Change your perspective.', x: -380, y: 220, rotation: -4, width: 260 },
  { id: '3', url: 'https://i.ibb.co/rXxmSpL/Whats-App-Image-2026-02-07-at-3-48-35-A.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Design in macro', tip: 'Details tell the story.', x: -40, y: 250, rotation: 2, width: 250 },
  { id: '7', url: 'https://i.ibb.co/N2pBt4KV/Whats-App-Image-2026-02-07-at-1-44-56-AM.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Natural framing', tip: 'Using environment as a frame.', x: 340, y: 220, rotation: 5, width: 310 },
  { id: '2', url: 'https://i.ibb.co/mF4Gqr6Z/Whats-App-Image-2026-02-07-at-3-48-34-AM.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Ahmedabad Shadows', tip: 'High contrast at noon.', x: -180, y: -280, rotation: -2, width: 300 },
  { id: '4', url: 'https://i.ibb.co/JjTngWH5/Whats-App-Image-2026-02-07-at-3-48-36.jpg?auto=format&fit=crop&q=80&w=800', caption: 'Morning Stillness', tip: 'Minimalist compositions.', x: 180, y: -280, rotation: 4, width: 320 },
];

const PhotographyScrapbook: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTip, setActiveTip] = useState<string>("Good design starts with knowing what to leave out.");
  const [zIndices, setZIndices] = useState<{ [key: string]: number }>(
    Object.fromEntries(scrapbookPhotos.map((p, i) => [p.id, i + 10]))
  );
  const [viewfinderDim, setViewfinderDim] = useState({ w: 160, h: 160 });
  const [enlargedImage, setEnlargedImage] = useState<{url: string, caption: string} | null>(null);
  
  const viewfinderX = useMotionValue(0);
  const viewfinderY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magic Lens Mask - Updates with viewfinder position
  const maskImage = useMotionTemplate`radial-gradient(circle 120px at calc(50% + ${viewfinderX}px) calc(50% + ${viewfinderY}px), black, transparent)`;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const bringToTop = (id: string) => {
    setZIndices(prev => {
      const maxZ = Math.max(...(Object.values(prev) as number[]));
      return { ...prev, [id]: maxZ + 1 };
    });
  };

  useEffect(() => {
    const unsubscribeX = viewfinderX.on("change", checkCollision);
    const unsubscribeY = viewfinderY.on("change", checkCollision);
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [viewfinderDim]);

  const checkCollision = () => {
    const vX = viewfinderX.get();
    const vY = viewfinderY.get();
    let foundTip = "Good design starts with knowing what to leave out.";
    
    scrapbookPhotos.forEach(photo => {
      const dx = vX - photo.x;
      const dy = vY - photo.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (viewfinderDim.w / 2 + 50)) {
        foundTip = photo.tip;
      }
    });
    
    setActiveTip(foundTip);
  };

  const handleResize = (e: any, info: any) => {
    setViewfinderDim(prev => ({
      w: Math.max(100, prev.w + info.delta.x),
      h: Math.max(100, prev.h + info.delta.y)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-parchment dark:bg-[#1e1e1e] flex flex-col overflow-hidden transition-colors duration-500"
    >
      {/* Header */}
      <div className="relative z-[110] flex items-center justify-between px-6 py-4 md:px-12 w-full border-b border-stone-100 dark:border-white/5 bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur-xl shadow-sm transition-colors duration-500">
        <div className="border-l-2 border-rose pl-4">
          <h2 className="text-xl md:text-2xl font-serif italic text-ink dark:text-white leading-tight">Framing the Everyday</h2>
          <p className="font-hand text-sm md:text-base text-rose dark:text-rose-light">“I train my eye by framing moments before capturing them.”</p>
        </div>
        <button onClick={onClose} className="p-3 bg-rose text-white rounded-full hover:rotate-90 transition-all shadow-xl">
          <X size={20} />
        </button>
      </div>

      <div ref={containerRef} className="flex-1 relative flex items-center justify-center overflow-hidden w-full h-full bg-[#fdfdfd]/10 dark:bg-black/5">
        {/* Background Text - Layer 1 (Base/Faint) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none opacity-10 text-stone-300 dark:text-stone-800">
          <div className="font-mono text-[8px] uppercase tracking-[0.5em]">Observation Deck — Vol. 01</div>
          <div className="font-hand text-6xl md:text-9xl max-w-4xl text-center leading-none italic">"Design is the selective capture of chaos."</div>
        </div>

        {/* Background Text - Layer 2 (Reveal/High Contrast) */}
        <motion.div 
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2 pointer-events-none select-none text-ink dark:text-white"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <div className="font-mono text-[8px] uppercase tracking-[0.5em] font-bold">Observation Deck — Vol. 01</div>
          <div className="font-hand text-6xl md:text-9xl max-w-4xl text-center leading-none italic drop-shadow-lg">"Design is the selective capture of chaos."</div>
        </motion.div>
        
        {scrapbookPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            drag
            dragMomentum={false}
            onDragStart={() => bringToTop(photo.id)}
            onTap={() => bringToTop(photo.id)}
            onDoubleClick={() => setEnlargedImage({ url: photo.url, caption: photo.caption })}
            initial={{ opacity: 0, scale: 0.8, x: photo.x, y: photo.y, rotate: photo.rotation }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="absolute bg-white dark:bg-stone-800 p-2.5 pb-10 shadow-2xl border border-stone-200 dark:border-white/5 polaroid cursor-grab active:cursor-grabbing select-none"
            style={{ width: photo.width, zIndex: zIndices[photo.id] }}
          >
            {/* Removed Tape */}
            <div className="overflow-hidden rounded-sm bg-stone-100 aspect-square md:aspect-auto pointer-events-none">
              <img src={photo.url} className="w-full h-auto pointer-events-none block" style={{ filter: 'none' }} alt="Scrapbook piece" />
            </div>
            <div className="mt-3.5 font-hand text-xl text-stone-400 dark:text-stone-300 text-center italic leading-tight pointer-events-none">
              {photo.caption}
            </div>
          </motion.div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[200]">
          <motion.div
            drag
            dragMomentum={false}
            style={{ x: viewfinderX, y: viewfinderY, width: viewfinderDim.w, height: viewfinderDim.h }}
            className="pointer-events-auto border-2 border-dashed border-rose/60 cursor-move flex items-center justify-center group bg-white/5 backdrop-invert-[0.03] shadow-[0_0_60px_rgba(212,163,163,0.1)] relative"
          >
            <motion.div drag dragMomentum={false} onDrag={handleResize} className="absolute -bottom-2.5 -right-2.5 w-6 h-6 bg-rose rounded-full cursor-nwse-resize z-[210] flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-stone-900"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></motion.div>
            <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-rose"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-rose"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-rose"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-rose"></div>
            <div className="w-4 h-[1px] bg-rose opacity-40"></div>
            <div className="h-4 w-[1px] bg-rose opacity-40 absolute"></div>
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-max max-w-[240px] bg-ink/90 dark:bg-stone-800/90 backdrop-blur-md px-3 py-1.5 rounded-sm text-white font-serif italic text-[11px] shadow-xl text-center">“{activeTip}”</div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {enlargedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEnlargedImage(null)} className="fixed inset-0 z-[400] bg-ink/95 dark:bg-stone-950/98 backdrop-blur-2xl flex items-center justify-center p-8 cursor-zoom-out">
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} className="relative max-w-full max-h-full flex flex-col items-center justify-center">
              <img src={enlargedImage.url} className="max-w-[90vw] max-h-[80vh] object-contain shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-sm border-8 border-white dark:border-stone-800" style={{ filter: 'none' }} alt="Enlarged view" />
              <p className="mt-6 text-white/90 font-serif italic text-lg tracking-wide">{enlargedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

type Mood = 'Happy' | 'Sad' | 'Calm';
type Situation = 'Traveling' | 'At Home' | 'With Friends';

const playlistData: Record<Mood, Record<Situation, { song: string, movie: string, lyric: string, color: string }>> = {
  Happy: {
    Traveling: { song: "Ilahi", movie: "Yeh Jawaani Hai Deewani", lyric: "Mera falsafa kandhe pe mera basta...", color: "bg-amber-100 dark:bg-amber-900/20" },
    "At Home": { song: "Love You Zindagi", movie: "Dear Zindagi", lyric: "Jo dil se lage, use keh do hi...", color: "bg-sky-100 dark:bg-sky-900/20" },
    "With Friends": { song: "Sooraj Dooba Hain", movie: "Roy", lyric: "Matalbi ho ja zara matlabi...", color: "bg-rose-100 dark:bg-rose-900/20" },
  },
  Sad: {
    Traveling: { song: "Kabira", movie: "Yeh Jawaani Hai Deewani", lyric: "Bann thann ke bata kidhar...", color: "bg-slate-200 dark:bg-slate-800" },
    "At Home": { song: "Agar Tum Saath Ho", movie: "Tamasha", lyric: "Teri nazron mein hai tere sapne...", color: "bg-indigo-100 dark:bg-indigo-900/20" },
    "With Friends": { song: "Channa Mereya", movie: "Ae Dil Hai Mushkil", lyric: "Accha chalta hoon, duaon mein yaad rakhna...", color: "bg-gray-200 dark:bg-gray-800" },
  },
  Calm: {
    Traveling: { song: "Safarnama", movie: "Tamasha", lyric: "Sawaalon ki tarah, jawaabon ki tarah...", color: "bg-emerald-100 dark:bg-emerald-900/20" },
    "At Home": { song: "Iktara", movie: "Wake Up Sid", lyric: "Goonja sa hai koi iktara...", color: "bg-teal-100 dark:bg-teal-900/20" },
    "With Friends": { song: "Sham", movie: "Aisha", lyric: "Sham bhi koi jaise hai nadi...", color: "bg-purple-100 dark:bg-purple-900/20" },
  }
};

const BollywoodPlaylistBuilder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [situation, setSituation] = useState<Situation | null>(null);
  
  const moodRef = useRef<HTMLDivElement>(null);
  const situationRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleMoodSelect = (selectedMood: Mood) => {
    setMood(selectedMood);
    setSituation(null);
    setTimeout(() => {
      situationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSituationSelect = (selectedSituation: Situation) => {
    setSituation(selectedSituation);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const currentResult = mood && situation ? playlistData[mood][situation] : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[1000] bg-parchment dark:bg-[#1e1e1e] flex flex-col transition-colors duration-500"
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-between px-6 py-4 md:px-12 w-full bg-white/70 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-stone-200 dark:border-white/10 transition-colors duration-500">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-rose/10 text-rose rounded-lg"><Music2 size={20} /></div>
           <div>
             <h2 className="text-xl font-serif italic text-ink dark:text-white leading-none">Playlist Builder</h2>
             <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1">Bollywood Edition</p>
           </div>
        </div>
        <button onClick={onClose} className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-rose hover:text-white transition-colors dark:text-white"><X size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth pt-20">
        <div className="max-w-3xl mx-auto px-6 pb-24">
          
          {/* Section 1: Mood */}
          <div ref={moodRef} className="min-h-[80vh] flex flex-col justify-center py-12">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink dark:text-white mb-6">Build Your <br/><span className="italic text-rose">Bollywood Playlist</span></h1>
               <p className="font-mono text-sm text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em]">Scroll and choose your vibe</p>
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-8 flex justify-center opacity-30">
                 <ChevronDown size={32} />
               </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {(['Happy', 'Sad', 'Calm'] as Mood[]).map((m) => (
                 <motion.button
                   key={m}
                   whileHover={{ scale: 1.05, y: -5 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => handleMoodSelect(m)}
                   className={`p-8 md:p-12 rounded-[2rem] text-center border-2 transition-all duration-300 ${mood === m ? 'bg-rose text-white border-rose shadow-xl' : 'bg-white dark:bg-[#2a2a2a] border-stone-100 dark:border-white/10 hover:border-rose/50 dark:hover:border-rose/50'}`}
                 >
                   <div className="text-3xl font-serif italic mb-2 dark:text-white">{m}</div>
                   <div className="w-8 h-1 bg-current opacity-20 mx-auto rounded-full"></div>
                 </motion.button>
               ))}
            </div>
          </div>

          {/* Section 2: Situation */}
          <AnimatePresence>
            {mood && (
              <motion.div 
                ref={situationRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="min-h-[80vh] flex flex-col justify-center py-12 border-t border-stone-200 dark:border-white/5"
              >
                <div className="text-center mb-16">
                   <h3 className="text-4xl md:text-5xl font-serif italic text-ink dark:text-white mb-4">What's the setting?</h3>
                   <p className="text-stone-500 dark:text-stone-400">Context matters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {(['Traveling', 'At Home', 'With Friends'] as Situation[]).map((s) => (
                     <motion.button
                       key={s}
                       whileHover={{ scale: 1.05, y: -5 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={() => handleSituationSelect(s)}
                       className={`p-8 md:p-10 rounded-[2rem] text-center border-2 transition-all duration-300 ${situation === s ? 'bg-ink dark:bg-white text-white dark:text-ink border-ink dark:border-white shadow-xl' : 'bg-white dark:bg-[#2a2a2a] text-stone-600 dark:text-white border-stone-100 dark:border-white/10 hover:border-ink/20 dark:hover:border-white/20'}`}
                     >
                       <div className="text-2xl font-serif italic">{s}</div>
                     </motion.button>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 3: Result */}
          <AnimatePresence>
             {mood && situation && currentResult && (
               <motion.div 
                 ref={resultRef}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className="min-h-[60vh] flex items-center justify-center py-12"
               >
                 <div className={`relative p-10 md:p-16 rounded-[3rem] w-full max-w-xl text-center shadow-2xl border border-white/20 ${currentResult.color}`}>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 washi-tape opacity-60 rotate-2"></div>
                    
                    <div className="mb-8">
                       <span className="inline-block px-4 py-1 rounded-full bg-white/40 border border-white/20 text-xs font-mono uppercase tracking-widest backdrop-blur-sm mb-6">
                          Your Soundtrack
                       </span>
                       <h2 className="text-4xl md:text-6xl font-serif font-bold text-ink dark:text-white mb-2 leading-tight">
                         "{currentResult.song}"
                       </h2>
                       <p className="text-xl font-serif italic text-stone-600 dark:text-stone-200">
                         from {currentResult.movie}
                       </p>
                    </div>

                    <div className="relative py-8 px-4">
                       <Quote size={24} className="absolute top-0 left-0 text-ink/20 dark:text-white/20" />
                       <p className="font-hand text-2xl md:text-3xl text-ink dark:text-white leading-relaxed">
                         {currentResult.lyric}
                       </p>
                       <Quote size={24} className="absolute bottom-0 right-0 text-ink/20 dark:text-white/20 rotate-180" />
                    </div>

                    <button 
                      onClick={() => {
                        setMood(null);
                        setSituation(null);
                        setTimeout(() => moodRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                      }}
                      className="mt-10 px-8 py-3 bg-white dark:bg-[#333] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-ink transition-all shadow-lg"
                    >
                      Start Over
                    </button>
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
          
        </div>
      </div>
    </motion.div>
  );
};

const hobbies = [
  { 
    name: 'Photography', 
    icon: <Camera size={24} />, 
    bgColor: 'bg-[#f1f5fd] dark:bg-blue-400/15', 
    description: 'Focusing on composition and visual observation in the wild.', 
    interactive: true 
  },
  { 
    name: 'Bollywood Playlist', 
    icon: <Music size={24} />, 
    bgColor: 'bg-[#fdf1f1] dark:bg-[#ff9fa2]/15', 
    description: 'Curate your cinematic soundtrack.', 
    interactive: true 
  },
  { 
    name: 'Finding Design in the Ordinary', 
    icon: <Compass size={24} />, 
    bgColor: 'bg-[#f1fdf1] dark:bg-emerald-400/15', 
    description: 'Everyday moments shape how I see and design.', 
    interactive: true 
  },
  { 
    name: 'Visual Narratives', 
    icon: <Film size={24} />, 
    bgColor: 'bg-[#fdfbf1] dark:bg-amber-400/15', 
    description: 'A deep dive into watching films and analyzing visual storytelling.',
    interactive: true
  }
];

const Hobbies: React.FC = () => {
  const [activeInteraction, setActiveInteraction] = useState<string | null>(null);
  return (
    <section id="hobbies" className="py-24 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
          >
            <span className="font-hand text-2xl text-rose dark:text-rose-light mb-2 block">Beyond the Grid</span>
            <h2 className="text-5xl lg:text-7xl font-serif italic dark:text-white">The Ephemera</h2>
            <p className="mt-4 text-lg font-serif text-stone-500 dark:text-stone-400 max-w-lg leading-relaxed italic opacity-80">
              A collection of hobby-inspired games, each hiding a small interactive experience.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hobbies.map((hobby, i) => (
            <motion.div 
              key={hobby.name} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              whileHover={{ y: -5 }} 
              onClick={() => hobby.interactive && setActiveInteraction(hobby.name)} 
              className={`p-8 bg-white dark:bg-[#333333] rounded-3xl border border-stone-100 dark:border-white/5 shadow-sm transition-all group ${hobby.interactive ? 'cursor-pointer hover:border-rose/50' : 'cursor-default'}`}
            >
              <div className={`w-14 h-14 ${hobby.bgColor} rounded-2xl flex items-center justify-center text-rose dark:text-rose-light mb-6 group-hover:scale-110 transition-transform`}>
                {hobby.icon}
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-serif font-bold dark:text-white">{hobby.name}</h3>
                {hobby.interactive && (<Maximize2 size={14} className="text-rose opacity-0 group-hover:opacity-100 transition-opacity" />)}
              </div>
              <p className="text-stone-500 dark:text-stone-200 font-serif italic leading-relaxed">{hobby.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {activeInteraction === 'Photography' && (<PhotographyScrapbook onClose={() => setActiveInteraction(null)} />)}
        {activeInteraction === 'Bollywood Playlist' && (<BollywoodPlaylistBuilder onClose={() => setActiveInteraction(null)} />)}
        {activeInteraction === 'Finding Design in the Ordinary' && (<OrdinaryDesignBingo onClose={() => setActiveInteraction(null)} />)}
        {activeInteraction === 'Visual Narratives' && (<GuessTheMovieGame onClose={() => setActiveInteraction(null)} />)}
      </AnimatePresence>
    </section>
  );
};

export default Hobbies;
