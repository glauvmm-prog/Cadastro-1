import React, { useEffect, useState } from 'react';

interface PetalBackgroundProps {
  enabled: boolean;
}

interface PetalItem {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
}

export default function PetalBackground({ enabled }: PetalBackgroundProps) {
  const [petals, setPetals] = useState<PetalItem[]>([]);

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }

    // Generate random petals
    const initialPetals: PetalItem[] = Array.from({ length: 18 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${8 + Math.random() * 16}px`,
      opacity: 0.3 + Math.random() * 0.4,
    }));

    setPetals(initialPetals);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" id="petal-container">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal bg-gradient-to-tr from-rose-200 to-pink-300 absolute"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
            borderRadius: '15% 85% 15% 85% / 15% 85% 15% 85%',
          }}
        />
      ))}
    </div>
  );
}
