import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

export interface ErrorAlertOptions {
  header?: any;
  subHeader?: any;
  message?: any;
}

@Injectable()
export class ErrorDialogService {
  private opened = false;

  constructor(
    // private dialog: MatDialog,
    private alertController: AlertController
  ) { }

  async openDialog(message: string, status?: number): Promise<void> {
    if (!this.opened) {
      this.opened = true;
      const alert = await this.alertController.create({
        // header: 'Alert',
        // subHeader: 'Important message',
        message: message,
        buttons: ['OK'],
      });
      await alert.present();

      alert.onWillDismiss().then(() => {
        this.opened = false;
      });
    }
  }
}
