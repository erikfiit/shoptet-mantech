// Customer Gallery Carousel
(function() {
    'use strict';
    
    let currentSlide = 0;
    let autoplayInterval;
    
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const track = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');
        
        if (!slides.length || !track || !dotsContainer) return;
        
        // Vytvorenie dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Presun na konkrétny slide
        window.goToSlide = function(index) {
            currentSlide = index;
            updateCarousel();
        };
        
        // Posun carousel
        window.moveCarousel = function(direction) {
            currentSlide += direction;
            
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            } else if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            
            updateCarousel();
            resetAutoplay();
        };
        
        // Update carousel pozície
        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                window.moveCarousel(1);
            }, 5000);
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
