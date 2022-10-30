import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonStorageService } from 'src/app/shared/services/ionstorage.service';
import { FcmService } from 'src/app/shared/services/strapi-fcm.serivce';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { IUser } from 'src/app/shared/types/models/User';
import { AuthActions } from '../../../store/auth.actions';
import { ProfileFacade } from '../profile.facade';
import { UploadService } from './upload.service';

@Component({
  selector: 'ng-ion-workspace-strapi',
  templateUrl: './strapi.component.html',
  styleUrls: ['./strapi.component.scss'],
})
export class StrapiComponent implements OnInit, AfterViewInit {
  avatar;
  user;
  strapiUserState$: Observable<any>;

  strapiProfileForm: FormGroup;

  validation_messages: any = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    first_name: [
      { type: 'required', message: 'Name is required.' }
    ],
    last_name: [
      { type: 'required', message: 'Last name is required.' }
    ],
    address_1: [
      { type: 'required', message: 'Address 1 line name is required.' }
    ],
    address_2: [
      { type: 'required', message: 'Address 2 line name is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    phone: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    city: [
      { type: 'required', message: 'City is required.' },
    ],
    postal_code: [
      { type: 'required', message: 'Post Code is required.' },
    ],
    country: [
      { type: 'required', message: 'Country is required.' },
    ],
  };

  strapiUser: IUser;

  regionsList: any[];

  countries: any = [];

  countriesList = [];

  selectedCountry;

  isMedusaProfileReady = false;

  fcmToken: string;

  hasToken = false;

  get regionCodeControl() {
    return this.strapiProfileForm.get('region_code') as FormControl;
  }
  get countryControl() {
    return this.strapiProfileForm.get('country') as FormControl;
  }
  get strapiFormGroup() {
    return this.strapiProfileForm as FormGroup;
  }
  constructor(
    private formBuilder: FormBuilder,
    private facade: ProfileFacade,
    private http: HttpClient,
    private strapi: StrapiService,
    private toastCtrl: ToastController,
    private store: Store,
    private fcm: FcmService
  ) {

    this.countries = [
      {
        iso_2: 'US',
        displayName: 'United States',
      },
      {
        iso_2: 'IT',
        displayName: 'Italy',
      }
    ];


    this.strapiUserState$ = this.facade.viewState$;

    this.strapiProfileForm = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required
      ])),
      email: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required,
      ])),
      region_code: new FormControl(''),
      country: new FormControl(''),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address_1: new FormControl('', Validators.required),
      address_2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  ngOnInit(): void {
    this.regionsList = [];
    this.countries = [];

    this.strapiUserState$.subscribe((user: any) => {
      // console.log(user.userState);
      this.strapiUser = user.userState;
    });
    if (this.strapiUser?.id) {
      this.strapi.loadUser(this.strapiUser?.id).subscribe((res: any) => {
        this.avatar = res?.avatar?.url != null ? res.avatar?.url : 'assets/shapes.svg';
        this.strapiUser = res;
        if (this.strapiUser?.country) {
          this.strapiProfileForm.get('country').setValue(this.strapiUser?.country);
        }
        if (this.strapiUser?.username && this.strapiUser?.username) {
          this.strapiProfileForm.get('username').setValue(this.strapiUser?.username);
          this.strapiProfileForm.get('email').setValue(this.strapiUser?.email);
        }
        if (this.strapiUser?.region_code) {
          this.regionCodeControl.setValue(this.strapiUser?.region_code);
        }
      });
    }
  }
  ngAfterViewInit() {
    this.isMedusaProfileReady = this.strapiProfileForm.valid ? true : false;
  }
  onToggleChange($event) {
    // console.log($event.detail.checked);
    // console.log($event.detail.value);
    this.fcm.checkDevice();
  }
  onRegionCodeChange($event: any) {
    this.countries = [];
    // console.log($event.detail.value);
    if ($event.detail.value) {
      // console.log($event.detail.value);
    }
  }
  updateStrapiUser() {
    this.strapi.loadUser(this.strapiUser?.id).subscribe((res: any) => {
      this.strapiUser = res;
      // console.log(this.strapiUser);
      this.store.dispatch(new AuthActions.UpdateStrapiUser(this.strapiUser?.id, this.strapiProfileForm.value))
        .subscribe((updatedState: any) => {
          // console.log(updatedState.authState);
          // console.log(this.strapiProfileForm.valid);
          this.isMedusaProfileReady = updatedState.authState.strapiProfileForm.model != null && this.strapiProfileForm.valid ? true : false;
          // console.log(this.isMedusaProfileReady);
        });
    });
  }
  async onImagePicked(file) {
    // this.upload.onImagePicked(file, this.strapiUser);
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    this.uploadData(formData);
  }
  async uploadData(formData) {
    this.strapi.uploadData(formData).subscribe((response: any) => {
      if (response) {
        const fileId = response[0].id;
        // console.log(response, fileId);
        this.strapi.setProfileImage(this.strapiUser?.id, fileId)
          .subscribe((user: any) => {
            console.log(user);
            this.store.dispatch(new AuthActions.SetUploadedUser(user));
          });
      }
    });
  }
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
}