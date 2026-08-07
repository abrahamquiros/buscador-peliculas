import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logoCine.png"
import { useBusqueda } from "../context/BuscadorContext"

function Navbar() {
    const navigate = useNavigate()
    const { logout, autenticado } = useAuth()
    const { setBusqueda } = useBusqueda()

    if (!autenticado) return null
    
    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <header>
            <div className="flex justify-between items-center px-58 py-4 bg-blue-300">
                <Link to="/" className="flex items-center gap-2">
                    <img 
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12"
                    />
                    <h1 className="text-2xl font-semibold tracking-widest"><span className="text-[rgb(249,199,0)]">FILMA</span>CINE</h1>
                </Link>
                <div className="flex justify-between items-center">
                    <input 
                        name="buscador" 
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar..." 
                        className="bg-white w-80 p-1 rounded-l-lg focus:outline-none"
                    />
                    <button className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <circle cx={6} cy={6} r={5} fill="none" stroke="currentColor" strokeWidth={2}></circle>
                            <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m15 15l-5-5"></path>
                        </svg>
                    </button>
                </div>
                <button onClick={handleLogout} className="font-semibold hover:text-[rgb(249,199,0)] cursor-pointer">Cerrar sesión</button>
            </div>
            <nav className="bg-blue-200 p-1">
                <Link to="/favoritos" className="hover:bg-blue-100 hover:text-[rgb(249,199,0)] p-1">Favoritos</Link>
            </nav>
        </header>  
    )
}

export default Navbar