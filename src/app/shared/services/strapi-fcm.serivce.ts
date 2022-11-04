import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
    PushNotifications,
    Token,
    PushNotification,
    PushNotificationActionPerformed,
    PushNotificationToken,
    PushNotificationSchema,
} from '@capacitor/push-notifications';

import { Device } from '@capacitor/device';
import { UtilityService } from './utility.service';
import { IonStorageService } from './ionstorage.service';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthStateModel } from 'src/app/store/auth.state';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    user;
    deviceInfo;
    headers_json = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        private utility: UtilityService,
        private ionStorage: IonStorageService,
        private navigation: NavigationService,
        private router: Router,
        private store: Store,
        private alertCtrl: AlertController,
    ) {
        this.user = this.store.selectSnapshot<AuthStateModel>((state) => state.authState.user);
    }

    async initPush() {
        const device = await Device.getInfo();
        if (device.platform !== 'web') {

            let permStatus = await PushNotifications.checkPermissions();

            if (permStatus.receive !== 'granted') {
                this.utility.presentAlert('User denied permissions!');
                throw new Error('User denied permissions!');
            }

            await PushNotifications.removeAllListeners();
            this.registerPush();

        } else {
            // this.utility.presentAlert('Need to be on mobile');
        }
    }

    private async registerPush() {
        PushNotifications.requestPermissions().then((permission) => {
            if (permission.receive == 'granted') {
                PushNotifications.register();
                this.addFcmPushListerners();
            } else {
                // No permission for push granted
            }
        });
    }

    async addFcmPushListerners() {

        PushNotifications.addListener('registration', async (token: PushNotificationToken) => {
            // const deviceInfo = await Device.getInfo();
            // console.log('My token: ' + JSON.stringify(token));
            this.postFcmTokenToStrapi(token);
        }
        );

        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error: ' + JSON.stringify(error));
        });

        PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
            // console.log('Push received: ', notification);
            const alert = await this.alertCtrl.create({
                header: 'You got a message',
                subHeader: 'FCM message',
                message: JSON.stringify(notification),
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            this.navigation.navigateForwardParams(`/fcm-details`, JSON.stringify(notification));
                        },
                    },
                    {
                        text: 'Open Message',
                        handler: () => {
                            // this.navigation.navigateForwardParams(`/fcm-details`, JSON.stringify(notification));
                        },
                    },
                ]
            });

            alert.present();
        }
        );

        PushNotifications.addListener('pushNotificationActionPerformed', async (notification) => {
            const data = notification.notification.data;
            // console.log('Action performed: ' + JSON.stringify(notification.notification));
            if (data.detailsId) {
                alert('pushNotificationActionPerformed');
                this.navigation.navigateForwardParams(`/fcm-details`, notification.notification);
            }
        });

    }

    postFcmTokenToStrapi(fcmToken) {
        console.log('fcmToken :>> ', fcmToken);
        if (this.user.device_token == null || this.user.device_token !== fcmToken) {
            console.log('user :>> ', this.user);
            this.http.put(environment.BASE_PATH + '/api/users/' + this.user?.id, {
                device_token: fcmToken.value,
            }).subscribe((user) => {
                console.log('fcm token posted user ', user);
            });
        }
    }
}


