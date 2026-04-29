import React, { useState, useEffect } from 'react';

// DỮ LIỆU TỪ VỰNG (Bạn có thể tiếp tục thêm vào các mảng này)
const allVocab = {
  "Động vật 🦁": [
    { en: 'Lion', vn: 'Sư tử', emoji: '🦁' }, { en: 'Tiger', vn: 'Con hổ', emoji: '🐯' },
    { en: 'Elephant', vn: 'Con voi', emoji: '🐘' }, { en: 'Monkey', vn: 'Con khỉ', emoji: '🐒' },
    { en: 'Zebra', vn: 'Ngựa vằn', emoji: '🦓' }, { en: 'Giraffe', vn: 'Hươu cao cổ', emoji: '🦒' },
    { en: 'Hippo', vn: 'Hà mã', emoji: '🦛' }, { en: 'Bear', vn: 'Con gấu', emoji: '🐻' },
    { en: 'Wolf', vn: 'Con sói', emoji: '🐺' }, { en: 'Fox', vn: 'Con cáo', emoji: '🦊' }
  ],
  "Trái cây 🍎": [
    { en: 'Apple', vn: 'Quả táo', emoji: '🍎' }, { en: 'Banana', vn: 'Quả chuối', emoji: '🍌' },
    { en: 'Mango', vn: 'Quả xoài', emoji: '🥭' }, { en: 'Grapes', vn: 'Quả nho', emoji: '🍇' },
    { en: 'Peach', vn: 'Quả đào', emoji: '🍑' }, { en: 'Cherry', vn: 'Anh đào', emoji: '🍒' },
    { en: 'Melon', vn: 'Dưa lưới', emoji: '🍈' }, { en: 'Pear', vn: 'Quả lê', emoji: '🍐' }
  ],
  "Phương tiện 🚀": [
    { en: 'Rocket', vn: 'Tên lửa', emoji: '🚀' }, { en: 'Plane', vn: 'Máy bay', emoji: '✈️' },
    { en: 'Helicopter', vn: 'Trực thăng', emoji: '🚁' }, { en: 'Submarine', vn: 'Tàu ngầm', emoji: 'Submarine' },
    { en: 'Train', vn: 'Tàu hỏa', emoji: '🚂' }, { en: 'Ship', vn: 'Tàu thủy', emoji: '🚢' }
  ],
  "Vũ trụ 🪐": [
    { en: 'Earth', vn: 'Trái đất', emoji: '🌍' }, { en: 'Moon', vn: 'Mặt trăng', emoji: '🌙' },
    { en: 'Sun', vn: 'Mặt trời', emoji: '☀️' }, { en: 'Star', vn: 'Ngôi sao', emoji: '⭐' },
    { en: 'Saturn', vn: 'Sao thổ', emoji: '🪐' }, { en: 'Alien', vn: 'Người ngoài hành tinh', emoji: '👽' }
  ],
  "Thời tiết ⛈️": [
    { en: 'Cloud', vn: 'Đám mây', emoji: '☁️' }, { en: 'Rain', vn: 'Mưa', emoji: '🌧️' },
    { en: 'Snow', vn: 'Tuyết', emoji: '❄️' }, { en: 'Rainbow', vn: 'Cầu vồng', emoji: '🌈' },
    { en: 'Thunder', vn: 'Sấm sét', emoji: '⚡' }, { en: 'Wind', vn: 'Gió', emoji: '💨' }
  ],
  "Cảm xúc 😃": [
    { en: 'Happy', vn: 'Hạnh phúc', emoji: '😃' }, { en: 'Sad', vn: 'Buồn', emoji: '😢' },
    { en: 'Angry', vn: 'Tức giận', emoji: '😠' }, { en: 'Love', vn: 'Yêu', emoji: '🥰' },
    { en: 'Cool', vn: 'Ngầu', emoji: '😎' }, { en: 'Scared', vn: 'Sợ hãi', emoji: '😨' }
  ],
  // Bạn hãy tạo thêm các chủ đề: "Số đếm 🔢", "Hình khối 💠", "Màu sắc 🎨", "Trường học 🎒"... 
};

export default function App() {
  const categories = Object.keys(allVocab);
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.rate = 0.85;
    window.speechSynthesis.speak(msg);
  };

  const nextQuestion = (cat = selectedCat) => {
    const list = allVocab[cat];
    const random = list[Math.floor(Math.random() * list.length)];
    setQuestion(random);
    speak(`Find the ${random.en}`);
  };

  useEffect(() => { nextQuestion(); }, [selectedCat]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation - Cuộn ngang trên mobile */}
        <div className="flex overflow-x-auto gap-3 pb-6 no-scrollbar mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-6 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all shadow-sm ${selectedCat === cat ? 'bg-indigo-600 text-white scale-105 shadow-indigo-200' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Dashboard Trái */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <p className="text-[10px] font-black tracking-[0.3em] text-indigo-400 mb-2 uppercase">Current Score</p>
              <h2 className="text-7xl font-black text-slate-800">{score}</h2>
              
              <div className="mt-12 space-y-4">
                <p className="text-sm font-bold text-slate-400">HÃY TÌM TỪ:</p>
                <h3 className="text-4xl font-black text-indigo-600 uppercase tracking-tighter">{question?.en}</h3>
                <button 
                  onClick={() => speak(question?.en)}
                  className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  <span className="text-2xl">🔊</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid Phải */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allVocab[selectedCat].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.en === question.en) {
                    setScore(score + 10);
                    speak("Excellent!");
                    setTimeout(() => nextQuestion(), 1000);
                  } else {
                    speak("Not that one!");
                  }
                }}
                className="bg-white aspect-square rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-transparent hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all group active:scale-95"
              >
                <span className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-500">{item.emoji}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.en}</span>
              </button>
            ))}
          </div>
        </div>

        <footer className="mt-20 text-center opacity-20 font-black text-[10px] tracking-[1em]">
          ELITE LEARNING SYSTEM BY GIA THOAI
        </footer>
      </div>
    </div>
  );
}
