import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageComponent } from 'src/app/shared/services/language/language-component/language.component';
import { IonLanguageService } from 'src/app/shared/services/language/language.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsValid: boolean | null = null;

  constructor(
    public popoverController: PopoverController,
    public languageService: IonLanguageService,
    private navigation: NavigationService,
  ) { }

  ngOnInit() { }
  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: LanguageComponent,
      event: e,
    });

    await popover.present();

    // const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
    // this.roleMsg = `Popover dismissed with role: ${role}`;
  }
  homePage(){
    this.navigation.navigateForward('/home', 'back');
  }
  strapiPage(){
    this.navigation.navigateFlip('/auth/profile/strapi');
  }
}
