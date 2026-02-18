/**
 * Validación de formularios con Bootstrap y verificación de contraseñas
 * Clase de ejemplo obtenida de:
 * https://getbootstrap.com/docs/5.3/forms/validation/#custom-styles 
*/

(function () {
    'use strict'

    // Obtener el formulario
    const form = document.querySelector('.needs-validation')
    if (!form) {
        return
    }

    // Obtener los campos de contraseña y confirmación
    const passwordInput = form.querySelector('input[name="password"]')
    const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]')

    form.addEventListener('submit', function (event) {
        // Validar que las contraseñas coincidan si existen ambos campos
        if (passwordInput && confirmPasswordInput) {
            const password = passwordInput.value
            const confirmPassword = confirmPasswordInput.value
            
            if (password !== confirmPassword) {
                event.preventDefault()
                event.stopPropagation()
                confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden')
            } else {
                confirmPasswordInput.setCustomValidity('')
            }
        }

        // Verificar validación del formulario
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)

    // Limpiar error personalizado cuando el usuario escribe
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            this.setCustomValidity('')
        })
    }
})()


/**
 * Configuración del modal de eliminación
 * Añadimos un listener a cada botón de eliminar para actualizar el contenido del modal
 * con los datos del juego correspondiente
*/
document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function() {
        const juegoId = this.getAttribute('data-juego-id');
        const juegoTitulo = this.getAttribute('data-juego-titulo');
            
        document.querySelector('#juegoNombre').textContent = juegoTitulo;
        document.querySelector('#formEliminar').action = '/eliminar/' + juegoId;
    });
});


/**
 * Lógica para gestionar los favoritos en el perfil de usuario
 * Guarda el estado de favoritos en localStorage para persistencia entre sesiones
 * Permite filtrar la vista para mostrar solo los juegos marcados como favoritos 
*/
document.addEventListener('DOMContentLoaded', function() {

    // si estamos en la vista perfil, cogemos el ID de usuario del div oculto.
    const divUsuario = document.querySelector('#datos-usuario');
    if (!divUsuario) return;

    const userId = divUsuario.getAttribute('data-user-id');

    //variable para guardar el id del usuario y el estado de favoritos en localStorage
    const USUARIO_ID_FAVORITOS = `favoritos_usuario_${userId}`;
    const VISTA_FAVORITOS = `vista_favoritos_usuario_${userId}`;

    //capturamos todos los elementos de la interfaz que necesitamos para gestionar los favoritos
    const checkboxFavoritos = document.querySelector('#verFavoritos');
    const botonesFavorito = document.querySelectorAll('.btn-favorito');
    const tarjetasJuegos = document.querySelectorAll('.tarjeta-juego');

    // aplicar filtros visualmente según el estado del checkbox al cargar la página
    function aplicarFiltroFavoritos() {

        const listaFavs = JSON.parse(localStorage.getItem(USUARIO_ID_FAVORITOS)) || [];
        const verFavs = checkboxFavoritos.checked; // estado del checkBox

        tarjetasJuegos.forEach(tarjeta => {
            const juegoId = tarjeta.getAttribute('data-juego-id');
            const esFavorito = listaFavs.includes(juegoId);

            // Si el checkbox está activo y el juego no es favorito, ocultamos la tarjeta. Si no, la mostramos.
            if (verFavs && !esFavorito) tarjeta.classList.add('d-none');
            else tarjeta.classList.remove('d-none');

        })
    }

    // escuchamos el evento para saber cuando el usuario marca o desmarca si quiere ver favoritos al iniciar la página o no, y guardamos esa preferencia en localStorage 
    checkboxFavoritos.addEventListener('change', () => {
        localStorage.setItem(VISTA_FAVORITOS, checkboxFavoritos.checked);
        aplicarFiltroFavoritos();
    });

    // pintar el icono de favoritos
    function pintarEstadoFavoritos() {

        const listaFavs = JSON.parse(localStorage.getItem(USUARIO_ID_FAVORITOS)) || [];

        botonesFavorito.forEach(btn => {
            const juegoId = btn.getAttribute('data-id');
            const icono = btn.querySelector('.icono-estrella');

            if (listaFavs.includes(juegoId)) {

                icono.classList.remove('bi-star', 'text-secondary');
                icono.classList.add('bi-star-fill', 'text-warning');

            } else {

                icono.classList.remove('bi-star-fill', 'text-warning');
                icono.classList.add('bi-star', 'text-secondary');

            }
        })
    }

    // escuchamos el evento del click al clickar en fav
    botonesFavorito.forEach(btn => {
        btn.addEventListener('click', () => {
            const juegoId = btn.getAttribute('data-id');
            let listaFavs = JSON.parse(localStorage.getItem(USUARIO_ID_FAVORITOS)) || [];

            if (listaFavs.includes(juegoId)) {

                listaFavs = listaFavs.filter(id => id !== juegoId); // si ya estaba marcado y volvemos a clickar, lo quitamos de favoritos

            } else {

                listaFavs.push(juegoId); // si no estaba marcado, lo añadimos a favoritos

            }

            // guardamos la nueva lista en el navegador
            localStorage.setItem(USUARIO_ID_FAVORITOS, JSON.stringify(listaFavs)); 

            // actualizamos la interfaz
            pintarEstadoFavoritos();
            aplicarFiltroFavoritos();
        })
    })

    // al cargar la página, aplicamos el filtro de favoritos si estaba activo
    const vistaFavsGuardada = localStorage.getItem(VISTA_FAVORITOS);

    if (vistaFavsGuardada !== null) checkboxFavoritos.checked = (vistaFavsGuardada === 'true'); // si había una preferencia guardada, la aplicamos
    else checkboxFavoritos.checked = true; // por defecto, mostrar favoritos al cargar la página

    pintarEstadoFavoritos();
    aplicarFiltroFavoritos();

})