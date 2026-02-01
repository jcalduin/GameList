// Script para validación de Bootstrap
(function () {
    'use strict'

    // Obtener el formulario
    const form = document.querySelector('.needs-validation')

    form.addEventListener('submit', function (event) {
        // Validar que las contraseñas coincidan
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value
        
        if (password !== confirmPassword) {
            event.preventDefault()
            event.stopPropagation()
            document.getElementById('confirmPassword').setCustomValidity('Las contraseñas no coinciden')
        } else {
            document.getElementById('confirmPassword').setCustomValidity('')
        }

        // Verificar validación del formulario
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)

    // Limpiar error personalizado cuando el usuario escribe
    document.getElementById('confirmPassword').addEventListener('input', function() {
        this.setCustomValidity('')
    })
})()
