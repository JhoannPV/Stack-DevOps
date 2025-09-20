## Levantar el stack (Frontend + Backend + MongoDB)

Este repo contiene:
- Frontend (React + Vite + TS): `DevOps-Proyect`
- Backend (Node + TS + Express + MongoDB): `DevOps-Proyect-Bakend`
- Orquestación con Docker Compose: `docker-compose.yml`

Puertos por defecto:
- Frontend: 3000 (Docker) / 5173 (desarrollo local)
- Backend: 3001
- MongoDB: 27017

### Requisitos
- Opción A (recomendada): Docker y Docker Compose
- Opción B (local): Node 18+ (ideal 22.x), npm, Yarn (Corepack) y MongoDB

### Opción A: Docker Compose (todo en contenedores)
1) Crear variables de entorno
	- Copia `.env.template` a `.env` en la raíz (donde está `docker-compose.yml`) y ajusta las variables:
		- `MONGO_INITDB_USERNAME` y `MONGO_INITDB_PASSWORD`: credenciales para el usuario admin de Mongo.
		- `MONGO_DB_NAME`: nombre de la base de datos que usará el backend.
	- Opcionalmente, puedes copiar `.env.template` a `.env` dentro de `DevOps-Proyect-Bakend/` para tener las mismas variables ahí (no es obligatorio, ya que las pasamos desde el Compose).
		- Ajusta `MONGO_URL` si cambiaste usuario/contraseña/nombre DB.
		- Genera un valor seguro para `JWT_SEED` (ejemplo: `openssl rand -hex 32`).
	- Asegúrate que en `DevOps-Proyect/.env` el valor de `VITE_API_URL` sea `/api` (ya está así en el template).

Para efectos de prueba decidi incluir los archivos `.env` en el repo, pero en un entorno real no deberías subirlos a Git.

2) Levantar servicios
	- Ejecuta: `docker compose up -d`
3) Verificar
	- Frontend: http://localhost:3000
	- Backend health: http://localhost:3001/
	- Logs: `docker compose logs -f devops-backend` / `devops-frontend`
4) Detener / reconstruir
	- Detener: `docker compose down`
	- Rebuild si cambiaste `.env` o código: `docker compose up -d --build`

Notas:
- Mongo persiste datos en `DevOps-Proyect-Bakend/mongo/` (mapeado como volumen).
- El backend espera conectarse al host `mongo-db` dentro de la red de Docker.

### Opción B: Desarrollo local (sin contenedores)
Backend:
1) `cd DevOps-Proyect-Bakend`
2) Copia `.env.template` a `.env` y ajusta:
	- Si usas Mongo del Compose en tu máquina: inicia solo la DB con `docker compose up -d mongo-db` y usa `MONGO_URL=mongodb://mern_user:israelFovLoVert@localhost:27017/` y `MONGO_DB_NAME=calendardb`.
	- Genera `JWT_SEED` (`openssl rand -hex 32`).
3) `npm install`
4) Compila y ejecuta: `npm run build` y luego `npm start` (o `npm run dev` con ts-node/nodemon).

Frontend:
1) `cd DevOps-Proyect`
2) Copia `.env.template` a `.env` (o asegúrate de `VITE_API_URL=http://localhost:3001/api`).
3) Habilita Yarn (Corepack) si hace falta: `corepack enable`.
4) `yarn install`
5) `yarn dev` y abre http://localhost:5173

### Problemas comunes
- 401/403: revisa `JWT_SEED` del backend y login en el frontend.
- 500 DB: confirma `MONGO_URL` y que Mongo esté arriba (`docker compose ps`, `logs`).
- CORS/API: verifica que `VITE_API_URL` apunte a `http://localhost:3001/api` en desarrollo local.

## Red y comunicación entre servicios (Docker Compose)

Para que el frontend no use `localhost` y pueda resolver al backend por nombre de servicio dentro de Docker, se configuró una red de usuario y un proxy en Nginx:

- Red de usuario: `app-net` (tipo `bridge`). Todos los servicios (`mongo-db`, `devops-backend`, `devops-frontend`) están conectados a esta red.
- Alias de servicio: el backend (`devops-backend`) tiene el alias `backend`. Otros contenedores pueden resolver `http://backend:3001` dentro de la red.
- Proxy en Nginx (frontend): en `DevOps-Proyect/default.conf` existe un bloque `location /api/` que hace `proxy_pass http://backend:3001`. Así, el navegador consume `http://localhost:3000/api/...` y Nginx reenvía internamente al backend.

Importante:
- El hostname `backend` solo existe dentro de la red Docker. El navegador de tu host no puede resolver `backend`. Por eso, en contenedores usamos proxy `/api` en el frontend y `VITE_API_URL=/api`.
- En desarrollo local sin Docker, debes usar `VITE_API_URL=http://localhost:3001/api` y levantar el backend localmente.

### Cambios aplicados
- `docker-compose.yml`:
	- Creada red `app-net` y conectados los servicios.
	- Añadido alias `backend` al servicio `devops-backend`.
- `DevOps-Proyect/default.conf` (Nginx del frontend):
	- Añadido bloque `location /api/ { proxy_pass http://backend:3001; ... }`.
- `DevOps-Proyect/.env` (frontend):
	- Ajustado `VITE_API_URL=/api` para entornos con Docker.
