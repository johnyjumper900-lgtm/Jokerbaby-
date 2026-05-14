import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jokerbaby.app',
  appName: 'Jokerbaby',
  webDir: 'dist', // sera surchargé par le workflow
  ios: {
    deploymentTarget: '18.0'
  },
  server: {
    allowNavigation: [
      "*.winamax.fr",
      "*.winamax.com"
    ]
  }
};

export default config;