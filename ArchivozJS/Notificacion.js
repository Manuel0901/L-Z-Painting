document.addEventListener('DOMContentLoaded', function() {
            const whatsappIcon = document.getElementById('whatsapp-icon');
            const notification = document.getElementById('whatsapp-notification');
            const closeBtn = document.getElementById('close-notification');

            // Añadir animación de caída al icono
            whatsappIcon.classList.add('drop-animation');

            // Mostrar notificación después de 1 segundo
            setTimeout(function() {
                notification.classList.add('show');
            }, 1000);

            // Ocultar notificación al hacer clic en la X
            closeBtn.addEventListener('click', function() {
                notification.classList.remove('show');
            });

            // Ocultar notificación después de 8 segundos si no se cierra
            setTimeout(function() {
                if (notification.classList.contains('show')) {
                    notification.classList.remove('show');
                }
            }, 8000);
        });
        document.addEventListener('DOMContentLoaded', function() {
    const whatsappIcon = document.getElementById('whatsapp-icon');
    const notification = document.getElementById('whatsapp-notification');
    const closeBtn = document.getElementById('close-notification');
    const whatsappBadge = document.getElementById('whatsapp-badge'); // Nuevo badge

    // Animación de caída al icono
    whatsappIcon.classList.add('drop-animation');

    // Mostrar notificación después de 1 segundo
    setTimeout(function() {
        notification.classList.add('show');
    }, 1000);

    // Ocultar notificación y mostrar badge persistente
    function hideNotification() {
        notification.classList.remove('show');
        whatsappBadge.classList.add('show'); // Muestra el badge en el botón
    }

    // Cerrar al hacer clic en la X
    closeBtn.addEventListener('click', hideNotification);

    // Ocultar notificación después de 8 segundos (y mostrar badge)
    setTimeout(hideNotification, 8000);
});