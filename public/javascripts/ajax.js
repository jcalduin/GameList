/**
 * Archivo para gestionar todas las peticiones AJAX de la aplicación 
*/

document.addEventListener('DOMContentLoaded', () => {

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
                    timer: 1500,
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
                    timer: 2000,
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
                    timer: 2000,
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

})