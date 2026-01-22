// Konfigurácia banneru
const bannerConfig = {
  // Nastavenie typu: 'banner' alebo 'badge'
  type: 'banner', // Zmeň na 'badge' pre ikonku vpravo hore
  
  // Pre banner variant
  imageUrl: 'https://TVOJA-GITHUB-PAGES-URL/images/autorizovany-predajca.png', // Nahraď svojou URL
  title: 'Autorizovaný predajca',
  subtitle: 'Originálne produkty s garenciou',
  link: '', // Voliteľné - ak chceš aby bol banner klikateľný
  
  // Pre badge variant (text v kruhu)
  badgeText: 'AUTORIZOVANÝ',
  badgeSubtext: 'PREDAJCA'
};

// Funkcia na vytvorenie BANNER variantu
function createAuthBanner() {
  const banner = document.createElement('div');
  banner.className = 'auth-dealer-banner';
  
  const content = `
    ${bannerConfig.link ? `<a href="${bannerConfig.link}" target="_blank" class="auth-banner-link">` : ''}
      <div class="auth-banner-content">
        ${bannerConfig.imageUrl ? `<img src="${bannerConfig.imageUrl}" alt="${bannerConfig.title}" class="auth-banner-img">` : ''}
        <div class="auth-banner-text">
          <h3>${bannerConfig.title}</h3>
          ${bannerConfig.subtitle ? `<p>${bannerConfig.subtitle}</p>` : ''}
        </div>
      </div>
    ${bannerConfig.link ? `</a>` : ''}
  `;
  
  banner.innerHTML = content;
  return banner;
}

// Funkcia na vytvorenie BADGE variantu (ikonka vpravo hore)
function createAuthBadge() {
  const badge = document.createElement('div');
  badge.className = 'auth-dealer-badge';
  
  const content = `
    <div class="auth-dealer-icon">
      <div class="auth-dealer-text">
        ${bannerConfig.badgeText}<br>
        <span class="auth-dealer-subtitle">${bannerConfig.badgeSubtext}</span>
      </div>
    </div>
  `;
  
  badge.innerHTML = content;
  return badge;
}

// Funkcia na vloženie banneru/badge
function insertAuthElement() {
  // Nájdi availability-value div
  const availabilityDiv = document.querySelector('.p-info-wrapper .availability-value');
  
  if (availabilityDiv) {
    // Skontroluj či banner/badge už neexistuje
    if (!document.querySelector('.auth-dealer-banner') && !document.querySelector('.auth-dealer-badge')) {
      
      let element;
      
      // Vyber typ podľa konfigurácie
      if (bannerConfig.type === 'badge') {
        element = createAuthBadge();
        // Badge sa vloží do .p-info-wrapper aby bol vpravo hore
        const infoWrapper = document.querySelector('.p-info-wrapper');
        if (infoWrapper) {
          infoWrapper.style.position = 'relative'; // Dôležité pre absolútne pozicovanie
          infoWrapper.appendChild(element);
          console.log('✓ Badge autorizovaného predajcu pridaný');
        }
      } else {
        element = createAuthBanner();
        // Banner sa vloží PRED availability-value
        availabilityDiv.insertAdjacentElement('beforebegin', element);
        console.log('✓ Banner autorizovaného predajcu pridaný pred availability-value');
      }
    }
  } else {
    console.log('⚠ availability-value nenájdený');
  }
}

// Spustenie po načítaní stránky
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertAuthElement);
} else {
  insertAuthElement();
}

// Pre prípad AJAX načítania (Shoptet niekedy používa)
const observer = new MutationObserver((mutations) => {
  const hasAvailability = document.querySelector('.p-info-wrapper .availability-value');
  const hasBanner = document.querySelector('.auth-dealer-banner');
  const hasBadge = document.querySelector('.auth-dealer-badge');
  
  if (hasAvailability && !hasBanner && !hasBadge) {
    insertAuthElement();
  }
});

// Sleduj zmeny v DOM
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
