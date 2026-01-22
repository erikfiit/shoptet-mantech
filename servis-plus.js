function initServisPlus() {
            // Nájdi div s obrázkom produktu
            const imageWrapper = document.querySelector('.p-image-wrapper, .product-image-wrapper, .product-gallery');
            
            if (!imageWrapper) {
                console.warn('Servis Plus: Image wrapper nenájdený');
                return;
            }
            
            // Skontroluj či už ikona neexistuje
            if (document.getElementById('servisPlusBadge')) {
                return;
            }
            
            // Vytvor ikonu
            const badge = document.createElement('div');
            badge.id = 'servisPlusBadge';
            badge.className = 'servis-plus-badge';
            badge.onclick = openServisModal;
            badge.innerHTML = `
                <div class="servis-plus-icon">
                    <div class="servis-plus-text">
                        GARANCIA<br>
                        <span class="servis-plus-subtitle">SERVISU</span>
                    </div>
                </div>
            `;
            
            // Pridaj do image wrapperu
            imageWrapper.appendChild(badge);     
        }

        // Otvorenie modalu
        function openServisModal() {
            document.getElementById('servisModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Zatvorenie modalu
        function closeServisModal() {
            document.getElementById('servisModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Zatvorenie pri kliknutí na pozadie
        function closeModalOnBackdrop(event) {
            if (event.target.id === 'servisModal') {
                closeServisModal();
            }
        }

        // Zatvorenie ESC klávesou
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeServisModal();
            }
        });

        // Inicializácia po načítaní stránky
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initServisPlus);
        } else {
            initServisPlus();
        }
