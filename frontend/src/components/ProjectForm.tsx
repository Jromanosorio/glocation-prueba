import { useState, useEffect } from 'react'
import { Save, X, PlusCircle } from 'lucide-react'

const ProjectForm = ({ proyecto, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'Pendiente',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: '',
  })

  useEffect(() => {
    if (proyecto) {
      setFormData({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        estado: proyecto.estado,
        fechaInicio: proyecto.fechaInicio.split('T')[0],
        fechaFin: proyecto.fechaFin ? proyecto.fechaFin.split('T')[0] : '',
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        estado: 'Pendiente',
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaFin: '',
      })
    }
  }, [proyecto])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSave(formData)
    setFormData({
      nombre: '',
      descripcion: '',
      estado: 'Pendiente',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: '',
    })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        {proyecto ? (
          <>
            <Save size={28} />
            Editar Proyecto
          </>
        ) : (
          <>
            <PlusCircle size={28} />
            Nuevo Proyecto
          </>
        )}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Proyecto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estado *
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Inicio *
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Fin
            </label>
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
          >
            <Save size={20} />
            {proyecto ? 'Actualizar' : 'Guardar'} Proyecto
          </button>

          {proyecto && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
            >
              <X size={20} />
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProjectForm