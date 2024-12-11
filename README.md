
# Préstamo de libros (frontend React)

![demo](./images/video.gif)

Esta aplicación sirve para mostrar la integración de un frontend contra una API que puede estar hecha en cualquier tecnología.

## Objetivo

Permitir que una institución gestione los préstamos de libros, por eso los casos de uso que necesitamos son:

- Generar un préstamo
- Devolver un libro, visualizando los préstamos pendientes de las personas

## Apunte

- [Apunte con la explicación completa del modelado](https://docs.google.com/document/d/1kLAsruPYKZBNB0zi40_ORYavt_daQzEpaz2tf6pB6zw/edit?usp=sharing)
## Interacción con el backend

A continuación describiremos las llamadas a API que utiliza este proyecto

- Página principal: Préstamos pendientes
  - `GET /prestamos`: devuelve los préstamos pendientes (que todavía no fueron devueltos)
  - `PATCH /prestamos`: en el body recibe un préstamo y lo marca como devuelto
- Página Nuevo préstamo
  - `GET /libros`: devuelve los libros disponibles en el sistema
  - `GET /personas`: devuelve las personas activas
  - `POST /prestamos`: en el body recibe un préstamo y lo crea

Para ver el modelo más en detalle, recomendamos navegar la carpeta [domain](./src/domain)

