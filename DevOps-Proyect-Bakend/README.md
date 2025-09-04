# BACKEND MERN - CALENDAR
Este es el repositorio del backend de una aplicación de calendario desarrollada con la pila MERN (MongoDB, Express, React, Node.js). Esta aplicación permite a los usuarios gestionar eventos y citas de manera eficiente.

# Características
Este backend se conecta a una base de datos MongoDB para almacenar y gestionar los datos de los usuarios y sus eventos.
Proporciona una API RESTful para interactuar con la aplicación frontend.
Implementa autenticación y autorización de usuarios utilizando JSON Web Tokens (JWT).
# Requisitos Previos
Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente en tu máquina:
Node.js (versión 14 o superior)
npm (Node Package Manager)
MongoDB (puede ser una instancia local o un servicio en la nube como MongoDB Atlas)
Docker (opcional, para ejecutar la aplicación en un contenedor)
# Instalación
Clona este repositorio en tu máquina local
__git clone https://github.com/JhoannPV/DevOps-Proyect-Backend.git__
Navega al directorio del proyecto
__cd DevOps-Proyect-Backend__
Instala las dependencias del proyecto
__npm install__
Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias (puerto, URL de la base de datos, nombre de la base de datos, clave secreta para JWT). Puedes usar el archivo .env.template como referencia. Donde puse las variables de entorno en comentarios para la base de datos en MongoDB, las cual puedes usar perefectamente.

Para generear la clave secreta para JWT, puedes usar el siguiente comando en LInux o Git Bash en Windows:
__openssl rand -hex 32__

# Build y Run
Para construir y ejecutar la aplicación, usa el siguiente comando:
__npm run build_
__npm start__


# Si queres ejecutar la aplicación y la Base de Datos en un contenedor Docker, asegúrate de tener Docker instalado y sigue los pasos a continuación.
# Construcción de la Imagen Docker y creación del Contenedor
Para construir la imagen Docker del backend, la base de datos MongoDB y crear los contenedores, y que se ejecuten automáticamente, usa el siguiente comando:
__docker compose up -d__