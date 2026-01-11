// ========================================
// KONFIGURÁCIA - SUPER JEDNODUCHÉ
// ========================================

const galleryConfig = {
    // Base URL pre fotky
    imageBaseUrl: 'https://www.mantech.sk/user/documents/upload/zakaznici/zakaznik_',
    
    // Prípona súboru
    imageExtension: '.jpg',
    
    // Počet fotiek (od 1 do X)
    totalImages: 41,
    
    // Zobraziť hviezdičky? (true/false)
    showStars: true,
    
    // Počet hviezdičiek (1-5)
    starRating: 5,
    
    // Rýchlosť autoplay v milisekundách (dlhší čas = pomalšie posúvanie)
    autoplaySpeed: 5000  // 5 sekúnd (predtým 4000)
};

// ========================================
// HLAVNÁ LOGIKA - NEUPRAVUJ
// ========================================

(function() {
    'use strict';
    
    let currentPosition = 0;
    let autoplayInterval;
    const slideWidth = 300;
    
    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        // Vygenerovanie slides
        generateSlides();
        
        const slides = document.querySelectorAll('.carousel-slide');
        if (!slides.length) return;
        
        // Posun carousel
        window.moveCarousel = function(direction) {
            const containerWidth = track.parentElement.offsetWidth;
            const maxScroll = (slides.length * slideWidth) - containerWidth;
            
            currentPosition += (direction * slideWidth);
            
            if (currentPosition < 0) {
                currentPosition = 0;
            } else if (currentPosition > maxScroll) {
                currentPosition = maxScroll;
            }
            
            updateCarousel();
            
            // Reset autoplay - začne počítať odznova od tejto chvíle
            resetAutoplay();
        };
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                const containerWidth = track.parentElement.offsetWidth;
                const maxScroll = (slides.length * slideWidth) - containerWidth;
                
                currentPosition += slideWidth;
                
                if (currentPosition > maxScroll) {
                    currentPosition = 0;
                }
                
                updateCarousel();
            }, galleryConfig.autoplaySpeed);
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
                
                // ZASTAVIŤ animáciu carousel pri otvorení lightboxu
                stopAutoplay();
                
                document.body.style.overflow = 'hidden';
            }
        };
        
        window.closeLightbox = function(event) {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && (event.target === lightbox || event.target.classList.contains('lightbox-close'))) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                
                // SPUSTIŤ animáciu carousel po zatvorení lightboxu
                resetAutoplay();
            }
        };
        
        // Klávesnica
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
                // moveCarousel už volá resetAutoplay()
            }
            if (touchEndX - touchStartX > 50) {
                window.moveCarousel(-1);
                // moveCarousel už volá resetAutoplay()
            }
        }
        
        // Spustenie autoplay pri načítaní
        startAutoplay();
    }
    
    // Funkcia na generovanie slides - AUTOMATICKY OD 1 do totalImages
    function generateSlides() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        track.innerHTML = '';
        
        const stars = '★'.repeat(galleryConfig.starRating) + '☆'.repeat(5 - galleryConfig.starRating);
        
        // Vytvor slide pre každú fotku od 1 do totalImages
        for (let i = 1; i <= galleryConfig.totalImages; i++) {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.onclick = () => window.openLightbox(i - 1);
            
            const img = document.createElement('img');
            img.src = galleryConfig.imageBaseUrl + i + galleryConfig.imageExtension;
            img.alt = 'Fotka od zákazníka ' + i;
            
            // Fallback ak sa obrázok nenačíta
            img.onerror = function() {
                this.style.display = 'none';
                slide.style.display = 'none';
            };
            
            slide.appendChild(img);
            
            if (galleryConfig.showStars) {
                const starsDiv = document.createElement('div');
                starsDiv.className = 'slide-stars';
                starsDiv.textContent = stars;
                slide.appendChild(starsDiv);
            }
            
            track.appendChild(slide);
        }
    }
    
    // Inicializácia
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();
