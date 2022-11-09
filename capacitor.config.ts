import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: "uk.mobile.alpha",
    appName: "ion-mobile-strapi-news",
    webDir: "www",
    bundledWebRuntime: false,
    plugins: {
        SplashScreen: {
            backgroundColor: "#FF5722",
        },
        PushNotifications: {
            presentationOptions: [
                "alert"
            ]
        }
    }
};

export default config;