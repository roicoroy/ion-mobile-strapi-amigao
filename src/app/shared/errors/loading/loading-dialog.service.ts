import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingDialogService {
  private opened = false;
  private loadingRef: any;

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async openDialog(): Promise<void> {
    if (!this.opened) {
      this.opened = true;

      this.loadingRef = await this.loadingCtrl.create({
        // message: 'Dismissing after 3 seconds...',
        duration: 500,
      });

      this.loadingRef.present();

      this.loadingRef.onWillDismiss().then(() => {
        this.opened = false;
      });
    }
  }

  hideDialog() {
    this.loadingRef.dismiss();
  }
}
