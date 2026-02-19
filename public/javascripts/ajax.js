/**
 * Archivo para gestionar todas las peticiones AJAX de la aplicación 
*/

import { FavoritosService , inicializarValidacionFormularios } from "./acciones.js";  

document.addEventListener('DOMContentLoaded', () => {

    inicializarValidacionFormularios(); // inicializamos la validación de formularios al cargar la página

    // funcion de utilidad para no escribir fetch con el mismo bloque de codigo por cada accion
    async function enviarDatos(url, cuerpo = null) {
        const opciones = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        // Si le pasamos datos, los metemos en el cuerpo del fetch
        if (cuerpo) {
            opciones.body = JSON.stringify(cuerpo);
        }

        const respuesta = await fetch(url, opciones);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error en la operación');
        }

        return datos;
    }

    // Eliminar juego
    const formEliminar = document.querySelector('#formEliminar');
    if (formEliminar) {
        formEliminar.addEventListener('submit', async function (event) {
            event.preventDefault(); // Detener recarga

            const urlDestino = this.action;
            const idJuego = urlDestino.split('/').pop(); // Extraer el ID del juego de la URL eliminar/{id}

            const modalElement = document.querySelector('#confirmarEliminar');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide(); // Cerrar el modal

            try {
                const datos = await enviarDatos(urlDestino);

                // Alerta de éxito compacta
                Swal.fire({
                    title: '¡Hecho!',
                    text: datos.mensaje,
                    icon: 'success',
                    timer: 1200,
                    showConfirmButton: false,
                    width: '350px' 
                });

                // Eliminar la tarjeta del DOM con efecto suave
                const tarjeta = document.querySelector(`.tarjeta-juego[data-juego-id="${idJuego}"]`);
                if (tarjeta) {
                    tarjeta.classList.add('fade');
                    setTimeout(() => tarjeta.remove(), 400);
                }

            } catch (error) {
                
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    width: '350px'
                });
            }
        });
    }

    // añadir juego
    const formNuevoJuego = document.querySelector('#formNuevoJuego');
    if (formNuevoJuego) {
        formNuevoJuego.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(this); // recogemos todos los datos del formulario
            const datosForm = Object.fromEntries(formData.entries()); // convertimos a objeto para enviar al servidor

            try {

                const resultado = await enviarDatos(this.action, datosForm);

                await Swal.fire({
                    title: '¡Juego añadido!',
                    text: resultado.mensaje,
                    icon: 'success',
                    timer: 1200,
                    width: '350px',
                    showConfirmButton: false
                });

                window.location.href = '/perfil'; // redirigimos al perfil para que se vea el nuevo juego añadido

            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    width: '350px'
                });
            }

        });
    }

    // editar juego
    const formEditarJuego = document.querySelector('#formEditarJuego');
    if (formEditarJuego) {
        formEditarJuego.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(this); 
            const datosForm = Object.fromEntries(formData.entries());

            try {

                const resultado = await enviarDatos(this.action, datosForm);

                await Swal.fire({
                    title: '¡Juego actualizado!',
                    text: resultado.mensaje,
                    icon: 'success',
                    timer: 1200,
                    width: '350px',
                    showConfirmButton: false
                });

                const destino = datosForm.urlOrigen || '/perfil'; // si el formulario incluye una URL de origen, redirigimos a esa, sino al perfil
                window.location.href = destino;

            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    width: '350px'
                });
            }

        });
    }

    // formulario de registro
    const formRegistro = document.querySelector('#formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', async function (event) {

            event.preventDefault();

            if (!this.checkValidity()) {
                event.stopPropagation();
                return;
            }

            const formData = new FormData(this);
            const datosForm = Object.fromEntries(formData.entries());

            try {

                const resultado = await enviarDatos(this.action, datosForm);

                await Swal.fire({
                    title: '¡Registro exitoso!',
                    text: resultado.mensaje,
                    icon: 'success',
                    timer: 1500,
                    width: '350px',
                    showConfirmButton: false
                });

                window.location.href = '/'; // redirigimos al inicio para que el usuario inicie sesión después de registrarse

            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    width: '350px'
                });
            }

        });
    }

    // formulario de login
    const formLogin = document.querySelector('#formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', async function (event) {

            event.preventDefault();

            const formData = new FormData(this);
            const datosForm = Object.fromEntries(formData.entries());

            try {

                const resultado = await enviarDatos(this.action, datosForm);

                await Swal.fire({
                    title: '¡Bienvenido!',
                    text: resultado.mensaje,
                    icon: 'success',
                    timer: 1200,
                    width: '350px',
                    showConfirmButton: false
                });

                window.location.href = '/perfil'; // redirigimos al perfil después de iniciar sesión
                
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    width: '350px'
                });
            }

        });
    }

    // Actualizar las estrellas y el filtro visual de favoritos al cargar la página
    function actualizarEstadoFavoritos() {
        const switchFavoritos = document.querySelector('#verFavoritos');
        const verSoloFavoritos = switchFavoritos ? switchFavoritos.checked : false; // Si el switch no existe, asumimos que no queremos filtrar por favoritos

        document.querySelectorAll('.tarjeta-juego').forEach(tarjeta => {
            const juegoId = tarjeta.dataset.juegoId;
            const esFav = FavoritosService.esFavorito(juegoId);
            const iconoFavorito = tarjeta.querySelector('.icono-estrella');

            // Pintamos la estrella llena o vacía según si es favorito o no, y añadimos clase de color si es favorito
            if (esFav) {
                iconoFavorito.classList.replace('bi-star', 'bi-star-fill');
                iconoFavorito.classList.add('text-warning');
            } else {
                iconoFavorito.classList.replace('bi-star-fill', 'bi-star');
                iconoFavorito.classList.remove('text-warning');
            }

            // ocultar juegos no favs si el switch está activado
            if (verSoloFavoritos && !esFav) {
                tarjeta.classList.add('d-none');
            } else {
                tarjeta.classList.remove('d-none');
            }
        });
    }

    /**
     * Pintor de tarjetas
     * Se recibe un array de juegos y de renderiza cada juego en el contenedor de juegos del perfil
    */
    function renderizarJuegos(listaJuegos) {
        const contenedor = document.querySelector('#contenedor-juegos');
        const plantilla = document.querySelector('#plantilla-juego');
        const mensajeVacio = document.querySelector('#mensaje-vacio');

        contenedor.innerHTML = ''; // Limpiar contenedor antes de renderizar

        if (listaJuegos.length === 0) {
            mensajeVacio.classList.remove('d-none');
            return;
        }

        mensajeVacio.classList.add('d-none'); // Ocultar mensaje de vacío si hay juegos

        listaJuegos.forEach(juego => {
            const clon = plantilla.content.cloneNode(true);

            // rellenamos el template
            clon.querySelector('.tarjeta-juego').dataset.juegoId = juego.id;
            clon.querySelector('.card-img-top').src = juego.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen';
            clon.querySelector('.js-titulo').textContent = juego.titulo;
            clon.querySelector('.js-plataforma-genero').textContent = `${juego.plataforma} • ${juego.genero}`;
            clon.querySelector('.js-estado').textContent = juego.estado;

            clon.querySelector('.js-link-editar').href = `/editar?id=${juego.id}`;

            const btnEliminar = clon.querySelector('.btn-eliminar');
            btnEliminar.dataset.juegoId = juego.id; // guardamos el id del juego en un atributo data para usarlo luego al eliminar
            btnEliminar.dataset.juegoTitulo = juego.titulo; // guardamos el titulo del juego para mostrarlo en el modal de confirmacion

            contenedor.appendChild(clon);

        });

        actualizarEstadoFavoritos(); // Una vez pintadas todas, aplicamos las estrellas correctas
    }

    // Cargamos juegos en el perfil desde la llamada a la api al cargar la página
    async function cargarJuegos() {
        const plataforma = document.querySelector('#filtro-plataforma').value;
        const genero = document.querySelector('#filtro-genero').value;
        const estado = document.querySelector('#filtro-estado').value;

        const params = new URLSearchParams();
        if (plataforma) params.append('plataforma', plataforma);
        if (genero) params.append('genero', genero);
        if (estado) params.append('estado', estado);

        try {

            const respuesta = await fetch(`/api/juegos?${params.toString()}`, {
                headers : { 'Accept': 'application/json' } // le confirmamos al servidor que queremos una respuesta en formato JSON
            });

            if (!respuesta.ok) throw new Error('Error al conectar con la API');

            const juegos = await respuesta.json();
            renderizarJuegos(juegos);
  
        } catch (error) {
            console.error('Error al cargar juegos:', error);
        }
    }

    // inicializamos la carga de juegos al entrar en el perfil y eventos del perfil
    // DELEGACIÓN DE EVENTOS: en vez de poner un event listener a cada botón de favorito y eliminar, lo ponemos al contenedor de juegos y luego comprobamos a qué botón se ha hecho click para ejecutar la acción correspondiente. Así evitamos tener que añadir y eliminar event listeners cada vez que pintamos los juegos.
    const contenedorJuegos = document.querySelector('#contenedor-juegos');
    if (contenedorJuegos) {

        // Al cargar la página, comprobamos si el usuario tiene guardada una preferencia para ver solo favoritos y aplicamos esa preferencia al switch y a la visualización de juegos
        const switchFavoritos = document.querySelector('#verFavoritos');
        const userId = document.querySelector('#datos-usuario')?.getAttribute('data-user-id') || null;

        if (switchFavoritos && userId) {
            const preferenciaVistaFavs = localStorage.getItem(`vista_favoritos_usuario_${userId}`);

            if (preferenciaVistaFavs !== null) {
                switchFavoritos.checked = (preferenciaVistaFavs === 'true'); // el valor se guarda como string, así que lo convertimos a booleano
            }
        }

        cargarJuegos(); // llamamos a la API para cargar los juegos al entrar en el perfil

        // escuchamos los cambios en los filtros
        const formFiltros = document.querySelector('#form-filtros');
        if (formFiltros) {
            formFiltros.addEventListener('change', cargarJuegos); // cada vez que cambie un filtro, recargamos los juegos con la nueva consulta a la API
            formFiltros.addEventListener('submit', e => e.preventDefault()); // evitamos que el formulario recargue la página al hacer submit
        }

        // escuchar el switch de favoritos
        if (switchFavoritos) {
            switchFavoritos.addEventListener('change', () => {
                localStorage.setItem(`vista_favoritos_usuario_${userId}`, switchFavoritos.checked);
                actualizarEstadoFavoritos(); // actualizamos la visualización de favoritos al cambiar el switch
            })
        }

        // Delegacion de eventos para todos los clicks en el contenedor de juegos.
        contenedorJuegos.addEventListener('click', function (event) {

            // si hacemos click en btnEliminar
            const btnEliminar = event.target.closest('.btn-eliminar');
            if (btnEliminar) {
                const juegoId = btnEliminar.dataset.juegoId;
                const juegoTitulo = btnEliminar.dataset.juegoTitulo;
                document.querySelector('#juegoNombre').textContent = juegoTitulo;
                document.querySelector('#formEliminar').action = `/eliminar/${juegoId}`; // actualizamos la acción del formulario de eliminación con el id del juego a eliminar
            }

            // si hacemos click en el icono de favorito
            const iconoFavorito = event.target.closest('.btn-favorito');
            if (iconoFavorito) {
                const juegoId = iconoFavorito.closest('.tarjeta-juego').dataset.juegoId;
                FavoritosService.alternarFavorito(juegoId); // alternamos el estado de favorito del juego clicado
                actualizarEstadoFavoritos(); // actualizamos la visualización de favoritos para reflejar el cambio
            }

        });

    }

})