# Definición del Proyecto
Este proyecto tiene como objetivo desarrollar una aplicación web para la gestión de eventos. La aplicación permitirá a los usuarios crear, editar, eliminar y organizar sus eventos de manera eficiente.

# Tecnologías Utilizadas
- **Frontend**: React.js + Vite + Typescript, CSS, HTML, Bootstrap, React Router, FontAwesome, Redux Toolkit, Axios.
- **Backend**: Node.js + Express, MongoDB, Mongoose, JWT para autenticación, usando Clean Architecture.
Este backend no esta directamente conectado al frontend, se ejecuta de manera independiente. y el frontend se conecta a el mediante peticiones HTTP.
- **Despliegue**: Docker, Railway.
- **Control de Versiones**: Git y GitHub.

# Estructura del Proyecto
El proyecto tiene la siguiente estructura de carpetas:

```
/ (raíz del proyecto)
  ├── README.md            # Documentación del proyecto
  ├── package.json         # Dependencias y scripts del proyecto
  ├── tsconfig.json        # Configuración de TypeScript
  ├── vite.config.ts       # Configuración de Vite
  ├── public/              # Archivos públicos (index.html, favicon, etc.)
  ├── index.html           # Archivo HTML principal
  └──src/
    ├── assets/            # Recursos estáticos (imágenes, fuentes, etc.)
    ├── auth/              # Módulo de autenticación
    ├── calendar/          # Módulo de calendario
    ├── helpers/           # Funciones auxiliares
    ├── hooks/             # Custom hooks de React
    ├── routes/            # Definición de rutas de la aplicación
    ├── store/             # Configuración de Redux Toolkit
    ├── styles.css         # Estilos globales
    ├── CalendarApp.tsx    # Componente principal de la aplicación
    └── main.tsx           # Punto de entrada de la aplicación           

```
# Instalación y Ejecución
1. Requisitos previos:
   - Node.js (versión 14 o superior)
   - Yarn (se activa con el Corepack de Node.js)
     Ejemplo para activar Corepack:
     ```bash
      corepack enable
      corepack prepare yarn@stable --activate
     ```

2. Clona el repositorio:
   ```bash
    git clone https://github.com/JhoannPV/DevOps-Proyect.git
    cd DevOps-Proyect
    ```

3. Renombra el archivo `.env.template` a `.env` y ajusta las variables de entorno según sea necesario. Para efectos puedes usar la variable de entorno por defecto que ya esta en el archivo `.env.template`.

4. Instala las dependencias:
   ```bash
    yarn install
   ``` 
5. Ejecuta la aplicación en modo desarrollo:
   ```bash
    yarn dev
   ```
6. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento.

7. Para construir la aplicación para producción:
   ```bash
    yarn build
   ```
8. Para previsualizar la aplicación construida:
   ```bash
    yarn preview
   ```

# ¿Cómo Funciona?

1. Con el boton __+__ puedes crear un nuevo evento.
2. Al hacer click en un evento aparecerá un botón que te permitirá eliminarlo.
3. Si haces doble click en un evento podrás editarlo.
4. Puedes cambiar la vista del calendario entre día, semana, mes y agenda.
5. Los eventos se guardan en el backend y se cargan automáticamente al iniciar sesión.
6. Puedes cerrar sesión con el botón de "Logout" en la esquina superior derecha.
7. Es un calendario compartido, todos los usuarios ven los mismos eventos, pero solo pueden editar o eliminar los eventos que ellos han creado.