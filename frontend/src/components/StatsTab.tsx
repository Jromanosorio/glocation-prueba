import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { projectsAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Loader, FolderKanban, Clock, CheckCircle, AlertCircle } from 'lucide-react'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
  }

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold opacity-90">{title}</h3>
        <Icon size={24} />
      </div>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  )
}

const StatsTab = () => {
  const [estadisticas, setEstadisticas] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  const cargarEstadisticas = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getEstadisticas()
      setEstadisticas(response.data)
    } catch (error) {
      toast.error('Error al cargar estadísticas')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center fade-in">
        <Loader className="animate-spin mx-auto mb-4 text-blue-500" size={40} />
        <p className="text-gray-600">Cargando estadísticas...</p>
      </div>
    )
  }

  if (!estadisticas) return null

  const enProgreso = estadisticas.porEstado.find((e: any) => e.estado === 'En progreso')?.cantidad || 0
  const finalizados = estadisticas.porEstado.find((e: any) => e.estado === 'Finalizado')?.cantidad || 0
  const pendientes = estadisticas.porEstado.find((e: any) => e.estado === 'Pendiente')?.cantidad || 0

  const estadoData = {
    labels: estadisticas.porEstado.map((e: any) => e.estado),
    datasets: [
      {
        data: estadisticas.porEstado.map((e: any) => e.cantidad),
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: { size: 14 },
        },
      },
    },
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Proyectos"
          value={estadisticas.total}
          icon={FolderKanban}
          color="blue"
        />
        <StatCard
          title="En Progreso"
          value={enProgreso}
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Finalizados"
          value={finalizados}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Pendientes"
          value={pendientes}
          icon={AlertCircle}
          color="yellow"
        />
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">📊 Proyectos por Estado</h2>
        <div className="h-80 flex items-center justify-center">
          <Doughnut data={estadoData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}


export default StatsTab