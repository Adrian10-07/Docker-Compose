# Imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Copiar el script de espera
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

# Exponer el puerto del backend
EXPOSE 3000

# Esperar MySQL y luego iniciar el servidor
CMD ["sh", "-c", "./wait-for-db.sh db 3306 30 && node server.js"]
