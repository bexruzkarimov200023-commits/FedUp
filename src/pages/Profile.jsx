import React, { useState } from 'react'
import { zustandStore } from '../utils/zustandStore'
import { IoPersonOutline, IoMailOutline, IoPhonePortraitOutline, IoLocationOutline } from 'react-icons/io5'

export default function Profile() {
  const { darkMode } = zustandStore()
  const [profile, setProfile] = useState({
    name: 'Ismi Familiyasi',
    email: 'email@example.com',
    phone: '+998 90 123 45 67',
    address: 'Tashkent, Uzbekistan'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
    localStorage.setItem('userProfile', JSON.stringify(formData))
  }

  return (
    <div style={{
      paddingTop: '80px',
      padding: '40px 80px',
      minHeight: '100vh',
      background: darkMode ? '#1a1a1a' : '#fcfcfc',
      color: darkMode ? '#fff' : '#111',
      transition: 'background 0.3s, color 0.3s',
      fontFamily: "'Nunito', sans-serif"
    }}>
      <h1 style={{
        fontSize: 36,
        fontWeight: 900,
        marginBottom: 30,
        color: darkMode ? '#fff' : '#111'
      }}>
        👤 Profil
      </h1>

      <div style={{
        maxWidth: 600,
        margin: '0 auto'
      }}>
        {/* PROFIL AVATAR */}
        <div style={{
          textAlign: 'center',
          marginBottom: 40
        }}>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: darkMode ? '#2a2a2a' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: 60,
            boxShadow: `0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
            border: '3px solid #e8000e'
          }}>
            👤
          </div>
        </div>

        {/* PROFIL BILGILARI */}
        {!isEditing ? (
          <div>
            <div style={{
              background: darkMode ? '#2a2a2a' : '#fff',
              padding: 30,
              borderRadius: 20,
              boxShadow: `0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
              border: darkMode ? '1px solid #333' : '1px solid #f0f0f0',
              marginBottom: 20
            }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 10
                }}>
                  <IoPersonOutline size={24} color="#e8000e" />
                  <div>
                    <p style={{ fontSize: 12, color: darkMode ? '#aaa' : '#666' }}>Ism Familiya</p>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{profile.name}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 10
                }}>
                  <IoMailOutline size={24} color="#e8000e" />
                  <div>
                    <p style={{ fontSize: 12, color: darkMode ? '#aaa' : '#666' }}>Email</p>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{profile.email}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 10
                }}>
                  <IoPhonePortraitOutline size={24} color="#e8000e" />
                  <div>
                    <p style={{ fontSize: 12, color: darkMode ? '#aaa' : '#666' }}>Telefon</p>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{profile.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <IoLocationOutline size={24} color="#e8000e" />
                  <div>
                    <p style={{ fontSize: 12, color: darkMode ? '#aaa' : '#666' }}>Manzil</p>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: '100%',
                padding: '14px',
                background: '#e8000e',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#c0000b'}
              onMouseLeave={(e) => e.target.style.background = '#e8000e'}
            >
              ✏️ Tahrirlash
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              background: darkMode ? '#2a2a2a' : '#fff',
              padding: 30,
              borderRadius: 20,
              boxShadow: `0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
              border: darkMode ? '1px solid #333' : '1px solid #f0f0f0'
            }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                  Ism Familiya
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: darkMode ? '1px solid #444' : '1px solid #e0e0e0',
                    borderRadius: 8,
                    background: darkMode ? '#1a1a1a' : '#f9f9f9',
                    color: darkMode ? '#fff' : '#111',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: darkMode ? '1px solid #444' : '1px solid #e0e0e0',
                    borderRadius: 8,
                    background: darkMode ? '#1a1a1a' : '#f9f9f9',
                    color: darkMode ? '#fff' : '#111',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: darkMode ? '1px solid #444' : '1px solid #e0e0e0',
                    borderRadius: 8,
                    background: darkMode ? '#1a1a1a' : '#f9f9f9',
                    color: darkMode ? '#fff' : '#111',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: 30 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                  Manzil
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: darkMode ? '1px solid #444' : '1px solid #e0e0e0',
                    borderRadius: 8,
                    background: darkMode ? '#1a1a1a' : '#f9f9f9',
                    color: darkMode ? '#fff' : '#111',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#e8000e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                  onMouseLeave={(e) => e.target.style.background = '#e8000e'}
                >
                  ✓ Saqlash
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setFormData(profile)
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: darkMode ? '#333' : '#e0e0e0',
                    color: darkMode ? '#fff' : '#111',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  ✕ Bekor qilish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
