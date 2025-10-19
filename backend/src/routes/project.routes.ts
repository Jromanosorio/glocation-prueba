import { createProject, deleteProject, generateAnalysisIA, getAllProjects, getProjectById, getStats, updateProject } from "../controllers/project.controllers";

const { Router } = require('express');
const projectRouter = Router();

projectRouter.get('/', getAllProjects);

projectRouter.get('/:id', getProjectById);

projectRouter.post('/', createProject);

projectRouter.put('/:id', updateProject);

projectRouter.delete('/:id', deleteProject);

projectRouter.get('/analisis/resumen', generateAnalysisIA);

projectRouter.get('/graficos/estadisticas', getStats);

export { projectRouter };