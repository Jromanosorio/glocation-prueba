import { useState } from 'react'
import { projectsAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Sparkles, Loader, Calendar, FolderKanban } from 'lucide-react'

const AnalysisTab = () => {
  const [analisis, setAnalisis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generarAnalisis = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAnalisisIA()
      setAnalisis(response.data)
      toast.success('Análisis generado exitosamente')
    } catch (error) {
      toast.error('Error al generar análisis. Verifica tu API key de Gemini.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 fade-in">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <Sparkles size={28} />
        Análisis Generado por IA
      </h2>
      <button
        onClick={generarAnalisis}
        disabled={loading}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" size={20} />
            Generando Análisis...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generar Análisis con IA
          </>
        )}
      </button>
      {loading && (
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <Loader className="animate-spin text-blue-500" size={24} />
            <p className="text-blue-800 font-semibold">
              Analizando proyectos con inteligencia artificial...
            </p>
          </div>
        </div>
      )}
      {analisis && !loading && (
        <div className="mt-6 space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-purple-800 mb-3">Resumen Ejecutivo</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {analisis.resumen}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <FolderKanban size={24} />
                <span className="font-semibold">Proyectos Analizados</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{analisis.proyectos}</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 text-green-600 mb-2">
                <Calendar size={24} />
                <span className="font-semibold">Generado el</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(analisis.generadoEn).toLocaleString('es', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">💡 Nota:</p>
            <p>
              Este análisis ha sido generado por Google Gemini AI basándose en los proyectos
              actuales de tu portafolio. Los insights y recomendaciones son generados
              automáticamente.
            </p>
          </div>
        </div>
      )}
      {!analisis && !loading && (
        <div className="mt-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Sparkles className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600 text-lg mb-2">
            Haz clic en "Generar Análisis con IA" para obtener un resumen inteligente de tus
            proyectos
          </p>
          <p className="text-gray-500 text-sm">
            La IA analizará tus proyectos y generará insights, tendencias y recomendaciones
          </p>
        </div>
      )}
    </div>
  )
}

export default AnalysisTab