import { createProject, deleteProject, generateAnalysisIA, getAllProjects, getProjectById, getStats, updateProject } from "../controllers/project.controllers";

const { Router } = require('express');
const projectRouter = Router();

/**
 * @swagger
 * /api/proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proyecto'
 */
projectRouter.get('/', getAllProjects);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyecto'
 *       404:
 *         description: Proyecto no encontrado
 */
projectRouter.get('/:id', getProjectById);

/**
 * @swagger
 * /api/proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - estado
 *               - fechaInicio
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyecto'
 */
projectRouter.post('/', createProject);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   put:
 *     summary: Actualizar un proyecto existente
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proyecto'
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 */
projectRouter.put('/:id', updateProject);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 */
projectRouter.delete('/:id', deleteProject);

/**
 * @swagger
 * /api/proyectos/analisis/resumen:
 *   get:
 *     summary: Generar análisis de proyectos con IA
 *     tags: [Análisis]
 *     responses:
 *       200:
 *         description: Resumen generado por IA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resumen:
 *                   type: string
 *                 proyectos:
 *                   type: integer
 */
projectRouter.get('/analisis/resumen', generateAnalysisIA);

/**
 * @swagger
 * /api/proyectos/graficos/estadisticas:
 *   get:
 *     summary: Obtener datos para el gráfico estadístico
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Datos agregados para el gráfico
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 porEstado:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       estado:
 *                         type: string
 *                       cantidad:
 *                         type: integer
 */
projectRouter.get('/graficos/estadisticas', getStats);

export { projectRouter };