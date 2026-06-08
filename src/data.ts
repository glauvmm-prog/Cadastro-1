import { Gemstone, Metal, FloralSetting } from './types';

export const GEMSTONES: Gemstone[] = [
  {
    id: 'paraiba-tourmaline',
    name: 'Paraiba Tourmaline',
    namePt: 'Turmalina Paraíba',
    color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/50',
    gemColorCode: '#2ee0d2',
    sparkleColor: '#e0fffc',
    hardness: 7.5,
    meaning: 'Conexão divina, intuição aguçada e paz profunda. Considerada a gema mais eletrizante do mundo por seu brilho neon.',
    zodiac: ['Aquário', 'Peixes', 'Libra'],
    flowerPairing: {
      name: 'Hortênsia Azul',
      meaning: 'Deleite visual, raridade, abundância de sentimentos puros e gratidão profunda.',
      icon: '🌸'
    },
    pricePerCarat: 9500,
    description: 'Descoberta no Brasil na década de 1980, exibe um azul turquesa neon único causado por traços de cobre e manganês. É cem vezes mais rara que um diamante convencional.',
    rarity: 'Excepcional',
    origin: 'São José da Batalha, Paraíba - Brasil',
    refractiveIndex: '1.614 - 1.666'
  },
  {
    id: 'pigeon-ruby',
    name: 'Pigeon Blood Ruby',
    namePt: 'Rubi Sangue de Pombo',
    color: 'text-rose-500 bg-rose-950/40 border-rose-500/50',
    gemColorCode: '#e11d48',
    sparkleColor: '#ffe4e6',
    hardness: 9.0,
    meaning: 'Paixão avassaladora, coragem real, vitalidade física e proteção contra energias escuras.',
    zodiac: ['Áries', 'Leão', 'Escorpião'],
    flowerPairing: {
      name: 'Rosa Vermelha Imperial',
      meaning: 'Amor eterno, adoração incondicional, romance profundo e fogo da paixão.',
      icon: '🌹'
    },
    pricePerCarat: 5200,
    description: 'A tonalidade vermelha mais cobiçada e valiosa para rubis, caracterizada por um brilho fluorescente vermelho puro sob luz natural e ultravioleta.',
    rarity: 'Raríssima',
    origin: 'Vale de Mogok - Mianmar',
    refractiveIndex: '1.762 - 1.770'
  },
  {
    id: 'royal-emerald',
    name: 'Royal Emerald',
    namePt: 'Esmeralda Imperial',
    color: 'text-emerald-500 bg-emerald-950/40 border-emerald-500/50',
    gemColorCode: '#10b981',
    sparkleColor: '#ecfdf5',
    hardness: 8.0,
    meaning: 'Fidelidade matrimonial, rejuvenescimento da alma, renascimento espiritual e abundância próspera.',
    zodiac: ['Touro', 'Câncer', 'Virgem'],
    flowerPairing: {
      name: 'Lírio do Vale',
      meaning: 'O retorno da felicidade plena, pureza de espírito, doçura e frescor primaveril.',
      icon: '🌿'
    },
    pricePerCarat: 4500,
    description: 'Exibe uma tonalidade verde-floresta profunda e fresca, preenchida pelas lendárias "gardens" internas (inclusões naturais que comprovam sua autenticidade orgânica).',
    rarity: 'Raríssima',
    origin: 'Mina de Muzo - Colômbia',
    refractiveIndex: '1.577 - 1.583'
  },
  {
    id: 'kashmir-sapphire',
    name: 'Kashmir Sapphire',
    namePt: 'Safira de Caxemira',
    color: 'text-blue-500 bg-blue-950/40 border-blue-500/50',
    gemColorCode: '#2563eb',
    sparkleColor: '#eff6ff',
    hardness: 9.0,
    meaning: 'Sabedoria celestial, lealdade eterna, calma mental e busca pela verdade espiritual superior.',
    zodiac: ['Virgem', 'Libra', 'Sagitário'],
    flowerPairing: {
      name: 'Orquídea Azul Celeste',
      meaning: 'Beleza indomável, serenidade espiritual, soberania moral e distinção incomum.',
      icon: '🪻'
    },
    pricePerCarat: 3800,
    description: 'Famosas pelo tom azul "aveludado cornflower", causado por inclusões extremamente finas que espalham a luz suavemente, criando um efeito de brilho tridimensional.',
    rarity: 'Raríssima',
    origin: 'Caxemira - Himalaia',
    refractiveIndex: '1.762 - 1.770'
  },
  {
    id: 'canary-diamond',
    name: 'Canary Diamond',
    namePt: 'Diamante Canário',
    color: 'text-amber-400 bg-amber-950/40 border-amber-500/50',
    gemColorCode: '#fbbf24',
    sparkleColor: '#fffbeb',
    hardness: 10.0,
    meaning: 'Pureza absoluta, alegria divina, otimismo inabalável e a luz do Sol que nunca se apaga.',
    zodiac: ['Leão', 'Gêmeos', 'Capricórnio'],
    flowerPairing: {
      name: 'Girassol Dourado',
      meaning: 'Adoração eterna, longevidade gloriosa, calor vital, felicidade e altivez.',
      icon: '🌻'
    },
    pricePerCarat: 6500,
    description: 'Um diamante de cor extravagante (Fancy Yellow) com uma pureza cristalina incomparável, lapidado para refletir a luz solar em mil facetas de fogo dourado.',
    rarity: 'Alta',
    origin: 'Mina de Kimberley - África do Sul',
    refractiveIndex: '2.417'
  },
  {
    id: 'pink-spinel',
    name: 'Pink Spinel',
    namePt: 'Espinélio Rosa Sakura',
    color: 'text-pink-400 bg-pink-950/40 border-pink-500/50',
    gemColorCode: '#f472b6',
    sparkleColor: '#fdf2f8',
    hardness: 8.0,
    meaning: 'Novos começos doces, cura cardíaca, juventude da alma e afeição afetuosa e alegre.',
    zodiac: ['Gêmeos', 'Touro', 'Peixes'],
    flowerPairing: {
      name: 'Flor de Cerejeira (Sakura)',
      meaning: 'A beleza efêmera da vida, renovação, esperança brilhante e novos começos românticos.',
      icon: '🌸'
    },
    pricePerCarat: 2200,
    description: 'Adorado por colecionadores por sua limpidez ótica exuberante que supera muitos rubis, refletindo tons pastéis de framboesa brilhante e blush.',
    rarity: 'Alta',
    origin: 'Mahenge - Tanzânia',
    refractiveIndex: '1.718'
  },
  {
    id: 'fire-opal',
    name: 'Fire Opal',
    namePt: 'Opala de Fogo',
    color: 'text-orange-500 bg-orange-950/40 border-orange-500/50',
    gemColorCode: '#f97316',
    sparkleColor: '#fff7ed',
    hardness: 6.0,
    meaning: 'Criatividade livre, paixão interior latente, purificação por fogo e manifestação de desejos.',
    zodiac: ['Sagitário', 'Áries', 'Escorpião'],
    flowerPairing: {
      name: 'Tulipa Brasa de Fogo',
      meaning: 'Amor ardente irreparável, declaração de carinho fervoroso, energia magnética e vigor.',
      icon: '🌷'
    },
    pricePerCarat: 1500,
    description: 'Diferente de outras opalas, exibe uma transparência incrível com cores de fundo que vão do amarelo-sol ao laranja-vulcão profundo, lembrando brasas vivas.',
    rarity: 'Alta',
    origin: 'Querétaro - México',
    refractiveIndex: '1.450'
  },
  {
    id: 'orchid-amethyst',
    name: 'Orchid Amethyst',
    namePt: 'Ametista Orquídea Royal',
    color: 'text-violet-500 bg-violet-950/40 border-violet-500/50',
    gemColorCode: '#8b5cf6',
    sparkleColor: '#f5f3ff',
    hardness: 7.0,
    meaning: 'Transmutação mental, meditação profunda, realeza intelectual e paz contra ansiedades.',
    zodiac: ['Aquário', 'Peixes', 'Sagitário'],
    flowerPairing: {
      name: 'Flor de Lavanda',
      meaning: 'Calmaria magnética, devoção leal, silêncio curativo e harmonia familiar.',
      icon: '🪻'
    },
    pricePerCarat: 800,
    description: 'Umas das ametistas mais finas do mundo, apresentando tons violeta profundos com flashes secundários de vermelho e azul sob luz de velas quente.',
    rarity: 'Alta',
    origin: 'Ametista do Sul, RS - Brasil',
    refractiveIndex: '1.544 - 1.553'
  }
];

export const METALS: Metal[] = [
  {
    id: 'yellow-gold',
    name: 'Ouro Amarelo 18K',
    colorCode: '#d4af37',
    labelColor: 'bg-amber-400',
    price: 350
  },
  {
    id: 'white-gold',
    name: 'Ouro Branco 18K',
    colorCode: '#e2e8f0',
    labelColor: 'bg-slate-200',
    price: 380
  },
  {
    id: 'rose-gold',
    name: 'Ouro Rosé 18K',
    colorCode: '#e0a899',
    labelColor: 'bg-rose-300',
    price: 370
  },
  {
    id: 'platinum',
    name: 'Platina Imperial',
    colorCode: '#f1f5f9',
    labelColor: 'bg-white border border-slate-300',
    price: 520
  }
];

export const FLORAL_SETTINGS: FloralSetting[] = [
  {
    id: 'lotus-petal',
    name: 'Pétalas de Lótus',
    description: 'Uma coroa esculpida em forma de flor de lótus aberta, cujas pétalas ascendentes criam as garras que abraçam a gema central.',
    price: 650,
    inspiration: 'Símbolo ancestral de pureza que floresce intocada sobre as águas divinas.'
  },
  {
    id: 'rosebud-crown',
    name: 'Coroa de Botão de Rosa',
    description: 'Incrível aro trabalhado com pequenas ranhuras orgânicas e botões de rosa entalhados nas laterais que elevam a gema como uma rainha.',
    price: 720,
    inspiration: 'Uma promessa de amor eterno e o desabrochar da maior das afeições.'
  },
  {
    id: 'lavender-vine',
    name: 'Ramo de Lavanda Orgânico',
    description: 'O aro simula uma videira de lavanda com curvas fluidas e folhas microscópicas cravejadas de micro-diamantes brilhantes no metal.',
    price: 880,
    inspiration: 'Proteção espiritual, serenidade e o abraço acolhedor da natureza.'
  },
  {
    id: 'royal-orchid',
    name: 'Orquídea Real Majestosa',
    description: 'A base da gema é envolta pelas delicadas asas de garras esculpidas como pétalas de orquídea selvagem, oferecendo um perfil arquitetônico espetacular.',
    price: 950,
    inspiration: 'Beleza rara e fascinante, força flexível e luxo absoluto.'
  }
];
