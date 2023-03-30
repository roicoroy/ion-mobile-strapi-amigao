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
import { UtilityService } from '../utility/utility.service';
import { IonStorageService } from '../storage/ionstorage.service';
import { NavigationService } from '../navigation/navigation.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AlertController } from '@ionic/angular';
import { IStrapiStateModel } from 'src/app/store/auth/auth.interface';

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
        // this.user = this.store.selectSnapshot<IStrapiStateModel>((state) => state.auth.user);
        // console.log(this.user);
    }

    async initListerners(): Promise<void> {
        console.error('initListerners: ');
        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error: ' + JSON.stringify(error));
        });

        PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
            console.log('Push received: ', notification);
            const alert = await this.alertCtrl.create({
                header: 'You got a message',
                subHeader: 'FCM message',
                message: JSON.stringify(notification),
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            // this.navigation.navigateForwardParams(`/fcm-details`, JSON.stringify(notification));
                            console.log(notification)
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

    async initPush() {
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive !== 'granted') {
            this.utility.presentAlert('User denied permissions!');
            throw new Error('User denied permissions!');
        }
        await PushNotifications.removeAllListeners();
        PushNotifications.requestPermissions()
            .then(async (permission) => {
                if (permission.receive == 'granted') {
                    await PushNotifications.register();
                    PushNotifications.addListener('registration', async (token: PushNotificationToken) => {
                        console.log('My token: ' + JSON.stringify(token));
                        if (token != null) {
                            this.postFcmTokenToStrapi(token);
                        }
                    }
                    );
                }
            });
    }
    postFcmTokenToStrapi(fcmToken) {
        this.user = this.store.selectSnapshot<any>((state) => state.auth.user);
        console.log('fcmToken :>> ', fcmToken);
        this.http.put(environment.BASE_PATH + '/api/users/' + this.user?.id, {
            device_token: fcmToken.value,
        }).subscribe((user) => {
            console.log('fcm token posted user ', user);
        });
    }
}
