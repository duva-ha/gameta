import React, { useState, useEffect } from 'react';

const vocabData = [
  { en: 'Apple', vn: 'Quả táo', emoji: '🍎', color: 'bg-rose-500', shadow: 'shadow-rose-200' },
  { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', color: 'bg-amber-400', shadow: 'shadow-amber-200' },
  { en: 'Cat', vn: 'Con mèo', emoji: '🐱', color: 'bg-orange-400', shadow: 'shadow-orange-200' },
  { en: 'Dog', vn: 'Con chó', emoji: '🐶', color: 'bg-sky-400', shadow: 'shadow-sky-200' },
  { en: 'Bird', vn: 'Con chim', emoji: '🐦', color: 'bg-emerald-400', shadow: 'shadow-emerald-200' },
  { en: 'Sun', vn: 'Mặt trời', emoji: '☀️', color: 'bg-yellow-400', shadow: 'shadow-yellow-100' },
];

export default function App() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  const nextQuestion = () => {
    const random = vocabData[Math.floor(Math.random() * vocabData.length)];
    setQuestion(random);
    setIsCorrect(null);
    speak(`Where is the ${random.en}?`);
  };

  useEffect(() => { nextQuestion(); }, []);

  const handleChoice = (item) => {
    if (item.en === question.en) {
      setScore(score + 10);
      setIsCorrect(true);
      speak("Correct!");
      setTimeout(nextQuestion, 1500);
    } else {
      setIsCorrect(false);
      speak("Try again!");
      setTimeout(() => setIsCorrect(null), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] font-sans text-slate-800 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Thông minh */}
        <header className="flex justify-between items-center mb-10 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-2xl font-black">G</span>
            </div>
            <div>
              <h1 className="font-black text-indigo-900 leading-none">GIA THOẠI</h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Education App</p>
            </div>
          </div>
          <div className="bg-white px-6 py-2 rounded-2xl border-2 border-indigo-50 shadow-inner">
            <span className="text-indigo-600 font-black text-xl">{score} <span className="text-xs text-slate-400">PTS</span></span>
          </div>
        </header>

        {/* Thẻ câu hỏi trung tâm */}
        <section className="relative mb-12 group">
          <div className={`bg-white rounded-[3rem] p-12 text-center border-b-[12px] transition-all duration-300 ${isCorrect === true ? 'border-green-400' : isCorrect === false ? 'border-red-400' : 'border-slate-100'} shadow-2xl shadow-slate-200`}>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Đố con đây là gì?</p>
            <h2 className="text-6xl md:text-8xl font-black text-slate-800 mb-6 drop-shadow-sm tracking-tight">
              {question?.en}
            </h2>
            <button 
              onClick={() => speak(question?.en)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform active:scale-90"
            >
              <span className="text-2xl">🔊</span>
            </button>
          </div>
        </section>

        {/* Lưới từ vựng phong cách Bento */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {vocabData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleChoice(item)}
              className={`group relative overflow-hidden bg-white p-8 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-200 transition-all duration-300 hover:-translate-y-2 active:scale-95 shadow-xl shadow-slate-100`}
            >
              <div className={`absolute top-0 left-0 w-2 h-full ${item.color}`}></div>
              <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                {item.emoji}
              </div>
              <p className="font-black text-slate-700 text-lg uppercase tracking-wide">{item.en}</p>
              <p className="text-slate-400 font-medium text-sm italic">{item.vn}</p>
            </button>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-slate-300 font-bold text-[10px] uppercase tracking-[0.5em]">
            Design for Future Generation • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
