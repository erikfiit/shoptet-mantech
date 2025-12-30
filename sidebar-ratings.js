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
