import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(() => {
    const guardado = localStorage.getItem("sesion")
    return guardado ? JSON.parse(guardado) : false
  })

  useEffect(() => {
      localStorage.setItem("sesion", JSON.stringify(autenticado))
    }, [autenticado])
  
  function login() {
    setAutenticado(true)
  }

  function logout() {
    setAutenticado(false)
  }

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}