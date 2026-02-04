// Toggle sidebar otvorenie/zatvorenie
function toggleSidebar() {
    const sidebar = document.getElementById('ratingSidebar');
    sidebar.classList.toggle('open');
}

// Zatvorenie pri kliknutí mimo panelu
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('ratingSidebar');
    const container = sidebar ? sidebar.querySelector('.sidebar-container') : null;
    
    if (sidebar && sidebar.classList.contains('open') && container && !container.contains(event.target)) {
        sidebar.classList.remove('open');
    }
});

// Zabránenie zatvoreniu pri kliknutí na obsah panelu
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContent = document.querySelector('.sidebar-content');
    if (sidebarContent) {
        sidebarContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

     // Rozbalenie/zbalenie pri hover
    const sidebar = document.getElementById('ratingSidebar');
    if (sidebar) {
        sidebar.addEventListener('mouseover', () => {
            sidebar.classList.add('open');
        });
        sidebar.addEventListener('mouseout', () => {
            sidebar.classList.remove('open');
        });
    }
});

 function openShoptetForm(event) {
    event.preventDefault();
    
    // Shoptet má rôzne selektory podľa verzie šablóny
    // Skús nájsť tlačidlo "Opýtať sa na produkt"
    const shoptetButton = document.querySelector(
        '[data-testid="productInquiryButton"], ' +
        '.product-inquiry-button, ' +
        'a[href*=":otazka/"], ' +
        'a[href*=":dotaz/"], ' +
        'button[data-product-inquiry]'
    );
    
    if (shoptetButton) {
        shoptetButton.click();
    } else {
        // Fallback - scrolluj na Shoptet formulár ak existuje
        const form = document.querySelector('.product-inquiry-form, #product-inquiry');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Formulár pre otázky k produktu nie je dostupný. Kontaktujte nás priamo na info@mantech.sk');
        }
    }
 }
