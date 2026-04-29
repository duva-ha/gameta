// Cập nhật mảng vocabData với màu sắc hiện đại hơn
const vocabData = [
  { en: 'Apple', vn: 'Quả táo', emoji: '🍎', color: 'bg-rose-100 text-rose-600 border-rose-200' },
  { en: 'Banana', vn: 'Quả chuối', emoji: '🍌', color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { en: 'Cat', vn: 'Con mèo', emoji: '🐱', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { en: 'Dog', vn: 'Con chó', emoji: '🐶', color: 'bg-sky-100 text-sky-600 border-sky-200' },
  { en: 'Bird', vn: 'Con chim', emoji: '🐦', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { en: 'Sun', vn: 'Mặt trời', emoji: '☀️', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
];

// Trong phần Return của App.jsx, hãy dùng cấu trúc Card này:
<div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
  {vocabData.map((item, index) => (
    <button
      key={index}
      onClick={() => handleChoice(item)}
      className={`${item.color} group relative border-4 border-b-8 rounded-[2.5rem] p-6 transition-all active:border-b-4 active:translate-y-1 hover:shadow-xl`}
    >
      <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">{item.emoji}</div>
      <div className="text-xl font-bold uppercase tracking-tight">{item.en}</div>
      <div className="text-sm opacity-70 font-medium">{item.vn}</div>
    </button>
  ))}
</div>
