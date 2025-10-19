import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ProjectsTab from './components/ProjectsTab'
import StatsTab from './components/StatsTab'
import AnalysisTab from './components/AnalysisTab'

function App() {
  const [activeTab, setActiveTab] = useState('proyectos')

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'proyectos' && <ProjectsTab />}
          {activeTab === 'estadisticas' && <StatsTab />}
          {activeTab === 'analisis' && <AnalysisTab />}
        </div>
      </div>
    </div>
  )
}

export default App