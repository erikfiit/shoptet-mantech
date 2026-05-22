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

 function mtSend(){
    var p=document.getElementById('mt-phone').value.trim();
    var m=document.getElementById('mt-msg');
    var b=document.getElementById('mt-btn');
    m.textContent='';
    if(p.replace(/\D/g,'').length<9){m.textContent='Zadajte platné číslo.';return;}
    b.disabled=true;
    b.textContent='Odosielam...';
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({
        access_key:'6212a84c-3d61-4ea2-ba50-bf9350b68829',
        telefon:p,
        stranka:location.href,
        produkt:document.title,
        subject:'Spätné volanie: '+p
    })})
    .then(function(r){return r.json();})
    .then(function(d){
        if(d.success){
            m.textContent='✓ Budeme vás kontaktovať!';
            document.getElementById('mt-phone').value='';
            b.textContent='Odoslané ✓';
        } else {
            m.textContent='Chyba, skúste znova.';
            b.disabled=false;
            b.textContent='Zavolajte mi';
        }
    })
    .catch(function(){
        m.textContent='Chyba, skúste znova.';
        b.disabled=false;
        b.textContent='Zavolajte mi';
    });
}
document.getElementById('mt-phone').addEventListener('keydown',function(e){if(e.key==='Enter')mtSend();});
