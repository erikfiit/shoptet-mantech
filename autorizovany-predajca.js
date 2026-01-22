// Konfigurácia banneru
const bannerConfig = {
  title: 'Autorizovaný predajca',
  subtitle: 'Originálne produkty s garenciou',
  link: '', // Voliteľné - ak chceš aby bol banner klikateľný
  
  // Text v badge kruhu
  badgeText: 'AUTORI-<br>ZOVANÝ',
  badgeSubtext: 'PREDAJCA'
};

// Funkcia na vytvorenie banneru S BADGE namiesto obrázka
function createAuthBanner() {
  const banner = document.createElement('div');
  banner.className = 'auth-dealer-banner';
  
  const content = `
    ${bannerConfig.link ? `<a href="${bannerConfig.link}" target="_blank" class="auth-banner-link">` : ''}
      <div class="auth-banner-content">
        <div class="auth-banner-badge">
          <div class="auth-banner-badge-icon">
            <div class="auth-banner-badge-text">
              ${bannerConfig.badgeText}<br>
              <span class="auth-banner-badge-subtitle">${bannerConfig.badgeSubtext}</span>
            </div>
          </div>
        </div>
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

// Funkcia na vloženie banneru
function insertAuthBanner() {
  // Nájdi availability-value div
  const availabilityDiv = document.querySelector('.p-info-wrapper .availability-value');
  
  if (availabilityDiv) {
    // Skontroluj či banner už neexistuje
    if (!document.querySelector('.auth-dealer-banner')) {
      const banner = createAuthBanner();
      
      // Vlož banner PRED availability-value
      availabilityDiv.insertAdjacentElement('beforebegin', banner);
      
      console.log('✓ Banner autorizovaného predajcu pridaný pred availability-value');
    }
  } else {
    console.log('⚠ availability-value nenájdený');
  }
}

// Spustenie po načítaní stránky
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertAuthBanner);
} else {
  insertAuthBanner();
}

// Pre prípad AJAX načítania (Shoptet niekedy používa)
const observer = new MutationObserver((mutations) => {
  const hasAvailability = document.querySelector('.p-info-wrapper .availability-value');
  const hasBanner = document.querySelector('.auth-dealer-banner');
  
  if (hasAvailability && !hasBanner) {
    insertAuthBanner();
  }
});

// Sleduj zmeny v DOM
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
