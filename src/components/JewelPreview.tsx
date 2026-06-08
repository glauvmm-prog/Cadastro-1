import React from 'react';
import { Gemstone, Metal, FloralSetting } from '../types';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface JewelPreviewProps {
  gemstone: Gemstone;
  metal: Metal;
  setting: FloralSetting;
  carats: number;
  sunlightLevel: number; // 0 - 100
}

export default function JewelPreview({
  gemstone,
  metal,
  setting,
  carats,
  sunlightLevel,
}: JewelPreviewProps) {
  // Scale factor calculated based on carat weights (0.5 to 5.0 carats)
  const gemScale = 0.8 + (carats - 0.5) * 0.12;

  // Let's create varying shade colors of this gemstone for the faceted reflection
  const getShades = (hex: string) => {
    // Basic helper to simulate facets by adjusting hex color brightness conceptually
    return {
      table: hex, // main table
      light: adjustColorBrightness(hex, 35),
      medium: adjustColorBrightness(hex, -15),
      dark: adjustColorBrightness(hex, -40),
      deep: adjustColorBrightness(hex, -65),
    };
  };

  function adjustColorBrightness(hex: string, percent: number) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = Math.max(0, Math.min(255, R + (R * percent) / 100));
    G = Math.max(0, Math.min(255, G + (G * percent) / 100));
    B = Math.max(0, Math.min(255, B + (B * percent) / 100));

    const rHex = Math.round(R).toString(16).padStart(2, '0');
    const gHex = Math.round(G).toString(16).padStart(2, '0');
    const bHex = Math.round(B).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  }

  const shades = getShades(gemstone.gemColorCode);
  const sparkleCount = Math.floor(sunlightLevel / 15);

  return (
    <div className="relative w-full aspect-square bg-slate-950/40 rounded-3xl border border-white/5 flex flex-col items-center justify-center p-6 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Editorial Watermark Label */}
      <div className="absolute top-4 left-4 flex flex-col">
        <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">Simulador de Brilho</span>
        <span className="text-xs font-serif italic text-yellow-100/70">Ateliê Adamas</span>
      </div>

      <div className="absolute top-4 right-4 flex items-center space-x-1.5 text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-full border border-white/5 text-[11px] font-mono">
        {sunlightLevel < 35 ? (
          <>
            <Moon className="w-3.5 h-3.5 text-blue-300" />
            <span>Luz Lunar</span>
          </>
        ) : sunlightLevel < 70 ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>Foco Natural</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span className="text-yellow-200">Sol Pleno</span>
          </>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-72 h-72 flex items-center justify-center select-none">
        {/* Dynamic Light Rays Background */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen pointer-events-none opacity-30 filter blur-xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${gemstone.gemColorCode} 0%, transparent 65%)`,
            transform: `scale(${1 + sunlightLevel / 100})`,
          }}
        />

        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          {/* 1. THE METAL RING BAND */}
          <ellipse
            cx="150"
            cy="185"
            rx="65"
            ry="65"
            stroke={metal.colorCode}
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          {/* Inner polish layer inside ring band to simulate reflection */}
          <ellipse
            cx="150"
            cy="185"
            rx="65"
            ry="65"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="20,150"
            fill="none"
            opacity="0.6"
          />

          {/* 2. HANDCRAFTED ORGANIC LEAVES WRAPPING THE BAND */}
          {/* Left Floral Vine Branch */}
          <g>
            <path
              d="M 85 185 C 75 160, 100 135, 120 120"
              fill="none"
              stroke={metal.colorCode}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Leaves in gold or emerald accent */}
            <path
              d="M 90 162 C 80 152, 90 144, 98 152 Z"
              fill="#10b981"
              opacity="0.85"
            />
            <path
              d="M 104 145 C 96 135, 106 128, 112 138 Z"
              fill={metal.colorCode}
            />
          </g>

          {/* Right Floral Vine Branch */}
          <g>
            <path
              d="M 215 185 C 225 160, 200 135, 180 120"
              fill="none"
              stroke={metal.colorCode}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Leaves in gold or emerald accent */}
            <path
              d="M 210 162 C 220 152, 210 144, 202 152 Z"
              fill="#10b981"
              opacity="0.85"
            />
            <path
              d="M 196 145 C 204 135, 194 128, 188 138 Z"
              fill={metal.colorCode}
            />
          </g>

          {/* 3. FLORAL MOUNT PRONGS / BASE BEZEL BACKGROUND based on chosen setting */}
          {setting.id === 'lotus-petal' && (
            <g>
              {/* Outer Lotus Petals */}
              <path d="M 115 125 C 100 100, 120 85, 130 95 C 135 80, 148 80, 150 95 C 152 80, 165 80, 170 95 C 180 85, 200 100, 185 125 Z" fill={metal.colorCode} opacity="0.8" />
              {/* Stem bridge */}
              <path d="M 130 130 C 130 115, 170 115, 170 130 Z" fill={metal.colorCode} />
            </g>
          )}

          {setting.id === 'rosebud-crown' && (
            <g>
              {/* Rosebuds flanking left and right */}
              <circle cx="115" cy="118" r="8" fill="#f43f5e" />
              <path d="M 107 122 C 107 108, 117 108, 117 122" fill="none" stroke={metal.colorCode} strokeWidth="3" />
              <circle cx="185" cy="118" r="8" fill="#f43f5e" />
              <path d="M 193 122 C 193 108, 183 108, 183 122" fill="none" stroke={metal.colorCode} strokeWidth="3" />
              {/* Crown prongs */}
              <path d="M 120 125 L 115 100 L 130 110 L 150 90 L 170 110 L 185 100 L 180 125 Z" fill={metal.colorCode} />
            </g>
          )}

          {setting.id === 'lavender-vine' && (
            <g>
              {/* Winding metal band ribbons with purple beads representing lavender */}
              <ellipse cx="120" cy="108" rx="4" ry="7" fill="#8b5cf6" transform="rotate(-30, 120, 108)" />
              <ellipse cx="180" cy="108" rx="4" ry="7" fill="#8b5cf6" transform="rotate(30, 180, 108)" />
              {/* Tiny leafy wrapping around base */}
              <path d="M 115 130 Q 150 100 185 130" fill="none" stroke={metal.colorCode} strokeWidth="4" />
            </g>
          )}

          {setting.id === 'royal-orchid' && (
            <g>
              {/* Flamboyant thick orchid petals behind stone */}
              <path d="M 110 125 C 90 95, 130 75, 150 100" fill={metal.colorCode} />
              <path d="M 190 125 C 210 95, 170 75, 150 100" fill={metal.colorCode} />
              <path d="M 150 135 C 130 155, 170 155, 150 135" fill="#f472b6" opacity="0.6" />
            </g>
          )}

          {/* 4. THE FACETED GEMSTONE (DYNAMIC SCALE based on carats) */}
          <g transform={`translate(150, 105) scale(${gemScale}) translate(-150, -105)`}>
            {/* Cushion Cushion Faceted Hexagonal Gem outline */}
            {/* Base Under-facet shadow */}
            <polygon points="150,55 195,75 195,115 150,135 105,115 105,75" fill={shades.deep} />

            {/* Side facet segments */}
            <polygon points="150,55 195,75 175,95 150,85" fill={shades.dark} />
            <polygon points="195,75 195,115 175,95" fill={shades.medium} />
            <polygon points="195,115 150,135 150,115 175,95" fill={shades.deep} />
            <polygon points="150,135 105,115 125,95 150,115" fill={shades.dark} />
            <polygon points="105,115 105,75 125,95" fill={shades.medium} />
            <polygon points="105,75 150,55 150,85 125,95" fill={shades.light} />

            {/* Main Central Table Facet */}
            <polygon points="150,85 175,95 150,115 125,95" fill={shades.table} />

            {/* Pure white table reflections/glares */}
            <polygon points="135,95 150,85 145,98" fill="#ffffff" opacity="0.45" />
            <polygon points="145,108 152,112 148,114" fill="#ffffff" opacity="0.3" />
          </g>

          {/* 5. GENTLE SHINING OUTER GARRAS (Prongs) in metal */}
          <g transform={`translate(150, 105) scale(${gemScale}) translate(-150, -105)`}>
            {/* Micro metal tips holding the stone */}
            <circle cx="106" cy="76" r="4" fill={metal.colorCode} />
            <circle cx="194" cy="76" r="4" fill={metal.colorCode} />
            <circle cx="194" cy="114" r="4" fill={metal.colorCode} />
            <circle cx="106" cy="114" r="4" fill={metal.colorCode} />
          </g>
        </svg>

        {/* Dynamic Overlay Twinkle Sparkle Icons */}
        {Array.from({ length: sparkleCount }).map((_, i) => {
          // Semi-random placement inside/around the gem core
          const angle = (i * 360) / sparkleCount;
          const radius = 30 + (i % 2) * 20;
          const x = 150 + Math.cos((angle * Math.PI) / 180) * radius;
          const y = 105 + Math.sin((angle * Math.PI) / 180) * radius;
          const size = 10 + (i % 3) * 6 + (sunlightLevel / 25);

          return (
            <motion.div
              key={i}
              className="absolute pointer-events-none text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{
                left: x - size / 2,
                top: y - size / 2,
                color: gemstone.sparkleColor,
              }}
              animate={{
                scale: [0.3, 1.2, 0.3],
                rotate: [0, 180, 360],
                opacity: [0.1, 1, 0.1],
              }}
              transition={{
                duration: 2 + (i % 2) * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            >
              <Sparkles style={{ width: size, height: size }} />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 w-full text-center">
        <h4 className="font-serif font-semibold text-white tracking-wide text-md">
          {setting.name} com {gemstone.namePt}
        </h4>
        <p className="text-[11px] text-slate-400 font-mono mt-1">
          {metal.name} • Est. {carats.toFixed(1)} ct
        </p>
      </div>
    </div>
  );
}
