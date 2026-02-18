/**
 * Archivo para gestionar todas las peticiones AJAX de la aplicación 
*/

document.addEventListener('DOMContentLoaded', () => {

    // funcion de utilidad para no escribir fetch con el mismo bloque de codigo por cada accion
    async function enviarDatos(url, opciones = { method: 'POST' }) {
        const respuesta = await fetch(url, opciones);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            // Si el servidor responde con error, lanzamos el mensaje para el catch
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
    
})