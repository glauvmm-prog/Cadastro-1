export interface Gemstone {
  id: string;
  name: string;
  namePt: string;
  color: string; // Tailwind class
  gemColorCode: string; // Hex code for custom premium SVG drawing
  sparkleColor: string; // Complementary glow/shimmer hex
  hardness: number; // Mohs scale
  meaning: string;
  zodiac: string[];
  flowerPairing: {
    name: string;
    meaning: string;
    icon: string;
  };
  pricePerCarat: number;
  description: string;
  rarity: 'Excepcional' | 'Raríssima' | 'Muito Alta' | 'Alta';
  origin: string;
  refractiveIndex: string;
}

export interface Metal {
  id: string;
  name: string;
  colorCode: string; // Hex structure
  labelColor: string; // Tailwind bg color representation
  price: number; // base price
}

export interface FloralSetting {
  id: string;
  name: string;
  description: string;
  price: number;
  inspiration: string;
}

export interface CartItem {
  id: string;
  type: 'preset' | 'custom';
  gemstone: Gemstone;
  metal?: Metal;
  setting?: FloralSetting;
  carats: number;
  totalPrice: number;
  ringSize?: string;
  notes?: string;
}

export interface Consultation {
  id: string;
  clientName: string;
  clientEmail: string;
  preferredDate: string;
  selectedGemstoneId: string;
  notes: string;
  scheduledAt: string;
}
