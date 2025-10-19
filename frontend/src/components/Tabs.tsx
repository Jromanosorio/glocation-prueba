import { FolderKanban, TrendingUp, Sparkles } from 'lucide-react'

const tabs = [
  { id: 'proyectos', label: 'Proyectos', icon: FolderKanban },
  { id: 'estadisticas', label: 'Estadísticas', icon: TrendingUp },
  { id: 'analisis', label: 'Análisis IA', icon: Sparkles },
]

const Tabs = ({ activeTab, setActiveTab }: any) => {
  return (
    <div className="flex gap-3 flex-wrap my-5">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
              flex-1 min-w-[140px]
              ${activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
              }`}
          >
            <Icon size={20} />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs