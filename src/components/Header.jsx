import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
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
      <div className={`fixed top-0 left-0 right-0 flex justify-between p-3 z-50 ${darkMode ? "bg-gray-900 text-white border-b border-gray-700" : "bg-white border-b border-gray-200"}`}>

        <div className="flex gap-5 items-center">
          <Link to={"/"}>
            <img
              src="https://feedup.uz/images/feedup/logo.svg"
              alt=""
              width={100}
            />
          </Link>

          <Link to={"/O nas"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>O нас</Link>
          <Link to={"/menu"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Меню</Link>
          <Link to={"/vakansi"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Вакансии</Link>
          <Link to={"/filial"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Филиалы</Link>
          <Link to={"/kontakt"} className={darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"}>Контакты</Link>
        </div>

        <div className="flex gap-5 items-center">

          <button
            onClick={() => setOpen(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-red-700 transition"
          >
            Тип заказа
          </button>

          <p className={`flex flex-col items-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <span className="block font-bold">
              +998 71 200 22 11
            </span>

            <span className={`block text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Ежедневно с 09:00 до 02:45
            </span>
          </p>

          <button className={darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"}><CiSearch size={24} /></button>
          <button onClick={() => navigate("/card")} className={darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"}><HiOutlineShoppingCart size={24} /></button>
          <button onClick={() => navigate("/favorites")} className={darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"}><IoIosHeartEmpty size={24} /></button>
          <button className={darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"}><IoPersonOutline size={24} /></button>
          <button onClick={toggleDark} className={darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-600"}>
            {darkMode ? <IoSunnyOutline size={24} /> : <IoMoonOutline size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`fixed inset-0 ${darkMode ? "bg-black/70" : "bg-black/50"} flex items-center justify-center z-50 backdrop-blur-sm`}
          onClick={() => setOpen(false)}
        >

          <div
            className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} w-96 rounded-3xl p-8 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <style>{`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
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
};