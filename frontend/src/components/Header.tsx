import { BarChart3 } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
      <div className="flex items-center justify-center gap-3 mb-3">
        <BarChart3 size={40} />
        <h1 className="text-4xl font-bold">Sistema de Gestión de Proyectos</h1>
      </div>
      <p className="text-blue-100 text-lg">
        Gestiona tus proyectos con análisis impulsado por IA
      </p>
    </header>
  )
}

export default Header