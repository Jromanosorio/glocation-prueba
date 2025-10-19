# 🧩 Proyecto Fullstack - Gestión de Proyectos con IA Generativa

Este proyecto implementa una aplicación **Fullstack** que permite gestionar proyectos, visualizarlos gráficamente, y generar análisis automáticos con la **IA generativa (Gemini API)**. 
Está completamente **Dockerizado**, e incluye **documentación de la API con Swagger**, **base de datos PostgreSQL usando Prisma**, y una **interfaz web responsive** desarrollada en React con Vite.

---
## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jromanosorio/glocation-prueba
cd glocation-prueba
```

### 2. Archivo `.env`

 -  **2.1** Cambiar el nombre del archivo `.env.example` que se encuentra en la raiz del proyecto por `.env`  
 -  **2.2** Reemplazar el valor de la variable GEMINI_API_KEY por el enviado al correo, o por tu propia API_KEY de GEMINI

## 🐳 Levantar el proyecto con docker

Teniendo Docker CLI o Docker desktop corriendo en el equipo. Ejecutar en la raiz del proyecto

```bash
docker compose up --build
```

Este comando instalará las dependencias y ejecutará los scripts necesarios para poder acceder a la app

### 1. Acceso a la aplicacion

La aplicacion estará disponible en:  

**FRONTEND** `http://localhost:5173`  
**API BACKEND** `http://localhost:3000/api/`  
**API DOCS** `http://localhost:3000/api/docs`  

## 🗂️ Rutas de la API

#### **GET** `/api/docs`
Permite acceder a la documentacion creada con Swagger para ver de manera grafica los endpoints del servidor

#### **GET** `/api/ping`
Permite recibir un mensaje si el servidor esta funcionando de manera correcta

#### **GET** `/api/projects`
Permite obtener la lista de proyectos guardados en la base de datos.

#### **POST** `/api/projects`
Permite guardar un nuevo proyecto.

**Body requerido (JSON):**
```json
{
  "nombre": "Sistema de monitoreo",
  "descripcion": "Aplicación para seguimiento de proyectos en tiempo real",
  "estado": "En progreso",
  "fechaInicio": "2025-10-01",
  "fechaFin": "2025-12-30"
}
```
---

#### **PUT** `/api/projects/{id}`
Permite actualizar la informacion de un proyecto usando su id

#### **DELETE** `/api/projects/{id}`

Permite borrar la informacion de un proyecto usando su id

#### **GET** `/api/projects/analisis/resumen`
Permite obtener el resultado del analisis generado por la IA de GEMINI sobre los datos de los proyectos que se encuentran en la base de datos

#### **GET** `/api/projects/graficos/estadisticas`
Permite obtener los datos filtrados por estado de los proyectos para mostrarlos graficamente en el frontend

---

## ⚙️ Tecnologías utilizadas

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* Swagger
* nodemon (para desarrollo)
* Google/generative-ai (GEMINI)

### Frontend

* React
* TypeScript
* Vite
* chart.js / react-chartjs-2
* react-hot-toast
* TailwindCSS
* Axios
  
---

## 🛠️Decisiones técnicas

* **Node.js + Express**:  Simplicidad, velocidad, ecosistema versátil
* **Prisma**:  Facilita la comunicación con PostgreSQL y ofrece tipado para TypeScript
* **GEMINI API**:  Facilidad de integración, solución de IA moderna para resúmenes naturales
* **React + Vite: + TypeScript**:  Desarrollo modular y tipado, rápida compilación
* **TailwindCSS**:  Estilo rápido y responsive sin escribir CSS de manera manual
  
---

## 🧠 Notas adicionales

* El archivo `.env` **NO se sube al repositorio** (está en `.gitignore`) en su lugar esta el archivo `.env.example`.
* La variable de entorno `DATABASE_URL` apunta al contenedor de Docker, **NO a una base de datos real**

---

## ✨ Autor

**Javier Roman Osorio**
📧 [[jandres.roman.08@gmail.com](mailto:jandres.roman.08@gmail.com)]
