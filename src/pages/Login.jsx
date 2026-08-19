import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [error, setError] = useState("")

    function handleLogin(e) {
        e.preventDefault()
        const usuario = e.target.usuario.value
        const password = e.target.password.value

        if (usuario === "admin" && password === "1234") {
            login()
            navigate("/")
        } else {
            setError("Usuario o contraseña incorrectos")
        }
    }

    return (
        <>
            <h1 className="text-lg font-semibold w-1/2 p-2 ml-8 mt-6 py-1 bg-gradient-to-r from-red-600 to-transparent">Login</h1>
            <div className="min-h-screen flex items-start justify-center pt-24">
                <div className="flex flex-col items-center gap-6">
                    <div className="border border-black-500 w-80 p-4 rounded-lg"> 
                        <h1 className="text-xl font-semibold mb-8 flex justify-center">Inicia sesión</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4 ">
                            <input 
                                name="usuario" 
                                placeholder="Usuario" 
                                className="px-2 py-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm"
                            />
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="Contraseña" 
                                className="px-2 py-1 border border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <button 
                                type="submit" 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg cursor-pointer"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                        
                    </div>
                    <p className="text-gray-600">Credenciales de acceso: Usuario: admin - Contraseña: 1234</p>
                </div>
            </div>         
        </>       
    )
}

export default Login