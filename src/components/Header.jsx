import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { zustandStore } from "../utils/zustandStore";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDark } = zustandStore();
  
  return (
    <>
      {/* 1. TO'G'IRLASH: max-w va flex-wrap qo'shildi, elementlar sig'maganda buzilmaydi */}
      <div className={`fixed top-0 left-0 right-0 flex justify-between items-center p-3 z-50 transition-all ${darkMode ? "bg-gray-900 text-white border-b border-gray-700" : "bg-white border-b border-gray-200"}`}>
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2">
          
          {/* Chap tomon: Logotip va menyu */}
          {/* hidden md:flex qo'shildi: menyular faqat planshet/kompyuterda ko'rinadi */}
          <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
            <Link to={"/"} className="shrink-0">
              <img
                src="https://feedup.uz/images/feedup/logo.svg"
                alt="Logo"
                width={90}
                className="md:w-[100px]"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-4 text-sm font-medium whitespace-nowrap">
              <Link to={"/O nas"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>O нас</Link>
              <Link to={"/menu"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Меню</Link>
              <Link to={"/vakansi"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Вакансии</Link>
              <Link to={"/filial"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Филиалы</Link>
              <Link to={"/kontakt"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Контакты</Link>
            </div>
          </div>

          {/* O'ng tomon: Buyurtma turi, telefon va ikonkalari */}
          {/* shrink-0 qo'shildi: bu blok aslo siqilib kichrayib ketmaydi */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              onClick={() => setOpen(true)}
              className="bg-red-600 text-white px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer hover:bg-red-700 transition whitespace-nowrap"
            >
              Тип заказа
            </button>

            {/* hidden sm:flex qo'shildi: telefon raqami juda kichik telefonlarda yashiriladi */}
            <p className={`hidden sm:flex flex-col items-center text-right leading-tight ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <span className="block font-bold text-xs md:text-sm whitespace-nowrap">
                +998 71 200 22 11
              </span>
              <span className={`block text-[10px] md:text-xs whitespace-nowrap ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Ежедневно с 09:00 до 02:45
              </span>
            </p>

            {/* Ikonkalar o'lchami mobil qurilmalarga moslashtirildi */}
            <div className="flex items-center gap-1.5 md:gap-3">
              <button className={`${darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"} p-1`}><CiSearch size={22} /></button>
              <button onClick={() => navigate("/card")} title="Savat" className={`${darkMode ? "text-gray-400 hover:text-red-500 relative" : "text-gray-600 hover:text-red-600 relative"} p-1`}>
                <HiOutlineShoppingCart size={22} />
              </button>
              <button onClick={() => navigate("/favorites")} title="Sevimlilar" className={`${darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"} p-1`}><IoIosHeartEmpty size={22} /></button>
              <button onClick={() => navigate("/profile")} title="Profil" className={`${darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"} p-1`}><IoPersonOutline size={22} /></button>
              <button onClick={toggleDark} className={`${darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"} p-1`}>
                {darkMode ? <IoSunnyOutline size={22} /> : <IoMoonOutline size={22} />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MUHIM TO'G'IRLASH: Header fixed bo'lgani uchun uning tagidan bo'sh joy ochib beradi */}
      <div className="h-[65px] md:h-[75px]" />

      {/* Modal oyna qismi o'zgarishsiz qoldi */}
      {open && (
        <div
          className={`fixed inset-0 ${darkMode ? "bg-black/70" : "bg-black/50"} flex items-center justify-center z-50 backdrop-blur-sm`}
          onClick={() => setOpen(false)}
        >
          <div
            className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} w-96 rounded-3xl p-8 shadow-2xl m-4`}
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <style>{`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">📋 Buyurtma turi</h1>
              <button
                onClick={() => setOpen(false)}
                className={`text-2xl font-bold cursor-pointer transition ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-black"}`}
              >
                ✕
              </button>
            </div>

            <p className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Quyida buyurtma turi-ni tanlang
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 border-2 rounded-xl p-4 font-semibold text-lg transition duration-200 ${darkMode ? "border-gray-600 hover:bg-red-600 hover:border-red-600 text-white" : "border-gray-300 hover:bg-red-600 hover:text-white text-gray-900"}`}
              >
                <span style={{ fontSize: '24px' }}>🚗</span>
                <span>Dostavka</span>
              </button>

              <button 
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 border-2 rounded-xl p-4 font-semibold text-lg transition duration-200 ${darkMode ? "border-gray-600 hover:bg-red-600 hover:border-red-600 text-white" : "border-gray-300 hover:bg-red-600 hover:text-white text-gray-900"}`}
              >
                <span style={{ fontSize: '24px' }}>🏪</span>
                <span>Restoranda</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
