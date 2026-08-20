import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logoCine.png"

function Navbar() {
    const navigate = useNavigate()
    const { logout, autenticado } = useAuth()
    const [termino, setTermino] = useState("")
    
    if (!autenticado) return null
    
    function handleLogout() {
        logout()
        navigate("/login")
    }

    function handleBuscar() {
        if (termino.trim() === "") return
        navigate(`/buscar?q=${termino}`)
        setTermino("")
    }

    return (
        <header>
            {/* responsive: flex-col (movil) y (tablet ) flex-row (escritorio) gap-1 para separar cuando es flex-col*/}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:px-60 py-4 bg-blue-300 gap-1">
                {/* Fila 1 en móvil: logo + cerrar sesión */}
                <div className="flex justify-center items-center gap-14">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-12 h-12" />
                        <h1 className="text-2xl font-semibold tracking-widest">
                            <span className="text-[rgb(249,199,0)]">FILMA</span>CINE
                        </h1>
                        </Link>
                    <button onClick={handleLogout} className="font-semibold hover:text-[rgb(249,199,0)] hover:bg-white/20 px-2 py-1 rounded-lg cursor-pointer lg:hidden">
                        Cerrar sesión
                    </button>
                </div>
                {/* Buscador */}
                <div className="flex justify-between items-center">
                    <input 
                        name="buscador" 
                        value={termino}
                        onChange={(e) => setTermino(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                        placeholder="Buscar..." 
                        className="bg-white w-80 p-1 rounded-l-lg focus:outline-none"
                    />
                    <button onClick={handleBuscar} className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <circle cx={6} cy={6} r={5} fill="none" stroke="currentColor" strokeWidth={2}></circle>
                            <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m15 15l-5-5"></path>
                        </svg>
                    </button>
                </div>
                {/* Cerrar sesión solo en escritorio */}
                <button 
                    onClick={handleLogout} 
                    className="hidden lg:block font-semibold hover:text-[rgb(249,199,0)] hover:bg-white/20 px-2 py-1 rounded-lg cursor-pointer"
                >
                    Cerrar sesión
                </button>
            </div>
            {/* <nav className="flex flex-row justify-around items-center lg:px-56 bg-blue-200 p-1"> */}
            <nav className="flex flex-row justify-evenly items-center lg:px-76 bg-[#4a87cb] ">
                <Link to="/" className="font-semibold hover:bg-white/20 hover:text-[rgb(249,199,0)] px-2 py-1">Populares</Link>
                <Link to="/cartelera" className="font-semibold hover:bg-white/20 hover:text-[rgb(249,199,0)] px-2 py-1">En cartelera</Link>
                <Link to="/proximamente" className="font-semibold hover:bg-white/20 hover:text-[rgb(249,199,0)] px-2 py-1">Próximamente</Link>
                <Link to="/favoritos" className="font-semibold hover:bg-white/20 hover:text-[rgb(249,199,0)] px-2 py-1">Favoritos</Link>
            </nav>
        </header>  
    )
}

export default Navbar