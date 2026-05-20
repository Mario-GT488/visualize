# Visualize

Visualize es una aplicación web para guardar, organizar y descubrir inspiración visual mediante publicaciones con imágenes, etiquetas y descripciones.

El proyecto está inspirado en plataformas de mosaico visual, pero con una identidad propia. Su objetivo es integrar frontend, backend, base de datos, consumo de API, control de versiones y despliegue dentro de una sola aplicación web.

El proyecto integra frontend, backend, base de datos, consumo de API externa, control de versiones y almacenamiento local para mejorar la experiencia del usuario. 

## Cosas utilizadas

- React con Vite
- Bootstrap 5.3
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Unsplash API
- Git y GitHub
- sessionStorage
- localStorage

## Arquitectura del proyecto

El proyecto está dividido en dos partes principales: 

- `Frontend`: Aplicación hecha con React. Se encarga de mostrar la interfaz, los formularios, el feed, la sección de descubrimiento y las acciones del usuario.
- `Backend`: API hecha con FastAPI. Se encarga de la lógica del proyecto, la conexión con PostgreSQL y el consumo de la API externa de Unsplash.

Flujo general: 
React -> FastAPI -> PostgreSQL
React -> FastAPI -> Unsplash API

El frontend no se conecta directamente a Unsplash. En su lugar, el backend funciona como intermediario para proteger la API key y regresar al frontend solamente los datos necesarios. 

## Funcionalidades implementadas

### Backend

- Endpoint de salud para verificar que la API esté funcionando.
- CRUD completo de posts:
    - Crear posts
    - Listar posts
    - Consultar post por id
    - Editar post
    - Eliminar post
- Validación de datos con Pydantic.
- Conexión a PostgreSQL con SQLAlchemy.
- Protección básica de edición y eliminación mediante el header "X-User".
- Endpoint de discovery conectado a Unsplash.

### Frontend

- Visualización del feed de posts.
- Formulario para crear posts.
- Edición de posts desde la interfaz.
- Eliminación de posts desde la interfaz. 
- Control de usuario actual con sessionStorage.
- Cache del feed con localStorage.
- Fallback visual si la API no está disponible.
- Búsqueda de imágenes desde Unsplash.
- Guardado de imágenes descubiertas como posts.
- Paginación del feed con botones de anterior y siguiente.
- Estado vacío cuando no hay posts.
- Interfaz mejorada con Bootstrap.

## Variables de entorno

El backend usa un archivo .env dentro de la carpeta backend.

Ejemplo:

DATABASE_URL=postgresql:///visualize_db
UNSPLASH_ACCESS_KEY=tu_access_key

## Cómo correr el backend
- cd backend
- python -m venv myenv
- source myenv/bin/activate
- pip install -r requirements.txt
- uvicorn app.main:app --reload

La API corre en: http://127.0.0.1:8000

El swagger corre en: http://127.0.0.1:8000/docs

## Cómo correr el frontend

- cd frontend
- npm install
- npm run dev

El frontend corre en: http://localhost:5173

## Decisiones técnicas importantes

### FastAPI

Se utilizó FastAPI porque permite construir una API REST de forma clara y rápida. Además, genera documentación automática con Swagger, lo cual facilita probar los endpoints durante el desarrollo.

### PostgreSQL

Se utilizó PostgreSQL para persistir los posts de la aplicación. Esto permite que la información no dependa únicamente del frontend y se mantenga guardada aunque se cierre la aplicación.

### SQLAlchemy

SQLAlchemy se utilizó para conectar Python con PostgreSQL usando modelos. En este proyecto se usa para definir la tabla `posts` y realizar operaciones de creación, consulta, edición y eliminación.

### Pydantic

Pydantic se utilizó para definir los esquemas de entrada y salida de datos. Esto ayuda a validar la información que recibe y regresa la API.

### Unsplash API

Unsplash se integró como API externa para permitir que el usuario descubra imágenes de inspiración. La API key se guarda en el backend mediante variables de entorno para evitar exponerla en el frontend.

### Header X-User

El header `X-User` se utiliza para identificar al usuario que realiza una petición. Cuando se crea un post, el backend guarda ese usuario en el campo `created_by`.

Para editar o eliminar un post, el backend compara el valor de `X-User` con `created_by`. Si no coinciden, la operación no se permite.

### sessionStorage

`sessionStorage` se usa para guardar el usuario actual durante la sesión del navegador. Esto permite que el frontend sepa qué usuario está creando, editando o eliminando posts.

### localStorage

`localStorage` se usa para guardar una copia del feed. Si la API no está disponible, la app puede mostrar datos guardados localmente como fallback.

### Paginación

El feed usa los parámetros `page` y `limit` para no cargar todos los posts al mismo tiempo. Esto ayuda a organizar mejor los datos y prepara la aplicación para crecer.

## Flujo de trabajo con Git

El proyecto se trabajó usando ramas por funcionalidad. Cada cambio importante se hizo en una rama separada y después se integró a `main` mediante pull request.

## Demo sugerida

Para presentar el proyecto se puede seguir este flujo:

1. Mostrar la pantalla principal de Visualize.
2. Guardar un usuario actual.
3. Crear un post manualmente.
4. Editar el post creado.
5. Eliminar un post.
6. Buscar imágenes en la sección de discovery.
7. Guardar una imagen de Unsplash como post.
8. Navegar el feed usando paginación.
9. Apagar temporalmente la API para mostrar el fallback con `localStorage`.

## Estado actual del proyecto

Actualmente Visualize permite crear, consultar, editar y eliminar posts visuales, buscar inspiración desde Unsplash, guardar imágenes descubiertas en la base de datos, navegar el feed por páginas y mantener una copia local del contenido en caso de errores de conexión.

## Autores

- Mario García

## Despliegue

Frontend desplegado en Vercel:

https://visualize-git-nine.vercel.app

Backend desplegado en Render:

https://visualize-api-5vqf.onrender.com

Documentación Swagger del backend:

https://visualize-api-5vqf.onrender.com/docs

Health endpoint:

https://visualize-api-5vqf.onrender.com/health