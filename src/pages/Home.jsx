import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io' // Yurakcha ikonasi uchun
import { zustandStore } from '../utils/zustandStore'

const slides = [
  {
    bg: 'radial-gradient(ellipse at 30% 60%, #ff3a45 0%, #b80008 80%)',
    label1: 'Специальное ограниченное предложение',
    label2: 'Действует только при доставке',
    title: 'Комбо',
    script: 'Donarchi',
    discount: '-24%',
    priceNew: '45.000',
    priceOld: '59.000',
    emoji: '🌮',
    scriptColor: '#ffc107',
    priceNewBg: '#ffc107',
    priceNewColor: '#1a1a1a',
    discountColor: '#fff',
    priceOldColor: 'rgba(255,255,255,0.6)',
    titleColor: '#fff',
    labelColor: 'rgba(255,255,255,0.85)',
  },
  {
    bg: 'radial-gradient(ellipse at 70% 40%, #2c2c2c 0%, #0d0d0d 90%)',
    label1: 'Yangi mahsulot',
    label2: 'Faqat restoranda',
    title: 'Premium',
    script: 'Burger',
    discount: '-15%',
    priceNew: '38.000',
    priceOld: '45.000',
    emoji: '🍔',
    scriptColor: '#ffc107',
    priceNewBg: '#e8000e',
    priceNewColor: '#fff',
    discountColor: '#fff',
    priceOldColor: 'rgba(255,255,255,0.5)',
    titleColor: '#fff',
    labelColor: '#ccc',
  },
  {
    bg: 'radial-gradient(ellipse at 40% 50%, #ffd740 0%, #e6a800 80%)',
    label1: 'Maxsus taklif',
    label2: 'Oilaviy to\'plam',
    title: 'Family',
    script: 'Set ×4',
    discount: '-30%',
    priceNew: '89.000',
    priceOld: '129.000',
    emoji: '🍟',
    scriptColor: '#fff',
    priceNewBg: '#111',
    priceNewColor: '#fff',
    discountColor: '#333',
    priceOldColor: 'rgba(0,0,0,0.45)',
    titleColor: '#1a1a1a',
    labelColor: '#5a3a00',
  },
]

// 100 TA MAHSULOTLAR RO'YXATI (MOCK DATA)
const generateProducts = () => {
  const names = ['Family Set', 'Donar Combo', 'Premium Burger', 'Lavash', 'Pepperoni Pizza', 'Salat Caesar', 'Shish Kebab', 'Fried Chicken', 'Beefsteak', 'Falafel Wrap'];
  const emojis = ['🍟', '🌮', '🍔', '🌯', '🍕', '🥗', '🍖', '🍗', '🥩', '🫔'];
  const products = [];
  
  for (let i = 1; i <= 100; i++) {
    const nameIndex = (i - 1) % names.length;
    const emojiIndex = (i - 1) % emojis.length;
    const hasOldPrice = Math.random() > 0.3;
    
    products.push({
      id: i,
      name: `${names[nameIndex]} #${i}`,
      price: (20000 + Math.random() * 80000).toFixed(0),
      oldPrice: hasOldPrice ? (30000 + Math.random() * 90000).toFixed(0) : null,
      emoji: emojis[emojiIndex],
      desc: `Eng zo'r ${names[nameIndex]} retseptasi bilan tayyorlangan.`
    });
  }
  return products;
};

const feedupProducts = generateProducts();

const NAV_LINKS = [
  { label: 'About Us', path: '/O nas' },
  { label: 'Menu', path: '/menu' },
  { label: 'Vacancies', path: '/vakansi' },
  { label: 'Branches', path: '/filial' },
  { label: 'Contacts', path: '/kontakt' }
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const { darkMode } = zustandStore()
  const timerRef = useRef(null)

  const goTo = (n) => setCurrent((n + slides.length) % slides.length)
  const move = (dir) => goTo(current + dir)

  useEffect(() => {
    timerRef.current = setInterval(() => move(1), 4500)
    return () => clearInterval(timerRef.current)
  }, [current])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') move(-1)
      if (e.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current])

  const touchStartX = useRef(0)
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1)
  }

  // YURAKCHA CLICK HANDLER
  const handleAddToFavorites = (product) => {
    const isFavorited = favorites.some(fav => fav.id === product.id)
    let updatedFavorites
    if (isFavorited) {
      updatedFavorites = favorites.filter(fav => fav.id !== product.id)
    } else {
      updatedFavorites = [...favorites, product]
    }
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  // SAVATGA QO'SHISH HANDLER - QUANTITY BILAN
  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now() + Math.random(), // Unique ID har bir add uchun
      quantity: 1
    }
    const updatedCart = [...cart, cartItem]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/card')
  }

  // YURAKCHA CLICK - FAVORITES GA O'TISH
  const handleFavoriteClick = () => {
    navigate('/favorites')
  }

  const s = slides[current]

  return (
    <div style={{ 
      fontFamily: "'Nunito', sans-serif", 
      margin: 0, 
      padding: 0,
      background: darkMode ? '#1a1a1a' : '#fcfcfc',
      color: darkMode ? '#fff' : '#111',
      transition: 'background 0.3s, color 0.3s'
    }}>
      
      <style>{`
        @import url('https://googleapis.com');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .nav-link {
          text-decoration: none; color: #222; font-size: 15px; font-weight: 700;
          position: relative; padding-bottom: 3px; transition: color .2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: #e8000e;
          transition: width .25s ease;
        }
        .nav-link:hover { color: #e8000e; }
        .nav-link:hover::after { width: 100%; }
        .btn-order {
          background: #e8000e; color: #fff; border: none; border-radius: 30px;
          padding: 10px 22px; font-size: 14px; font-weight: 800; cursor: pointer;
          transition: background .2s, transform .15s; font-family: 'Nunito', sans-serif;
        }
        .btn-order:hover { background: #c0000b; transform: scale(1.05); }
        .nav-icon-btn {
          background: none; border: none; cursor: pointer; color: #555;
          font-size: 18px; padding: 4px; transition: color .2s;
        }
        .nav-icon-btn:hover { color: #e8000e; }
        .arrow-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 10; background: rgba(255,255,255,0.92); border: none;
          border-radius: 50%; width: 46px; height: 46px; font-size: 20px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 18px rgba(0,0,0,0.18); transition: background .2s, transform .15s;
          color: #333;
        }
        .arrow-btn:hover { background: #fff; }
        .arrow-btn.prev { left: 18px; }
        .arrow-btn.next { right: 18px; }
        .dot {
          height: 10px; border-radius: 5px; cursor: pointer;
          background: rgba(255,255,255,0.5); transition: all .3s ease;
        }
        .dot.active { background: #fff; }
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        
        /* MAHSULOT KARTALARI STILI */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        .product-card {
          background: ${darkMode ? '#2a2a2a' : '#fff'}; 
          border-radius: 24px; 
          padding: 24px;
          box-shadow: 0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.03'}); 
          transition: all 0.3s ease;
          position: relative; 
          border: 1px solid ${darkMode ? '#333' : '#f0f0f0'};
          display: flex; 
          flex-direction: column; 
          justify-content: space-between;
          color: ${darkMode ? '#fff' : '#111'};
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,${darkMode ? '0.5' : '0.08'});
        }
      `}</style>

      {/* SLIDER BLOKI */}
      <div
        style={{ position: 'relative', overflow: 'hidden', width: '100%', height: 520 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="arrow-btn prev" onClick={() => move(-1)}>←</button>
        <button className="arrow-btn next" onClick={() => move(1)}>→</button>
        
        <div style={{
          display: 'flex', height: '100%',
          transform: `translateX(-${current * 100}%)`,
          transition: 'transform .55s cubic-bezier(.77,0,.18,1)',
        }}>
          {slides.map((slide, idx) => (
            <div key={idx} style={{
              minWidth: '100%', height: '100%',
              background: slide.bg,
              display: 'flex', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '0 80px', gap: 40, position: 'relative', zIndex: 2,
              }}>
                
                <div style={{ flex: 1, maxWidth: 480 }}>
                  
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: '#111', color: '#fff', borderRadius: 8,
                    padding: '6px 14px', fontSize: 13, fontWeight: 800,
                    marginBottom: 18, letterSpacing: .5,
                  }}>
                    feed
                    <span style={{
                      background: '#e8000e', borderRadius: '50%', width: 18, height: 18,
                      fontSize: 10, textAlign: 'center', lineHeight: '18px', marginLeft: 4,
                    }}>up</span>
                  </div>

                  <div style={{ fontSize: 15, fontWeight: 700, color: slide.labelColor, marginBottom: 4 }}>
                    {slide.label1}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: slide.labelColor, marginBottom: 10 }}>
                    {slide.label2}
                  </div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: slide.titleColor, lineHeight: 1.1, marginBottom: 4 }}>
                    {slide.title}
                  </div>
                  <div style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: 42, color: slide.scriptColor,
                    marginBottom: 18, lineHeight: 1.1,
                  }}>
                    {slide.script}
                  </div>

                  {/* SIZNING KODINGIZ KESILIB QOLGAN VA TO'G'RILANGAN JOYI */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 20, fontWeight: 900, color: slide.discountColor }}>
                      {slide.discount}
                    </span>
                    <span style={{
                      background: slide.priceNewBg, color: slide.priceNewColor,
                      fontSize: 26, fontWeight: 900,
                      borderRadius: 30, padding: '6px 22px',
                    }}>
                      {slide.priceNew}
                    </span>
                  </div>
                </div>

                <div style={{
                  flex: 1, display: 'flex', alignItems: 'flex-end',
                  justifyContent: 'center', height: '100%', maxWidth: 420,
                }}>
                  <div style={{
                    fontSize: 180, lineHeight: 1,
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
                    animation: 'floaty 3s ease-in-out infinite',
                    animationDelay: `${idx * 0.5}s`,
                    userSelect: 'none',
                  }}>
                    {slide.emoji}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <div
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              style={{ width: i === current ? 28 : 10 }}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {/* MAHSULOTLAR RO'YXATI */}
      <div style={{ paddingTop: '60px', padding: '40px 80px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: darkMode ? '#fff' : '#111', marginBottom: 10 }}>
          Bizning maxsus taklif (100+ Mahsulot)
        </h2>
        <div className="product-grid">
          {feedupProducts.map(product => {
            const isFavorited = favorites.some(fav => fav.id === product.id)
            return (
              <div key={product.id} className="product-card" style={{ position: 'relative' }}>
                {/* YURAKCHA IKONI - TEPA O'NG BURCHAK */}
                <button
                  onClick={() => handleAddToFavorites(product)}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'none',
                    border: 'none',
                    fontSize: 28,
                    cursor: 'pointer',
                    color: isFavorited ? '#e8000e' : '#ccc',
                    transition: 'color 0.3s',
                    zIndex: 5,
                    padding: 0,
                  }}
                  title="Sevimlilar"
                >
                  {isFavorited ? <IoIosHeart /> : <IoIosHeartEmpty />}
                </button>

                <div style={{ fontSize: 80, marginBottom: 15 }}>{product.emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: darkMode ? '#fff' : '#111', marginBottom: 8 }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: 13, color: darkMode ? '#aaa' : '#666', marginBottom: 15, flexGrow: 1 }}>
                  {product.desc}
                </p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{
                    fontSize: 24, fontWeight: 900, color: '#e8000e'
                  }}>
                    {product.price} so'm
                  </span>
                  {product.oldPrice && (
                    <span style={{
                      fontSize: 16, textDecoration: 'line-through',
                      color: darkMode ? '#666' : '#999'
                    }}>
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  style={{
                    marginTop: 15, background: '#e8000e', color: '#fff',
                    border: 'none', padding: '12px 20px', borderRadius: 15,
                    fontWeight: 700, cursor: 'pointer', transition: 'background .2s', width: '100%'
                  }} 
                  onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                  onMouseLeave={(e) => e.target.style.background = '#e8000e'}
                >
                  Savatga qo'sh
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
