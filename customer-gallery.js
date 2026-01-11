// Customer Gallery Carousel - Multiple items
(function() {
    'use strict';
    
    let currentPosition = 0;
    let autoplayInterval;
    const slideWidth = 300; // 280px width + 20px gap
    
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const track = document.getElementById('carouselTrack');
        
        if (!slides.length || !track) return;
        
        // Posun carousel
        window.moveCarousel = function(direction) {
            const containerWidth = track.parentElement.offsetWidth;
            const maxScroll = (slides.length * slideWidth) - containerWidth;
            
            currentPosition += (direction * slideWidth);
            
            // Limitovanie posunu
            if (currentPosition < 0) {
                currentPosition = 0;
            } else if (currentPosition > maxScroll) {
                currentPosition = maxScroll;
            }
            
            updateCarousel();
            resetAutoplay();
        };
        
        // Update carousel pozície
        function updateCarousel() {
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
        
        // Autoplay - posun o jeden item
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                const containerWidth = track.parentElement.offsetWidth;
                const maxScroll = (slides.length * slideWidth) - containerWidth;
                
                currentPosition += slideWidth;
                
                // Reset na začiatok ak sme na konci
                if (currentPosition > maxScroll) {
                    currentPosition = 0;
                }
                
                updateCarousel();
            }, 4000); // Každé 4 sekundy
        }
        
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        // Lightbox funkcie
        window.openLightbox = function(index) {
            const img = slides[index].querySelector('img');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightbox = document.getElementById('lightbox');
            
            if (img && lightboxImg && lightbox) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                clearInterval(autoplayInterval);
                document.body.style.overflow = 'hidden';
            }
        };
        
        window.closeLightbox = function(event) {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && (event.target === lightbox || event.target.classList.contains('lightbox-close'))) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                startAutoplay();
            }
        };
        
        // Klávesnica navigácia
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.classList.contains('active')) {
                if (e.key === 'Escape') window.closeLightbox({ target: lightbox });
            } else {
                if (e.key === 'ArrowLeft') window.moveCarousel(-1);
                if (e.key === 'ArrowRight') window.moveCarousel(1);
            }
        });
        
        // Swipe podpora pre mobil
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                window.moveCarousel(1);
            }
            if (touchEndX - touchStartX > 50) {
                window.moveCarousel(-1);
            }
        }
        
        // Spustenie autoplay
        startAutoplay();
    }
    
    // Inicializácia po načítaní DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();
