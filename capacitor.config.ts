import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jokerbaby.app',
  appName: 'Jokerbaby',
  webDir: 'dist',
  
  // 1. Autoriser la navigation vers les domaines Winamax
  server: {
    allowNavigation: [
      '*.winamax.fr',
      '*.winamax.com',
      'winamax.fr',
      'winamax.com'
    ],
    // Aide à la gestion des cookies et du stockage local
    iosScheme: 'https',
    hostname: 'app.jokerbaby.com' 
  },

  // 2. Tromper la détection de Winamax (User-Agent)
  // Winamax bloque souvent les "WebViews" pur jus. On se fait passer pour un Safari mobile standard.
  overrideUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',

  ios: {
    // 3. Important pour autoriser le chargement de scripts externes
    limitsNavigationsToAppBoundDomains: false,
    scheme: 'Jokerbaby',
    contentInset: 'always'
  }
};

export default config;
