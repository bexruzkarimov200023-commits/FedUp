import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { zustandStore } from "../utils/zustandStore";

export default function Header() {

  const [open, setOpen] = useState(false);
  const {darkMode,toggleDark} = zustandStore();
  return (
    <>
      <div className={darkMode ? "flex justify-between p-3 bg-black text-white" : "flex justify-between p-3 bg-white "}>

        <div className="flex gap-5 items-center">
          <Link to={"/"}>
            <img
              src="https://feedup.uz/images/feedup/logo.svg"
              alt=""
              width={100}
            />
          </Link>

          <Link to={"/O nas"}>O нас</Link>
          <Link to={"/menu"}>Меню</Link>
          <Link to={"/vakansi"}>Вакансии</Link>
          <Link to={"/filial"}>Филиалы</Link>
          <Link to={"/kontakt"}>Контакты</Link>
        </div>

        <div className="flex gap-5 items-center">

          <button
            onClick={() => setOpen(true)}
            className="bg-red-600 text-white w-25 h-10 rounded-full cursor-pointer"
          >
            Тип заказа
          </button>

          <p className="flex flex-col items-center">
            <span className="block font-bold">
              +998 71 200 22 11
            </span>

            <span className="block text-xs text-gray-400">
              Ежедневно с 09:00 до 02:45
            </span>
          </p>

          <button><CiSearch /></button>
          <button><HiOutlineShoppingCart /></button>
          <button><IoIosHeartEmpty /></button>
          <button><IoPersonOutline /></button>
          <button onClick={toggleDark} >
            {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >

          <div
            className="bg-white w-120 rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >

            <h1 className="text-3xl font-bold text-center mb-10">
              Тип заказа
            </h1>

            <div className="flex flex-col gap-5">

              <button className="border border-gray-300 rounded-2xl h-16 text-">
                Доставка
              </button>

              <button className="border border-gray-300 rounded-2xl h-16 text-">
                Самовывоз
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};