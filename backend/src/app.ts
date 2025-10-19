if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

import { Request, Response } from "express";
import { projectRouter } from "./routes/project.routes";

const express =  require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRouter);

// Ping test
app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});