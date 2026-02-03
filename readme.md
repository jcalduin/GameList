# 🎮 GameList - Sistema de Gestión de Videojuegos

![Status](https://img.shields.io/badge/Estado-Terminado-success?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-v14+-green?style=flat-square)
![Express](https://img.shields.io/badge/Express-v4-lightgrey?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5-purple?style=flat-square)

**GameList** es una aplicación web para gestionar tu colección personal de videojuegos. Permite registrar tus títulos, organizarlos por plataforma y género, y hacer un seguimiento del estado de progreso de cada juego.

Desarrollada con **Node.js**, **Express** y **SQLite**, ofrece una interfaz moderna, robusta y *responsive* utilizando **Bootstrap 5**.

---

## ✨ Características Principales

* **🔐 Autenticación de Usuarios:** Registro e inicio de sesión seguros con gestión de sesiones.
* **📚 Gestión de Colección:** Añade, edita y elimina videojuegos de tu biblioteca personal.
* **🏷️ Clasificación Avanzada:**
    * **Plataforma:** PC, PlayStation, Xbox, Switch.
    * **Género:** Acción, Aventura, RPG, Deportes, Estrategia, Puzzle, Shooter, Simulación, Terror.
    * **Estado:** Pendiente, Jugando, Completado, Abandonado.
* **🔍 Sistema de Filtros Inteligente:** Busca rápidamente tus juegos combinando múltiples filtros (SQL dinámico).
* **📱 Interfaz Responsive:** Diseño adaptable ("Mobile First") para desktop, tablet y móvil.
* **🧠 Persistencia de Filtros:** La aplicación recuerda tus filtros activos incluso después de editar un juego, mejorando la experiencia de usuario.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS, Bootstrap 5, JavaScript Vanilla |
| **Base de Datos** | SQLite (`better-sqlite3`) |
| **Autenticación** | Express Sessions |
| **Estilo** | CSS3, Bootstrap Icons |
| **Arquitectura** | MVC + DAO (Data Access Object) |

---

## 📁 Estructura del Proyecto

```text
GameList/
├── bin/
│   └── www               # Punto de entrada del servidor
├── database/
│   ├── database.db       # Archivo de Base de Datos SQLite
│   ├── Database.js       # Clase Singleton de conexión
│   ├── usuario-dao.js    # DAO de Usuarios
│   └── juegos-dao.js     # DAO de Videojuegos
├── middlewares/
│   └── auth.js           # Middleware de protección de rutas
├── public/
│   ├── images/           # Recursos gráficos
│   ├── javascripts/
│   │   └── acciones.js   # Lógica cliente (validaciones, modales)
│   └── stylesheets/
│       └── style.css     # Estilos personalizados
├── routes/
│   └── index.js          # Router principal (Rutas públicas y privadas)
├── views/
│   ├── partials/         # Componentes (navbar, footer)
│   ├── index.ejs         # Landing page (Login Modal)
│   ├── registro.ejs      # Formulario de registro
│   ├── perfil.ejs        # Dashboard y lista de juegos
│   ├── nuevo-juego.ejs   # Formulario de creación
│   ├── editar.ejs        # Formulario de edición
│   └── layout.ejs        # Plantilla base
├── app.js                # Configuración de Express
└── package.json          # Dependencias y scripts

🚀 Instalación y Configuración

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
Abre tu navegador en http://localhost:3000

---

## 📖 Guía de Uso

### 1. Página de Inicio (/)
- Carrusel interactivo con características principales
- Acceso rápido a registro e inicio de sesión

### 2. Registro (/registro)
- Validación de contraseñas coincidentes
- Prevención de usuarios/emails duplicados

### 3. Inicio de Sesión
- Modal integrado en el Navbar
- Gestión de sesiones seguras y mensajes de error si fallan las credenciales

### 4. Perfil del Usuario (/perfil)
- **Ver colección:** Visualización en tarjetas con badges de estado
- **Filtros:** Barra lateral para filtrar por Plataforma, Género o Estado
- **Acciones:** Botones para Editar (✏️) o Eliminar (🗑️) cada juego

### 5. Gestión de Juegos (/nuevo-juego, /editar, /eliminar)
- Formularios validados con Bootstrap
- **Persistencia:** Al editar, el sistema recuerda en qué filtro estabas y te devuelve allí
- **Seguridad:** Confirmación mediante modal antes de eliminar un registro

---

## 🗄️ Esquema de Base de Datos

### Tabla: usuarios

| Campo | Tipo | Restricciones |
| :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| email | TEXT | UNIQUE, NOT NULL |
| password | TEXT | NOT NULL |
| nickname | TEXT | NOT NULL |

**👤 Usuario de Prueba:**
- Email: user1@example.com
- Contraseña: password123
- Nickname: user1

### Tabla: videojuegos

| Campo | Tipo | Restricciones |
| :--- | :--- | :--- |
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| titulo | TEXT | NOT NULL |
| plataforma | TEXT | CHECK (PC, PlayStation, Xbox, Switch) |
| genero | TEXT | CHECK (Acción, RPG, etc...) |
| estado | TEXT | CHECK (Pendiente, Jugando, Completado, Abandonado) |
| imagen | TEXT | URL de la imagen |
| usuario_id | INTEGER | FOREIGN KEY (ref usuarios.id) |

---

## 🔐 Arquitectura y Seguridad

### Autenticación
- Uso de Express Sessions con cookie de 24 horas
- Middleware auth.js que protege rutas privadas redirigiendo a home si no hay sesión
- Variables locales `res.locals.user` disponibles en todas las vistas

### Validación
- **Frontend:** Bootstrap validation y scripts personalizados
- **Backend:** Verificación de duplicados y datos obligatorios
- **Database:** Restricciones CHECK y FOREIGN KEY activas

### Privacidad
- Cada usuario solo tiene acceso a sus propios juegos
- Eliminación en cascada: Si se borra un usuario, se borra su colección

---

## 📊 Funcionalidades Avanzadas

### Sistema de Filtros Inteligente
El sistema permite consultas dinámicas SQL. Los filtros seleccionados se mantienen en la URL (Query Params), permitiendo compartir el estado de la búsqueda o volver atrás sin perder el contexto.

### Patrón DAO
Toda la lógica de base de datos está encapsulada en `usuario-dao.js` y `juegos-dao.js`, separando la capa de datos de la capa de control, facilitando mantenimiento y escalabilidad.

---

## 📝 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de producción |
| `npm run dev` | Inicia el servidor con nodemon |

---

## 🚧 Mejoras Futuras Sugeridas

- [ ] 🔐 Hash de contraseñas con bcrypt
- [ ] 📧 Confirmación de email real
- [ ] 👥 Perfiles públicos compartibles
- [ ] ⭐ Sistema de puntuación/reseñas
- [ ] 🌙 Modo oscuro (Dark Mode)

---

## 📧 Contacto y Créditos

**Desarrollado por:** Javier Cabrera  
**Asignatura:** Interfaces Web (2º DAW)  
**Año:** 2026

© 2026 GameList. Todos los derechos reservados.
```