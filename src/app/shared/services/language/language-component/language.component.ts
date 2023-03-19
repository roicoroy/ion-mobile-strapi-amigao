/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { IonLanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IonStorageService } from '../../storage/ionstorage.service';
import { SAVED_LANGUAGE } from '../language.service';

@Component({
  selector: 'ng-ion-workspace-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  profile: any;
  availableLanguages: any = [];
  translations: any;
  translateSub: Subscription;
  selectedLanguage: any;
  constructor(
    public translate: TranslateService,
    public languageService: IonLanguageService,
    public alertController: AlertController,
    private storageService: IonStorageService,
    public popoverController: PopoverController,
  ) {
    // this.getTranslations();
  }
  ngOnInit(): void {
    this.availableLanguages = this.languageService.getLanguages();
    // throw new Error('Method not implemented.');
  }

  ionViewWillEnter() {
    this.storageService.storageGet(SAVED_LANGUAGE).then((language) => {
      // console.log(language);
      this.selectedLanguage = language;
    });
    // console.log(this.availableLanguages);
  }

  selectLanguage(item: any) {
    // console.log(item);
    this.selectedLanguage = item?.code;
    // console.log(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.storageService.storageSet(SAVED_LANGUAGE, this.selectedLanguage);
    this.popoverController.dismiss();
    this.getTranslations();
  }

  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate.getTranslation(this.translate.currentLang)
      .subscribe((translations) => {
        this.translations = translations;
      });
  }

  // async openLanguageChooser() {
  //   this.availableLanguages = this.languageService.getLanguages()
  //     .map((item: any) => ({
  //       name: item.name,
  //       type: 'radio',
  //       label: item.name,
  //       value: item.code,
  //       checked: item.code === this.translate.currentLang
  //     }));

  //   const alert = await this.alertController.create({
  //     header: this.translations.SELECT_LANGUAGE,
  //     inputs: this.availableLanguages,
  //     cssClass: 'language-alert',
  //     buttons: [
  //       {
  //         text: this.translations.CANCEL,
  //         role: 'cancel',
  //         cssClass: 'translate-alert',
  //         handler: () => { }
  //       }, {
  //         text: this.translations.OK,
  //         handler: (data) => {
  //           console.log(data);
  //           if (data) {
  //             this.translate.use(data);
  //             this.storageService.storageSet(SAVED_LANGUAGE, data);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
}
