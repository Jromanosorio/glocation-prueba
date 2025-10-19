import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { projectsAPI } from '../services/api'
import ProjectForm from './ProjectForm'
import ProjectsTable from './ProjectsTable'

const ProjectsTab = () => {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProyecto, setEditingProyecto] = useState<any>(null)

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cargarProyectos = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAll()
      setProyectos(response.data)
    } catch (error) {
      toast.error('Error al cargar proyectos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      if (editingProyecto) {
        await projectsAPI.update(editingProyecto.id, data)
        toast.success('Proyecto actualizado exitosamente')
      } else {
        await projectsAPI.create(data)
        toast.success('Proyecto creado exitosamente')
      }
      cargarProyectos()
      setEditingProyecto(null)
    } catch (error) {
      toast.error('Error al guardar proyecto')
      console.error(error)
    }
  }

  const handleEdit = (proyecto: any) => {
    setEditingProyecto(proyecto)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: any) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return

    try {
      await projectsAPI.delete(id)
      toast.success('Proyecto eliminado exitosamente')
      cargarProyectos()
    } catch (error) {
      toast.error('Error al eliminar proyecto')
      console.error(error)
    }
  }

  const handleCancel = () => {
    setEditingProyecto(null)
  }

  return (
    <div className="space-y-6 fade-in">
      <ProjectForm
        proyecto={editingProyecto}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <ProjectsTable
        proyectos={proyectos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ProjectsTab