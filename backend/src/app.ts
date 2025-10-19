if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

import { Request, Response } from "express";
import { projectRouter } from "./routes/project.routes";

const express =  require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Proyectos',
      version: '1.0.0',
      description: 'API REST para gestionar proyectos con integración de IA',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Proyecto: {
          type: 'object',
          required: ['nombre', 'descripcion', 'estado', 'fechaInicio'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-generado del proyecto'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del proyecto',
              example: 'Desarrollo Web'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada del proyecto',
              example: 'Desarrollo de aplicación web con React y Node.js'
            },
            estado: {
              type: 'string',
              enum: ['En progreso', 'Finalizado', 'Pendiente', 'Cancelado'],
              description: 'Estado actual del proyecto',
              example: 'En progreso'
            },
            fechaInicio: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de inicio del proyecto',
              example: '2025-01-15T00:00:00Z'
            },
            fechaFin: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de finalización del proyecto (opcional)',
              example: '2025-06-30T00:00:00Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/projects', projectRouter);

// Ping test
app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});