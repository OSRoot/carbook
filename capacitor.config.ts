import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.osroot.carbook',
  appName: 'carbook',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    allowNavigation: ['*'],
  }
};

export default config;
