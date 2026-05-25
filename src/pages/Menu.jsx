import React from 'react'
import { zustandStore } from '../utils/zustandStore'

export default function Menu() {
  const { darkMode } = zustandStore()

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
        fontSize: 32,
        fontWeight: 900,
        marginBottom: 30,
        color: darkMode ? '#fff' : '#111'
      }}>
        📋 Menyú
      </h1>
      
      <div style={{
        background: darkMode ? '#2a2a2a' : '#fff',
        padding: 30,
        borderRadius: 20,
        boxShadow: `0 5px 15px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
        border: darkMode ? '1px solid #333' : '1px solid #f0f0f0'
      }}>
        <p style={{
          fontSize: 16,
          color: darkMode ? '#aaa' : '#666',
          lineHeight: 1.6
        }}>
          Menyú sahifasi hozir tayyorlanmoqda. Iltimos, kuting...
        </p>
      </div>
    </div>
  )
}
