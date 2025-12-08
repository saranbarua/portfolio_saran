import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Zap, Smartphone, Code, 
  Github, Twitter, Linkedin, Mail, ArrowRight,
  Sparkles, Layers, Mic
} from 'lucide-react';
import { Phone, PhoneScreenContent } from './components/Phone';
import { ProjectCard } from './components/ProjectCard';
import { Project, NavItem } from './types';

// --- DATA ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "VibeCheck",
    category: "Social",
    description: "A real-time mood sharing platform built with React Native and Supabase. Features live geofencing, haptic feedbacks, and instant messaging.",
    downloads: "12k+",
    rating: 4.8,
    image: "https://picsum.photos/200/200?random=1",
    color: "from-purple-600 to-indigo-600",
    tags: ["React Native", "Expo", "Supabase"]
  },
  {
    id: 2,
    title: "ZenFit",
    category: "Health",
    description: "AI-powered workout generator. Uses camera vision to correct posture in real-time. Integrated with HealthKit.",
    downloads: "50k+",
    rating: 4.9,
    image: "https://picsum.photos/200/200?random=2",
    color: "from-cyan-500 to-teal-500",
    tags: ["TensorFlow.js", "React Native", "HealthKit"]
  },
  {
    id: 3,
    title: "CryptoDash",
    category: "Finance",
    description: "High-performance crypto portfolio tracker with heavy skia-based charting and real-time websocket updates.",
    downloads: "8k+",
    rating: 4.6,
    image: "https://picsum.photos/200/200?random=3",
    color: "from-orange-500 to-red-500",
    tags: ["Skia", "Reanimated", "WebSockets"]
  },
  {
    id: 4,
    title: "Foodie",
    category: "Lifestyle",
    description: "Restaurant discovery app with AR menus. Point your phone at a restaurant to see 3D floating dishes.",
    downloads: "25k+",
    rating: 4.7,
    image: "https://picsum.photos/200/200?random=4",
    color: "from-pink-500 to-rose-500",
    tags: ["ViroReact", "GraphQL", "Node.js"]
  }
];

const SKILLS = [
  { name: "React Native", level: 98 },
  { name: "TypeScript", level: 95 },
  { name: "React.js", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Design Systems", level: 92 },
  { name: "Framer Motion", level: 88 }
];

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'hero', icon: Smartphone },
  { label: 'Work', id: 'work', icon: Layers },
  { label: 'About', id: 'about', icon: Sparkles },
  { label: 'Play', id: 'playground', icon: Zap },
];

export default function App() {
  // --- STATE ---
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [showConfetti, setShowConfetti] = useState(true);

  // --- REFS & MOTION ---
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  // --- EFFECTS ---
  useEffect(() => {
    // Dark mode init
    const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Custom Cursor logic
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
      // For Phone Parallax
      const xPct = (e.clientX / window.innerWidth - 0.5) * 1000;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 1000;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Confetti timer
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
     if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
     } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
     }
  }, [darkMode]);

  const toggleTheme = () => {
    // Haptic sound simulation
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio autoplay prevented")); // Catch autoplay block
    setDarkMode(!darkMode);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // --- RENDER HELPERS ---

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-brand-dark' : 'bg-gray-50'}`}>
      
      {/* --- CUSTOM CURSOR --- */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      >
        <div className={`w-full h-full rounded-full bg-white transition-all duration-200 ease-out ${cursorVariant === 'hover' ? 'scale-[2.5] opacity-50' : 'scale-100 opacity-100'}`} />
      </div>

      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-brand-pink/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold font-display tracking-tighter"
        >
          saran<span className="text-brand-purple">.dev</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-lg border border-white/10 p-2 rounded-full shadow-lg">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeSection === item.id 
                  ? 'text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-brand-purple rounded-full shadow-lg shadow-brand-purple/40"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center space-x-2">
                <item.icon size={16} />
                <span>{item.label}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/5 backdrop-blur hover:bg-white/10 border border-white/10 transition-transform active:scale-90"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-brand-purple" />}
          </button>
          
          <button 
             className="md:hidden p-3"
             onClick={() => setIsMenuOpen(true)}
          >
             <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-brand-dark p-6 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-100 dark:bg-white/5 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl font-bold font-display text-left flex items-center space-x-4"
                >
                  <item.icon size={32} className="text-brand-purple" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="text-center text-gray-500 pb-8">
               &copy; 2025 Saran Barua. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 z-10 order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
               <span className="inline-block px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-sm tracking-wide mb-4 border border-brand-purple/20">
                 Available for new projects
               </span>
               <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1]">
                 Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan">Addictive</span> Mobile Experiences
               </h1>
               <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mt-6 leading-relaxed">
                 Hi, I'm Saran. I bridge the gap between design and engineering to build React Native apps that feel truly native.
               </p>

               <div className="flex flex-wrap gap-4 mt-8">
                  <button 
                    onClick={() => scrollToSection('work')}
                    className="group relative px-8 py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-bold text-lg overflow-hidden transition-transform active:scale-95"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <span className="relative z-10 flex items-center">
                      View Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="px-8 py-4 bg-transparent border-2 border-gray-200 dark:border-white/10 rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    About Me
                  </button>
               </div>
             </motion.div>

             <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-brand-purple transition-colors"><Github /></a>
                <a href="#" className="hover:text-brand-cyan transition-colors"><Twitter /></a>
                <a href="#" className="hover:text-brand-pink transition-colors"><Linkedin /></a>
             </div>
          </div>

          {/* 3D Phone Mockup */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="relative z-10 order-1 lg:order-2 flex justify-center"
          >
             <Phone mouseX={mouseX} mouseY={mouseY}>
                <PhoneScreenContent />
             </Phone>
          </motion.div>
        </div>
      </section>

      {/* --- WORK SECTION (Showcase) --- */}
      <section id="work" className="py-24 relative">
        <div className="container mx-auto px-6 mb-12">
           <motion.h2 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-4xl md:text-6xl font-bold font-display mb-4"
           >
             Selected Work
           </motion.h2>
           <p className="text-gray-500 text-lg max-w-xl">
             A collection of cross-platform apps built with React Native, Expo, and pure obsession for details.
           </p>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="w-full overflow-x-auto no-scrollbar pb-20 pl-6 md:pl-[max(2rem,calc((100vw-1200px)/2))]">
           <div className="flex space-x-8 w-max pr-12">
              {PROJECTS.map((project, index) => (
                 <motion.div
                   key={project.id}
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                    <ProjectCard project={project} />
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- ABOUT & SKILLS SECTION --- */}
      <section id="about" className="py-24 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
            
            {/* Bio Card */}
            <div>
               <h2 className="text-4xl font-bold font-display mb-8">Behind the Code</h2>
               <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan mb-6 overflow-hidden">
                     <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
                  </div>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 font-medium">
                    I'm a Co-Founder & Mobile Architect based in Bangladesh. I don't just write code; I craft systems. 
                    I co-founded a startup with my partner Kamrul, focusing on scalable SaaS solutions.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    When I'm not fighting Xcode build errors, I'm contributing to Open Source or experimenting with WebGL.
                  </p>
               </div>
            </div>

            {/* Skills */}
            <div>
               <h2 className="text-2xl font-bold font-display mb-8">Tech Stack</h2>
               <div className="space-y-6">
                  {SKILLS.map((skill, index) => (
                     <motion.div 
                       key={skill.name}
                       initial={{ opacity: 0, x: 50 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ delay: index * 0.1 }}
                     >
                        <div className="flex justify-between mb-2">
                           <span className="font-bold">{skill.name}</span>
                           <span className="text-brand-purple font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${skill.level}%` }}
                             transition={{ duration: 1.5, ease: "circOut" }}
                             className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                           />
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* --- PLAYGROUND SECTION --- */}
      <section id="playground" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">Creative Playground</h2>
          <p className="mb-12 text-gray-500">Say "Purple", "Cyan", or "Pink" to change the orb color (Web Speech API)</p>
          
          <div className="h-[400px] w-full max-w-3xl mx-auto bg-gray-900 rounded-3xl relative overflow-hidden border border-white/10 flex items-center justify-center">
             <InteractiveOrb />
          </div>
        </div>
      </section>

      {/* --- CONTACT/FOOTER --- */}
      <footer className="py-24 bg-brand-dark text-white relative">
        <div className="container mx-auto px-6 text-center">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="max-w-2xl mx-auto"
           >
              <h2 className="text-5xl font-bold font-display mb-8">Ready to build the next big thing?</h2>
              <button 
                className="px-10 py-5 bg-white text-brand-dark rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                onClick={() => window.location.href = 'mailto:hello@saran.dev'}
              >
                Let's Talk
              </button>
           </motion.div>

           <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2025 Saran Barua. Built with React & Framer Motion.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                 <a href="#" className="hover:text-white transition-colors">Github</a>
                 <a href="#" className="hover:text-white transition-colors">Twitter</a>
                 <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS FOR APP ---

const InteractiveOrb = () => {
  const [color, setColor] = useState('#7C3AED'); // Default Purple
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("Click mic to start voice control");

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setMessage("Browser does not support Speech API");
      return;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    setListening(true);
    setMessage("Listening... Say a color");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setMessage(`Heard: "${transcript}"`);
      
      if (transcript.includes('purple')) setColor('#7C3AED');
      if (transcript.includes('cyan') || transcript.includes('blue')) setColor('#06B6D4');
      if (transcript.includes('pink') || transcript.includes('red')) setColor('#EC4899');
      if (transcript.includes('green')) setColor('#10B981');
      
      setListening(false);
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
       <motion.div 
         animate={{ 
           scale: [1, 1.2, 1],
           rotate: [0, 90, 180, 270, 360],
           backgroundColor: color
         }}
         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
         className="w-40 h-40 rounded-full blur-2xl opacity-80 mix-blend-screen"
         style={{ boxShadow: `0 0 100px ${color}` }}
       />
       
       <button 
         onClick={startListening}
         className={`absolute bottom-8 flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-md border transition-all ${listening ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
       >
          <Mic size={18} className={listening ? 'animate-pulse' : ''} />
          <span>{listening ? 'Listening...' : 'Tap to Command'}</span>
       </button>
       
       <div className="absolute top-8 text-white/50 font-mono text-sm">
          {message}
       </div>
    </div>
  )
}
