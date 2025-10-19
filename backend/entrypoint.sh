#!/bin/sh
set -e

# Si no existe la carpeta de migraciones, crea una inicial
if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations)" ]; then
  echo "No se encontraron migraciones, creando inicial..."
  npx prisma migrate dev --name init
else
  echo "Migraciones existentes detectadas, aplicando..."
  npx prisma migrate deploy
fi

# Genera el cliente de Prisma (Si hubo algun cambio)
npx prisma generate

# Ejecutar el servidor
npm run dev
