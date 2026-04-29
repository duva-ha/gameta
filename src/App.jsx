import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // Bạn có thể cài thêm thư viện này sau

const vocabData = [
  { en: 'Apple', vn: 'Quả táo', emoji: '🍎', gradient: 'from-rose-400 to-red-500' },
  { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', gradient: 'from-amber-300 to-yellow-500' },
  { en: 'Cat', vn: 'Con mèo', emoji: '🐱', gradient: 'from-orange-300 to-orange-500' },
  { en: 'Dog', vn: 'Con chó', emoji: '🐶', gradient: 'from-sky-300 to-blue-500' },
  { en: 'Bird', vn: 'Con chim', emoji: '🐦', gradient: 'from-emerald-300 to-teal-500' },
  { en: 'Sun', vn: 'Mặt trời', emoji: '☀️', gradient: 'from-yellow-200 to-orange-400' },
];

export default function App() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.pitch = 1.2; // Giọng cao trẻ trung hơn
    msg.rate = 0.85;
    window.speechSynthesis.speak(msg);
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const nextQuestion = () => {
    const random = vocabData[Math.floor(Math.random() * vocabData.length)];
    setQuestion(random);
    setIsSuccess(null);
    speak(`Where is the ${random.en}?`);
  };

  useEffect(() => { nextQuestion(); }, []);

  const handleChoice = (item) => {
    if (item.en === question.en) {
      setIsSuccess(true);
      setScore(prev => prev + 10);
      speak("Wonderful!");
      if ((score + 10) % 50 === 0) triggerConfetti();
      setTimeout(nextQuestion, 1200);
    } else {
      setIsSuccess(false);
      speak("Try again, buddy!");
      setTimeout(() => setIsSuccess(null), 800);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        {/* Top Navigation Bar */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-500">
              <span className="text-white text-3xl font-black italic">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-800 tracking-tighter">GIA THOAI</h1>
              <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em]">PREMIUM EDUCATION</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white/50">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Score</p>
              <p className="text-2xl font-black text-indigo-600 leading-none">{score}</p>
            </div>
          </div>
        </nav>

        {/* Hero Section - Question Area */}
        <main className="grid lg:grid-cols-5 gap-12 items-center">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <h2 className="text-indigo-600 font-black text-sm uppercase tracking-widest">Question Session</h2>
              <h3 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
                Find the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                  {question?.en}
                </span>
              </h3>
            </div>
            
            <button 
              onClick={() => speak(question?.en)}
              className="flex items-center gap-4 bg-white hover:bg-slate-50 p-4 pr-8 rounded-3xl shadow-lg transition-all active:scale-95 group"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <span className="text-xl">🔊</span>
              </div>
              <span className="font-black text-slate-700 uppercase tracking-wider">Listen Voice</span>
            </button>
          </div>

          {/* Grid Area - Bento Style */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {vocabData.map((item, index) => (
              <button
                key={index}
                onClick={() => handleChoice(item)}
                className={`btn-premium group relative h-48 rounded-[2.5rem] bg-white flex flex-col items-center justify-center p-6 border-2 border-transparent transition-all overflow-hidden ${isSuccess && item.en === question.en ? 'border-green-400 bg-green-50' : ''}`}
              >
                {/* Background Decor */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-full blur-2xl`}></div>
                
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-500 z-10">{item.emoji}</span>
                <span className="font-black text-slate-800 text-sm tracking-widest uppercase z-10">{item.en}</span>
                <div className="mt-2 w-8 h-1 bg-slate-100 rounded-full group-hover:w-16 group-hover:bg-indigo-400 transition-all"></div>
              </button>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-24 border-t border-slate-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="text-xs font-bold tracking-[0.4em] text-slate-500 italic">CREATIVE LEARNING ECOSYSTEM</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <span>React 19</span>
            <span>Vite 6</span>
            <span>Tailwind 4</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
