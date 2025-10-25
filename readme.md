# Proyecto Docker - Notas (Ángel Adrián Hernández)

##  Descripción
Este entorno levanta una aplicación compuesta por tres servicios:
1. **Frontend (adrian_frontend)** — interfaz web accesible en el puerto `80`.
2. **Backend (adrian_backend)** — API REST en el puerto `8000`.
3. **Base de datos (adrian_db)** — servicio MySQL persistente.

Todos los contenedores están conectados mediante una **red interna personalizada (`adrian_network`)** para comunicarse por nombre.

---

##  Requisitos
Antes de levantar el entorno, asegúrate de tener:
- **Docker** y **Docker Compose** instalados.
- Acceso al repositorio del proyecto.

Pasos iniciales:
```bash
git clone <URL_REPOSITORIO>
cd <carpeta_proyecto>
Luego, crea un archivo .env en la raíz del proyecto con las siguientes variables:

env
Copy code
DB_HOST=db
DB_USER=root
DB_PASSWORD=
DB_NAME=notasangelsanchez
DB_ROOT_PASSWORD=
API_PORT=3000

Ejecuta el siguiente comando para construir y levantar todos los servicios:

docker-compose up -d --build


Este comando:

Crea los contenedores.

Configura la red interna adrian_network.

Aplica volúmenes persistentes para la base de datos.

Arranca los servicios en el orden correcto usando depends_on.

Una vez levantado el entorno, podrás acceder desde tu navegador o cliente HTTP:

Frontend:
http://<IP-EC2>

Backend:
http://<IP-EC2>:8000

Endpoint personalizado (Apellido):
http://<IP-EC2>:8000/adrian

Los contenedores se comunican entre sí a través de la red interna adrian_network:

El frontend accede al backend como http://adrian_backend:3000

El backend se conecta a la base de datos usando el host db

Gracias a esta red, los servicios se reconocen por nombre y no por IP.

 Persistencia

El servicio de base de datos MySQL utiliza un volumen para mantener los datos incluso si el contenedor se elimina o reinicia:

volumes:
  - mysql_data:/var/lib/mysql

Orden de arranque

El archivo docker-compose.yml utiliza depends_on para garantizar que:

La base de datos se inicie primero.

El backend espere hasta que MySQL esté saludable.

El frontend se levante una vez que la API esté lista.


Comandos útiles

Detener todos los servicios:

docker-compose down


Eliminar también los volúmenes (base de datos incluida):

docker-compose down -v


Ver los logs en tiempo real:

docker-compose logs -f


Reiniciar servicios tras un cambio:

docker-compose up -d --build