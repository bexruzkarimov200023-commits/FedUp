import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { zustandStore } from '../utils/zustandStore'

export default function Card() {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const { darkMode } = zustandStore()

  // INITIAL LOAD VA STORAGE CHANGE LISTENER
  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          setCartItems(JSON.parse(stored))
        } catch (e) {
          console.error('Error parsing cart:', e)
        }
      }
    }

    // Birinchi load
    loadCart()

    // Storage change listener
    const handleStorageChange = (e) => {
      if (e.key === 'cart' || !e.key) {
        loadCart()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRemove = (cartId) => {
    const updated = cartItems.filter(item => item.cartId !== cartId)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  // QUANTITY O'ZGARTIRISH
  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) return
    const updated = cartItems.map(item =>
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const calculateItemTotal = (item) => {
    const price = parseInt(item.price.toString().replace(/\D/g, '')) || 0
    return price * (item.quantity || 1)
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const handleClearCart = () => {
    if (confirm('Savatni tozalamoqchimisiz?')) {
      setCartItems([])
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }

  return (
    <div style={{ 
      paddingTop: '80px', 
      padding: '40px 80px', 
      minHeight: '100vh', 
      background: darkMode ? '#1a1a1a' : '#fcfcfc',
      color: darkMode ? '#fff' : '#111',
      transition: 'background 0.3s, color 0.3s'
    }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: darkMode ? '#fff' : '#111', marginBottom: 30 }}>
        🛒 Savat ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: darkMode ? '#999' : '#999' }}>
          <p style={{ fontSize: 18, marginBottom: 20 }}>Savat bo'sh</p>
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
            Xarid qilishni davom ettirish
          </button>
        </div>
      ) : (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 25,
            marginBottom: 40
          }}>
            {cartItems.map((product) => (
              <div 
                key={product.cartId}
                style={{
                  background: darkMode ? '#2a2a2a' : '#fff', 
                  borderRadius: 24, 
                  padding: 24,
                  boxShadow: `0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
                  border: '1px solid #e8000e', 
                  position: 'relative',
                  transition: 'transform 0.3s',
                  color: darkMode ? '#fff' : '#111'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <button
                  onClick={() => handleRemove(product.cartId)}
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
                <h3 style={{ fontSize: 18, fontWeight: 800, color: darkMode ? '#fff' : '#111', marginBottom: 8 }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: 13, color: darkMode ? '#aaa' : '#666', marginBottom: 15 }}>
                  {product.desc}
                </p>
                
                {/* NARX */}
                <div style={{ marginBottom: 15 }}>
                  <div style={{ fontSize: 14, color: darkMode ? '#888' : '#999', marginBottom: 5 }}>
                    Bir dona: {parseInt(product.price).toLocaleString('uz-UZ')} so'm
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#e8000e' }}>
                    Jami: {calculateItemTotal(product).toLocaleString('uz-UZ')} so'm
                  </div>
                </div>

                {/* QUANTITY CONTROLS */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, 
                  background: darkMode ? '#1a1a1a' : '#f0f0f0', 
                  borderRadius: 12, 
                  padding: 8, 
                  marginBottom: 15,
                  border: darkMode ? '1px solid #333' : 'none'
                }}>
                  <button
                    onClick={() => handleQuantityChange(product.cartId, (product.quantity || 1) - 1)}
                    style={{
                      background: '#e8000e', color: '#fff', border: 'none',
                      borderRadius: 8, width: 36, height: 36, fontSize: 18,
                      cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                    onMouseLeave={(e) => e.target.style.background = '#e8000e'}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={product.quantity || 1}
                    onChange={(e) => handleQuantityChange(product.cartId, parseInt(e.target.value) || 1)}
                    style={{
                      flex: 1, textAlign: 'center', border: 'none',
                      background: 'transparent', fontSize: 18, fontWeight: 'bold',
                      color: darkMode ? '#fff' : '#111'
                    }}
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(product.cartId, (product.quantity || 1) + 1)}
                    style={{
                      background: '#e8000e', color: '#fff', border: 'none',
                      borderRadius: 8, width: 36, height: 36, fontSize: 18,
                      cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                    onMouseLeave={(e) => e.target.style.background = '#e8000e'}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* JAMI SUMMA */}
          <div style={{
            background: darkMode ? '#2a2a2a' : '#fff', 
            padding: 30, 
            borderRadius: 20,
            textAlign: 'right', 
            marginBottom: 30, 
            border: '2px solid #e8000e',
            boxShadow: `0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
            color: darkMode ? '#fff' : '#111'
          }}>
            <div style={{ fontSize: 18, color: darkMode ? '#aaa' : '#666', marginBottom: 10 }}>
              Jami mahsulot: <span style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#111' }}>{cartItems.length} dona</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#e8000e', marginBottom: 20 }}>
              💰 Jami: {calculateTotal().toLocaleString('uz-UZ')} so'm
            </div>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/')}
                style={{
                  background: '#f0f0f0', color: '#333', border: 'none',
                  padding: '15px 30px', borderRadius: 15, fontWeight: 700,
                  cursor: 'pointer', fontSize: 16, transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e0e0e0'}
                onMouseLeave={(e) => e.target.style.background = '#f0f0f0'}
              >
                Davom ettirish
              </button>
              <button 
                onClick={handleClearCart}
                style={{
                  background: '#999', color: '#fff', border: 'none',
                  padding: '15px 30px', borderRadius: 15, fontWeight: 700,
                  cursor: 'pointer', fontSize: 16, transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#777'}
                onMouseLeave={(e) => e.target.style.background = '#999'}
              >
                🗑️ Savatni tozalash
              </button>
              <button 
                style={{
                  background: '#e8000e', color: '#fff', border: 'none',
                  padding: '15px 30px', borderRadius: 15, fontWeight: 700,
                  cursor: 'pointer', fontSize: 16, transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                onMouseLeave={(e) => e.target.style.background = '#e8000e'}
              >
                ✅ Buyurtma qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
