import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- DỮ LIỆU TỪ VỰNG (Bạn có thể thêm tiếp vào đây cho đủ 200 từ) ---
const vocabData = {
  "Động vật 🐱": [
    { en: 'Cat', vn: 'Con mèo', emoji: '🐱', color: 'bg-orange-100 text-orange-600' },
    { en: 'Dog', vn: 'Con chó', emoji: '🐶', color: 'bg-sky-100 text-sky-600' },
    { en: 'Lion', vn: 'Sư tử', emoji: '🦁', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Elephant', vn: 'Con voi', emoji: '🐘', color: 'bg-slate-200 text-slate-600' },
    { en: 'Monkey', vn: 'Con khỉ', emoji: '🐒', color: 'bg-stone-100 text-stone-600' },
    { en: 'Rabbit', vn: 'Con thỏ', emoji: '🐰', color: 'bg-pink-100 text-pink-600' },
    { en: 'Bird', vn: 'Con chim', emoji: '🐦', color: 'bg-blue-100 text-blue-500' },
    { en: 'Giraffe', vn: 'Hươu cao cổ', emoji: '🦒', color: 'bg-amber-100 text-amber-600' },
  ],
  "Trái cây 🍎": [
    { en: 'Apple', vn: 'Quả táo', emoji: '🍎', color: 'bg-rose-100 text-rose-600' },
    { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Grapes', vn: 'Quả nho', emoji: '🍇', color: 'bg-purple-100 text-purple-600' },
    { en: 'Watermelon', vn: 'Dưa hấu', emoji: '🍉', color: 'bg-green-100 text-green-600' },
    { en: 'Strawberry', vn: 'Dâu tây', emoji: '🍓', color: 'bg-pink-200 text-pink-700' },
  ],
  "Phương tiện 🚀": [
    { en: 'Car', vn: 'Xe hơi', emoji: '🚗', color: 'bg-blue-100 text-blue-600' },
    { en: 'Bus', vn: 'Xe buýt', emoji: '🚌', color: 'bg-yellow-100 text-yellow-600' },
    { en: 'Rocket', vn: 'Tên lửa', emoji: '🚀', color: 'bg-red-100 text-red-600' },
    { en: 'Bicycle', vn: 'Xe đạp', emoji: '🚲', color: 'bg-emerald-100 text-emerald-600' },
  ]
};

export default function App() {
  const categories = Object.keys(vocabData);
  const [currentCat, setCurrentCat] = useState(categories[0]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState(0);
  const [wrongChoice, setWrongChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Hàm phát âm
  const speak = (text, rate = 0.8) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.rate = rate;
    window.speechSynthesis.speak(msg);
  };

  // Chuyển câu hỏi mới
  const nextQuestion = (cat = currentCat) => {
    const list = vocabData[cat];
    let newWord = list[Math.floor(Math.random() * list.length)];
    // Tránh lặp lại câu hỏi vừa xong
    while (newWord.en === currentQuestion?.en) {
      newWord = list[Math.floor(Math.random() * list.length)];
    }
    setCurrentQuestion(newWord);
    setIsCorrect(false);
    speak(`Where is the ${newWord.en}?`);
  };

  useEffect(() => {
    nextQuestion();
  }, [currentCat]);

  // Xử lý khi chọn
  const handleChoice = (item) => {
    if (item.en === currentQuestion.en) {
      setIsCorrect(true);
      const newProgress = progress + 20;
      
      if (newProgress >= 100) {
        setProgress(100);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        speak("Fantastic! You are a genius!");
        setTimeout(() => setProgress(0), 2000);
      } else {
        setProgress(newProgress);
        speak("Correct!");
      }
      
      setTimeout(() => nextQuestion(), 1500);
    } else {
      setWrongChoice(item.en);
      speak("Try again, buddy!");
      setTimeout(() => setWrongChoice(null), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans p-4 flex flex-col items-center">
      
      {/* Header & Categories */}
      <header className="w-full max-w-2xl text-center mt-4">
        <motion.h1 
          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
          className="text-2xl font-black text-blue-600 tracking-tighter mb-6 uppercase"
        >
          🌟 Bé học tiếng Anh cùng Bố Thoại 🌟
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setCurrentCat(cat); setProgress(0); }}
              className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${currentCat === cat ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-blue-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-6 bg-white rounded-full shadow-inner border-2 border-blue-100 overflow-hidden mb-10">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </header>

      {/* Question Area */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion?.en}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-200 border-b-[10px] border-slate-100 text-center mb-10 w-full max-w-sm relative"
        >
          {isCorrect && (
            <motion.div initial={{ y: 0 }} animate={{ y: -50 }} className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl">🌟</motion.div>
          )}
          <p className="text-slate-400 font-bold text-xs mb-1">CHẠM VÀO HÌNH:</p>
          <h2 className="text-5xl font-black text-slate-800 mb-4">{currentQuestion?.en}</h2>
          <button onClick={() => speak(currentQuestion?.en)} className="bg-blue-50 w-12 h-12 rounded-full text-2xl hover:bg-blue-100 transition-colors">🔊</button>
        </motion.div>
      </AnimatePresence>

      {/* Grid Vocabulary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
        {vocabData[currentCat].map((item, index) => (
          <motion.button
            key={item.en}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, y: 0,
              x: wrongChoice === item.en ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: item.en === currentQuestion?.en ? 10 : -10 }}
            onClick={() => handleChoice(item)}
            className={`${item.color} aspect-square border-4 border-b-8 border-black/5 rounded-[2.5rem] flex flex-col items-center justify-center`}
          >
            <span className="text-6xl mb-2">{item.emoji}</span>
            <span className="text-[10px] font-black uppercase opacity-40">{item.en}</span>
          </motion.button>
        ))}
      </div>

      <footer className="mt-12 opacity-20 font-bold text-[10px] tracking-widest uppercase">
        Dad's Technology Education 2026
      </footer>
    </div>
  );
}
