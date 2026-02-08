
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, Feather, X, RefreshCw } from 'lucide-react';

// --- Interactive Doodle Game (Tic-Tac-Toe) ---
const DoodleGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i] || !isXNext) return;
    const nextBoard = [...board];
    nextBoard[i] = 'X';
    setBoard(nextBoard);
    setIsXNext(false);
  };

  // AI Opponent - Enhanced Difficulty
  useEffect(() => {
    if (!isXNext && !winner && board.includes(null)) {
      const timer = setTimeout(() => {
        const availableIndices = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
        
        let moveIndex = -1;

        // Strategy 1: Check for winning move
        for (let i of availableIndices) {
          const tempBoard = [...board];
          tempBoard[i] = 'O';
          if (calculateWinner(tempBoard) === 'O') {
            moveIndex = i;
            break;
          }
        }

        // Strategy 2: Block opponent's winning move
        if (moveIndex === -1) {
          for (let i of availableIndices) {
            const tempBoard = [...board];
            tempBoard[i] = 'X';
            if (calculateWinner(tempBoard) === 'X') {
              moveIndex = i;
              break;
            }
          }
        }

        // Strategy 3: Take center if available
        if (moveIndex === -1 && availableIndices.includes(4)) {
          moveIndex = 4;
        }

        // Strategy 4: Random move
        if (moveIndex === -1) {
          moveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        }

        const nextBoard = [...board];
        nextBoard[moveIndex] = 'O';
        setBoard(nextBoard);
        setIsXNext(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
    } else if (!board.includes(null)) {
      setIsDraw(true);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        className="bg-parchment dark:bg-[#333] p-8 rounded-lg shadow-2xl border-2 border-stone-200 dark:border-white/10 relative max-w-[320px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape opacity-60"></div>
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-stone-400 hover:text-rose transition-all duration-300 hover:rotate-90">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h4 className="font-serif italic text-2xl dark:text-white mb-1">Journal Margin Game</h4>
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Tic-Tac-Toe vs Smart AI</p>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-stone-100 dark:bg-stone-800 p-2 rounded-md">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="h-20 bg-white dark:bg-[#444] rounded-sm flex items-center justify-center text-4xl font-hand transition-colors hover:bg-stone-50 dark:hover:bg-stone-700"
            >
              {cell === 'X' && <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} className="text-rose">X</motion.span>}
              {cell === 'O' && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-stone-400 dark:text-stone-300 italic">O</motion.span>}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center h-12 flex flex-col items-center justify-center">
          {winner ? (
            <motion.p initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-rose font-hand text-2xl">
              {winner === 'X' ? 'Victory!' : 'Mahi won!'}
            </motion.p>
          ) : isDraw ? (
            <motion.p initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-stone-500 font-serif italic text-xl">
              Stalemate.
            </motion.p>
          ) : (
            <p className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">
              {isXNext ? 'Your turn (X)' : 'Thinking... (O)'}
            </p>
          )}
        </div>

        <button 
          onClick={resetGame}
          className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-300 hover:text-rose transition-colors"
        >
          <RefreshCw size={14} /> Reset Sketch
        </button>
      </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const rotateScroll = useTransform(scrollY, [0, 500], [-2, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleText = "Communication";
  const subtitleText = "art form.";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { delay: 0.3, staggerChildren: 0.04 } },
  } as const;

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  return (
    <section id="top" className="relative min-h-[70vh] lg:min-h-screen flex items-center px-6 lg:px-20 pt-8 pb-16 lg:py-0 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
        
        <div className="sm:col-span-1 lg:col-span-8 z-10">
          <div className="relative">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-hand text-xl md:text-2xl text-rose dark:text-rose-light mb-4 lg:mb-6 block"
            >
              Hello, I'm Mahi.
            </motion.span>
            
            <motion.h1 
              variants={sentence}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-serif font-light leading-[0.95] lg:leading-[0.85] tracking-tight mb-8 text-ink dark:text-white"
            >
              <div className="block whitespace-nowrap">
                {titleText.split("").map((char, index) => (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </div>
              
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 md:gap-x-4">
                <span className="italic text-stone-400 dark:text-stone-300">as an </span> 
                <span className="relative inline-block pb-1">
                  {subtitleText.split("").map((char, index) => (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              </div>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-sm md:text-lg font-serif text-stone-500 dark:text-stone-200 max-w-md leading-relaxed italic mb-10"
            >
              A designer documenting the intersection of <span className="text-ink dark:text-white font-medium">human emotion</span> and visual structure.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex items-center gap-6"
            >
              <a 
                href="#works" 
                onClick={(e) => scrollToSection(e, '#works')}
                className="group flex items-center gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-ink dark:text-white hover:text-rose dark:hover:text-rose-light transition-colors"
              >
                Open Portfolio
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center group-hover:bg-rose group-hover:text-white transition-all">
                  <ArrowDownRight size={14} />
                </div>
              </a>
              <div className="font-hand text-rose dark:text-rose-light text-lg">Est. 2026</div>
            </motion.div>
          </div>
        </div>

        <div className="sm:col-span-1 lg:col-span-4 relative flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 1.02, rotate: 3 }}
            animate={{ opacity: 1, scale: isHovered ? 1.05 : 1, rotate: 1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            style={{ 
              y: useTransform(scrollY, [0, 500], [0, 20]), 
              rotate: rotateScroll,
              x: springX,
              translateY: springY
            }}
            className="relative polaroid cursor-default z-20 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] bg-white will-change-transform"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 washi-tape opacity-50 z-30"></div>
            
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-stone-100">
              <motion.img 
                initial={{ filter: 'grayscale(100%) brightness(1.1) sepia(0.1)' }}
                animate={{ 
                  filter: isHovered ? 'grayscale(0%) brightness(1.0) sepia(0)' : 'grayscale(100%) brightness(1.1) sepia(0.1)',
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.6 }}
                src="https://i.ibb.co/Pvr8ySS0/Whats-App-Image-2026-02-03-at-2-57-50-PM.jpg?auto=format&fit=crop&q=80&w=800" 
                alt="Creative Desk" 
                className="w-full h-full object-cover will-change-[filter,transform]"
              />
            </div>

            {/* Interactive Feather Icon */}
            <motion.div 
              onClick={() => setIsGameOpen(true)}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: isHovered ? 1.25 : 1, rotate: isHovered ? 15 : 5 }}
              transition={{ delay: 2, duration: 0.6, type: "spring" }}
              className="absolute -bottom-6 -right-4 w-14 h-14 bg-white dark:bg-[#696969] rounded-xl shadow-lg border border-stone-100 dark:border-white/10 flex items-center justify-center z-40 transition-transform duration-500 cursor-pointer hover:bg-rose group/game"
            >
              <Feather className="text-rose group-hover/game:text-white transition-colors" size={24} />
            </motion.div>

            <div className="mt-4 font-hand text-xl text-stone-400 dark:text-stone-200 text-center">
              "Process is the artifact"
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isGameOpen && (
          <DoodleGame onClose={() => setIsGameOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
