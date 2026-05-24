import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from 'react-icons/ci';
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { zustandStore } from '../utils/zustandStore';

//Shahriyor
export default function Footer() {
    const { darkMode, toggleDark } = zustandStore();
  
  return (

    <div className={darkMode ? "flex justify-between p-10 bg-gray-900 text-white border-t border-gray-700" : "flex justify-between p-10 bg-white border-t border-gray-200"}>
      <div className="flex flex-col gap-5">
        <Link to={"/"}>
          <img
            src="https://feedup.uz/_next/image?url=%2Fimages%2Ffeedup%2Flogo-footer.svg&w=384&q=75"
            width={150}
            alt=""
          />
        </Link>
        <p className={`max-w-[320px] ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Feed Up – ведущая сеть ресторанов быстрого питания
          в Узбекистане, которая радует жителей страны
          свежими и вкусными блюдами уже более 13 лет
        </p>
        <div className="flex gap-3">
          <a  target='_blank' href="https://apps.apple.com/uz/app/feedup-uzbekistan/id6502944941" className="hover:opacity-80 transition">
            <img
              src="https://feedup.uz/_next/image?url=%2Fic_as.svg&w=256&q=75"
              alt=""
              width={120}
            />
          </a>
          <a target='_blank' href="https://play.google.com/store/apps/details?id=com.dynamicsoft.feed_up_eco" className="hover:opacity-80 transition">
            <img
              src="https://feedup.uz/_next/image?url=%2Fic_gp.svg&w=256&q=75"
              alt=""
              width={120}
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
          О компании
        </h1>
        <Link to={"/O nas"} className={darkMode ? "text-gray-300 hover:text-red-500 transition" : "text-gray-700 hover:text-red-600 transition"}>О нас</Link>
        <Link to={"/menu"} className={darkMode ? "text-gray-300 hover:text-red-500 transition" : "text-gray-700 hover:text-red-600 transition"}>Меню</Link>
        <Link to={"/vakansi"} className={darkMode ? "text-gray-300 hover:text-red-500 transition" : "text-gray-700 hover:text-red-600 transition"}>Вакансии</Link>
        <Link to={"/filial"} className={darkMode ? "text-gray-300 hover:text-red-500 transition" : "text-gray-700 hover:text-red-600 transition"}>Филиалы</Link>
        <Link to={"/kontakt"} className={darkMode ? "text-gray-300 hover:text-red-500 transition" : "text-gray-700 hover:text-red-600 transition"}>Контакты</Link>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Информация
        </h1>
        <p className={darkMode ? "text-gray-300 hover:text-red-500 cursor-pointer transition" : "text-gray-700 hover:text-red-600 cursor-pointer transition"}>Доставка</p>
        <p className={darkMode ? "text-gray-300 hover:text-red-500 cursor-pointer transition" : "text-gray-700 hover:text-red-600 cursor-pointer transition"}>Оплата</p>
        <p className={darkMode ? "text-gray-300 hover:text-red-500 cursor-pointer transition" : "text-gray-700 hover:text-red-600 cursor-pointer transition"}>Политика конфиденциальности</p>
        <p className={darkMode ? "text-gray-300 hover:text-red-500 cursor-pointer transition" : "text-gray-700 hover:text-red-600 cursor-pointer transition"}>Публичная оферта</p>
      </div>
      <div className='flex flex-col gap-3'> 
        <h1 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Мы в соц сетях</h1>
        <a href="tel:+998712002211" className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"} transition`}><MdOutlinePhone />+998 71 200 22 11</a>
        <a href="mailto:feedup.uz@yandex.ru" className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"} transition`}><CiMail />feedup.uz@yandex.ru</a>
        <a target='_blank' href="https://www.facebook.com/feedupuz/?locale=ru_RU"  className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"} transition`}><FiFacebook />Facebook</a>
        <a target='_blank' href="https://www.instagram.com/feedupuz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3" className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"} transition`}><FaInstagram />Instagram</a>
        <a target='_blank' href="https://t.me/feedupuz_bot" className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-red-500" : "text-gray-700 hover:text-red-600"} transition`}><PiTelegramLogo />Telegram</a>
      </div>
    </div>
  )
}