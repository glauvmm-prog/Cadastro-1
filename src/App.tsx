import React, { useState, useMemo } from 'react';
import { GEMSTONES, METALS, FLORAL_SETTINGS } from './data';
import { Gemstone, Metal, FloralSetting, CartItem, Consultation } from './types';
import PetalBackground from './components/PetalBackground';
import JewelPreview from './components/JewelPreview';
import FloralPairingGame from './components/FloralPairingGame';
import {
  Gem,
  Sparkles,
  ShoppingBag,
  Sliders,
  Compass,
  Calendar,
  X,
  Trash,
  Check,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  ChevronRight,
  Sun,
  User,
  Mail,
  FileText,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_IMG_URL = "/src/assets/images/floral_jewelry_hero_1780507773375.png";

export default function App() {
  // Navigation Tabs: 'collection' | 'customizer' | 'pairings' | 'booking'
  const [activeTab, setActiveTab] = useState<'collection' | 'customizer' | 'pairings' | 'booking'>('collection');

  // Particle Petals toggle
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedMohs, setSelectedMohs] = useState<number | null>(null);

  // Gem Detail Modal
  const [selectedGem, setSelectedGem] = useState<Gemstone | null>(null);

  // Customizer State preset on Paraíba Tourmaline
  const [customGem, setCustomGem] = useState<Gemstone>(GEMSTONES[0]);
  const [customMetal, setCustomMetal] = useState<Metal>(METALS[0]);
  const [customSetting, setCustomSetting] = useState<FloralSetting>(FLORAL_SETTINGS[0]);
  const [customCarat, setCustomCarat] = useState<number>(1.8);
  const [customRingSize, setCustomRingSize] = useState<string>("15");
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [sunlightLevel, setSunlightLevel] = useState<number>(55);

  // Shopping cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  // Checkout Flow
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutNotes, setCheckoutNotes] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutReceiptId, setCheckoutReceiptId] = useState('');
  const [checkoutItemsSummary, setCheckoutItemsSummary] = useState<CartItem[]>([]);
  const [checkoutTotalPrice, setCheckoutTotalPrice] = useState(0);

  // VIP Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingGemId, setBookingGemId] = useState<string>(GEMSTONES[0].id);
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingResult, setBookingResult] = useState<Consultation | null>(null);

  // Filtered Gemstones for search catalog
  const filteredGemstones = useMemo(() => {
    return GEMSTONES.filter((gem) => {
      const matchesSearch =
        gem.namePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.zodiac.some(z => z.toLowerCase().includes(searchQuery.toLowerCase())) ||
        gem.flowerPairing.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRarity = selectedRarity === 'all' || gem.rarity === selectedRarity;
      const matchesMohs = selectedMohs === null || gem.hardness >= selectedMohs;

      return matchesSearch && matchesRarity && matchesMohs;
    });
  }, [searchQuery, selectedRarity, selectedMohs]);

  // Compute live price of custom gem builder
  const customBuilderPrice = useMemo(() => {
    const gemCost = customGem.pricePerCarat * customCarat;
    const metalCost = customMetal.price;
    const settingCost = customSetting.price;
    const craftFee = 450; // Artisan fine detailed framing
    return Math.round(gemCost + metalCost + settingCost + craftFee);
  }, [customGem, customCarat, customMetal, customSetting]);

  // Cart Management
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleAddToCartDirect = (gem: Gemstone) => {
    const newItem: CartItem = {
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'preset',
      gemstone: gem,
      carats: 1.0,
      totalPrice: gem.pricePerCarat * 1.0 + 800, // gem cost + premium raw cut mounting fee
    };

    setCart((prev) => [...prev, newItem]);
    triggerCartNotification(`Gema ${gem.namePt} reservada com sucesso!`);
  };

  const handleAddCustomToCart = () => {
    const newItem: CartItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'custom',
      gemstone: customGem,
      metal: customMetal,
      setting: customSetting,
      carats: customCarat,
      ringSize: customRingSize,
      notes: customEngraving ? `Gravar aro: "${customEngraving}"` : undefined,
      totalPrice: customBuilderPrice,
    };

    setCart((prev) => [...prev, newItem]);
    triggerCartNotification(`Joia Personalizada "${customSetting.name}" adicionada!`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const triggerCartNotification = (message: string) => {
    setCartNotification(message);
    setTimeout(() => {
      setCartNotification(null);
    }, 4000);
  };

  // Checkout submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone) return;

    const receiptNum = `BESPOKE-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;
    setCheckoutReceiptId(receiptNum);
    setCheckoutItemsSummary([...cart]);
    setCheckoutTotalPrice(calculateCartTotal());
    setCheckoutComplete(true);
    setCart([]); // Clear cart
  };

  // VIP Booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) return;

    const newConsultation: Consultation = {
      id: `VIP-${Math.floor(10000 + Math.random() * 90000)}`,
      clientName: bookingName,
      clientEmail: bookingEmail,
      preferredDate: bookingDate,
      selectedGemstoneId: bookingGemId,
      notes: bookingNotes,
      scheduledAt: new Date().toLocaleDateString('pt-BR'),
    };

    setBookingResult(newConsultation);
    // Reset fields
    setBookingName('');
    setBookingEmail('');
    setBookingDate('');
    setBookingNotes('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value).replace('$', 'U$ '); // Standard luxury USD notation
  };

  return (
    <div className="min-h-screen bg-[#03070b] text-[#cbd5e1] font-sans antialiased overflow-x-hidden relative selection:bg-rose-500/20 selection:text-rose-200">
      
      {/* Background floral vector texture styling */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none opacity-20 filter blur-3xl" style={{
        background: 'radial-gradient(circle at 50% -20%, rgba(244,63,94,0.15) 0%, rgba(16,185,129,0.08) 50%, rgba(0,0,0,0) 100%)'
      }} />

      {/* Floating Falling Petals Particles */}
      <PetalBackground enabled={petalsEnabled} />

      {/* Global Minimal Cart Toast Notice */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0e1622]/95 border border-amber-500/30 text-amber-100 px-6 py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center space-x-3 text-xs md:text-sm font-serif pointer-events-none backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{cartNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#03070b]/80 border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500/20 via-slate-900 to-emerald-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg">
              <Gem className="w-4.5 h-4.5 text-yellow-300 transform rotate-12 transition-transform duration-500 hover:rotate-90" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.25em] text-white font-medium uppercase">
                Adamas & Flora
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-rose-300/80 font-semibold font-mono">
                Ateliê de Joalheria Botânica
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('collection')}
              className={`px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'collection'
                  ? 'text-yellow-100 bg-white/5 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/2'
              }`}
            >
              Tesouro de Gemas
            </button>
            <button
              onClick={() => setActiveTab('customizer')}
              className={`px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'customizer'
                  ? 'text-yellow-100 bg-white/5 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/2'
              }`}
            >
              Ateliê de Criação
            </button>
            <button
              onClick={() => setActiveTab('pairings')}
              className={`px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'pairings'
                  ? 'text-yellow-100 bg-white/5 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/2'
              }`}
            >
              Afinidades Místicas
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'booking'
                  ? 'text-yellow-100 bg-white/5 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/2'
              }`}
            >
              Visita VIP
            </button>
          </nav>

          {/* Header Controls & Cart */}
          <div className="flex items-center space-x-3.5">
            
            {/* Drifting Petals Switcher button */}
            <button
              onClick={() => setPetalsEnabled(!petalsEnabled)}
              title={petalsEnabled ? "Desativar chuva de pétalas" : "Reativar chuva de pétalas"}
              className={`p-2 rounded-full border transition-all duration-300 ${
                petalsEnabled 
                  ? 'border-rose-500/30 text-rose-300 bg-rose-500/10' 
                  : 'border-white/5 text-slate-500 bg-transparent'
              }`}
            >
              🌸
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-white/5 hover:border-amber-500/30 text-white transition-all bg-slate-950/40 hover:bg-slate-900 duration-200 group"
            >
              <ShoppingBag className="w-5 h-5 text-amber-200/90 group-hover:text-amber-400 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bar Navigation indicators */}
      <div className="md:hidden sticky top-20 z-30 bg-[#040c15] border-b border-white/5 grid grid-cols-4 text-center">
        <button
          onClick={() => setActiveTab('collection')}
          className={`py-3 text-[10px] font-serif uppercase tracking-widest border-b-2 ${
            activeTab === 'collection' ? 'border-amber-400 text-yellow-100' : 'border-transparent text-slate-400'
          }`}
        >
          Gemas
        </button>
        <button
          onClick={() => setActiveTab('customizer')}
          className={`py-3 text-[10px] font-serif uppercase tracking-widest border-b-2 ${
            activeTab === 'customizer' ? 'border-amber-400 text-yellow-100' : 'border-transparent text-slate-400'
          }`}
        >
          Criar
        </button>
        <button
          onClick={() => setActiveTab('pairings')}
          className={`py-3 text-[10px] font-serif uppercase tracking-widest border-b-2 ${
            activeTab === 'pairings' ? 'border-amber-400 text-yellow-100' : 'border-transparent text-slate-400'
          }`}
        >
          Oráculo
        </button>
        <button
          onClick={() => setActiveTab('booking')}
          className={`py-3 text-[10px] font-serif uppercase tracking-widest border-b-2 ${
            activeTab === 'booking' ? 'border-amber-400 text-yellow-100' : 'border-transparent text-slate-400'
          }`}
        >
          Visita
        </button>
      </div>

      {/* --- HERO BANNER SECTION --- */}
      <section className="relative overflow-hidden bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        {/* Absolute Background image layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG_URL}
            alt="Joalheria Botânica Coleção Adamas"
            className="w-full h-full object-cover opacity-35 scale-105 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette mask over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03070b] via-transparent to-[#03070b]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="font-mono text-xs text-amber-300 uppercase tracking-[0.35em] mb-3 block">
              Sinfonia da Terra e da Flora de Luxo
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-wide leading-tight">
              Onde Cristais Raros <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-rose-300 to-emerald-200 italic font-normal">
                Florescem em Alta Joalheria
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-sm sm:text-base text-slate-300 font-light leading-relaxed font-serif italic">
              "Para cada gema lapidada nas profundezas da crosta terrestre, a natureza esculpe um par floral correspondente. Encontre sua harmonia cósmica absoluta."
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setActiveTab('customizer')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_5px_15px_rgba(251,191,36,0.3)] transition-all cursor-pointer"
              >
                Desenhe seu Anel Botânico
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('catalogo-ancora');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setActiveTab('collection');
                }}
                className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-serif text-xs tracking-widest uppercase rounded-full backdrop-blur-sm transition-all"
              >
                Explorar Coleção de Gemas
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN MAIN WRAPPER BODY CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        
        {/* TAB 1: COLECÃO DE GEMAS COM FILTRO INTERATIVO */}
        {activeTab === 'collection' && (
          <div id="catalogo-ancora">
            
            {/* Header Title */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl text-white tracking-wide">
                A Tesouraria de Gemas Raras
              </h2>
              <div className="h-[1px] w-24 bg-gradient-to-r from-emerald-500/0 via-amber-400 to-rose-500/0 mx-auto my-4" />
              <p className="text-slate-400 text-xs md:text-sm font-serif italic">
                Cada cristal é selecionado de acordo com seu mérito ótico, proveniência ética livre de conflitos e seu par místico botânico correspondente.
              </p>
            </div>

            {/* Filter controls panel widget */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 mb-8 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                
                {/* Search Bar query */}
                <div className="relative">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                    Buscar por Nome, Signo ou Significado
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Ex: Paraíba, Amor, Aquário, Safira..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/5 focus:border-amber-500/50 focus:outline-none rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Dropdown rarity */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                    Classificação de Raridade
                  </label>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/5 focus:border-amber-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-300 transition-colors"
                  >
                    <option value="all">Todas as raridades</option>
                    <option value="Excepcional">Excepcional (Gemas Únicas)</option>
                    <option value="Raríssima">Raríssimas</option>
                    <option value="Alta">Alta Raridade</option>
                  </select>
                </div>

                {/* Mohs Hardness scale toggle */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                    Dureza de Mohs Mínima
                  </label>
                  <div className="flex space-x-2">
                    {[null, 6.0, 7.5, 9.0].map((mohsValue, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedMohs(mohsValue)}
                        className={`flex-1 py-3 text-xs font-mono rounded-xl border transition-all duration-200 ${
                          selectedMohs === mohsValue
                            ? 'border-amber-400 text-yellow-100 bg-amber-500/10'
                            : 'border-white/5 bg-slate-950/50 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mohsValue === null ? 'Livre' : `≥ ${mohsValue}`}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Reset filter badge summary */}
              {(searchQuery || selectedRarity !== 'all' || selectedMohs !== null) && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Filtragem ativa: mostrando {filteredGemstones.length} gema(s) encontradas
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRarity('all');
                      setSelectedMohs(null);
                    }}
                    className="text-xs text-rose-300 hover:text-rose-200 hover:underline flex items-center space-x-1 font-mono cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Limpar Filtros</span>
                  </button>
                </div>
              )}
            </div>

            {/* Empty view search fallback */}
            {filteredGemstones.length === 0 && (
              <div className="text-center py-20 bg-slate-900/20 border border-dashed border-white/5 rounded-3xl">
                <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-serif text-lg text-slate-300">Nenhuma gema corresponde aos seus critérios</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                  Tente remover termos específicos de busca ou redefina o seletor de dureza para explorar toda a nossa coleção mineral botânica.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRarity('all');
                    setSelectedMohs(null);
                  }}
                  className="mt-6 px-6 py-2.5 bg-slate-800 text-white rounded-full font-serif text-xs uppercase tracking-widest hover:bg-slate-700 transition"
                >
                  Restaurar Catálogo
                </button>
              </div>
            )}

            {/* Grid of gemstone cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGemstones.map((gem, idx) => (
                <motion.div
                  key={gem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-[#0b1016] border border-white/5 hover:border-amber-400/30 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group h-[440px]"
                >
                  <div>
                    {/* Top Rarity Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900 px-2.5 py-1 rounded-full border border-white/5">
                        {gem.rarity}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                        <span>Mohs {gem.hardness}</span>
                      </span>
                    </div>

                    {/* Fake Gemstone glowing core illustrative */}
                    <div className="relative w-full h-36 bg-slate-950 rounded-2xl border border-white/2 mb-4 overflow-hidden flex items-center justify-center">
                      <div
                        className="absolute w-16 h-16 rounded-full filter blur-xl transition-all duration-500 group-hover:scale-125"
                        style={{
                          background: gem.gemColorCode,
                          opacity: 0.3,
                        }}
                      />
                      {/* Elegant pure CSS multifaceted jewel preview icon */}
                      <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                        <polygon
                          points="50,15 80,35 80,65 50,85 20,65 20,35"
                          fill={gem.gemColorCode}
                          opacity="0.8"
                        />
                        <polygon
                          points="50,30 70,45 70,55 50,70 30,55 30,45"
                          fill="#ffffff"
                          opacity="0.3"
                        />
                        <line x1="50" y1="15" x2="50" y2="30" stroke="#000" strokeWidth="1" opacity="0.15" />
                        <line x1="80" y1="35" x2="70" y2="45" stroke="#000" strokeWidth="1" opacity="0.15" />
                        <line x1="80" y1="65" x2="70" y2="55" stroke="#000" strokeWidth="1" opacity="0.15" />
                        <line x1="50" y1="85" x2="50" y2="70" stroke="#000" strokeWidth="1" opacity="0.15" />
                        <line x1="20" y1="65" x2="30" y2="55" stroke="#000" strokeWidth="1" opacity="0.15" />
                        <line x1="20" y1="35" x2="30" y2="45" stroke="#000" strokeWidth="1" opacity="0.15" />
                      </svg>
                      {/* Shimmer glitter effect line over card */}
                      <div className="absolute inset-0 shimmer-effect opacity-30" />
                    </div>

                    {/* Gem Details */}
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-yellow-100 transition-colors">
                      {gem.namePt}
                    </h3>

                    {/* Floral Pairing link snippet */}
                    <div className="flex items-center space-x-1.5 mt-1.5 text-xs text-rose-300 font-serif italic">
                      <span className="text-sm">{gem.flowerPairing.icon}</span>
                      <span>Par: {gem.flowerPairing.name}</span>
                    </div>

                    {/* Mini quote description */}
                    <p className="text-xs text-slate-400 font-serif line-clamp-3 mt-3 leading-relaxed">
                      {gem.meaning}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Preço Sugerido</span>
                      <span className="text-sm font-sans font-semibold text-white">
                        {formatCurrency(gem.pricePerCarat)} <span className="text-[10px] text-slate-500 font-mono">/ ct</span>
                      </span>
                    </div>

                    <div className="flex space-x-1.5">
                      <button
                        onClick={() => setSelectedGem(gem)}
                        title="Especificações Completas"
                        className="p-2.5 rounded-full bg-slate-900 border border-white/5 hover:border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setCustomGem(gem);
                          setActiveTab('customizer');
                          triggerCartNotification(`Gema ${gem.namePt} carregada no Ateliê!`);
                        }}
                        className="px-3.5 py-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-serif font-black text-[10px] uppercase tracking-wider hover:opacity-90 transition cursor-pointer"
                      >
                        Montar Joia
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ATELIÊ DE PERSONALIZAÇÃO DE ANÉIS */}
        {activeTab === 'customizer' && (
          <div>
            
            {/* Header intro */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono text-amber-300 uppercase tracking-[0.3em]">Criação Bespoke Sob Medida</span>
              <h2 className="font-serif text-3xl text-white tracking-wide mt-1">
                Ateliê de Criação Floral
              </h2>
              <p className="text-slate-400 text-xs md:text-sm font-serif italic mt-2">
                Combine garras esculpidas à mão em forma de pétalas botânicas com sua gema preciosa favorita e o metal nobre de sua eleição.
              </p>
            </div>

            {/* Split customizer UI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              
              {/* Left Column: Selector controls */}
              <div className="space-y-6">
                
                {/* 1. Selective gemstone picker */}
                <div className="bg-[#0b1016] border border-white/5 rounded-3xl p-5 md:p-6 shadow-xl">
                  <div className="flex items-center space-x-2 text-rose-300 font-serif italic text-sm mb-4">
                    <span className="w-5 h-5 bg-rose-500/10 rounded-full flex items-center justify-center text-xs font-mono not-italic text-rose-300">1</span>
                    <span>Escolha a Gema Preciosa Central</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {GEMSTONES.map((gem) => (
                      <button
                        key={gem.id}
                        onClick={() => setCustomGem(gem)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                          customGem.id === gem.id
                            ? 'border-amber-400 bg-amber-500/10 shadow-[0_4px_10px_rgba(245,158,11,0.1)]'
                            : 'border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 justify-start">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: gem.gemColorCode }}
                          />
                          <span className="text-xs truncate font-medium text-slate-100">{gem.namePt}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 block mt-1">
                          {formatCurrency(gem.pricePerCarat)}/ct
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Selected gem brief paired item */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-white/2 flex items-center justify-between text-xs">
                    <p className="text-slate-400">
                      Raridade: <span className="text-white font-medium">{customGem.rarity}</span> • Origem: <span className="text-white font-medium">{customGem.origin.split(' - ')[0]}</span>
                    </p>
                    <div className="text-rose-300 font-serif italic flex items-center space-x-1 shrink-0">
                      <span>{customGem.flowerPairing.icon}</span>
                      <span>{customGem.flowerPairing.name}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Precious Metals Picker */}
                <div className="bg-[#0b1016] border border-white/5 rounded-3xl p-5 md:p-6 shadow-xl">
                  <div className="flex items-center space-x-2 text-rose-300 font-serif italic text-sm mb-4">
                    <span className="w-5 h-5 bg-rose-500/10 rounded-full flex items-center justify-center text-xs font-mono not-italic text-rose-300">2</span>
                    <span>Selecione a Liga de Metal Nobre</span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {METALS.map((metal) => (
                      <button
                        key={metal.id}
                        onClick={() => setCustomMetal(metal)}
                        className={`p-3 rounded-2xl border transition-all text-left duration-200 ${
                          customMetal.id === metal.id
                            ? 'border-amber-400 bg-amber-500/10'
                            : 'border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-4 h-4 rounded-full ${metal.labelColor} inline-block`} />
                          <span className="text-xs font-semibold text-slate-100">{metal.name.split(' ')[0]}</span>
                        </div>
                        <p className="text-[10px] font-mono text-slate-500 text-left mt-1.5">
                          Base: {formatCurrency(metal.price)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Handcrafted Floral Settings Selector */}
                <div className="bg-[#0b1016] border border-white/5 rounded-3xl p-5 md:p-6 shadow-xl">
                  <div className="flex items-center space-x-2 text-rose-300 font-serif italic text-sm mb-4">
                    <span className="w-5 h-5 bg-rose-500/10 rounded-full flex items-center justify-center text-xs font-mono not-italic text-rose-300">3</span>
                    <span>Escolha a Engenharia Cortês Botânica (Garras)</span>
                  </div>

                  <div className="space-y-3">
                    {FLORAL_SETTINGS.map((setting) => (
                      <button
                        key={setting.id}
                        onClick={() => setCustomSetting(setting)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between ${
                          customSetting.id === setting.id
                            ? 'border-amber-400 bg-amber-500/10'
                            : 'border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-white/10'
                        }`}
                      >
                        <div className="pr-4">
                          <h4 className="font-serif font-semibold text-white text-sm">{setting.name}</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {setting.description}
                          </p>
                          <span className="inline-block mt-2 font-serif text-[10px] italic text-rose-300/80">
                            Inspirado em: "{setting.inspiration}"
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-yellow-100">
                            +{formatCurrency(setting.price)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Fine properties adjustments (Carat weight slider & Size) */}
                <div className="bg-[#0b1016] border border-white/5 rounded-3xl p-5 md:p-6 shadow-xl">
                  <div className="flex items-center space-x-2 text-rose-300 font-serif italic text-sm mb-4">
                    <span className="w-5 h-5 bg-rose-500/10 rounded-full flex items-center justify-center text-xs font-mono not-italic text-rose-300">4</span>
                    <span>Ajustes Finos de Lapidação</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Carats Slider weight */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-slate-400">Peso Estimado (Mil Quilates)</span>
                        <span className="font-bold text-amber-300 font-mono">{customCarat.toFixed(1)} ct</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.1"
                        value={customCarat}
                        onChange={(e) => setCustomCarat(parseFloat(e.target.value))}
                        className="w-full accent-amber-400 h-1 bg-slate-900 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                        <span>0.5 ct (Delicado)</span>
                        <span>5.0 ct (Majestoso)</span>
                      </div>
                    </div>

                    {/* Ring Size Selection */}
                    <div>
                      <span className="font-mono text-xs text-slate-400 block mb-1">Tamanho do Aro do Anel (Padrão BR)</span>
                      <select
                        value={customRingSize}
                        onChange={(e) => setCustomRingSize(e.target.value)}
                        className="w-full bg-slate-950 border border-white/5 focus:outline-none focus:border-amber-500/50 rounded-xl py-2 px-3 text-xs text-slate-300 font-mono"
                      >
                        {Array.from({ length: 16 }).map((_, i) => {
                          const size = (10 + i).toString();
                          return <option key={size} value={size}>Aro {size} (Aprox. {15.0 + i * 0.3}mm)</option>;
                        })}
                      </select>
                      <span className="text-[9px] font-mono text-slate-500 block mt-1">
                        Medidas ajustáveis gratuítas sob nossa garantia vitalícia.
                      </span>
                    </div>
                  </div>

                  {/* Inside band custom gold personal engraving */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Gravação no Interior do Aro (Personalizado Gratuito)
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      placeholder="Ex: Amor Eterno • A & B • 2026"
                      value={customEngraving}
                      onChange={(e) => setCustomEngraving(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/5 focus:border-amber-500/50 focus:outline-none rounded-xl py-3 px-4 text-xs text-white placeholder-slate-600 transition-colors font-serif italic"
                    />
                  </div>
                </div>

              </div>

              {/* Right Column: Real-time interactive graphics preview */}
              <div className="space-y-6 lg:sticky lg:top-28">
                
                {/* SVG Jewel Render */}
                <JewelPreview
                  gemstone={customGem}
                  metal={customMetal}
                  setting={customSetting}
                  carats={customCarat}
                  sunlightLevel={sunlightLevel}
                />

                {/* Sunlight Intensity Simulator Control */}
                <div className="bg-[#0b1016] border border-white/5 rounded-3xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1.5">
                      <Sun className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-serif text-slate-300">Intensidade da Luz Solar Estelar</span>
                    </div>
                    <span className="font-mono text-xs text-amber-400">{sunlightLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={sunlightLevel}
                    onChange={(e) => setSunlightLevel(parseInt(e.target.value))}
                    className="w-full accent-amber-400 h-1 bg-slate-900 rounded-lg cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500 font-serif leading-relaxed mt-1.5">
                    Arraste o dimmer para simular a refração de fótons e o brilho característico do corte lapidado sob diferentes feixes de luz!
                  </p>
                </div>

                {/* Dynamic Quote Receipt Box */}
                <div className="bg-gradient-to-tr from-[#0f1725] to-[#1a2538] border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                  
                  {/* Watermark shine */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Cotação Estimada do Design
                      </span>
                      <h3 className="font-serif font-bold text-xl text-yellow-100 mt-1">
                        Anel de Alta Joalheria Botânica
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
                        Artesanal
                      </span>
                    </div>
                  </div>

                  {/* Summary items */}
                  <div className="space-y-2 text-xs font-mono border-b border-white/5 pb-4 mb-4">
                    <div className="flex justify-between text-slate-400">
                      <span>• Gema: {customGem.namePt} ({customCarat.toFixed(1)} ct)</span>
                      <span className="text-slate-200">{formatCurrency(customGem.pricePerCarat * customCarat)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>• Metal: {customMetal.name}</span>
                      <span className="text-slate-200">{formatCurrency(customMetal.price)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>• Base: {customSetting.name}</span>
                      <span className="text-slate-200">{formatCurrency(customSetting.price)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>• Modelagem & Forja Exclusiva</span>
                      <span className="text-slate-200">{formatCurrency(450)}</span>
                    </div>
                    {customEngraving && (
                      <div className="text-[11px] text-rose-300 italic font-serif">
                        Gravado em aro interno: "{customEngraving}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Valor de Reserva Bespoke</span>
                      <span className="text-2xl font-serif text-white font-semibold">
                        {formatCurrency(customBuilderPrice)}
                      </span>
                    </div>

                    <button
                      onClick={handleAddCustomToCart}
                      className="px-6 py-3 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 hover:opacity-90 text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-full shadow-lg transition-all cursor-pointer"
                    >
                      Adicionar à Sacola
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 3: AFINIDADES BOTÂNICAS & FLORIOGRAFIA (MINI-GAME) */}
        {activeTab === 'pairings' && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-[0.3em]">Sabedorias Ancestrais</span>
              <h2 className="font-serif text-3xl text-white tracking-wide mt-1">
                Afinidades e Linguagem Secreta
              </h2>
              <p className="text-slate-400 text-xs md:text-sm font-serif italic mt-2">
                Os antigos acreditavam que as gemas cristalinas possuíam harmonias sinérgicas com famílias específicas de flores. Teste seu oráculo botânico individual abaixo.
              </p>
            </div>

            <FloralPairingGame />
          </div>
        )}

        {/* TAB 4: AGENDAR CONSULTA VIP SHOWROOM */}
        {activeTab === 'booking' && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-[0.3em]">Atendimento Exclusivo</span>
              <h2 className="font-serif text-3xl text-white tracking-wide mt-1">
                Atendimento VIP e Avaliação
              </h2>
              <p className="text-slate-400 text-xs md:text-sm font-serif italic mt-2">
                Nossos salões privados em jardins botânicos oferecem uma imersão sensorial onde você pode tocar nas gemas e provar as ligas sob a orientação de mestres gemologistas.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

              {!bookingResult ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  
                  {/* Left Column: marketing VIP text */}
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl text-slate-100 tracking-wide font-medium leading-snug">
                      Um Convite ao Deslumbre Sensorial Completo
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-serif italic">
                      "Nas visitas agendadas, as joias são servidas em redomas de vidro sobre bandejas de pétalas úmidas de magnólias, harmonizadas com chás colhidos à mão em nossa estufa privada."
                    </p>

                    <div className="space-y-3 font-mono text-[11px] text-slate-400">
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        <span>Avaliação Gemológica Gratuita e com Lupa Zeiss</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Estufas Reservadas com Isolamento Acústico</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-rose-400" />
                        <span>Provador Físico sob Luz Solar, Vela e Sombra</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Privacidade Garantida: Suas informações e designs são encriptados e catalogados apenas sob convite, restrito aos nossos conselheiros diretos.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Reservation Form */}
                  <form onSubmit={handleBookingSubmit} className="space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-white/2">
                    
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Seu Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="Ex: Helena Albuquerque"
                          className="w-full bg-slate-900 border border-white/5 focus:outline-none focus:border-amber-400/50 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Endereço de E-mail VIP
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="Ex: helena@exemplo.com"
                          className="w-full bg-slate-900 border border-white/5 focus:outline-none focus:border-amber-400/50 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Data Preferencial de Visita
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 focus:outline-none focus:border-amber-400/50 rounded-xl py-2.5 px-3 text-xs text-slate-300 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Gema no seu Foco de Interesse
                      </label>
                      <select
                        value={bookingGemId}
                        onChange={(e) => setBookingGemId(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 focus:outline-none focus:border-amber-400/50 rounded-xl py-2.5 px-3 text-xs text-slate-300"
                      >
                        {GEMSTONES.map(g => (
                          <option key={g.id} value={g.id}>{g.namePt} ({g.rarity})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Instruções Especiais ou Preferência de Flores
                      </label>
                      <textarea
                        rows={2}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="Ex: Gostaria de provar sob luz de velas quente no cair da noite..."
                        className="w-full bg-slate-900 border border-white/5 focus:outline-none focus:border-amber-400/50 rounded-xl py-2 px-3 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-yellow-300 to-amber-400 hover:opacity-90 text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-xl transition cursor-pointer"
                    >
                      Solicitar Convite VIP
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 max-w-lg mx-auto">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-slate-50 tracking-wide">
                    Agendamento VIP Solicitado!
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Seu convite exclusivo está sendo processado por nosso curador principal.
                  </p>

                  {/* Invitiation Ticket Card */}
                  <div className="my-8 bg-[#0a121d] border border-amber-500/20 p-6 rounded-2xl shadow-xl text-left font-mono text-xs relative overflow-hidden">
                    {/* Ticket puncture visual */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#03070b]" />
                    <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#03070b]" />

                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="font-bold text-amber-300">ADAMAS ATELIÊ CONVITE</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-100 px-2 py-0.5 rounded border border-amber-500/20">{bookingResult.id}</span>
                    </div>

                    <div className="space-y-2.5 mt-4 text-slate-300 text-[11px]">
                      <div>
                        <span className="text-slate-500 uppercase text-[9px] block">Portador do Convite VIP</span>
                        <span className="text-white font-medium">{bookingResult.clientName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase text-[9px] block">E-mail de Cadastro</span>
                        <span>{bookingResult.clientEmail}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase text-[9px] block">Data Reservada</span>
                        <span className="text-yellow-100">{new Date(bookingResult.preferredDate).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase text-[9px] block">Gema em Análise Primária</span>
                        <span className="text-white font-serif">{GEMSTONES.find(g => g.id === bookingResult.selectedGemstoneId)?.namePt}</span>
                      </div>
                      {bookingResult.notes && (
                        <div>
                          <span className="text-slate-500 uppercase text-[9px] block">Instruções</span>
                          <span className="italic">"{bookingResult.notes}"</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-dashed border-white/10 flex justify-between items-center text-[10px] text-slate-500">
                      <span>Emitido em: {bookingResult.scheduledAt}</span>
                      <span className="text-amber-400">Pádua, PR</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingResult(null)}
                    className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-serif transition"
                  >
                    Novo Agendamento
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER ATELIÊ --- */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 px-4 relative z-20 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif font-semibold text-white tracking-[0.2em] uppercase text-sm">Adamas e Flora © 2026</span>
            <p className="mt-2 text-slate-400 max-w-sm font-serif italic text-[11px] leading-relaxed">
              Ateliê de alta joalheria focado em lapidação orgânica de luxo e simetrias botânicas secretas.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-serif">
            <button onClick={() => setActiveTab('collection')} className="hover:text-slate-200">Gemas</button>
            <button onClick={() => setActiveTab('customizer')} className="hover:text-slate-200">Personalizador</button>
            <button onClick={() => setActiveTab('pairings')} className="hover:text-slate-200">Floriografia</button>
            <button onClick={() => setActiveTab('booking')} className="hover:text-slate-200">Showrooms Privados</button>
          </div>

          <p className="font-mono text-[10px]">
            Desenvolvido sob padrões nobres de lapidação mineral.
          </p>
        </div>
      </footer>

      {/* --- SELECTED GEM SPECIFICATIONS MODAL DIALOG --- */}
      <AnimatePresence>
        {selectedGem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b1016] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedGem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-slate-400 hover:text-white border border-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {/* Gem Color Accent Title header */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedGem.gemColorCode }} />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">{selectedGem.rarity}</span>
                </div>

                <h3 className="font-serif text-3xl text-white tracking-wide font-medium">
                  {selectedGem.namePt}
                </h3>
                <span className="font-mono text-xs text-slate-400 block mt-1">Ref: {selectedGem.name}</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
                  
                  {/* Left Specs parameters */}
                  <div className="space-y-3.5 font-mono text-[11px] text-slate-300 bg-slate-950/70 p-4 rounded-2xl border border-white/2">
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-500">Dureza de Mohs</span>
                      <span className="text-white font-bold">{selectedGem.hardness}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-500">Índice Refração</span>
                      <span className="text-white">{selectedGem.refractiveIndex}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-500">Mineração / Origem</span>
                      <span className="text-white truncate max-w-[150px]" title={selectedGem.origin}>{selectedGem.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Preço / ct Estimado</span>
                      <span className="text-yellow-100 font-bold">{formatCurrency(selectedGem.pricePerCarat)}</span>
                    </div>
                  </div>

                  {/* Right pairing details & Flotiography info */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-rose-950/15 border border-rose-500/20 text-rose-300">
                      <div className="flex items-center space-x-2 mb-2 font-serif font-semibold">
                        <span>{selectedGem.flowerPairing.icon}</span>
                        <h4>Par Floral: {selectedGem.flowerPairing.name}</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-normal">
                        {selectedGem.flowerPairing.meaning}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 font-serif leading-relaxed italic">
                      <span className="font-semibold text-slate-200 block not-italic font-mono uppercase text-[9px] tracking-wider mb-1">Associações Místicas</span>
                      Signos Vinculados: <span className="text-slate-300 font-semibold">{selectedGem.zodiac.join(', ')}</span><br />
                      Significado: "{selectedGem.meaning}"
                    </div>
                  </div>

                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-serif mt-6 pt-6 border-t border-white/5">
                  {selectedGem.description}
                </p>

                {/* Modal actions */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      handleAddToCartDirect(selectedGem);
                      setSelectedGem(null);
                    }}
                    className="px-5 py-3 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-xl text-xs font-serif transition"
                  >
                    Reservar Gema Bruta
                  </button>
                  <button
                    onClick={() => {
                      setCustomGem(selectedGem);
                      setActiveTab('customizer');
                      setSelectedGem(null);
                      triggerCartNotification(`Gema ${selectedGem.namePt} carregada no Ateliê!`);
                    }}
                    className="px-6 py-3 bg-[#e6b800] hover:bg-yellow-400 text-slate-950 font-serif font-black text-xs uppercase tracking-widest rounded-xl transition"
                  >
                    Personalizar no Anel
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SHOPPING CART DRAWER PANEL AND CHECKOUT FLOW --- */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs">
            {/* Click outer to close */}
            <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="relative w-full max-w-md h-full bg-[#070b13] border-l border-white/10 p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                
                {/* Header title close */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <h3 className="font-serif text-lg text-white font-medium">Sacola de Encomendas</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Order List */}
                {!checkoutComplete ? (
                  <div>
                    {cart.length === 0 ? (
                      <div className="text-center py-20 text-slate-500 font-serif">
                        <Gem className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-sm">Sua sacola de joias está vazia.</p>
                        <p className="text-xs text-slate-600 mt-2">Visite o Ateliê de Criação ou o catálogo de lapidação para reservar suas pedras.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-950/70 p-4 rounded-2xl border border-white/5 flex items-start justify-between space-x-3"
                          >
                            <div className="shrink-0 w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-xs">
                              💎
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif font-semibold text-slate-100 text-sm truncate">
                                {item.type === 'custom' ? `Anel ${item.setting?.name}` : `Gema ${item.gemstone.namePt}`}
                              </h4>
                              {item.type === 'custom' ? (
                                <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                                  {item.metal?.name} • {item.carats.toFixed(1)} ct • Aro {item.ringSize}
                                </p>
                              ) : (
                                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                                  Gema Bruta Única • {item.carats.toFixed(1)} ct
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-[10px] text-rose-300 font-serif mt-1 italic">{item.notes}</p>
                              )}
                              <span className="block mt-1.5 font-mono text-xs font-bold text-yellow-100">
                                {formatCurrency(item.totalPrice)}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 transition cursor-pointer shrink-0"
                              title="Remover Item"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Checkout form triggers */}
                    {cart.length > 0 && !showCheckoutForm && (
                      <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-serif text-slate-400">Total Previsto:</span>
                          <span className="font-mono font-bold text-lg text-white">
                            {formatCurrency(calculateCartTotal())}
                          </span>
                        </div>
                        <button
                          onClick={() => setShowCheckoutForm(true)}
                          className="w-full py-3.5 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-950 font-serif font-black text-xs tracking-widest uppercase rounded-xl hover:opacity-95 transition"
                        >
                          Ir para Validação de Cotação
                        </button>
                      </div>
                    )}

                    {/* Checkout Customer detail fields */}
                    {showCheckoutForm && (
                      <form onSubmit={handleCheckoutSubmit} className="mt-6 pt-6 border-t border-white/5 space-y-4">
                        <h4 className="font-serif text-xs text-amber-300 uppercase tracking-widest font-bold">Reserva de Peças de Luxo</h4>
                        
                        <div>
                          <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Nome de Contato</label>
                          <input
                            type="text"
                            required
                            value={checkoutName}
                            onChange={(e) => setCheckoutName(e.target.value)}
                            placeholder="Helena Albuquerque"
                            className="w-full bg-slate-950 border border-white/5 focus:outline-none focus:border-amber-500/50 rounded-lg py-2.5 px-3 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">E-mail para Orçamento</label>
                          <input
                            type="email"
                            required
                            value={checkoutEmail}
                            onChange={(e) => setCheckoutEmail(e.target.value)}
                            placeholder="helena@exemplo.com"
                            className="w-full bg-slate-950 border border-white/5 focus:outline-none focus:border-amber-500/50 rounded-lg py-2.5 px-3 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Telemóvel / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            value={checkoutPhone}
                            onChange={(e) => setCheckoutPhone(e.target.value)}
                            placeholder="+55 11 99999-9999"
                            className="w-full bg-slate-950 border border-white/5 focus:outline-none focus:border-amber-500/50 rounded-lg py-2.5 px-3 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Mensagem ao Ourives</label>
                          <textarea
                            rows={2}
                            value={checkoutNotes}
                            onChange={(e) => setCheckoutNotes(e.target.value)}
                            placeholder="Desejo entrega em embalagem esculpida em cedro..."
                            className="w-full bg-slate-950 border border-white/5 focus:outline-none focus:border-amber-500/50 rounded-lg py-2 px-3 text-xs text-white"
                          />
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowCheckoutForm(false)}
                            className="flex-1 py-3 border border-white/5 text-slate-400 hover:text-white rounded-lg text-xs font-serif transition"
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-tr from-emerald-500 to-teal-400 hover:opacity-90 text-slate-950 font-serif font-bold text-xs tracking-widest uppercase rounded-lg transition"
                          >
                            Solicitar Cotação
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  // Success visual card representation
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
                    <h3 className="font-serif text-xl text-slate-50 tracking-wide">Orçamento Solicitado!</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Seu pedido de modelagem bespoke e reserva foi catalogado com sucesso por nossa alta-joalheria.
                    </p>

                    {/* Detailed quotation bill */}
                    <div className="my-6 bg-slate-950/80 border border-white/10 p-5 rounded-2xl text-left font-mono text-xs space-y-3 relative">
                      <div className="flex justify-between text-yellow-100 border-b border-white/5 pb-2">
                        <span>Código do Pedido</span>
                        <span className="text-[10px] bg-slate-900 px-1 py-0.5 rounded text-white">{checkoutReceiptId}</span>
                      </div>

                      <div className="space-y-1 text-slate-400 text-[11px] pb-2 border-b border-white/5">
                        {checkoutItemsSummary.map((item, id) => (
                          <div key={id} className="flex justify-between">
                            <span>• {item.type === 'custom' ? `${item.setting?.name} (${item.carats.toFixed(1)}ct)` : `${item.gemstone.namePt}`}</span>
                            <span>{formatCurrency(item.totalPrice)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between font-bold text-white text-[12px] pt-1 pt-b">
                        <span>Valor Estimado Total</span>
                        <span className="text-amber-300">{formatCurrency(checkoutTotalPrice)}</span>
                      </div>

                      <div className="text-[10px] text-slate-500 space-y-1">
                        <p>Cliente: {checkoutName}</p>
                        <p>E-mail: {checkoutEmail}</p>
                        <p>Status: <span className="text-emerald-400">Reserva de Pedras Garantida</span></p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic font-serif leading-normal mt-4">
                      "Entraremos em contato via correio diplomático ou WhatsApp nas próximas 3 horas úteis para repassar o andamento do design com o ateliê."
                    </p>

                    <button
                      onClick={() => {
                        setCheckoutComplete(false);
                        setShowCheckoutForm(false);
                        setIsCartOpen(false);
                        setCheckoutName('');
                        setCheckoutEmail('');
                        setCheckoutPhone('');
                        setCheckoutNotes('');
                      }}
                      className="mt-6 w-full py-3 bg-slate-900 border border-white/5 text-xs text-slate-300 hover:text-white rounded-lg font-serif transition"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
