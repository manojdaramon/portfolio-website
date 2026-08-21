"use client";

import { m as motion, LazyMotion, domAnimation } from 'framer-motion';

export default function HeroIllustration({ className }) {
  return (
    <LazyMotion features={domAnimation}>
      <svg 
      className={className} 
      viewBox="0 0 800 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-glow-strong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="hero-shadow-elegant" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.85" />
        </filter>

        <linearGradient id="hero-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="#8c7335" />
        </linearGradient>
        
        <linearGradient id="hero-grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
      </defs>

      {/* Main Illustration Scaled & Centered (Tightened viewBox 800x600) */}
      <g transform="translate(400, 300) scale(0.95)">
        
        {/* Radar / Grid Base - Rotating slowly in background */}
        <motion.g 
          animate={{ rotate: 360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="0" cy="0" r="290" stroke="var(--color-border)" strokeWidth="1.2" strokeDasharray="2 12" fill="none" opacity="0.5" />
          <circle cx="0" cy="0" r="190" stroke="var(--color-border)" strokeWidth="1.2" strokeDasharray="4 8" fill="none" opacity="0.7" />
          <circle cx="0" cy="0" r="95" stroke="var(--color-text-secondary)" strokeWidth="1" opacity="0.35" fill="none" />
          
          <g stroke="var(--color-border)" strokeWidth="1.2" opacity="0.4">
            <line x1="-350" y1="0" x2="350" y2="0" />
            <line x1="0" y1="-350" x2="0" y2="350" />
            <line x1="-250" y1="-250" x2="250" y2="250" />
            <line x1="-250" y1="250" x2="250" y2="-250" />
          </g>
        </motion.g>

        {/* Glowing Connected Architecture Paths */}
        <g stroke="url(#hero-grad-gold)" strokeWidth="2.5" fill="none" opacity="0.85">
          <path d="M 0 0 L -130 -130 L -230 -130 L -288 -70" />
          <path d="M 0 0 L 160 -90 L 260 -90 L 260 -190" />
          <path d="M 0 0 L -110 160 L -110 260 L -210 260" />
          <path d="M 0 0 L 130 130 L 210 130 L 270 210" />
        </g>

        {/* Data Packets traversing paths */}
        <g fill="var(--color-accent)" filter="url(#hero-glow-strong)">
          <motion.circle cx="-180" cy="-130" r="4.5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
          <motion.circle cx="260" cy="-140" r="4.5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="-110" cy="210" r="4.5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="170" cy="130" r="4.5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
        </g>

        {/* PERIPHERAL FLOATING MICRO-CARDS */}
        {/* Card 1: Code Component </ > (Center: -288, -70) */}
        <motion.g animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}>
          <rect x="-316" y="-96" width="56" height="52" rx="14" fill="url(#hero-grad-glass)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.45" filter="url(#hero-shadow-elegant)" />
          {/* Centered Code Icon </ > */}
          <path d="M -299 -76 L -305 -70 L -299 -64" stroke="#F1F5F9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="-285" y1="-79" x2="-291" y2="-61" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M -277 -76 L -271 -70 L -277 -64" stroke="#F1F5F9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>

        {/* Card 2: Terminal Prompt >_ (Center: 260, -190) */}
        <motion.g animate={{ y: [0, 7, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
          <rect x="232" y="-216" width="56" height="52" rx="14" fill="url(#hero-grad-glass)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.45" filter="url(#hero-shadow-elegant)" />
          {/* Centered Terminal Icon >_ */}
          <path d="M 246 -196 L 254 -190 L 246 -184" stroke="#F1F5F9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="258" y1="-184" x2="270" y2="-184" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" />
        </motion.g>

        {/* Card 3: Object / JSON { } (Center: -210, 260) */}
        <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
          <rect x="-238" y="234" width="56" height="52" rx="14" fill="url(#hero-grad-glass)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.45" filter="url(#hero-shadow-elegant)" />
          {/* Centered JSON Object Icon { } */}
          <text x="-210" y="260" fill="#F1F5F9" fontSize="17" fontWeight="bold" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">{`{ }`}</text>
        </motion.g>

        {/* Card 4: Lightning / Cloud API ⚡ (Center: 270, 210) */}
        <motion.g animate={{ y: [0, -9, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
          <rect x="242" y="184" width="56" height="52" rx="14" fill="url(#hero-grad-glass)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.45" filter="url(#hero-shadow-elegant)" />
          {/* Centered Lightning Icon */}
          <path d="M 273 197 L 262 211 H 271 L 267 223 L 278 209 H 269 Z" fill="url(#hero-grad-gold)" />
        </motion.g>

        {/* INNER SOFTWARE PILLAR NODES */}
        <g fill="url(#hero-grad-glass)" stroke="url(#hero-grad-gold)" strokeWidth="2.5" filter="url(#hero-shadow-elegant)">
          <circle cx="-130" cy="-130" r="30" opacity="0.95" />
          <circle cx="160" cy="-90" r="30" opacity="0.95" />
          <circle cx="-110" cy="160" r="30" opacity="0.95" />
          <circle cx="130" cy="130" r="30" opacity="0.95" />
        </g>

        {/* Tech Domain Labels inside Inner Nodes */}
        <g fill="#F8FAFC" fontSize="12" fontFamily="var(--font-sans), system-ui, sans-serif" fontWeight="700" letterSpacing="0.5px" textAnchor="middle" dominantBaseline="central">
          <text x="-130" y="-130">WEB</text>
          <text x="160" y="-90">API</text>
          <text x="-110" y="160">DATA</text>
          <text x="130" y="130">SYS</text>
        </g>

        {/* MAIN CENTRAL CORE HUB */}
        <circle cx="0" cy="0" r="70" fill="url(#hero-grad-glass)" stroke="url(#hero-grad-gold)" strokeWidth="3.5" filter="url(#hero-shadow-elegant)" opacity="0.95" />
        
        {/* Rotating Dash Ring */}
        <motion.circle 
          cx="0" cy="0" r="54" 
          fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.65"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Central Core React Atom Symbol */}
        <motion.g 
          stroke="url(#hero-grad-gold)" strokeWidth="2.5" fill="none" filter="url(#hero-glow-strong)"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="0" cy="0" rx="30" ry="11" transform="rotate(0)" />
          <ellipse cx="0" cy="0" rx="30" ry="11" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="30" ry="11" transform="rotate(120)" />
        </motion.g>
        
        {/* Beating Core Pulse */}
        <motion.circle 
          cx="0" cy="0" r="6" 
          fill="var(--color-accent)" filter="url(#hero-glow-strong)"
          animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
    </svg>
    </LazyMotion>
  );
}
