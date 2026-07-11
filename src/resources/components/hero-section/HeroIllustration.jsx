"use client";

import { motion } from 'framer-motion';

export default function HeroIllustration({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 800 800" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="shadow-elegant" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000" floodOpacity="0.9" />
        </filter>

        <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="#8c7335" />
        </linearGradient>
        
        <linearGradient id="grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>

      {/* Scaled to 0.95 to make the illustration a bit smaller and more delicate */}
      <g transform="translate(400, 400) scale(0.95)">
        
        {/* Radar / Grid Base - Spinning slowly */}
        <motion.g 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="0" cy="0" r="280" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="2 12" fill="none" opacity="0.6" />
          <circle cx="0" cy="0" r="180" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 8" fill="none" opacity="0.8" />
          <circle cx="0" cy="0" r="90" stroke="var(--color-text-secondary)" strokeWidth="1" opacity="0.4" fill="none" />
          
          <g stroke="var(--color-border)" strokeWidth="1.5" opacity="0.5">
            <line x1="-350" y1="0" x2="350" y2="0" />
            <line x1="0" y1="-350" x2="0" y2="350" />
            <line x1="-250" y1="-250" x2="250" y2="250" />
            <line x1="-250" y1="250" x2="250" y2="-250" />
          </g>
        </motion.g>

        {/* Data Paths connecting nodes */}
        <g stroke="url(#grad-gold)" strokeWidth="3" fill="none" opacity="0.85">
          <path d="M 0 0 L -120 -120 L -220 -120 L -280 -60" />
          <path d="M 0 0 L 150 -80 L 250 -80 L 250 -180" />
          <path d="M 0 0 L -100 150 L -100 250 L -200 250" />
          <path d="M 0 0 L 120 120 L 200 120 L 260 200" />
        </g>

        {/* Glowing Data Packets traversing paths */}
        <g fill="var(--color-accent)" filter="url(#glow-strong)">
          <motion.circle cx="-160" cy="-120" r="5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
          <motion.circle cx="250" cy="-130" r="5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="-100" cy="200" r="5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="160" cy="120" r="5" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
        </g>

        {/* Peripheral Nodes */}
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}>
          <rect x="-300" y="-80" width="48" height="48" rx="12" fill="url(#grad-glass)" stroke="var(--color-text-secondary)" strokeWidth="2" filter="url(#shadow-elegant)" opacity="0.9" />
          <path d="M -284 -64 L -292 -56 L -284 -48 M -268 -64 L -260 -56 L -268 -48" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        <motion.g animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <rect x="230" y="-220" width="48" height="48" rx="12" fill="url(#grad-glass)" stroke="var(--color-text-secondary)" strokeWidth="2" filter="url(#shadow-elegant)" opacity="0.9" />
          <path d="M 244 -204 L 252 -196 L 244 -188 M 256 -188 L 264 -188" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <rect x="-240" y="230" width="48" height="48" rx="12" fill="url(#grad-glass)" stroke="var(--color-text-secondary)" strokeWidth="2" filter="url(#shadow-elegant)" opacity="0.9" />
          <path d="M -226 246 L -206 246 M -226 254 L -206 254 M -226 262 L -206 262" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
          <rect x="240" y="180" width="48" height="48" rx="12" fill="url(#grad-glass)" stroke="var(--color-text-secondary)" strokeWidth="2" filter="url(#shadow-elegant)" opacity="0.9" />
          <rect x="254" y="192" width="20" height="24" rx="4" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* Inner Core Nodes */}
        <g fill="url(#grad-glass)" stroke="url(#grad-gold)" strokeWidth="3" filter="url(#shadow-elegant)">
          <circle cx="-120" cy="-120" r="28" opacity="0.95" />
          <circle cx="150" cy="-80" r="28" opacity="0.95" />
          <circle cx="-100" cy="150" r="28" opacity="0.95" />
          <circle cx="120" cy="120" r="28" opacity="0.95" />
        </g>

        {/* Tech Labels inside Inner Nodes */}
        <g fill="var(--color-text-primary)" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
          <text x="-120" y="-120">API</text>
          <text x="150" y="-80">UX</text>
          <text x="-100" y="150">SYS</text>
          <text x="120" y="120">DEV</text>
        </g>

        {/* Main Central Core Hub */}
        <circle cx="0" cy="0" r="68" fill="url(#grad-glass)" stroke="url(#grad-gold)" strokeWidth="4" filter="url(#shadow-elegant)" opacity="0.95" />
        <motion.circle 
          cx="0" cy="0" r="52" 
          fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeDasharray="4 6" opacity="0.6"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Core React/Atom Symbol inside Hub */}
        <motion.g 
          stroke="url(#grad-gold)" strokeWidth="2.5" fill="none" filter="url(#glow-strong)"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="0" cy="0" rx="28" ry="10" transform="rotate(0)" />
          <ellipse cx="0" cy="0" rx="28" ry="10" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="28" ry="10" transform="rotate(120)" />
        </motion.g>
        
        {/* Central Beating Core */}
        <motion.circle 
          cx="0" cy="0" r="5" 
          fill="var(--color-accent)" filter="url(#glow-strong)"
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
    </svg>
  );
}
