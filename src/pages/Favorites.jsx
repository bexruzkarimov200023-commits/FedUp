import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosHeart } from 'react-icons/io'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // localStorage dan favorites o'qish
    const stored = localStorage.getItem('favorites')
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        console.error('Error parsing favorites:', e)
      }
    }
  }, [])

  const handleRemove = (productId) => {
    const updated = favorites.filter(item => item.id !== productId)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now() + Math.random(),
      quantity: 1
    }
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    cartItems.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    navigate('/card')
  }

  return (
    <div style={{ padding: '40px 80px', minHeight: '80vh', background: '#fcfcfc' }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111', marginBottom: 30 }}>
        ❤️ Sevimli Mahsulotlar ({favorites.length})
      </h1>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
          <p style={{ fontSize: 18, marginBottom: 20 }}>Hozircha sevimli mahsulot yo'q</p>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: '#e8000e', color: '#fff', border: 'none',
              padding: '12px 30px', borderRadius: 15, fontWeight: 700,
              cursor: 'pointer', fontSize: 16, transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#c0000b'}
            onMouseLeave={(e) => e.target.style.background = '#e8000e'}
          >
            Asosiy sahifaga qaytish
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 25
        }}>
          {favorites.map(product => (
            <div 
              key={product.id}
              style={{
                background: '#fff', borderRadius: 24, padding: 24,
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                border: '2px solid #e8000e', position: 'relative',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <button
                onClick={() => handleRemove(product.id)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: '#e8000e', color: '#fff', border: 'none',
                  borderRadius: '50%', width: 36, height: 36,
                  fontSize: 20, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                onMouseLeave={(e) => e.target.style.background = '#e8000e'}
              >
                ✕
              </button>

              <div style={{ fontSize: 80, marginBottom: 15 }}>{product.emoji}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                {product.name}
              </h3>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 15 }}>
                {product.desc}
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: '#e8000e' }}>
                  {product.price} so'm
                </span>
                {product.oldPrice && (
                  <span style={{
                    fontSize: 16, textDecoration: 'line-through',
                    color: '#999'
                  }}>
                    {product.oldPrice}
                  </span>
                )}
              </div>
              <button 
                onClick={() => handleAddToCart(product)}
                style={{
                  background: '#e8000e', color: '#fff', border: 'none',
                  padding: '12px 20px', borderRadius: 15, fontWeight: 700,
                  cursor: 'pointer', width: '100%', transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                onMouseLeave={(e) => e.target.style.background = '#e8000e'}
              >
                🛒 Savatga qo'sh
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
