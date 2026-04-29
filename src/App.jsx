import React, { useState, useEffect } from 'react';

// ==========================================
// KHO DỮ LIỆU 300 TỪ VỰNG - 20 CHỦ ĐỀ
// ==========================================
const MASTER_DATA = {
  // NHÓM 1: BẢN THÂN & GIA ĐÌNH
  "Gia đình 👨‍👩‍👦": [
    {en:'Father',vn:'Bố',emoji:'👨'},{en:'Mother',vn:'Mẹ',emoji:'👩'},{en:'Brother',vn:'Anh/Em trai',emoji:'👦'},
    {en:'Sister',vn:'Chị/Em gái',emoji:'👧'},{en:'Baby',vn:'Em bé',emoji:'👶'},{en:'Grandpa',vn:'Ông',emoji:'👴'},
    {en:'Grandma',vn:'Bà',emoji:'👵'},{en:'Uncle',vn:'Chú/Bác',emoji:'🧔'},{en:'Aunt',vn:'Cô/Dì',emoji:'👩‍🦰'},{en:'Family',vn:'Gia đình',emoji:'🏠'}
  ],
  "Cơ thể 👤": [
    {en:'Head',vn:'Đầu',emoji:'👤'},{en:'Eye',vn:'Mắt',emoji:'👁️'},{en:'Nose',vn:'Mũi',emoji:'👃'},
    {en:'Mouth',vn:'Miệng',emoji:'👄'},{en:'Ear',vn:'Tai',emoji:'👂'},{en:'Hand',vn:'Tay',emoji:'✋'},
    {en:'Foot',vn:'Chân',emoji:'🦶'},{en:'Finger',vn:'Ngón tay',emoji:'☝️'},{en:'Shoulder',vn:'Vai',emoji:'💪'},{en:'Tooth',vn:'Răng',emoji:'🦷'}
  ],
  "Cảm xúc 😊": [
    {en:'Happy',vn:'Vui',emoji:'😊'},{en:'Sad',vn:'Buồn',emoji:'😢'},{en:'Angry',vn:'Giận',emoji:'😠'},
    {en:'Scared',vn:'Sợ',emoji:'😨'},{en:'Sleepy',vn:'Buồn ngủ',emoji:'😴'},{en:'Hungry',vn:'Đói',emoji:'😋'},
    {en:'Cool',vn:'Ngầu',emoji:'😎'},{en:'Sick',vn:'Ốm',emoji:'🤒'},{en:'Surprised',vn:'Ngạc nhiên',emoji:'😮'},{en:'Love',vn:'Yêu',emoji:'🥰'}
  ],
  "Quần áo 👕": [
    {en:'Shirt',vn:'Áo sơ mi',emoji:'👕'},{en:'T-shirt',vn:'Áo thun',emoji:'👕'},{en:'Pants',vn:'Quần',emoji:'👖'},
    {en:'Dress',vn:'Váy',emoji:'👗'},{en:'Hat',vn:'Mũ',emoji:'🧢'},{en:'Shoes',vn:'Giày',emoji:'👟'},
    {en:'Socks',vn:'Tất',emoji:'🧦'},{en:'Jacket',vn:'Áo khoác',emoji:'🧥'},{en:'Glasses',vn:'Kính',emoji:'👓'},{en:'Watch',vn:'Đồng hồ',emoji:'⌚'}
  ],

  // NHÓM 2: MÔI TRƯỜNG & ĐỒ VẬT
  "Trường học 🏫": [
    {en:'Teacher',vn:'Giáo viên',emoji:'👩‍🏫'},{en:'Student',vn:'Học sinh',emoji:'🧑‍🎓'},{en:'Classroom',vn:'Lớp học',emoji:'🏫'},
    {en:'Desk',vn:'Bàn học',emoji:'table'},{en:'Chair',vn:'Ghế',emoji:'🪑'},{en:'Board',vn:'Bảng',emoji:'📋'},
    {en:'Friend',vn:'Bạn bè',emoji:'🧑‍🤝‍🧑'},{en:'Library',vn:'Thư viện',emoji:'📚'},{en:'Playground',vn:'Sân chơi',emoji:'🛝'},{en:'School bus',vn:'Xe buýt trường',emoji:'🚌'}
  ],
  "Đồ dùng ✏️": [
    {en:'Pencil',vn:'Bút chì',emoji:'✏️'},{en:'Pen',vn:'Bút mực',emoji:'🖋️'},{en:'Book',vn:'Sách',emoji:'📖'},
    {en:'Ruler',vn:'Thước',emoji:'📏'},{en:'Eraser',vn:'Tẩy',emoji:'🧼'},{en:'Bag',vn:'Cặp',emoji:'🎒'},
    {en:'Paper',vn:'Giấy',emoji:'📄'},{en:'Scissors',vn:'Kéo',emoji:'✂️'},{en:'Crayon',vn:'Bút màu',emoji:'🖍️'},{en:'Glue',vn:'Keo dán',emoji:'🧴'}
  ],
  "Đồ ăn 🍕": [
    {en:'Rice',vn:'Cơm',emoji:'🍚'},{en:'Bread',vn:'Bánh mì',emoji:'🍞'},{en:'Pizza',vn:'Pizza',emoji:'🍕'},
    {en:'Burger',vn:'Hambuger',emoji:'🍔'},{en:'Egg',vn:'Trứng',emoji:'🥚'},{en:'Chicken',vn:'Thịt gà',emoji:'🍗'},
    {en:'Fish',vn:'Cá',emoji:'🐟'},{en:'Soup',vn:'Súp',emoji:'🥣'},{en:'Noodles',vn:'Mì',emoji:'🍜'},{en:'Cake',vn:'Bánh ngọt',emoji:'🍰'}
  ],
  "Thức uống 🥛": [
    {en:'Water',vn:'Nước',emoji:'💧'},{en:'Milk',vn:'Sữa',emoji:'🥛'},{en:'Juice',vn:'Nước trái cây',emoji:'🧃'},
    {en:'Tea',vn:'Trà',emoji:'🍵'},{en:'Coffee',vn:'Cà phê',emoji:'☕'},{en:'Soda',vn:'Nước ngọt',emoji:'🥤'},
    {en:'Cocoa',vn:'Ca cao',emoji:'☕'},{en:'Yogurt',vn:'Sữa chua',emoji:'🍦'},{en:'Honey',vn:'Mật ong',emoji:'🍯'},{en:'Ice',vn:'Đá',emoji:'🧊'}
  ],
  "Nhà cửa 🏠": [
    {en:'House',vn:'Nhà',emoji:'🏠'},{en:'Bedroom',vn:'Phòng ngủ',emoji:'🛏️'},{en:'Kitchen',vn:'Bếp',emoji:'🍳'},
    {en:'Bathroom',vn:'Nhà tắm',emoji:'🚿'},{en:'Living room',vn:'Phòng khách',emoji:'🛋️'},{en:'Bed',vn:'Giường',emoji:'🛏️'},
    {en:'Table',vn:'Bàn',emoji:'table'},{en:'Door',vn:'Cửa',emoji:'🚪'},{en:'Window',vn:'Cửa sổ',emoji:'🪟'},{en:'Key',vn:'Chìa khóa',emoji:'🔑'}
  ],
  "Đồ chơi 🧸": [
    {en:'Ball',vn:'Quả bóng',emoji:'⚽'},{en:'Doll',vn:'Búp bê',emoji:'🪆'},{en:'Robot',vn:'Robot',emoji:'🤖'},
    {en:'Car',vn:'Ô tô',emoji:'🚗'},{en:'Train',vn:'Tàu hỏa',emoji:'🚂'},{en:'Blocks',vn:'Khối xếp hình',emoji:'🧱'},
    {en:'Kite',vn:'Cái diều',emoji:'🪁'},{en:'Balloon',vn:'Bóng bay',emoji:'🎈'},{en:'Teddy bear',vn:'Gấu bông',emoji:'🧸'},{en:'Puzzle',vn:'Trò chơi ghép hình',emoji:'🧩'}
  ],

  // NHÓM 3: THẾ GIỚI TỰ NHIÊN
  "Động vật 🐘": [
    {en:'Elephant',vn:'Voi',emoji:'🐘'},{en:'Lion',vn:'Sư tử',emoji:'🦁'},{en:'Tiger',vn:'Hổ',emoji:'🐯'},
    {en:'Monkey',vn:'Khỉ',emoji:'🐒'},{en:'Giraffe',vn:'Hươu cao cổ',emoji:'🦒'},{en:'Zebra',vn:'Ngựa vằn',emoji:'🦓'},
    {en:'Bear',vn:'Gấu',emoji:'🐻'},{en:'Snake',vn:'Rắn',emoji:'🐍'},{en:'Rabbit',vn:'Thỏ',emoji:'🐰'},{en:'Mouse',vn:'Chuột',emoji:'🐭'}
  ],
  "Trái cây 🍓": [
    {en:'Apple',vn:'Táo',emoji:'🍎'},{en:'Banana',vn:'Chuối',emoji:'🍌'},{en:'Orange',vn:'Cam',emoji:'🍊'},
    {en:'Grapes',vn:'Nho',emoji:'🍇'},{en:'Strawberry',vn:'Dâu tây',emoji:'🍓'},{en:'Mango',vn:'Xoài',emoji:'🥭'},
    {en:'Watermelon',vn:'Dưa hấu',emoji:'🍉'},{en:'Pineapple',vn:'Dứa',emoji:'🍍'},{en:'Peach',vn:'Đào',emoji:'🍑'},{en:'Coconut',vn:'Dừa',emoji:'🥥'}
  ],
  "Thời tiết ☁️": [
    {en:'Sun',vn:'Mặt trời',emoji:'☀️'},{en:'Cloud',vn:'Mây',emoji:'☁️'},{en:'Rain',vn:'Mưa',emoji:'🌧️'},
    {en:'Snow',vn:'Tuyết',emoji:'❄️'},{en:'Wind',vn:'Gió',emoji:'💨'},{en:'Storm',vn:'Bão',emoji:'⛈️'},
    {en:'Rainbow',vn:'Cầu vồng',emoji:'🌈'},{en:'Hot',vn:'Nóng',emoji:'🔥'},{en:'Cold',vn:'Lạnh',emoji:'❄️'},{en:'Moon',vn:'Mặt trăng',emoji:'🌙'}
  ],
  "Thiên nhiên 🌲": [
    {en:'Tree',vn:'Cây',emoji:'🌳'},{en:'Flower',vn:'Hoa',emoji:'🌸'},{en:'Grass',vn:'Cỏ',emoji:'🌿'},
    {en:'Mountain',vn:'Núi',emoji:'⛰️'},{en:'River',vn:'Sông',emoji:'🌊'},{en:'Lake',vn:'Hồ',emoji:'🏞️'},
    {en:'Sea',vn:'Biển',emoji:'🌊'},{en:'Sky',vn:'Bầu trời',emoji:'🌌'},{en:'Leaf',vn:'Lá',emoji:'🍃'},{en:'Rock',vn:'Đá',emoji:'🪨'}
  ],
  "Vũ trụ 🪐": [
    {en:'Earth',vn:'Trái đất',emoji:'🌍'},{en:'Mars',vn:'Sao hỏa',emoji:'🔴'},{en:'Jupiter',vn:'Sao mộc',emoji:'🪐'},
    {en:'Star',vn:'Ngôi sao',emoji:'⭐'},{en:'Astronaut',vn:'Phi hành gia',emoji:'👨‍🚀'},{en:'Rocket',vn:'Tên lửa',emoji:'🚀'},
    {en:'UFO',vn:'Đĩa bay',emoji:'🛸'},{en:'Telescope',vn:'Kính thiên văn',emoji:'🔭'},{en:'Sun',vn:'Mặt trời',emoji:'☀️'},{en:'Galaxy',vn:'Thiên hà',emoji:'🌌'}
  ],

  // NHÓM 4: KIẾN THỨC NỀN TẢNG
  "Màu sắc 🎨": [
    {en:'Red',vn:'Đỏ',emoji:'🔴'},{en:'Blue',vn:'Xanh dương',emoji:'🔵'},{en:'Green',vn:'Xanh lá',emoji:'🟢'},
    {en:'Yellow',vn:'Vàng',emoji:'🟡'},{en:'Pink',vn:'Hồng',emoji:'💗'},{en:'Purple',vn:'Tím',emoji:'🟣'},
    {en:'Orange',vn:'Cam',emoji:'🟠'},{en:'Black',vn:'Đen',emoji:'⚫'},{en:'White',vn:'Trắng',emoji:'⚪'},{en:'Brown',vn:'Nâu',emoji:'🟤'}
  ],
  "Số đếm 🔢": [
    {en:'One',vn:'1',emoji:'1️⃣'},{en:'Two',vn:'2',emoji:'2️⃣'},{en:'Three',vn:'3',emoji:'3️⃣'},
    {en:'Four',vn:'4',emoji:'4️⃣'},{en:'Five',vn:'5',emoji:'5️⃣'},{en:'Six',vn:'6',emoji:'6️⃣'},
    {en:'Seven',vn:'7',emoji:'7️⃣'},{en:'Eight',vn:'8',emoji:'8️⃣'},{en:'Nine',vn:'9',emoji:'9️⃣'},{en:'Ten',vn:'10',emoji:'🔟'}
  ],
  "Nghề nghiệp 👨‍⚕️": [
    {en:'Doctor',vn:'Bác sĩ',emoji:'👨‍⚕️'},{en:'Nurse',vn:'Y tá',emoji:'👩‍⚕️'},{en:'Pilot',vn:'Phi công',emoji:'👨‍✈️'},
    {en:'Teacher',vn:'Giáo viên',emoji:'👩‍🏫'},{en:'Chef',vn:'Đầu bếp',emoji:'🧑‍🍳'},{en:'Police',vn:'Cảnh sát',emoji:'👮'},
    {en:'Farmer',vn:'Nông dân',emoji:'👨‍🌾'},{en:'Singer',vn:'Ca sĩ',emoji:'🧑‍🎤'},{en:'Artist',vn:'Họa sĩ',emoji:'🧑‍🎨'},{en:'Fireman',vn:'Lính cứu hỏa',emoji:'👨‍🚒'}
  ],
  "Xe cộ 🚲": [
    {en:'Car',vn:'Ô tô',emoji:'🚗'},{en:'Bus',vn:'Xe buýt',emoji:'🚌'},{en:'Bicycle',vn:'Xe đạp',emoji:'🚲'},
    {en:'Motorbike',vn:'Xe máy',emoji:'🏍️'},{en:'Truck',vn:'Xe tải',emoji:'🚚'},{en:'Ambulance',vn:'Xe cứu thương',emoji:'🚑'},
    {en:'Fire engine',vn:'Xe cứu hỏa',emoji:'🚒'},{en:'Taxi',vn:'Taxi',emoji:'🚕'},{en:'Boat',vn:'Thuyền',emoji:'🚤'},{en:'Helicopter',vn:'Trực thăng',emoji:'🚁'}
  ],
  "Thể thao ⚽": [
    {en:'Soccer',vn:'Bóng đá',emoji:'⚽'},{en:'Basketball',vn:'Bóng rổ',emoji:'🏀'},{en:'Tennis',vn:'Quần vợt',emoji:'🎾'},
    {en:'Swimming',vn:'Bơi lội',emoji:'🏊'},{en:'Running',vn:'Chạy bộ',emoji:'🏃'},{en:'Cycling',vn:'Đạp xe',emoji:'🚴'},
    {en:'Skating',vn:'Trượt patin',emoji:'🛼'},{en:'Badminton',vn:'Cầu lông',emoji:'🏸'},{en:'Gymnastics',vn:'Thể dục',emoji:'🤸'},{en:'Dance',vn:'Nhảy múa',emoji:'💃'}
  ]
};

export default function App() {
  const categories = Object.keys(MASTER_DATA);
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(null); // 'correct' | 'wrong' | null

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.rate = 0.85;
    window.speechSynthesis.speak(msg);
  };

  const nextQuestion = (cat = selectedCat) => {
    const list = MASTER_DATA[cat];
    const random = list[Math.floor(Math.random() * list.length)];
    setQuestion(random);
    speak(`Find the ${random.en}`);
  };

  useEffect(() => { nextQuestion(); }, [selectedCat]);

  const handleChoice = (item) => {
    if (item.en === question.en) {
      setScore(score + 10);
      setStatus('correct');
      speak("Excellent!");
      setTimeout(() => {
        setStatus(null);
        nextQuestion();
      }, 1200);
    } else {
      setStatus('wrong');
      speak("Try again!");
      setTimeout(() => setStatus(null), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* HEADER & CATEGORY SELECTOR */}
        <nav className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <span className="text-white text-2xl font-black italic">G</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter">ELITE ENGLISH FOR KIDS</h1>
            </div>
            <div className="bg-indigo-50 px-6 py-2 rounded-2xl">
              <span className="text-indigo-600 font-black text-2xl">{score} <span className="text-xs text-indigo-300">PTS</span></span>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-3 no-scrollbar py-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCat(cat); setScore(0); }}
                className={`px-6 py-3 rounded-2xl font-black text-xs whitespace-nowrap transition-all shadow-sm active:scale-95 ${selectedCat === cat ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white text-slate-400 hover:bg-indigo-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* MAIN GAME AREA */}
        <main className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* QUESTION BOX */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8">
            <div className={`bg-white p-10 rounded-[3.5rem] shadow-2xl transition-all border-b-[12px] ${status === 'correct' ? 'border-green-400' : status === 'wrong' ? 'border-red-400' : 'border-slate-100'}`}>
              <p className="text-[10px] font-black tracking-[0.4em] text-slate-400 mb-4 uppercase">Find the Word:</p>
              <h2 className="text-6xl font-black text-slate-800 tracking-tight mb-8 uppercase italic">
                {question?.en}
              </h2>
              <button 
                onClick={() => speak(question?.en)}
                className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
              >
                <span className="text-3xl">🔊</span>
              </button>
            </div>
            <div className="text-center p-4">
              <p className="text-slate-300 font-black text-[9px] uppercase tracking-[1em]">Designed by Gia Thoai</p>
            </div>
          </div>

          {/* GRID OF CHOICES */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {MASTER_DATA[selectedCat].map((item, index) => (
              <button
                key={index}
                onClick={() => handleChoice(item)}
                className="bg-white aspect-square rounded-[3rem] flex flex-col items-center justify-center border-b-[8px] border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all group active:border-b-0 active:translate-y-2"
              >
                <span className="text-7xl mb-2 transform group-hover:scale-110 transition-transform duration-500">{item.emoji}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.en}</span>
              </button>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
