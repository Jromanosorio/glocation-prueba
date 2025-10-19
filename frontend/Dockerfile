# Imagen base ligera de Node.js
FROM node:22.20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

# Puerto de Vite
EXPOSE 5173

# Iniciar Vite
# --host permite acceso desde fuera del contenedor
CMD ["npm run dev -- --host"]
