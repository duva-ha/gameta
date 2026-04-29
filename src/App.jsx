import React, { useState, useEffect } from 'react';

// Danh sách từ vựng - Bạn có thể dễ dàng thêm từ mới vào đây
const vocabData = [
  { en: 'Apple', vn: 'Quả táo', emoji: '🍎', color: 'bg-red-500' },
  { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', color: 'bg-yellow-400' },
  { en: 'Cat', vn: 'Con mèo', emoji: '🐱', color: 'bg-orange-400' },
  { en: 'Dog', vn: 'Con chó', emoji: '🐶', color: 'bg-blue-500' },
  { en: 'Bird', vn: 'Con chim', emoji: '🐦', color: 'bg-teal-500' },
  { en: 'Sun', vn: 'Mặt trời', emoji: '☀️', color: 'bg-amber-400' },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("Sẵn sàng chưa con?");

  // Hàm phát âm sử dụng công nghệ Web Speech
  const speak = (text, lang = 'en-US') => {
    window.speechSynthesis.cancel(); // Dừng các âm thanh đang phát để tránh chồng chéo
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;
    msg.rate = 0.9; // Đọc hơi chậm một chút cho con dễ nghe
    window.speechSynthesis.speak(msg);
  };

  // Hàm tạo câu hỏi mới ngẫu nhiên
  const nextQuestion = () => {
    const randomWord = vocabData[Math.floor(Math.random() * vocabData.length)];
    setCurrentQuestion(randomWord);
    setFeedback("Đố con biết đây là gì?");
    speak(`Where is the ${randomWord.en}?`);
  };

  // Khởi động câu hỏi đầu tiên khi vào trang
  useEffect(() => {
    nextQuestion();
  }, []);

  const handleChoice = (choice) => {
    if (choice.en === currentQuestion.en) {
      setScore(score + 10);
      setFeedback("Chính xác! Giỏi quá! 🎉");
      speak("Correct! Well done!");
      // Chờ 1.5 giây rồi chuyển câu hỏi mới
      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback("Gần đúng rồi, thử lại nhé! 💪");
      speak("Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center p-4 md:p-10 text-slate-800">
      {/* Bảng điểm */}
      <div className="w-full max-w-md flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏆</span>
          <span className="text-xl font-bold text-blue-600">Điểm: {score}</span>
        </div>
        <button 
          onClick={() => { setScore(0); nextQuestion(); }}
          className="text-sm font-semibold text-slate-400 hover:text-red-500 transition"
        >
          Chơi lại từ đầu
        </button>
      </div>

      {/* Khu vực câu hỏi */}
      <div className="w-full max-w-md bg-white p-8 rounded-[3rem] shadow-xl text-center mb-10 border-b-8 border-slate-200">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">{feedback}</p>
        {currentQuestion && (
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-black text-indigo-600 mb-4">{currentQuestion.en}</h2>
            <button 
              onClick={() => speak(currentQuestion.en)}
              className="bg-indigo-100 text-indigo-600 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-200 transition"
            >
              Nghe lại 🔊
            </button>
          </div>
        )}
      </div>

      {/* Danh sách các lựa chọn (Hình ảnh) */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {vocabData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleChoice(item)}
            className={`${item.color} h-32 md:h-40 rounded-3xl shadow-lg flex items-center justify-center text-7xl transform transition active:scale-90 hover:brightness-110`}
          >
            {item.emoji}
          </button>
        ))}
      </div>

      <footer className="mt-auto pt-10 text-slate-400 text-xs font-medium">
        MADE WITH ❤️ BY DAD
      </footer>
    </div>
  );
}
