import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: "uk.mobile.alpha",
    appName: "ion-mobile-strapi-news",
    webDir: "www",
    bundledWebRuntime: false,
    plugins: {
        SplashScreen: {
            splashFullScreen: false,
            splashImmersive: false,
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: "#FF5722",
            showSpinner: true,
            androidSpinnerStyle: "large",
            iosSpinnerStyle: "small",
            spinnerColor: "#512DA8",
        },
        PushNotifications: {
            presentationOptions: [
                "alert"
            ]
        }
    }
};

export default config;