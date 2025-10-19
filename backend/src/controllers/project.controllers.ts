import { Request, Response } from "express";

const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtener todos los proyectos
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const proyectos = await prisma.proyecto.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(proyectos);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener proyectos', details: error.message });
  }
};

// Obtener proyecto por ID
const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proyecto = await prisma.proyecto.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    
    res.json(proyecto);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener proyecto', details: error.message });
  }
};

// Crear nuevo proyecto
const createProject = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, estado, fechaInicio, fechaFin } = req.body;
    
    const nuevoProyecto = await prisma.proyecto.create({
      data: {
        nombre,
        descripcion,
        estado,
        fechaInicio: new Date(fechaInicio),
        fechaFin: fechaFin ? new Date(fechaFin) : null
      }
    });
    
    res.status(201).json(nuevoProyecto);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear proyecto', details: error.message });
  }
};

// Actualizar un proyecto
const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado, fechaInicio, fechaFin } = req.body;
    
    const proyectoActualizado = await prisma.proyecto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
        estado,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
        fechaFin: fechaFin ? new Date(fechaFin) : null
      }
    });
    
    res.json(proyectoActualizado);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar proyecto', details: error.message });
  }
};

// Eliminar proyecto
const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.proyecto.delete({where: { id: parseInt(id) }});
    
    res.json({ message: 'Proyecto eliminado exitosamente' });

  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar proyecto', details: error.message });
  }
};

// Generar análisis con IA
const generateAnalysisIA = async (req: Request, res: Response) => {
  try {
    const proyectos = await prisma.proyecto.findMany();
    
    if (proyectos.length === 0) {
      return res.json({ 
        resumen: 'No hay proyectos para analizar.',
        proyectos: 0 
      });
    }
    
    // Preparar datos para IA
    const descripcionesProyectos = proyectos.map((p: any) => 
      `${p.nombre}: ${p.descripcion} (Estado: ${p.estado})`
    ).join('\n');
    
    const prompt = `Analiza los siguientes proyectos y genera un resumen breve sobre el portafolio de proyectos, incluyendo tendencias, áreas de enfoque y recomendaciones:\n\n${descripcionesProyectos}`;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const resumen = response.text();
    
    res.json({
      resumen,
      proyectos: proyectos.length,
      generadoEn: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ 
      error: 'Error al generar análisis con IA', 
      details: error.message,
      fallback: 'Asegúrate de configurar GEMINI_API_KEY en las variables de entorno'
    });
  }
};

// Obtener estadísticas para el gráfico
const getStats = async (req: Request, res: Response) => {
  try {
    const proyectos = await prisma.proyecto.findMany();
    
    // Contar proyectos por estado
    const porEstado = proyectos.reduce((acc: any, proyecto: any) => {
      const estado = proyecto.estado;
      const existing = acc.find((item: any) => item.estado === estado);
      if (existing) {
        existing.cantidad++;
      } else {
        acc.push({ estado, cantidad: 1 });
      }
      return acc;
    }, []);
    
    res.json({
      total: proyectos.length,
      porEstado,
      ultimaActualizacion: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ 
      error: 'Error al obtener estadísticas', 
      details: error.message 
    });
  }
};

export { 
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
    generateAnalysisIA,
    getStats
}