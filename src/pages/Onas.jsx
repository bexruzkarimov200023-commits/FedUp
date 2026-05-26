import React from 'react'
import { zustandStore } from '../utils/zustandStore'

export default function Onas() {
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
        ℹ️ Biz Haqimizda
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
          Biz haqimizda sahifasi hozir tayyorlanmoqda. Iltimos, kuting...
        </p>
      </div>
      
    <div className="min-h-screen bg-[#1d1e2c] text-white px-6 py-8">
      
     
      <div className="text-gray-400 text-sm flex gap-2 mb-6">
        <span>Главная</span>
        <span>›</span>
        <span className="text-white">О нас</span>
      </div>

      
      <h1 className="text-5xl font-bold mb-8">О нас</h1>

      
      <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden">
        <img
          src="https://i.imgur.com/8Km9tLL.png"
          alt="about"
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="max-w-5xl mx-auto mt-10 text-gray-300 leading-8 text-lg">
        <p>
        
  
    <div className="min-h-screen bg-[#1d1e2c] text-white px-6 py-8">
      
     
      <div className="text-gray-400 text-sm flex gap-2 mb-6">
        <span>Главная</span>
        <span>›</span>
        <span className="text-white">О нас</span>
      </div>

    
      <h1 className="text-5xl font-bold mb-8">О нас</h1>

     
      <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden">
        <img
          src="https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fpages%2F2025%2F06%2F18%2F1750258595660851782.png&w=1920&q=75"
          alt="about"
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="max-w-5xl mx-auto mt-10 text-gray-300 leading-8 text-lg">
        <p>
         
        </p>

        <p className="mt-6">
          Наша цель — сделать процесс заказа максимально простым и приятным.
          Мы ценим качество, скорость и комфорт наших клиентов.
        </p>
      </div>
    </div>
        </p>

        <p className="mt-6">
          Наша цель — сделать процесс заказа максимально простым и приятным.
          Мы ценим качество, скорость и комфорт наших клиентов.
        </p>
      </div>
    </div>

    </div>
  )
}
