import { Edit2, Trash2, Loader } from 'lucide-react'

const estadoBadgeClass = {
  Pendiente: 'bg-yellow-100 text-yellow-800',
  'En progreso': 'bg-blue-100 text-blue-800',
  Finalizado: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
}

const ProjectsTable = ({ proyectos, loading, onEdit, onDelete }: any) => {
  const formatearFecha = (fecha: any) => {
    return new Date(fecha).toLocaleDateString('es', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Loader className="animate-spin mx-auto mb-4 text-blue-500" size={40} />
        <p className="text-gray-600">Cargando proyectos...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">📋 Lista de Proyectos</h2>
      {proyectos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No hay proyectos registrados</p>
          <p className="text-sm mt-2">Crea tu primer proyecto usando el formulario arriba</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">ID</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">Descripción</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">Fecha Inicio</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">Fecha Fin</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto: any) => (
                <tr
                  key={proyecto.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm">{proyecto.id}</td>
                  <td className="px-4 py-4">
                    <span className="font-semibold">{proyecto.nombre}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {proyecto.descripcion}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        estadoBadgeClass[proyecto.estado as keyof typeof estadoBadgeClass]
                      }`}
                    >
                      {proyecto.estado}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{formatearFecha(proyecto.fechaInicio)}</td>
                  <td className="px-4 py-4 text-sm">
                    {proyecto.fechaFin ? formatearFecha(proyecto.fechaFin) : '-'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(proyecto)}
                        className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-600"
                      >
                        <Edit2 size={16} />
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(proyecto.id)}
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProjectsTable