FROM node:18-alpine
RUN npm install -g http-server
WORKDIR /usr/src/app

# ARG para la URL del backend
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

COPY . .

# Reemplaza el placeholder en script.js antes de levantar el servidor
RUN sed -i 's|__BACKEND_URL__|'"$BACKEND_URL"'|g' script.js

EXPOSE 80
CMD ["http-server", "-p", "80", "-c-1"]
