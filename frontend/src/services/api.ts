import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id: any) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: any, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: any) => api.delete(`/projects/${id}`),
  getEstadisticas: () => api.get('/projects/graficos/estadisticas'),
  getAnalisisIA: () => api.get('/projects/analisis/resumen'),
}

export default api