import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '../types';
import { Download, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex-shrink-0 w-[300px] h-[400px] sm:w-[340px] sm:h-[450px] rounded-3xl cursor-grab active:cursor-grabbing perspective-1000 group"
    >
      <div 
        className="absolute inset-0 rounded-3xl bg-gray-900 dark:bg-gray-800 border border-white/10 shadow-xl overflow-hidden"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Background Gradient/Image */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative h-full flex flex-col p-6 z-10">
          <div className="flex justify-between items-start mb-4">
             <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
             </div>
             <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10">
               {project.category}
             </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 font-display">{project.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center space-x-1 text-yellow-400">
               <Star size={16} fill="currentColor" />
               <span className="text-white font-bold">{project.rating}</span>
            </div>
            <div className="text-gray-400 text-sm">
               {project.downloads} downloads
            </div>
          </div>

          <button className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-white font-bold flex items-center justify-center space-x-2 transition-all group-hover:scale-105 active:scale-95">
             <Download size={18} />
             <span>View Case Study</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Helper for transform
import { useTransform } from 'framer-motion';
