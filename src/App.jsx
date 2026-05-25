import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Category from './components/Category'
import Home from './pages/Home'
import Filial from './pages/Filial'
import Kontakt from './pages/Kontakt'
import Menu from './pages/Menu'
import Onas from './pages/Onas'
import Vakansi from './pages/Vakansi'
import { Routes, Route } from 'react-router-dom'
import Favorites from "./pages/Favorites";
import Card from './pages/Card'
import Profile from './pages/Profile'
export default function App() {
  return (
    <div>
<React.Fragment>
  <Header/>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/filial' element={<Filial/>}/>
      <Route path='/kontakt' element={<Kontakt/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/O nas' element={<Onas/>}/>
      <Route path='/vakansi' element={<Vakansi/>}/>
      <Route path='/favorites' element={<Favorites/>}/>
      <Route path='/card' element={<Card/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  <Footer/>
</React.Fragment>
    </div>
  )
}

