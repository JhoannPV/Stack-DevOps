## Levantar el stack (Frontend + Backend + MongoDB)

Este repo contiene:
- Frontend (React + Vite + TS): `DevOps-Proyect`
- Backend (Node + Express + MongoDB): `DevOps-Proyect-Bakend`
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
	- Frontend: copiar `.env.template` a `.env` en `DevOps-Proyect/` (trae `VITE_API_URL=http://localhost:3001/api`).
	- Backend: copiar `.env.template` a `.env` en `DevOps-Proyect-Bakend/` y completar:
	  - `PORT=3001`
	  - `JWT_SEED=<clave_hex>` (puedes generar una con `openssl rand -hex 32`)
	  - `MONGO_URL=mongodb://mern_user:israelFovLoVert@mongo-db:27017/`
	  - `MONGO_DB_NAME=calendardb`
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
