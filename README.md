# Visualize

Visualize es una aplicación web para guardar, organizar y descubrir inspiración visual mediante publicaciones con imágenes, etiquetas y descripciones.

El proyecto está inspirado en plataformas de mosaico visual, pero con una identidad propia. Su objetivo es integrar frontend, backend, base de datos, consumo de API, control de versiones y despliegue dentro de una sola aplicación web.

## Cosas utilizadas

- React con Vite
- Bootstrap 5.3
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Git y GitHub
- API externa: Unsplash

## Estado actual

Actualmente el proyecto cuenta con:

- Estructura inicial de frontend y backend.
- Backend con FastAPI.
- Conexión a PostgreSQL usando SQLAlchemy.
- Modelo principal `Post`.
- CRUD completo de posts.
- Validación de permisos mediante el header `X-User`.