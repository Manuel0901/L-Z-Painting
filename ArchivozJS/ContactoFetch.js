document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(contactForm); // Captura los datos del formulario

        try {
            const response = await fetch('ArchivosPhp/enviar.php', {
                method: 'POST',
                body: formData, // Envía los datos como FormData
            });

            const text = await response.text(); // Captura la respuesta como texto
            console.log("Respuesta del servidor:", text); // Muestra la respuesta en la consola

            // Intenta convertir la respuesta a JSON
            try {
                const result = JSON.parse(text);

                if (response.ok && result.success) {
                    alert('¡Mensaje enviado con éxito!');
                    contactForm.reset();
                } else {
                    alert('Hubo un error: ' + result.message);
                }
            } catch (jsonError) {
                console.error("Error al convertir la respuesta en JSON:", jsonError);
                alert("Error: La respuesta del servidor no es válida.");
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Ocurrió un error inesperado. Inténtalo nuevamente.');
        }
    });
});
