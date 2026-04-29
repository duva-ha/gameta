import React, { useState, useEffect } from 'react';

const vocabData = [
  { en: 'Apple', vn: 'Quả táo', emoji: '🍎', color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { en: 'Cat', vn: 'Con mèo', emoji: '🐱', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { en: 'Dog', vn: 'Con chó', emoji: '🐶', color: 'bg-sky-100 text-sky-600 border-sky-200' },
  { en: 'Bird', vn: 'Con chim', emoji: '🐦', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { en: 'Sun', vn: 'Mặt trời', emoji: '☀️', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0); // 1. Thêm state tiến trình
  const totalQuestions = 10; // Mục tiêu hoàn thành 10 câu

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };

  const nextQuestion = () => {
    const randomWord = vocabData[Math.floor(Math.random() * vocabData.length)];
    setCurrentQuestion(randomWord);
    speak(`Where is the ${randomWord.en}?`);
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  const handleChoice = (choice) => {
    if (choice.en === currentQuestion.en) {
      setScore(score + 10);
      // 2. Cập nhật tiến trình (tối đa là 100%)
      const newProgress = progress + (100 / totalQuestions);
      setProgress(newProgress > 100 ? 100 : newProgress);
      
      speak("Correct!");
      setTimeout(nextQuestion, 1200);
    } else {
      speak("Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-6">
      {/* 3. Giao diện Thanh tiến trình */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between mb-2 text-sm font-bold text-slate-500">
          <span>Tiến trình của con</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden shadow-inner">
          <div 
            className="bg-green-500 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Khu vực câu hỏi */}
      <div className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-xl text-center mb-10 border-b-8 border-slate-200">
        <h2 className="text-4xl font-black text-indigo-600 mb-4">{currentQuestion?.en}</h2>
        <button onClick={() => speak(currentQuestion?.en)} className="text-indigo-400 font-bold">🔊 Nghe lại</button>
      </div>

      {/* Lưới từ vựng */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {vocabData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleChoice(item)}
            className={`${item.color} h-32 border-4 border-b-8 rounded-[2rem] text-6xl flex items-center justify-center transition-all active:border-b-4 active:translate-y-1`}
          >
            {item.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
