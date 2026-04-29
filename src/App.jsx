import React, { useState, useEffect } from 'react';

const cardsData = [
  { id: 1, en: 'Apple', emoji: '🍎', color: 'bg-red-400' },
  { id: 2, en: 'Banana', emoji: '🍌', color: 'bg-yellow-400' },
  { id: 3, en: 'Cat', emoji: '🐱', color: 'bg-orange-400' },
  { id: 4, en: 'Dog', emoji: '🐶', color: 'bg-blue-400' },
  { id: 5, en: 'Sun', emoji: '☀️', color: 'bg-amber-400' },
  { id: 6, en: 'Bird', emoji: '🐦', color: 'bg-emerald-400' },
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // Khởi tạo bàn cờ: nhân đôi bộ thẻ và xáo trộn
  const initGame = () => {
    const duplicatedCards = [...cardsData, ...cardsData]
      .map((card, index) => ({ ...card, uniqueId: index }))
      .sort(() => Math.random() - 0.5);
    setCards(duplicatedCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card.uniqueId) || matchedCards.includes(card.id)) return;

    const newFlipped = [...flippedCards, card.uniqueId];
    setFlippedCards(newFlipped);
    speak(card.en);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const firstCard = cards.find(c => c.uniqueId === newFlipped[0]);
      const secondCard = card;

      if (firstCard.id === secondCard.id) {
        setMatchedCards([...matchedCards, firstCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-6 flex flex-col items-center font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black text-indigo-600 uppercase mb-2">Trí Nhớ Siêu Phàm 🧠</h1>
        <div className="flex gap-4 justify-center items-center">
          <span className="bg-white px-4 py-1 rounded-full shadow text-indigo-500 font-bold">Lượt: {moves}</span>
          <button onClick={initGame} className="bg-indigo-500 text-white px-4 py-1 rounded-full font-bold hover:bg-indigo-600 transition">Chơi lại</button>
        </div>
      </header>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl w-full">
        {cards.map((card) => {
          const isFlipped = flippedCards.includes(card.uniqueId) || matchedCards.includes(card.id);
          return (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`h-32 md:h-40 cursor-pointer relative preserve-3d duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`}
            >
              {/* Mặt sau (Lúc chưa lật) */}
              <div className="absolute inset-0 bg-indigo-200 border-4 border-white rounded-2xl flex items-center justify-center text-4xl shadow-md backface-hidden">
                ❓
              </div>
              
              {/* Mặt trước (Hình ảnh từ vựng) */}
              <div className={`absolute inset-0 ${card.color} border-4 border-white rounded-2xl flex flex-col items-center justify-center shadow-lg rotate-y-180 backface-hidden`}>
                <span className="text-5xl mb-2">{card.emoji}</span>
                <span className="text-xs font-black text-white uppercase">{card.en}</span>
              </div>
            </div>
          );
        })}
      </div>

      {matchedCards.length === cardsData.length && (
        <div className="mt-12 p-6 bg-white rounded-[2rem] shadow-2xl text-center animate-bounce">
          <h2 className="text-2xl font-black text-green-500">CON THẮNG RỒI! 🎉</h2>
          <p className="text-slate-500">Bố tự hào về trí nhớ của con lắm!</p>
        </div>
      )}
    </div>
  );
}
