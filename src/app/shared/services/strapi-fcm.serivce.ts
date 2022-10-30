import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
} from '@capacitor/push-notifications';

import { Device } from '@capacitor/device';
import { UtilityService } from './utility.service';
import { IonStorageService } from './ionstorage.service';

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    headers_json = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        private utility: UtilityService,
        private ionStorage: IonStorageService
    ) { }

    initFCM() {
        Device.getInfo().then((info) => {
            console.log(info);
            PushNotifications.requestPermissions().then(result => {
                if (result.receive === 'granted') {
                    // Register with Apple / Google to receive push via APNS/FCM
                    PushNotifications.register();
                } else {
                    // Show some error
                }
            });
            PushNotifications.addListener('registration',
                (token: Token) => {
                    console.log('Push registration success, token: ' + token.value)
                    if (token) {
                        // this.postFcmTokenToStrapi(token.value, info);
                        this.ionStorage.getKeyAsObservable('user').subscribe((user) => {
                            console.log(user?.id);
                            if (user) {
                                this.http.put(environment.BASE_PATH + '/api/users/' + user?.id, {
                                    device_token: token.value,
                                }).subscribe((res: any) => {
                                    console.log(res);
                                });
                            }
                        });
                    }
                }
            );
            PushNotifications.addListener('registrationError',
                (error: any) => {
                    console.log('Error on registration: ' + JSON.stringify(error));
                }
            );
            PushNotifications.addListener('pushNotificationReceived',
                (notification: PushNotificationSchema) => {
                    alert('Push received: ' + JSON.stringify(notification));
                }
            );
            PushNotifications.addListener('pushNotificationActionPerformed',
                (notification: ActionPerformed) => {
                    console.log('Push action performed: ' + JSON.stringify(notification));
                }
            );

        });
    }

    postFcmTokenToStrapi(fcmToken: string, info) {
        console.log('fcmToken :>> ', fcmToken, info);
        this.ionStorage.getKeyAsObservable('user').subscribe((user) => {
            console.log(user.id);
            if (user) {
                this.http.put(environment.BASE_PATH + '/api/users/' + user.id, {
                    device_token: fcmToken,
                });
            }
        });
    }
    checkDevice() {
        this.initFCM();
        Device.getInfo().then((info) => {

            // if (info.platform == 'web') {
            //     this.utility.showToast('you are on the web mate', 'middle', 2000);
            // }
            // if (info.platform == 'android' || info.platform == 'ios') {
            //     this.initFCM();
            // }
        });
    }
}