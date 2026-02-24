import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.flavortown.app',
    appName: 'FlavorTown',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    }
};

export default config;
