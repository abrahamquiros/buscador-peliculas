import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom"

import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Inicio from './pages/Inicio.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Detalle from './pages/Detalle.jsx'
import EnCartelera from './pages/EnCartelera.jsx'
import Proximamente from './pages/Proximamente.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Buscar from './pages/Buscar.jsx'
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
        <Route path="/cartelera" element={
          <RutaProtegida autenticado={autenticado}>
            <EnCartelera />
          </RutaProtegida >
        } />
        <Route path="/proximamente" element={
          <RutaProtegida autenticado={autenticado}>
            <Proximamente />
          </RutaProtegida >
        } />
        <Route path="/favoritos" element={
          <RutaProtegida autenticado={autenticado}>
            <Favoritos />
          </RutaProtegida >
        } />
        <Route path="/Buscar" element={
          <RutaProtegida autenticado={autenticado}>
            <Buscar />
          </RutaProtegida >
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
