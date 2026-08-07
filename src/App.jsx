import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom"

import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Inicio from './pages/Inicio.jsx'
import Navbar from './components/Navbar.jsx'
import Detalle from './pages/Detalle.jsx'
import Favoritos from './pages/Favoritos.jsx'
import { useAuth } from "./context/AuthContext"

// https://thetvdb.com/movies/amadera-no-joji-gokuraku-sex#castcrew

function RutaProtegida({ children, autenticado }) {
  if (!autenticado) return <Navigate to="/login" />
  return children
}

function App() {
  const { autenticado } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RutaProtegida autenticado={autenticado}>
            <Inicio />
          </RutaProtegida >
        } /> 
        <Route path="/pelicula/:id" element={
          <RutaProtegida autenticado={autenticado}>
            <Detalle />
          </RutaProtegida >
        } />
        <Route path="/favoritos" element={
          <RutaProtegida autenticado={autenticado}>
            <Favoritos />
          </RutaProtegida >
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
