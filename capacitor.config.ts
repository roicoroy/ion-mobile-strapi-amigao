import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
    appId: "uk.amigao.news",
    appName: "News",
    webDir: "www",
    bundledWebRuntime: false,
    plugins: {
        SplashScreen: {
            androidScaleType: "CENTER_CROP",
            splashFullScreen: false,
            splashImmersive: false,
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: "#FF5722"
          },
          Keyboard: {
            resize: KeyboardResize.Body
          },
        PushNotifications: {
            presentationOptions: [
                "alert"
            ]
        }
    }
};

export default config;