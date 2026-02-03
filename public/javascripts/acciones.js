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