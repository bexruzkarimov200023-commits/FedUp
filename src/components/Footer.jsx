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
    const {darkMode,toggleDark} = zustandStore();
  
  return (

    <div className={darkMode ? "flex justify-between p-10 bg-black text-white" : "flex justify-between p-10 bg-white"}>
      <div className="flex flex-col gap-5">
        <Link to={"/"}>
          <img
            src="https://feedup.uz/_next/image?url=%2Fimages%2Ffeedup%2Flogo-footer.svg&w=384&q=75"
            width={150}
            alt=""
          />
        </Link>
        <p className="max-w-[320px] text-gray-400">
          Feed Up – ведущая сеть ресторанов быстрого питания
          в Узбекистане, которая радует жителей страны
          свежими и вкусными блюдами уже более 13 лет
        </p>
        <div className="flex gap-3">
          <a  target='_blank' href="https://apps.apple.com/uz/app/feedup-uzbekistan/id6502944941">
            <img
              src="https://feedup.uz/_next/image?url=%2Fic_as.svg&w=256&q=75"
              alt=""
              width={120}
            />
          </a>
          <a target='_blank' href="https://play.google.com/store/apps/details?id=com.dynamicsoft.feed_up_eco">
            <img
              src="https://feedup.uz/_next/image?url=%2Fic_gp.svg&w=256&q=75"
              alt=""
              width={120}
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">
          О компании
        </h1>
        <Link to={"/O nas"}>О нас</Link>
        <Link to={"/menu"}>Меню</Link>
        <Link to={"/vakansi"}>Вакансии</Link>
        <Link to={"/filial"}>Филиалы</Link>
        <Link to={"/kontakt"}>Контакты</Link>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">
          Информация
        </h1>
        <p>Доставка</p>
        <p>Оплата</p>
        <p>Политика конфиденциальности</p>
        <p>Публичная оферта</p>
      </div>
      <div className='flex flex-col gap-3'> 
        <h1 className="text-2xl font-semibold">Мы в соц сетях</h1>
        <a href="" className='flex items-center gap-2'><MdOutlinePhone />+998 71 200 22 11</a>
        <a href="" className='flex items-center gap-2'><CiMail />feedup.uz@yandex.ru</a>
        <a target='_blank' href="https://www.facebook.com/feedupuz/?locale=ru_RU"  className='flex items-center gap-2 '><FiFacebook />Facebook</a>
        <a target='_blank' href="https://www.instagram.com/feedupuz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3" className='flex items-center gap-2 '><FaInstagram />Instagram</a>
        <a target='_blank' href="https://t.me/feedupuz_bot" className='flex items-center gap-2'><PiTelegramLogo />Telegram</a>
      </div>
    </div>
  )
}