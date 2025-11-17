/**
 * GDPR/TTDSG Compliant Consent Manager
 * Implements Consent-First Architecture
 */

class ConsentManager {
  constructor() {
    this.storageKey = 'user-consent-preferences';
    this.categories = {
      necessary: { enabled: true, locked: true },
      analytics: { enabled: false, locked: false },
      marketing: { enabled: false, locked: false },
      media: { enabled: false, locked: false }
    };
    this.loadedScripts = new Set();
  }

  init() {
    // Load stored preferences
    this.loadPreferences();

    // Show banner only if no consent decision has been made
    if (!this.hasConsentDecision()) {
      this.showBanner();
    } else {
      this.applyStoredPreferences();
    }
  }

  hasConsentDecision() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored !== null;
    } catch (e) {
      console.warn('LocalStorage not available:', e);
      return false;
    }
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const preferences = JSON.parse(stored);
        Object.keys(preferences).forEach(cat => {
          if (this.categories[cat] && !this.categories[cat].locked) {
            this.categories[cat].enabled = preferences[cat];
          }
        });
      }
    } catch (e) {
      console.warn('Error loading consent preferences:', e);
    }
  }

  savePreferences() {
    try {
      const preferences = {};
      Object.keys(this.categories).forEach(cat => {
        preferences[cat] = this.categories[cat].enabled;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      localStorage.setItem(this.storageKey + '_timestamp', Date.now().toString());
    } catch (e) {
      console.warn('Error saving consent preferences:', e);
    }
  }

  showBanner() {
    // Create consent banner dynamically
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.setAttribute('aria-describedby', 'consent-description');
    banner.setAttribute('aria-modal', 'true');

    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, rgba(20, 23, 43, 0.98) 0%, rgba(10, 14, 39, 0.98) 100%);
        border-top: 2px solid #00FFFF;
        box-shadow: 0 -5px 30px rgba(0, 255, 255, 0.3);
        padding: 2rem;
        z-index: 10000;
        font-family: 'Roboto Mono', monospace;
      ">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 id="consent-title" style="
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: #00FFFF;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
          ">Cookie-Einstellungen</h2>

          <p id="consent-description" style="
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 1.5rem;
            line-height: 1.6;
          ">
            Wir verwenden Cookies und externe Inhalte (z.B. YouTube-Videos, Google Maps),
            um Ihnen das beste Nutzungserlebnis zu bieten. Sie entscheiden, welche Kategorien
            Sie zulassen möchten.
          </p>

          <div style="
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
          ">
            <button id="consent-accept-all" style="
              padding: 0.75rem 1.5rem;
              background: rgba(0, 255, 255, 0.1);
              border: 2px solid #00FFFF;
              color: #00FFFF;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
              text-transform: uppercase;
              letter-spacing: 1px;
            " onmouseover="this.style.boxShadow='0 0 20px rgba(0, 255, 255, 0.5)'"
               onmouseout="this.style.boxShadow='0 0 10px rgba(0, 255, 255, 0.3)'">
              Alle akzeptieren
            </button>

            <button id="consent-reject-all" style="
              padding: 0.75rem 1.5rem;
              background: transparent;
              border: 2px solid #FF00FF;
              color: #FF00FF;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              text-transform: uppercase;
              letter-spacing: 1px;
            " onmouseover="this.style.background='rgba(255, 0, 255, 0.1)'"
               onmouseout="this.style.background='transparent'">
              Nur notwendige
            </button>

            <button id="consent-customize" style="
              padding: 0.75rem 1.5rem;
              background: transparent;
              border: 2px solid #FFD700;
              color: #FFD700;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              text-transform: uppercase;
              letter-spacing: 1px;
            " onmouseover="this.style.background='rgba(255, 215, 0, 0.1)'"
               onmouseout="this.style.background='transparent'">
              Anpassen
            </button>

            <a href="/datenschutz" style="
              color: rgba(255, 255, 255, 0.7);
              text-decoration: underline;
              margin-left: auto;
            ">
              Mehr erfahren
            </a>
          </div>

          <div id="consent-details" style="display: none; margin-top: 1.5rem;">
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 1rem;
              margin-bottom: 1rem;
            ">
              ${this.renderCategoryCheckbox('necessary', 'Notwendig', 'Erforderlich für die Grundfunktionen der Website', true)}
              ${this.renderCategoryCheckbox('analytics', 'Analyse', 'Hilft uns, die Website zu verbessern', false)}
              ${this.renderCategoryCheckbox('marketing', 'Marketing', 'Für personalisierte Werbung', false)}
              ${this.renderCategoryCheckbox('media', 'Medien', 'Externe Inhalte wie YouTube, Google Maps', false)}
            </div>

            <button id="consent-save-custom" style="
              padding: 0.75rem 1.5rem;
              background: rgba(0, 255, 255, 0.1);
              border: 2px solid #00FFFF;
              color: #00FFFF;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">
              Auswahl speichern
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('consent-accept-all').addEventListener('click', () => this.acceptAll());
    document.getElementById('consent-reject-all').addEventListener('click', () => this.rejectAll());
    document.getElementById('consent-customize').addEventListener('click', () => this.showCustomize());

    // Focus management for accessibility
    banner.querySelector('button').focus();
  }

  renderCategoryCheckbox(category, title, description, disabled) {
    return `
      <label style="
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        background: rgba(20, 23, 43, 0.6);
        border: 1px solid rgba(0, 255, 255, 0.2);
        border-radius: 0.5rem;
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
      ">
        <input
          type="checkbox"
          id="consent-${category}"
          ${disabled ? 'checked disabled' : ''}
          ${this.categories[category].enabled ? 'checked' : ''}
          style="
            margin-right: 0.75rem;
            margin-top: 0.25rem;
            width: 1.25rem;
            height: 1.25rem;
            accent-color: #00FFFF;
          "
        />
        <div>
          <div style="
            font-weight: 600;
            color: #00FFFF;
            margin-bottom: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          ">${title}</div>
          <div style="
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.7);
          ">${description}</div>
        </div>
      </label>
    `;
  }

  showCustomize() {
    const detailsDiv = document.getElementById('consent-details');
    if (detailsDiv) {
      detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';

      if (detailsDiv.style.display === 'block') {
        document.getElementById('consent-save-custom').addEventListener('click', () => this.saveCustom());
      }
    }
  }

  saveCustom() {
    // Read checkbox values
    Object.keys(this.categories).forEach(cat => {
      if (!this.categories[cat].locked) {
        const checkbox = document.getElementById(`consent-${cat}`);
        if (checkbox) {
          this.categories[cat].enabled = checkbox.checked;
        }
      }
    });

    this.savePreferences();
    this.applyStoredPreferences();
    this.hideBanner();
  }

  acceptAll() {
    Object.keys(this.categories).forEach(cat => {
      if (!this.categories[cat].locked) {
        this.categories[cat].enabled = true;
      }
    });
    this.savePreferences();
    this.applyStoredPreferences();
    this.hideBanner();
  }

  rejectAll() {
    Object.keys(this.categories).forEach(cat => {
      if (!this.categories[cat].locked) {
        this.categories[cat].enabled = false;
      }
    });
    this.savePreferences();
    this.hideBanner();
  }

  hideBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.remove();
    }
  }

  applyStoredPreferences() {
    // Load third-party scripts based on consent
    this.loadThirdPartyScripts();
    this.unlockEmbeds();
  }

  loadThirdPartyScripts() {
    // Google Analytics (only if analytics consent given)
    if (this.categories.analytics.enabled && !this.loadedScripts.has('ga')) {
      // Note: Replace with actual GA ID
      // this.loadScript('https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID');
      this.loadedScripts.add('ga');
    }

    // Marketing scripts (only if marketing consent given)
    if (this.categories.marketing.enabled && !this.loadedScripts.has('marketing')) {
      // Load marketing scripts here
      this.loadedScripts.add('marketing');
    }
  }

  loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }

  unlockEmbeds() {
    if (this.categories.media.enabled) {
      // Unlock YouTube embeds
      document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        iframe.src = iframe.getAttribute('data-src');
        iframe.removeAttribute('data-src');
      });

      // Unlock Google Maps
      document.querySelectorAll('[data-consent-media]').forEach(element => {
        element.removeAttribute('data-consent-media');
        element.style.display = 'block';
      });
    }
  }

  // Public method to request specific category
  grantCategory(category) {
    if (this.categories[category] && !this.categories[category].locked) {
      this.categories[category].enabled = true;
      this.savePreferences();
      this.applyStoredPreferences();
    }
  }

  // Public method to check if category is granted
  hasConsent(category) {
    return this.categories[category]?.enabled || false;
  }
}

export default ConsentManager;
