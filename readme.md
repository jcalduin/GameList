# 🎮 GameList - Sistema de Gestión de Videojuegos

![Status](https://img.shields.io/badge/Estado-Terminado-success?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-v14+-green?style=flat-square)
![Express](https://img.shields.io/badge/Express-v4-lightgrey?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3-purple?style=flat-square)

**GameList** es una aplicación web para gestionar tu colección personal de videojuegos. Permite registrar tus títulos, organizarlos por plataforma y género, hacer un seguimiento del estado de progreso y marcar tus juegos favoritos.

Desarrollada con **Node.js**, **Express** y **SQLite**, ofrece una interfaz moderna y *responsive* con carga dinámica mediante **AJAX**, notificaciones con **SweetAlert2** y arquitectura modular con **ES Modules**.

---

## 🚀 Demo en Vivo
Puedes acceder a la aplicación desplegada aquí:  
🔗 **[https://gamelist-jcalduin.onrender.com](https://gamelist-sxd3.onrender.com)** *(Nota: Al usar el plan gratuito de Render, la primera carga puede tardar unos segundos si el servidor estaba inactivo).*

---

## ✨ Características Principales

* **🔐 Autenticación de Usuarios:** Registro e inicio de sesión seguros con gestión de sesiones y login vía modal.
* **📚 Gestión de Colección:** Añade, edita y elimina videojuegos de tu biblioteca personal mediante peticiones AJAX asíncronas (sin recargar la página).
* **🏷️ Clasificación Avanzada:**
    * **Plataforma:** PC, PlayStation, Xbox, Switch.
    * **Género:** Acción, Aventura, RPG, Deportes, Estrategia, Puzzle, Shooter, Simulación, Terror.
    * **Estado:** Pendiente, Jugando, Completado, Abandonado.
* **🔍 Sistema de Filtros Dinámico:** Filtra tus juegos combinando Plataforma, Género y Estado. Los filtros consultan la API REST en tiempo real (SQL dinámico en backend).
* **⭐ Sistema de Favoritos:** Marca juegos como favoritos con un icono de estrella. Los favoritos se almacenan en `localStorage` por usuario y persisten entre sesiones. Incluye un switch para mostrar solo los juegos favoritos, con preferencia de visualización también persistida.
* **🔔 Notificaciones Interactivas:** Alertas de éxito y error con SweetAlert2 para todas las operaciones (crear, editar, eliminar, login, registro).
* **📱 Interfaz Responsive:** Diseño adaptable ("Mobile First") para desktop, tablet y móvil.
* **🧠 Persistencia de Filtros en Edición:** Al editar un juego, el sistema recuerda la URL de origen (con filtros aplicados) y te devuelve allí al terminar.
* **🖼️ Renderizado Dinámico en Cliente:** Las tarjetas de juegos se generan desde un `<template>` HTML clonado y rellenado con JavaScript, evitando recargas completas de página.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS (layout + vistas), Bootstrap 5.3, JavaScript Vanilla (ES Modules) |
| **Base de Datos** | SQLite (`better-sqlite3`) |
| **Autenticación** | Express Sessions (cookie 24h) |
| **Notificaciones** | SweetAlert2 |
| **Estilo** | CSS3 personalizado, Bootstrap Icons |
| **Arquitectura** | MVC + DAO (Data Access Object) + API REST interna |

---

## 📁 Estructura del Proyecto

```text
GameList/
├── bin/
│   └── www                       # Punto de entrada del servidor
├── database/
│   ├── database.db               # Archivo de Base de Datos SQLite (generado)
│   ├── database.js               # Clase Singleton de conexión
│   ├── initialize-usuarios.js    # Script de creación de tabla + datos semilla de usuarios
│   ├── initialize-juegos.js      # Script de creación de tabla + datos semilla de videojuegos
│   ├── usuario-dao.js            # DAO de Usuarios
│   └── juegos-dao.js             # DAO de Videojuegos
├── middlewares/
│   └── auth.js                   # Middleware de autenticación y variables locales
├── public/
│   ├── images/                   # Recursos gráficos (slides, cards)
│   ├── javascripts/
│   │   ├── acciones.js           # Módulo de servicios: FavoritosService + validación de formularios
│   │   └── ajax.js               # Módulo principal: peticiones AJAX, renderizado de tarjetas, delegación de eventos
│   └── stylesheets/
│       └── style.css             # Estilos personalizados (grid layout, carrusel, tarjetas)
├── routes/
│   └── index.js                  # Router principal (rutas públicas, privadas y API REST)
├── views/
│   ├── partials/
│   │   ├── navbar.ejs            # Barra de navegación + Modal de Login
│   │   └── footer.ejs            # Pie de página
│   ├── layout.ejs                # Plantilla base (head, scripts, estructura grid)
│   ├── index.ejs                 # Landing page (carrusel hero + tarjetas de características + sección "Cómo empezar")
│   ├── registro.ejs              # Formulario de registro con validación
│   ├── perfil.ejs                # Dashboard: filtros, switch de favoritos, contenedor de tarjetas + template
│   ├── nuevo-juego.ejs           # Formulario de creación de juego
│   ├── editar.ejs                # Formulario de edición con valores precargados
│   └── error.ejs                 # Vista de errores (404, 500)
├── app.js                        # Configuración de Express (middlewares, sesión, rutas)
└── package.json                  # Dependencias y scripts
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/GameList.git
cd GameList
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm run dev
```
O para producción: `npm start`

4. Acceder:  
Abre tu navegador en `http://localhost:3000`

> **Nota:** La base de datos SQLite (`database.db`) se genera automáticamente en la primera ejecución junto con las tablas y datos semilla.

---

## 📖 Guía de Uso

### 1. Página de Inicio (`/`)
- Carrusel hero interactivo con tres slides que presentan las funcionalidades principales.
- Sección de tarjetas con imágenes de fondo destacando: registrar títulos, marcar progreso y encontrar juegos.
- Sección "¿Cómo empezar?" con los tres pasos para usar la aplicación.
- Si el usuario ya tiene sesión activa, se le redirige automáticamente a `/perfil`.

### 2. Registro (`/registro`)
- Formulario con validación de Bootstrap (`needs-validation`) y verificación personalizada.
- Comprobación en tiempo real de que las contraseñas coinciden (validación frontend con `setCustomValidity`).
- Prevención de nicknames y emails duplicados (validación backend).
- Envío mediante AJAX con notificación SweetAlert2 al completar.

### 3. Inicio de Sesión
- Modal integrado en el Navbar, accesible desde cualquier página.
- Formulario flotante con envío AJAX.
- Gestión de sesiones seguras con mensajes de error específicos (email no encontrado / contraseña incorrecta).

### 4. Perfil del Usuario (`/perfil`)
- **Filtros dinámicos:** Tres selectores (Plataforma, Género, Estado) que consultan la API REST `/api/juegos` cada vez que cambian, sin recargar la página.
- **Tarjetas de juegos:** Renderizadas dinámicamente en el cliente usando un `<template>` HTML. Cada tarjeta muestra: imagen de carátula, título, plataforma/género, badge de estado, icono de favorito (⭐), botón editar y botón eliminar.
- **Sistema de favoritos:** Botón de estrella en cada tarjeta para marcar/desmarcar favoritos (almacenados en `localStorage`). Switch "Mostrar solo favoritos" que filtra visualmente las tarjetas. La preferencia del switch también se persiste en `localStorage` por usuario.
- **Eliminación con confirmación:** Modal de Bootstrap que solicita confirmación antes de eliminar, con envío AJAX y eliminación animada de la tarjeta del DOM (efecto fade).
- **Mensaje vacío:** Si no hay juegos o ninguno coincide con los filtros, se muestra una alerta informativa.

### 5. Añadir Juego (`/nuevo-juego`)
- Formulario con campos: título, plataforma (select), género (select), estado (radio buttons con estilo de grupo) e imagen (URL).
- Envío mediante AJAX con notificación de éxito y redirección automática al perfil.

### 6. Editar Juego (`/editar?id=X`)
- Formulario idéntico al de creación pero con los valores del juego precargados.
- Campo oculto `urlOrigen` que almacena la URL de origen (con filtros aplicados) para redirigir de vuelta al terminar.
- Envío mediante AJAX con notificación de éxito.

---

## 🗄️ Esquema de Base de Datos

### Tabla: `usuarios`

| Campo | Tipo | Restricciones |
| :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| nickname | VARCHAR(150) | UNIQUE, NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |

**👤 Usuario de Prueba (datos semilla):**
- **Nickname:** user1
- **Email:** user1@example.com
- **Contraseña:** password123

### Tabla: `videojuegos`

| Campo | Tipo | Restricciones |
| :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| usuario_id | INTEGER | NOT NULL, FOREIGN KEY → usuarios(id) ON DELETE CASCADE |
| titulo | VARCHAR(255) | NOT NULL |
| plataforma | VARCHAR(255) | CHECK IN ('PC', 'PlayStation', 'Xbox', 'Switch'), NOT NULL |
| genero | VARCHAR(255) | CHECK IN ('Accion', 'Aventura', 'RPG', 'Deportes', 'Estrategia', 'Puzzle', 'Shooter', 'Simulacion', 'Terror') |
| estado | VARCHAR(255) | CHECK IN ('Pendiente', 'Jugando', 'Completado', 'Abandonado'), DEFAULT 'Pendiente' |
| imagen | TEXT | URL de la carátula (opcional) |

**🎮 Datos semilla:** 5 juegos asociados al usuario de prueba (Super Mario Odyssey, Zelda BOTW, Elden Ring, God of War, Hollow Knight).

---

## 🌐 API REST Interna

La aplicación expone un endpoint interno consumido por el frontend mediante `fetch`:

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| GET | `/api/juegos` | Devuelve los juegos del usuario autenticado. Acepta query params: `plataforma`, `genero`, `estado` |
| POST | `/nuevo-juego` | Crea un nuevo juego (body JSON) |
| POST | `/editar/:id` | Actualiza un juego existente (body JSON) |
| POST | `/eliminar/:id` | Elimina un juego por ID |
| POST | `/registro` | Registra un nuevo usuario (body JSON) |
| POST | `/login` | Inicia sesión (body JSON) |

Todas las rutas protegidas devuelven `401` si no hay sesión activa.

---

## 🔐 Arquitectura y Seguridad

### Autenticación
- Uso de Express Sessions con cookie de 24 horas de duración.
- Middleware `auth.js` que establece `res.locals.isLoggedIn` y `res.locals.user` en cada petición, disponibles en todas las vistas EJS.
- Rutas privadas verifican `req.session.user` y redirigen a `/` o devuelven `401 JSON` según el contexto.

### Validación
- **Frontend:** Validación nativa HTML5 + Bootstrap `needs-validation` + verificación personalizada de contraseñas con `setCustomValidity`.
- **Backend:** Verificación de duplicados (email/nickname) y campos obligatorios en las rutas POST.
- **Database:** Restricciones `CHECK`, `UNIQUE`, `NOT NULL` y `FOREIGN KEY` con `ON DELETE CASCADE`.

### Privacidad
- Cada usuario solo puede ver y gestionar sus propios juegos (filtrado por `usuario_id`).
- Eliminación en cascada: si se borra un usuario, se eliminan automáticamente todos sus juegos.

---

## 📊 Funcionalidades Avanzadas

### Carga Dinámica con AJAX
El perfil no recarga la página para mostrar juegos. Al entrar o cambiar un filtro, se realiza una petición `fetch` a `/api/juegos` con los filtros como query params. La respuesta JSON se renderiza en el cliente clonando un `<template>` HTML para cada juego.

### Sistema de Favoritos (localStorage)
Implementado íntegramente en el cliente a través del servicio `FavoritosService` (módulo `acciones.js`):
- Cada usuario tiene su propia lista de IDs favoritos en `localStorage` (clave: `favoritos_usuario_{id}`).
- El estado del switch "Mostrar solo favoritos" también se persiste (clave: `vista_favoritos_usuario_{id}`).
- Al cargar/recargar juegos, se sincroniza el estado visual de las estrellas y la visibilidad de tarjetas.

### Delegación de Eventos
En lugar de añadir event listeners individuales a cada tarjeta (que se crean dinámicamente), se usa un único listener en el contenedor `#contenedor-juegos` que identifica el botón pulsado mediante `event.target.closest()`.

### Patrón DAO (Data Access Object)
Toda la lógica de base de datos está encapsulada en `usuario-dao.js` y `juegos-dao.js`, separando la capa de datos de la capa de control. Cada DAO recibe la instancia de la BD (Singleton) en su constructor.

### Patrón Singleton (Base de Datos)
La clase `Database` impide la instanciación directa y garantiza una única conexión SQLite compartida durante toda la ejecución, inicializando las tablas automáticamente en la primera llamada.

### Arquitectura de JavaScript Modular (ES Modules)
- `acciones.js` exporta `FavoritosService` e `inicializarValidacionFormularios`.
- `ajax.js` importa estos servicios y actúa como controlador principal del lado del cliente: gestiona todos los formularios, la carga de juegos, el renderizado y la delegación de eventos.
- Se carga con `<script type="module">` en el layout.

---

## 📝 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de producción (`node ./bin/www`) |
| `npm run dev` | Inicia el servidor con recarga automática (`nodemon ./bin/www`) |

---

## 📦 Dependencias

| Paquete | Versión | Uso |
| :--- | :--- | :--- |
| express | ^4.22.1 | Framework web |
| ejs | ^4.0.1 | Motor de plantillas |
| express-ejs-layouts | ^2.5.1 | Sistema de layouts para EJS |
| better-sqlite3 | ^12.6.2 | Driver SQLite síncrono |
| express-session | ^1.19.0 | Gestión de sesiones |
| cookie-parser | ~1.4.4 | Parseo de cookies |
| morgan | ^1.10.1 | Logger HTTP |
| http-errors | ~1.6.3 | Creación de errores HTTP |
| debug | ~2.6.9 | Utilidad de depuración |
| **nodemon** (dev) | ^3.1.11 | Recarga automática en desarrollo |

**CDN (cargados en el cliente):**
- Bootstrap 5.3.8 (CSS + JS)
- Bootstrap Icons 1.11.3
- SweetAlert2 v11

---

## 📧 Contacto y Créditos

**Desarrollado por:** Javier Cabrera  
**Asignatura:** Interfaces Web (2º DAW)  
**Año:** 2026

© 2026 GameList. Todos los derechos reservados.