// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Carrusel Galería
const carruselTrack = document.querySelector('.galeria-carrusel .carrusel-track');
const carruselSlides = document.querySelectorAll('.galeria-carrusel .carrusel-slide');
const carruselAnterior = document.querySelector('.galeria-carrusel .carrusel-anterior');
const carruselSiguiente = document.querySelector('.galeria-carrusel .carrusel-siguiente');

let slideIndex = 0;
let slideWidth; // Declarar slideWidth aquí

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 90,
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Show success message (in a real application, you would send this data to a server)
    alert('¡Gracias por contactarnos! Te responderemos lo antes posible.');
    contactForm.reset();
});

// Add scroll event listener for header shadow
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Función para inicializar el carrusel una vez que los slides estén disponibles
function initCarrusel() {
    if (carruselSlides.length > 0) {
        const slideWidth = carruselSlides[0].offsetWidth;
    
        const carruselAnterior = document.querySelector('.galeria-carrusel .carrusel-anterior');
        const carruselSiguiente = document.querySelector('.galeria-carrusel .carrusel-siguiente');
    
        if (carruselAnterior && carruselSiguiente) { // Verificar que no sean null
            function moveCarrusel() {
                carruselTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
            }
    
            carruselAnterior.addEventListener('click', () => {
                slideIndex = (slideIndex > 0) ? slideIndex - 1 : carruselSlides.length - 1;
                moveCarrusel();
            });
    
            carruselSiguiente.addEventListener('click', () => {
                slideIndex = (slideIndex < carruselSlides.length - 1) ? slideIndex + 1 : 0;
                moveCarrusel();
            });
        } else {
            console.warn("No se encontraron los botones de navegación del carrusel.");
        }
    } else {
        console.warn("No se encontraron slides en el carrusel.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Carrusel Galería
    const carruselTrack = document.querySelector('.galeria-carrusel .carrusel-track');
    const carruselSlides = document.querySelectorAll('.galeria-carrusel .carrusel-slide');

    let slideIndex = 0;

    // Verificar si hay slides antes de continuar
    if (carruselSlides.length > 0) {
        const slideWidth = carruselSlides[0].offsetWidth;

        const carruselAnterior = document.querySelector('.galeria-carrusel .carrusel-anterior');
        const carruselSiguiente = document.querySelector('.galeria-carrusel .carrusel-siguiente');

        if (carruselAnterior && carruselSiguiente) { // Verificar que no sean null
            function moveCarrusel() {
                carruselTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
            }

            carruselAnterior.addEventListener('click', () => {
                slideIndex = (slideIndex > 0) ? slideIndex - 1 : carruselSlides.length - 1;
                moveCarrusel();
            });

            carruselSiguiente.addEventListener('click', () => {
                slideIndex = (slideIndex < carruselSlides.length - 1) ? slideIndex + 1 : 0;
                moveCarrusel();
            });
        } else {
            console.warn("No se encontraron los botones de navegación del carrusel. Asegúrate de que los elementos con las clases '.galeria-carrusel .carrusel-anterior' y '.galeria-carrusel .carrusel-siguiente' estén presentes en el HTML.");
        }
    } else {
        console.warn("No se encontraron slides en el carrusel. Asegúrate de que los elementos con la clase '.galeria-carrusel .carrusel-slide' estén presentes en el HTML.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Carrusel Galería
    const carruselTrack = document.querySelector('.galeria-carrusel .carrusel-track');
    const carruselSlides = document.querySelectorAll('.galeria-carrusel .carrusel-slide');
    const popupGaleria = document.getElementById('popup-galeria');
    const popupImagen = document.getElementById('popup-imagen');
    const cerrarPopup = document.querySelector('.cerrar-popup');

    let slideIndex = 0;

    // Verificar si hay slides antes de continuar
    if (carruselSlides.length > 0) {
        const slideWidth = carruselSlides[0].offsetWidth;

        const carruselAnterior = document.querySelector('.galeria-carrusel .carrusel-anterior');
        const carruselSiguiente = document.querySelector('.galeria-carrusel .carrusel-siguiente');

        if (carruselAnterior && carruselSiguiente) {
            function moveCarrusel() {
                carruselTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
            }

            carruselAnterior.addEventListener('click', () => {
                slideIndex = (slideIndex > 0) ? slideIndex - 1 : carruselSlides.length - 1;
                moveCarrusel();
            });

            carruselSiguiente.addEventListener('click', () => {
                slideIndex = (slideIndex < carruselSlides.length - 1) ? slideIndex + 1 : 0;
                moveCarrusel();
            });

            // Agregar event listeners a las imágenes para el popup
            carruselSlides.forEach(slide => {
                slide.addEventListener('click', () => {
                    const img = slide.querySelector('img');
                    popupImagen.src = img.src;
                    popupImagen.alt = img.alt;
                    popupGaleria.style.display = 'block';
                });
            });

            // Cerrar el popup al hacer clic en la "X"
            cerrarPopup.addEventListener('click', () => {
                popupGaleria.style.display = 'none';
            });

            // Cerrar el popup al hacer clic fuera de la imagen
            popupGaleria.addEventListener('click', (event) => {
                if (event.target === popupGaleria) {
                    popupGaleria.style.display = 'none';
                }
            });

        } else {
            console.warn("No se encontraron los botones de navegación del carrusel.");
        }
    } else {
        console.warn("No se encontraron slides en el carrusel.");
    }
});

document.addEventListener('DOMContentLoaded', initCarrusel);