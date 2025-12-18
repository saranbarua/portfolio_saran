import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValue,
} from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Smartphone,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
  Layers,
  Mic,
  Facebook,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { Phone, PhoneScreenContent } from "./components/Phone";
import { Project, NavItem } from "./types";
import { IMAGES } from "./components/assets/Images";
import LeadershipCreativeWork from "./components/LeadershipCreativeWork";

// --- DATA ---
const PROJECTS: Project[] = [
  {
    id: 1,
    type: "app",
    title: "11Pets",
    description:
      "The 11pets app makes it possible to share information and work collaboratively with pet care providers in order to give your pets the highest quality care",
    technologies: ["React Native", "TypeScript", "Supabase"],
    metric: { label: "Downloads", value: "500k+" },
    image: IMAGES.pets11,
    color: "from-purple-600 to-indigo-600",
  },
  {
    id: 2,
    type: "app",
    title: "Mayani",
    description:
      "A retailer app that manages sales, collections, cost calculations, delivery orders, and marketer performance data in one centralized dashboard.",
    technologies: ["React Native", "Expo", "Node JS"],
    metric: { label: "Users", value: "100+" },
    image: IMAGES.Retailer,
    color: "from-pink-500 to-teal-500",
  },

  {
    id: 3,
    type: "app",
    title: "Tscore",
    description:
      "T Score cricket app provides live scores, stats, and news for international and domestic leagues (IPL, BBL, BPL, etc.) timely updates, and features.",
    technologies: ["React Native", "TensorFlow.js"],
    metric: { label: "Users", value: "1k+" },
    image: IMAGES.Tscore,
    color: "from-orange-500 to-teal-500",
  },
  {
    id: 4,
    type: "app",
    title: "Logistaras",
    description:
      "Logistaras is a service application that aims to help those in self-employment manage their finances and keep track of their tax responsibilities.",
    technologies: ["React Native", "TensorFlow.js"],
    metric: { label: "Users", value: "100+" },
    image: IMAGES.logistaras,
    color: "from-cyan-500 to-teal-500",
  },
  {
    id: 5,
    type: "app",
    title: "Somiti Management App",
    description:
      "A management application for handling member records, collections, expenses, and financial reporting for a local somiti in Chattogram.",
    technologies: ["React Native", "Expo", "Firebase"],
    metric: { label: "Users", value: "100+" },
    image: IMAGES.somiti,
    color: "from-red-500 to-teal-500",
  },
  {
    id: 6,
    type: "app",
    title: "Turf Management App",
    description:
      "Turf  allows players to easily check available time slots and book a turf online. It helps turf owners manage schedules, pricing in one place.",
    technologies: ["React Native", "Expo", "Node Js"],
    metric: { label: "Users", value: "100+" },
    image: IMAGES.Turf,
    color: "from-green-500 to-teal-500",
  },

  {
    id: 7,
    type: "web",
    title: "Mytrams",
    description:
      "MYTRAMS is a travel agency management system that centralizes daily operations. It handles ticketing, visa, hotel and holiday bookings, finance, refunds, reporting, and role-based access to support efficient and scalable travel businesses.",
    technologies: ["React", "PostgreSQL", "TypeScript", "Node.js"],
    image: IMAGES.mytrams,
    color: "from-gray-500 to-red-500",
    liveUrl: "https://mytrams.com/",
  },
  {
    id: 8,
    type: "web",
    title: "Nested Matrix",
    description:
      "Nested Matrix is a restaurant automation system built to streamline daily operations. It manages orders, billing, inventory, staff workflows, and sales reporting to help restaurants operate faster and with greater accuracy.",
    technologies: ["React", "PostgreSQL", "TypeScript", "Node.js"],
    image: IMAGES.Nested,
    color: "from-purple-600 to-indigo-600",
    liveUrl: "https://nested-matrix.vercel.app/",
  },
  {
    id: 9,
    type: "web",
    title: "Visamind",
    description:
      "VisaMind is a visa management system designed to organize processing workflows. It handles applicant records, document tracking, status updates, and reporting to help agencies manage visa operations efficiently.",
    technologies: ["Next Js", "MongoDB", "Node.js"],
    image: IMAGES.visamind,
    color: "from-cyan-600 to-indigo-600",
    liveUrl: "https://visamind.net",
  },
  {
    id: 10,
    type: "web",
    title: "Travelion",
    description:
      "Travelion is a B2B travel technology platform for managing agency operations. It supports ticketing, visa, hotel, holiday, and partner transactions through a centralized, automation-driven system.",
    technologies: ["React", "MongoDB", "Express Js", "Node.js"],
    image: IMAGES.travilion,
    color: "from-green-600 to-indigo-600",
    liveUrl: "https://travelionreact.vercel.app/",
  },
  {
    id: 11,
    type: "web",
    title: "Hotel Admin Panel",
    description:
      "Admin Panel is a centralized system for managing multiple modules. It provides user management, role-based access control, data oversight, and reporting to ensure secure administration.",
    technologies: ["React", "Redux"],
    image: IMAGES.Tramedi,
    color: "from-pink-600 to-indigo-600",
    liveUrl: "https://somiti-admin.vercel.app/",
  },
  {
    id: 12,
    type: "web",
    title: "Chattogram Somiti",
    description:
      "Chattogram Somiti DMM is a digital management system for Somiti operations. It manages members, savings, loans, collections, reporting, and administrative control to ensure transparency.",
    technologies: ["React", "PostgreSQL", "TypeScript", "Node.js"],
    image: IMAGES.SomitiWeb,
    color: "from-red-600 to-indigo-600",
    liveUrl: "https://ctgsomitidmm.com/",
  },
];

const SKILLS = [
  { name: "React Native", level: 98 },
  { name: "TypeScript", level: 95 },
  { name: "React.js", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Design Systems", level: 92 },
  { name: "Framer Motion", level: 88 },
];

const EXPERIENCES = [
  {
    id: 1,
    period: "2022 – Present",
    title: "Chief Technology Officer  & Co-founder",
    company: "Makeup Coders",
    location: "Chattogram, Bangladesh",
    description:
      "Co-founded Makeup Coders; leading project delivery, product planning, and engineering processes.",
    bullets: [
      "Own end-to-end delivery for multiple SaaS and mobile products, from scope to release.",
      "Lead a cross-functional team of developers, designers, and stakeholders with clear roadmaps and sprint rituals.",
      "Define technical architecture for React, React Native & Node.js projects with scalability in mind.",
      "Work directly with clients to translate business goals into realistic, shippable features.",
    ],
  },
  {
    id: 2,
    period: "Oct 2022 – Oct 2023",
    title: "Mobile Application Developer (Part-time)",
    company: "Code Optimizer",
    location: "Remote · Upwork",
    description:
      "Worked remotely with Code Optimizer to build and optimize high-performance cross-platform mobile experiences using React Native.",
    bullets: [
      "Developed and optimized React Native applications for both iOS and Android platforms.",
      "Implemented modern UI components, smooth navigation flows, and performance-focused animations.",
      "Integrated REST APIs and managed client-side state across complex mobile modules.",
      "Collaborated directly with Upwork clients, delivering features on time with strong attention to UX.",
    ],
  },
  {
    id: 3,
    period: "May 2022 – Sep 2022",
    title: "Backend Developer Intern",
    company: "Institute of Global Professionals (IGP)",
    location: "Chattogram, Bangladesh",
    description:
      "Contributed to one of Bangladesh’s leading educational management platforms by building backend features and supporting full project cycles.",
    bullets: [
      "Developed and maintained backend modules using Node.js, HTML, CSS, and modern JS.",
      "Collaborated with a passionate engineering team to deliver scalable and efficient features.",
      "Participated in requirement analysis, sprint planning, and deployment workflows.",
      "Enhanced problem-solving and version control skills through real-world project challenges.",
    ],
  },

  {
    id: 4,
    period: "Feb 2020 – May 2022",
    title: "Web Designer",
    company: "SoftSource",
    location: "Chattogram, Bangladesh · Hybrid",
    description:
      "Designed and developed visually appealing, user-friendly websites and interfaces in one of my earliest professional roles.",
    bullets: [
      "Created responsive layouts using HTML, CSS, Bootstrap, and JavaScript.",
      "Improved UI/UX by applying modern design principles and usability best practices.",
      "Worked closely with clients and internal teams to translate design requirements into functional interfaces.",
    ],
  },

  {
    id: 5,
    period: "Feb 2022 – Apr 2022",
    title: "Web Development Trainee (Internship)",
    company: "SEIP",
    location: "Chattogram, Bangladesh",
    description:
      "Completed an intensive internship under SEIP focused on practical web development, structured learning, and hands-on project execution.",
    bullets: [
      "Strengthened foundational skills in Laravel, PHP, and full-stack development workflows.",
      "Worked on guided modules that connected learning with real project scenarios.",
      "Gained confidence working with new tools, processes, and collaborative environments.",
    ],
  },

  {
    id: 6,
    period: "Feb 2019 – Jan 2020",
    title: "Marketing Executive",
    company: "MidDayDreams",
    location: "Chattogram, Bangladesh",
    description:
      "Executed marketing strategies and digital campaigns to increase brand visibility and audience engagement.",
    bullets: [
      "Developed and executed targeted marketing campaigns.",
      "Managed social media channels and produced engaging content.",
      "Analyzed campaign metrics to refine strategies and improve performance.",
    ],
  },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "hero", icon: Smartphone },
  { label: "Work", id: "work", icon: Layers },
  { label: "Experience", id: "experience", icon: Briefcase },
  { label: "About", id: "about", icon: Sparkles },
  { label: "Creative", id: "creative", icon: Sparkles },

  { label: "Contact", id: "contact", icon: Mail },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`New Contact from ${formData.name}`);

    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `);

    // 👉 YOUR PERSONAL EMAIL HERE
    // window.location.href = `mailto:saranbarua2357@email.com?subject=${subject}&body=${body}`;
    window.open(
      `mailto:saranbarua2357@email.com?subject=${subject}&body=${body}`,
      "_self"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 dark:bg-gray-900/70 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl"
    >
      <h3 className="text-xl font-semibold mb-6">Send a message</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="name"
            required
            onChange={handleChange}
            placeholder="Your name"
            className="px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/20 dark:border-white/10 outline-none focus:ring-2 focus:ring-brand-purple/40"
          />

          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            placeholder="you@email.com"
            className="px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/20 dark:border-white/10 outline-none focus:ring-2 focus:ring-brand-purple/40"
          />
        </div>

        <input
          name="phone"
          onChange={handleChange}
          placeholder="+880..."
          className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/20 dark:border-white/10 outline-none focus:ring-2 focus:ring-brand-purple/40"
        />

        <textarea
          name="message"
          required
          rows={5}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/20 dark:border-white/10 outline-none focus:ring-2 focus:ring-brand-purple/40"
        />

        <button
          type="submit"
          className="w-full px-6 py-4 rounded-2xl bg-brand-purple text-white font-bold text-lg transition-transform active:scale-95"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default function App() {
  // --- STATE ---
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [showConfetti, setShowConfetti] = useState(true);

  // --- REFS & MOTION ---
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  // --- EFFECTS ---
  useEffect(() => {
    // Dark mode init
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Custom Cursor logic
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${
          e.clientY - 16
        }px, 0)`;
      }
      // For Phone Parallax
      const xPct = (e.clientX / window.innerWidth - 0.5) * 1000;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 1000;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("mousemove", moveCursor);

    // Confetti timer
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    // Haptic sound simulation
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
    );
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Audio autoplay prevented")); // Catch autoplay block
    setDarkMode(!darkMode);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // --- RENDER HELPERS ---
  const appProjects = PROJECTS.filter((p) => p.type === "app");
  const webProjects = PROJECTS.filter((p) => p.type === "web");

  const [lightbox, setLightbox] = useState<{
    src: string;
    alt?: string;
  } | null>(null);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-brand-dark" : "bg-gray-50"
      }`}
    >
      {/* --- CUSTOM CURSOR --- */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      >
        <div
          className={`w-full h-full rounded-full bg-white transition-all duration-200 ease-out ${
            cursorVariant === "hover"
              ? "scale-[2.5] opacity-50"
              : "scale-100 opacity-100"
          }`}
        />
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
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
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
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-brand-purple" />
            )}
          </button>

          <button className="md:hidden p-3" onClick={() => setIsMenuOpen(true)}>
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
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-gray-100 dark:bg-white/5 rounded-full"
              >
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
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
      >
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
                Crafting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan">
                  Modern
                </span>{" "}
                Digital Experiences
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mt-6 leading-relaxed">
                Hi, I’m Saran Barua, Full-Stack & React Native Developer and
                Co-Founder at Makeup Coders. I design and build modern React +
                React Native + Tailwind experiences that feel smooth, look
                premium, and actually solve real problems.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => scrollToSection("work")}
                  className="group relative px-8 py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-bold text-lg overflow-hidden transition-transform active:scale-95"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="relative z-10 flex items-center">
                    View Work{" "}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-8 py-4 bg-transparent border-2 border-gray-200 dark:border-white/10 rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  About Me
                </button>
              </div>
            </motion.div>

            <div className="flex space-x-6 text-gray-400">
              <a
                href="https://github.com/saranbarua"
                className="hover:text-brand-purple transition-colors"
              >
                <Github />
              </a>
              <a
                href="https://www.facebook.com/saran.barua.98/"
                className="hover:text-brand-cyan transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/in/saran-barua/"
                className="hover:text-brand-pink transition-colors"
              >
                <Linkedin />
              </a>
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
      <section id="work" className="py-12 relative">
        <div className="container mx-auto px-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-bold font-display mb-4"
          >
            Selected Work
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-xl">
            That define my career.
          </p>
        </div>

        {/* Horizontal Scroll Area */}
        {/* --- APP PROJECTS --- */}

        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-purple/10 text-brand-purple px-4 py-1 text-xs font-semibold tracking-wide border border-brand-purple/20">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              Apps
            </span>

            <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Mobile products people actually use.
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Built with React Native and shipped to real users — measured by
              adoption, performance, and long-term maintainability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 px-3 mb-16">
          {appProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className=" mx-auto"
            >
              <div
                className={`bg-gradient-to-r ${project.color} rounded-2xl p-3`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-xl mb-4"
                  onClick={() =>
                    setLightbox({ src: project.image, alt: project.title })
                  }
                />

                <h3 className="text-lg md:text-xl font-display font-semibold text-white leading-snug mb-2">
                  {project.title}
                </h3>

                <p className="text-white/85 text-sm md:text-[15px] leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1 rounded-full 
                 bg-white/10 border border-white/15 
                 text-white/90 tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* Downloads / Users */}
                {project.metric && (
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                    <span className="font-semibold">
                      {project.metric.value}
                    </span>
                    <span className="text-white/70">
                      {project.metric.label}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- WEB PROJECTS --- */}
        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-cyan/10 text-brand-cyan px-4 py-1 text-xs font-semibold tracking-wide border border-brand-cyan/20">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              Web
            </span>

            <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Scalable web systems and dashboards.
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Full-stack web products built for performance, clarity, and
              long-term growth — from internal dashboards to customer-facing
              platforms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 px-3 mb-16">
          {webProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mx-auto"
            >
              <div
                className={`bg-gradient-to-r ${project.color} rounded-2xl p-6`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-xl mb-4"
                  onClick={() =>
                    setLightbox({ src: project.image, alt: project.title })
                  }
                />

                <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-tight mb-1">
                  {project.title}
                </h3>

                <p className="text-white/80 text-sm md:text-[15px] leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1 rounded-full 
                 bg-white/10 border border-white/15 
                 text-white/90 tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                 text-sm font-semibold text-white
                 bg-white/10 border border-white/15
                 hover:bg-white/20 transition-colors"
                    >
                      Live
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                 text-sm font-semibold text-white/90
                 bg-white/5 border border-white/10
                 hover:bg-white/15 transition-colors"
                    >
                      Repo
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-10">
            <span
              className="inline-flex items-center gap-2 rounded-full 
      bg-black/5 dark:bg-white/10 
      px-4 py-1 text-xs font-semibold tracking-wide"
            >
              Additional Work
            </span>

            <h3 className="mt-4 text-3xl font-display font-bold">
              More projects I’ve built and shipped
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Smaller systems, client work, and internal tools that solved real
              problems.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "MettaDhamma",
                desc: "A spiritual learning & practice platform focused on Buddhist teachings, meditation, and mindful living.",
                tech: "Web content & CMS (varied stack)",
                url: "https://mettadhamma.com",
              },
              {
                name: "Haque & Sons Engineering Technology",
                desc: "A professional industrial solutions website for elevator and escalator services, showcasing products and maintenance offerings for commercial and residential clients.",
                tech: "Static business site / Custom CMS (built as part of client/brand presence)",
                url: "https://haquensons.com",
              },
              {
                name: "InvoiceGenius",
                desc: "A web-based invoice generation and management tool for small businesses and freelancers, enabling quick invoice creation, PDF export, and billing tracking.",
                tech: "React • Tailwind • PDF generation",
                url: "https://invoicegenius.makeupcoders.com/",
              },
              {
                name: "Wanderwise",
                desc: "A travel calculation and planning web app that helps users estimate routes, total costs, and logistical breakdowns for trips.",
                tech: "React • Tailwind • Travel logic utilities",
                url: "https://wanderwise.makeupcoders.com/",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="
          rounded-2xl border border-black/5 dark:border-white/10
          bg-white/60 dark:bg-white/5 backdrop-blur
          px-5 sm:px-6 py-5
          shadow-sm
          transition-shadow duration-200
          md:hover:shadow-md
        "
              >
                {/* Top content */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {p.name}
                  </h4>

                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {p.desc}
                  </p>

                  {/* Tech chips */}
                  <div className="mt-1 flex flex-wrap gap-2">
                    {p.tech.split("•").map((t) => (
                      <span
                        key={t}
                        className="
                  text-[11px] px-3 py-1 rounded-full
                  bg-gray-100 dark:bg-white/10
                  text-gray-700 dark:text-gray-300
                  border border-gray-200 dark:border-white/10
                "
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider (mobile feels nicer) */}
                <div className="mt-4 border-t border-black/5 dark:border-white/10" />

                {/* CTA */}
                <div className="mt-4 flex">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="
              inline-flex w-full md:w-auto justify-center items-center gap-2
              px-4 py-2 rounded-full
              text-sm font-semibold text-brand-purple
              bg-brand-purple/10 border border-brand-purple/20
              hover:bg-brand-purple/20 transition-colors
            "
                  >
                    Live Site
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section
        id="experience"
        className="py-24 relative bg-white/5 dark:bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <p className="inline-flex items-center px-4 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold tracking-wide border border-brand-purple/20 mb-4">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Experience that actually shipped products.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              From co-founding Makeup Coders to managing teams and shipping
              production apps — here&apos;s the story behind the work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[0.35fr,1.65fr] gap-12 items-start">
            {/* Left side summary card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 dark:border-white/10
             bg-white/70 dark:bg-gray-950/40 shadow-2xl backdrop-blur-xl p-7 md:p-9"
            >
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-purple/20 blur-[60px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-cyan/15 blur-[60px]" />

              <p className="text-xs font-mono uppercase tracking-[0.22em] text-gray-400 mb-1">
                Summary
              </p>

              <h3 className="text-xl font-semibold tracking-tight mb-3">
                Why work with me?
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                I combine{" "}
                <span className="font-semibold">product thinking</span> with{" "}
                <span className="font-semibold">engineering discipline</span>.
                That means I don&apos;t just write components — I think in
                systems, roadmaps, and real business outcomes.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-purple" />
                  Strong background in planning, building, and shipping
                  cross-platform products.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  Comfortable wearing multiple hats: PM, Tech Lead, and hands-on
                  developer.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-pink" />
                  Experience working with founders, stakeholders, and global
                  clients.
                </li>
              </ul>
            </motion.div>

            {/* Right side timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/40 via-brand-cyan/30 to-brand-pink/40 pointer-events-none" />

              <div className="space-y-10">
                {EXPERIENCES.map((exp, index) => (
                  <motion.article
                    key={exp.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-10 md:pl-12"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 md:left-1 top-2 w-5 h-5 rounded-full
           bg-white/80 dark:bg-white/10
           border border-black/10 dark:border-white/10
           flex items-center justify-center shadow-lg"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-brand-purple via-brand-pink to-brand-cyan" />
                    </div>

                    <div
                      className="group relative overflow-hidden rounded-3xl
           bg-white/85 dark:bg-gray-900/70
           border border-black/5 dark:border-white/10
           shadow-xl backdrop-blur-xl p-6 md:p-7
           transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-pink/10 blur-[55px] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-brand-purple/80">
                          {exp.period}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold flex flex-wrap items-center gap-2 mb-1">
                        {exp.title}
                        <span className="inline-flex items-center rounded-full border border-brand-purple/30 text-[11px] px-3 py-0.5 text-brand-purple bg-brand-purple/5">
                          {exp.company}
                        </span>
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {exp.bullets.map((point, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[7px] h-1 w-3 rounded-full bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-pink" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="creative">
        <LeadershipCreativeWork />
      </section>

      {/* --- ABOUT & SKILLS SECTION --- */}
      <section
        id="about"
        className="py-24 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Bio Card */}
          <div>
            <h2 className="text-4xl font-bold font-display mb-8">
              Behind the Code
            </h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-100 dark:border-white/5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan mb-6 overflow-hidden">
                <img
                  src={IMAGES.dp1}
                  alt="Avatar"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 font-medium">
                I'm a Co-Founder & Mobile and Web Architect based in Bangladesh.
                I don't just write code; I craft systems. I co-founded a
                startup, focusing on scalable SaaS solutions.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                When I'm not fighting Xcode build errors, I'm contributing to
                Open Source or experimenting with WebGL.
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
                    <span className="text-brand-purple font-mono">
                      {skill.level}%
                    </span>
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

      {/* --- CONTACT SECTION --- */}
      <section
        id="contact"
        className="py-24 relative bg-white/5 dark:bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <p className="inline-flex items-center px-4 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold tracking-wide border border-brand-purple/20 mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Let’s talk about your next product.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Send me a message — I reply fast for serious work and
              collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-gray-900/70 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold mb-6">Reach me directly</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-purple" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Personal Email
                    </p>
                    <a
                      className="font-semibold hover:text-brand-purple transition-colors"
                      href="mailto:saranbarua2357@email.com"
                    >
                      saranbarua2357@email.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-cyan" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Company Email
                    </p>
                    <a
                      className="font-semibold hover:text-brand-cyan transition-colors"
                      href="mailto:saran@makeupcoders.com"
                    >
                      saran@makeupcoders.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-cyan" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Phone Number
                    </p>
                    <a
                      className="font-semibold hover:text-brand-cyan transition-colors"
                      href="tel:+8801690150490"
                    >
                      +880-1690150490
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-green" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Whats App
                    </p>
                    <a
                      className="font-semibold hover:text-brand-green transition-colors"
                      href="https://wa.me/8801746180243?text=Hi%20Saran,%20I%20want%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noreferrer"
                    >
                      +880-1746180243
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-pink" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-semibold">Chattogram, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                <a
                  href="https://github.com/saranbarua"
                  className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/saran-barua/"
                  className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.facebook.com/saran.barua.98/"
                  className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* --- CONTACT/FOOTER --- */}
      <footer className="py-24 bg-brand-dark text-white relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold font-display mb-4">
            Let's build something amazing.
          </h2>

          <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            I help founders ship React / React Native products fast — with clean
            UI, solid architecture, and delivery discipline.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["React Native App", "Web Dashboard", "SaaS MVP"].map((t) => (
              <span
                key={t}
                className="text-xs px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Saran Barua. All rights
              reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://x.com/barua_saran"
                className="hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://www.facebook.com/saran.barua.98/"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/saran__barua/"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <div className="h-full w-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative mx-auto max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute  right-0 text-white/90 hover:text-white"
                  aria-label="Close"
                >
                  <X />
                </button>

                <div className="rounded-2xl overflow-hidden bg-black/30 border border-white/10 flex items-center justify-center">
                  <img
                    src={lightbox.src}
                    alt={lightbox.alt || "Preview"}
                    className="w-auto max-h-[80vh] object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
