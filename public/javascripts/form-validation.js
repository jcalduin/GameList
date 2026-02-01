// Script para validación de Bootstrap
(function () {
    'use strict'

    // Obtener el formulario
    const form = document.querySelector('.needs-validation')
    if (!form) {
        return
    }

    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')

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
