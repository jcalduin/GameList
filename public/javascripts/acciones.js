/**
 * Acciones.js - modulo de servicios y utilidades.
 * Este archivo solo exporta herramientas/funciones que se pueden usar en otras partes de la aplicación 
*/

const FavoritosService = {

    // obtener clave del localStorage para favoritos de un usuario específico
    getClaveUsuario : function () {
        const divUsuario = document.querySelector('#datos-usuario');
        const userId = divUsuario ? divUsuario.getAttribute('data-user-id') : null;
        return userId ? `favoritos_usuario_${userId}` : null;
    },

    // leer el array de favoritos del localStorage para el usuario actual
    obtenerListaFavoritos : function () {
        return JSON.parse(localStorage.getItem(this.getClaveUsuario())) || [];
    },

    // comprueba si un juego es favorito para el usuario actual
    esFavorito : function (juegoId) {
        const listaFavs = this.obtenerListaFavoritos();
        return listaFavs.includes(juegoId.toString());
    },

    //Añade o quita un juego y devuelve true si se ha añadido o false si se ha quitado
    alternarFavorito : function (juegoId) {
        let listaFavs = this.obtenerListaFavoritos();
        const idStr = juegoId.toString();

        if (listaFavs.includes(idStr)) {
            listaFavs = listaFavs.filter(id => id !== idStr); // quitar de favoritos
        } else {
            listaFavs.push(idStr); // añadir a favoritos
        }

        localStorage.setItem(this.getClaveUsuario(), JSON.stringify(listaFavs)); // guardar cambios en localStorage
        return this.esFavorito(juegoId); // devolver nuevo estado de favorito

    }
 
}

/**
 * Validación de formularios con Bootstrap y verificación de contraseñas
 * Clase de ejemplo obtenida de:
 * https://getbootstrap.com/docs/5.3/forms/validation/#custom-styles 
*/
function inicializarValidacionFormularios() {
    // Busca el formulario que tenga la clase 'needs-validation'
    const form = document.querySelector('.needs-validation');
    if (!form) return; // Si no estamos en la página de registro, corta aquí y no hagas nada más.

    // Busca las cajas de contraseña
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');

    // Escucha el momento exacto en el que el usuario pulsa "Enviar"
    form.addEventListener('submit', function (event) {
        // Si existen los dos campos de contraseña...
        if (passwordInput && confirmPasswordInput) {
            // ...comprueba si el texto escrito en ambos es DISTINTO
            if (passwordInput.value !== confirmPasswordInput.value) {
                event.preventDefault(); // Frena el envío al servidor
                event.stopPropagation(); // Frena la propagación del evento
                // Le pone un mensaje de error oficial a la caja (Bootstrap lo leerá y pondrá la caja en rojo)
                confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
            } else {
                // Si son iguales, borra cualquier error anterior
                confirmPasswordInput.setCustomValidity('');
            }
        }

        // Esta es la validación general de HTML5 (campos requeridos, emails válidos, etc.)
        if (!form.checkValidity()) {
            event.preventDefault(); // Si algo falla, frena el envío
            event.stopPropagation();
        }
        
        // Le pone esta clase al formulario para que Bootstrap encienda sus colores rojo/verde
        form.classList.add('was-validated');
    }, false);

    // Este pequeño extra sirve para que, en cuanto el usuario empiece a borrar 
    // la contraseña equivocada, se quite el mensaje de error rojo en tiempo real.
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
}

export {
    FavoritosService,
    inicializarValidacionFormularios
};