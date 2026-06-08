import React, { useState } from 'react';
import { GEMSTONES } from '../data';
import { Award, RefreshCw, CheckCircle2, AlertCircle, Heart } from 'lucide-react';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  gemstoneId: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    questionText: 'Qual flor sela a união e a harmonia mística com o Rubi Sangue de Pombo, representando o amor eterno e apaixonado?',
    options: ['Hortênsia Azul', 'Rosa Vermelha Imperial', 'Lírio do Vale', 'Lavanda'],
    correctAnswer: 'Rosa Vermelha Imperial',
    explanation: 'O Rubi Sangue de Pombo carrega o fogo da paixão e coragem, harmonizando perfeitamente com a Rosa Vermelha Imperial, o símbolo supremo da adoração eterna.',
    gemstoneId: 'pigeon-ruby',
  },
  {
    id: 2,
    questionText: 'A Esmeralda Imperial é pareada com o delicado Lírio do Vale. Que promessa espiritual este par representa tradicionalmente?',
    options: ['Amor indomável', 'Transmutação de energias negativas', 'O retorno da felicidade plena e pureza', 'Vigor físico e fortuna repentina'],
    correctAnswer: 'O retorno da felicidade plena e pureza',
    explanation: 'A Esmeralda representa rejuvenescimento e fertilidade conjugal. Seu par espiritual, o Lírio do Vale, traz a doce mensagem do retorno definitivo da felicidade.',
    gemstoneId: 'royal-emerald',
  },
  {
    id: 3,
    questionText: 'A Hortênsia Azul, que representa abundância espiritual e gratidão profunda, é o par de qual gema eletrizante de brilho neon?',
    options: ['Turmalina Paraíba', 'Canary Diamond', 'Ametista Orquídea', 'Espinélio Rosa'],
    correctAnswer: 'Turmalina Paraíba',
    explanation: 'A rara e cobiçada Turmalina Paraíba brilha em tons azul neon elétricos, combinando em raridade e deleite visual com o desabrochar abundante da Hortênsia.',
    gemstoneId: 'paraiba-tourmaline',
  },
  {
    id: 4,
    questionText: 'A flor aromática de Lavanda, símbolo de tranquilidade física, espiritual e proteção leal, acompanha misticamente qual cristal de transmutação?',
    options: ['Opala de Fogo', 'Safira de Caxemira', 'Ametista Orquídea Royal', 'Espinélio Rosa Sakura'],
    correctAnswer: 'Ametista Orquídea Royal',
    explanation: 'A Ametista é o cristal da paz de espírito e meditação profunda. Sua harmonia perfeita ocorre com a Lavanda, acalmando o sistema nervoso e estimulando o equilíbrio familiar.',
    gemstoneId: 'orchid-amethyst',
  },
];

export default function FloralPairingGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleVerify = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
  };

  const correspondingGem = GEMSTONES.find((g) => g.id === currentQuestion?.gemstoneId);

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 rounded-3xl border border-white/5 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Decorative leaf blur background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full filter blur-xl pointer-events-none" />

      <div className="relative z-10">
        {!showSummary ? (
          <div>
            {/* Header progress info */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="font-serif italic text-sm text-rose-200">Afinidades Místicas</span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                Questão {currentIndex + 1} de {QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-serif text-lg md:text-xl text-slate-100 tracking-wide leading-relaxed mb-6">
              {currentQuestion.questionText}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = 'border-white/5 bg-slate-950/40 text-slate-300 hover:bg-slate-950/70 hover:border-white/10';
                
                if (selectedAnswer === option) {
                  btnStyle = 'border-rose-400 bg-rose-950/30 text-rose-200';
                }

                if (isAnswered) {
                  if (option === currentQuestion.correctAnswer) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
                  } else if (selectedAnswer === option) {
                    btnStyle = 'border-rose-600 bg-rose-950/50 text-rose-400 line-through';
                  } else {
                    btnStyle = 'border-white/5 bg-slate-950/20 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    <span className="font-mono text-xs opacity-40">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive evaluation area */}
            {isAnswered && (
              <div className={`p-4 rounded-2xl border mb-6 flex space-x-3 transition-all duration-300 ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' 
                  : 'bg-rose-950/20 border-rose-500/20 text-rose-300'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                )}
                <div>
                  <h4 className="text-sm font-serif font-semibold">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Harmonia Perfeita!' : 'Falta de Sintonia'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  {correspondingGem && (
                    <p className="text-[11px] font-mono mt-2 text-rose-200/80">
                      Gema correspondente: <span className="font-bold underline">{correspondingGem.namePt}</span> (Origem: {correspondingGem.origin})
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation button */}
            <div className="flex justify-end mt-4">
              {!isAnswered ? (
                <button
                  onClick={handleVerify}
                  disabled={!selectedAnswer}
                  className={`px-6 py-3 rounded-xl font-serif text-sm transition-all duration-200 ${
                    selectedAnswer 
                      ? 'bg-yellow-400 text-slate-950 hover:bg-yellow-300 font-semibold cursor-pointer' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Confirmar Afinidade
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-serif font-semibold text-sm transition-all duration-200"
                >
                  {currentIndex + 1 === QUESTIONS.length ? 'Ver Resultados' : 'Próxima Harmonia'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-2xl text-slate-50 tracking-wide">Oráculo de Lapidação</h3>
            <p className="text-sm text-slate-400 italic mt-1 font-serif">Sua sintonia com a natureza foi concluída</p>
            
            <div className="my-8 max-w-sm mx-auto bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Nível de Afinidade</span>
              <span className="text-4xl font-serif font-bold text-yellow-100 block mt-2">
                {Math.round((score / QUESTIONS.length) * 100)}%
              </span>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Você acertou <span className="text-rose-300 font-bold">{score}</span> de{' '}
                <span className="font-bold">{QUESTIONS.length}</span> harmonias botânicas secretas.
              </p>
              
              <p className="text-xs text-slate-400 italic mt-4 border-t border-white/5 pt-4">
                {score === QUESTIONS.length 
                  ? '"Um olhar mestre capaz de identificar a alma cristalina sob o broto das flores."' 
                  : score >= 2 
                  ? '"Seu coração vibra nas frequências naturais da terra e da flora."' 
                  : '"Continue sua meditação botânica para afinar sua sensibilidade."'}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 font-serif text-xs transition-all duration-200 inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Meditar Novamente</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
