import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-fcm-details',
  templateUrl: './fcm-details.page.html',
  styleUrls: ['./fcm-details.page.scss'],
})
export class FcmDetailsPage implements OnInit {

  id = null;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // this.id = params.get('id');
      // this.teamEntry = JSON.parse(params);
      console.log(params);
    });
  }

  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }

}
