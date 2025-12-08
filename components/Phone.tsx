import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface PhoneProps {
  mouseX: any;
  mouseY: any;
  children?: React.ReactNode;
}

export const Phone: React.FC<PhoneProps> = ({ mouseX, mouseY, children }) => {
  // Parallax calculations based on mouse position
  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  return (
    <div className="relative group perspective-1000 w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] mx-auto">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-[3rem] bg-gray-900 border-[12px] border-gray-900 shadow-2xl"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-50" />

        {/* Screen */}
        <div className="relative w-full h-full bg-black rounded-[2.2rem] overflow-hidden border-[4px] border-gray-800">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-black blur-sm absolute"></div>
          </div>

          {/* Screen Content Injection */}
          <div className="w-full h-full bg-brand-surface overflow-y-auto no-scrollbar pt-12 pb-4 px-4 text-white">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/20 rounded-full z-50" />
        </div>

        {/* Side Buttons */}
        <div className="absolute top-24 -left-[14px] w-[14px] h-8 bg-gray-800 rounded-l-md" />
        <div className="absolute top-36 -left-[14px] w-[14px] h-14 bg-gray-800 rounded-l-md" />
        <div className="absolute top-32 -right-[14px] w-[14px] h-20 bg-gray-800 rounded-r-md" />
      </motion.div>

      {/* Shadow underneath */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute -bottom-10 left-10 right-10 h-10 bg-black/40 blur-xl rounded-[100%]"
      />
    </div>
  );
};

export const PhoneScreenContent = () => {
  return (
    <div className="flex flex-col space-y-4 relative">
      {/* Fake Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold font-display">My Feed</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col space-y-4">
        {/* Profile Picture with Text */}
        <div className="relative w-full h-60 bg-gradient-to-br from-brand-purple via-brand-pink to-brand-cyan rounded-xl p-4 flex flex-col justify-center items-center">
          {/* Picture Overlay */}
          <div className="absolute w-28 h-28 rounded-full border-4 border-white top-10 flex items-center justify-center bg-gray-800">
            <img
              src={"/components/assets/Dp.jpeg"}
              alt="Your Picture"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          {/* Text Content */}
          <h3 className="text-2xl font-bold text-white mt-28">Saran Barua</h3>
          <p className="text-white/80 text-sm">Full Stack Developer</p>
        </div>

        {/* Featured Content (e.g., Stories) */}

        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-brand-purple p-0.5"
            >
              <img
                src={`https://ui-avatars.com/api/?name=Lorem+John+Doe&background=6a1b9a&color=fff&font-size=0.4`}
                alt="Dummy Image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content List Items */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-700" />
              <div className="flex-1">
                <div className="h-2 w-20 bg-gray-600 rounded mb-1.5" />
                <div className="h-2 w-32 bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6 w-12 h-12 bg-brand-cyan rounded-full shadow-lg shadow-brand-cyan/50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};
