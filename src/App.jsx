import React, { useState, useEffect } from 'react';

// Dữ liệu 200 từ vựng chia theo chủ đề
const vocabData = {
  "Động vật 🐱": [
    { en: 'Cat', vn: 'Con mèo', emoji: '🐱', color: 'bg-orange-100 text-orange-600' },
    { en: 'Dog', vn: 'Con chó', emoji: '🐶', color: 'bg-sky-100 text-sky-600' },
    { en: 'Elephant', vn: 'Con voi', emoji: '🐘', color: 'bg-gray-100 text-gray-600' },
    { en: 'Lion', vn: 'Sư tử', emoji: '🦁', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Tiger', vn: 'Con hổ', emoji: '🐯', color: 'bg-orange-200 text-orange-700' },
    { en: 'Giraffe', vn: 'Hươu cao cổ', emoji: '🦒', color: 'bg-amber-100 text-amber-600' },
    { en: 'Monkey', vn: 'Con khỉ', emoji: '🐒', color: 'bg-stone-100 text-stone-600' },
    { en: 'Rabbit', vn: 'Con thỏ', emoji: '🐰', color: 'bg-pink-100 text-pink-600' },
    { en: 'Snake', vn: 'Con rắn', emoji: '🐍', color: 'bg-emerald-100 text-emerald-600' },
    { en: 'Bird', vn: 'Con chim', emoji: '🐦', color: 'bg-blue-100 text-blue-600' },
    // ... Bạn có thể thêm tiếp các con vật khác vào đây
  ],
  "Trái cây 🍎": [
    { en: 'Apple', vn: 'Quả táo', emoji: '🍎', color: 'bg-red-100 text-red-600' },
    { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Orange', vn: 'Quả cam', emoji: '🍊', color: 'bg-orange-100 text-orange-600' },
    { en: 'Grapes', vn: 'Quả nho', emoji: '🍇', color: 'bg-purple-100 text-purple-600' },
    { en: 'Watermelon', vn: 'Dưa hấu', emoji: '🍉', color: 'bg-green-100 text-green-600' },
    { en: 'Strawberry', vn: 'Dâu tây', emoji: '🍓', color: 'bg-rose-100 text-rose-600' },
    { en: 'Mango', vn: 'Quả xoài', emoji: '🥭', color: 'bg-amber-100 text-amber-600' },
    { en: 'Pineapple', vn: 'Quả dứa', emoji: '🍍', color: 'bg-yellow-200 text-yellow-700' },
    { en: 'Cherry', vn: 'Anh đào', emoji: '🍒', color: 'bg-red-200 text-red-700' },
    { en: 'Peach', vn: 'Quả đào', emoji: '🍑', color: 'bg-orange-50 text-orange-500' },
  ],
  "Phương tiện 🚀": [
    { en: 'Car', vn: 'Xe hơi', emoji: '🚗', color: 'bg-blue-100 text-blue-600' },
    { en: 'Bus', vn: 'Xe buýt', emoji: '🚌', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Bicycle', vn: 'Xe đạp', emoji: '🚲', color: 'bg-emerald-100 text-emerald-600' },
    { en: 'Airplane', vn: 'Máy bay', emoji: '✈️', color: 'bg-sky-100 text-sky-600' },
    { en: 'Ship', vn: 'Tàu thủy', emoji: '🚢', color: 'bg-indigo-100 text-indigo-600' },
    { en: 'Train', vn: 'Tàu hỏa', emoji: '🚂', color: 'bg-slate-100 text-slate-600' },
    { en: 'Rocket', vn: 'Tên lửa', emoji: '🚀', color: 'bg-red-100 text-red-600' },
    { en: 'Helicopter', vn: 'Trực thăng', emoji: '🚁', color: 'bg-rose-100 text-rose-600' },
    { en: 'Motorcycle', vn: 'Xe máy', emoji: '🏍️', color: 'bg-neutral-100 text-neutral-600' },
    { en: 'Ambulance', vn: 'Xe cứu thương', emoji: '🚑', color: 'bg-red-50 text-red-500' },
  ],
  "Thời tiết ☀️": [
    { en: 'Sun', vn: 'Mặt trời', emoji: '☀️', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Cloud', vn: 'Đám mây', emoji: '☁️', color: 'bg-slate-100 text-slate-600' },
    { en: 'Rain', vn: 'Mưa', emoji: '🌧️', color: 'bg-blue-100 text-blue-600' },
    { en: 'Snow', vn: 'Tuyết', emoji: '❄️', color: 'bg-sky-50 text-sky-400' },
    { en: 'Rainbow', vn: 'Cầu vồng', emoji: '🌈', color: 'bg-purple-50 text-purple-500' },
    { en: 'Storm', vn: 'Bão', emoji: '⛈️', color: 'bg-indigo-200 text-indigo-800' },
    { en: 'Moon', vn: 'Mặt trăng', emoji: '🌙', color: 'bg-amber-50 text-amber-500' },
    { en: 'Star', vn: 'Ngôi sao', emoji: '⭐', color: 'bg-yellow-50 text-yellow-500' },
    { en: 'Wind', vn: 'Gió', emoji: '💨', color: 'bg-slate-50 text-slate-400' },
    { en: 'Fire', vn: 'Lửa', emoji: '🔥', color: 'bg-orange-100 text-orange-600' },
  ]
};

export default function App() {
  const categories = Object.keys(vocabData);
  const [currentCat, setCurrentCat] = useState(categories[0]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  const nextQuestion = (cat = currentCat) => {
    const list = vocabData[cat];
    const randomWord = list[Math.floor(Math.random() * list.length)];
    setCurrentQuestion(randomWord);
    speak(`Where is the ${randomWord.en}?`);
  };

  useEffect(() => {
    nextQuestion();
  }, [currentCat]);

  const handleChoice = (choice) => {
    if (choice.en === currentQuestion.en) {
      setScore(score + 10);
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
      speak("Great job!");
      setTimeout(() => nextQuestion(), 1000);
    } else {
      speak("Try again, buddy!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] font-sans p-4 md:p-8">
      {/* Header & Category Selector */}
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-black text-indigo-600 mb-6 uppercase tracking-tighter">
          Gia Thoại & English for Kids ❤️
        </h1>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setCurrentCat(cat); setProgress(0); }}
              className={`px-4 py-2 rounded-full font-bold transition-all ${currentCat === cat ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-indigo-400 hover:bg-indigo-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto bg-white p-2 rounded-full shadow-inner border-2 border-indigo-100">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-green-500 h-4 rounded-full transition-all duration-700 shadow-sm" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Question Card */}
        <div className="bg-white w-full max-w-sm p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 text-center mb-12 border-b-[12px] border-slate-100 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-white px-4 py-1 rounded-full text-xs font-black uppercase">
            Score: {score}
          </div>
          <p className="text-slate-400 font-bold text-sm mb-2">HÃY CHỌN HÌNH:</p>
          <h2 className="text-5xl font-black text-slate-800 mb-4">{currentQuestion?.en}</h2>
          <button 
            onClick={() => speak(currentQuestion?.en)}
            className="text-indigo-500 hover:scale-110 transition-transform"
          >
            <span className="text-3xl">🔊</span>
          </button>
        </div>

        {/* Grid từ vựng */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
          {vocabData[currentCat].map((item, index) => (
            <button
              key={index}
              onClick={() => handleChoice(item)}
              className={`${item.color} aspect-square border-4 border-b-8 border-current/10 rounded-[2rem] flex flex-col items-center justify-center transition-all active:border-b-4 active:translate-y-1 hover:brightness-105`}
            >
              <span className="text-5xl mb-2">{item.emoji}</span>
              <span className="text-[10px] font-black uppercase opacity-60">{item.en}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center mt-16 text-slate-300 text-xs font-bold uppercase tracking-widest">
        Industrial Tech Education • 2026
      </footer>
    </div>
  );
}
