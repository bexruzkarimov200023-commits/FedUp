import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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

const NAV_LINKS = [
  { label: 'About Us', path: '/O nas' },
  { label: 'Menu', path: '/menu' },
  { label: 'Vacancies', path: '/vakansi' },
  { label: 'Branches', path: '/filial' },
  { label: 'Contacts', path: '/kontakt' }
]

export default function Home() {
  const [current, setCurrent] = useState(0)
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

  const s = slides[current]

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", margin: 0, padding: 0 }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');
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
      `}</style>

      

     
      <div
        style={{ position: 'relative', overflow: 'hidden', width: '100%', height: 520 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        
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
                    <span style={{
                      fontSize: 20, fontWeight: 700,
                      textDecoration: 'line-through',
                      color: slide.priceOldColor,
                    }}>
                      {slide.priceOld}
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

        
        <button className="arrow-btn prev" onClick={() => move(-1)}>←</button>
        <button className="arrow-btn next" onClick={() => move(1)}>→</button>

        
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
    </div>
  )
}