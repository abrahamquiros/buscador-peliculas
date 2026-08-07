import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-start justify-center pt-24">
            <div className="flex flex-col gap-6 items-center">
                <h1 className="text-8xl font-semibold">404</h1>
                <div className="text-center">
                    <p className="text-gray-500 text-lg">¡Ups! Página no encontrada</p>
                    <p className="text-gray-500">La página que buscas no existe o fue eliminada</p>
                </div>
                <button 
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg cursor-pointer"
                > Volver al inicio</button>
            </div>
        </div>
        
    )
}

export default NotFound