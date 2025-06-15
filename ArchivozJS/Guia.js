document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.paint-card');
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Función para manejar el scroll
    function handleScroll() {
        cards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }
    
    // Ejecutar al cargar la página por si algunas tarjetas ya están visibles
    handleScroll();
    
    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll);
});