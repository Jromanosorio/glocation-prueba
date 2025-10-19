# Imagen base ligera de Node.js
FROM node:22.20-alpine

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

# Proporcionar permisos al script
RUN chmod +x ./entrypoint.sh

# Puerto del servidor
EXPOSE 3000

CMD ["sh", "-c", "./entrypoint.sh"]