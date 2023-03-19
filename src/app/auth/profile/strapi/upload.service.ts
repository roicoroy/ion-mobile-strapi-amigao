import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs';
import { IonStorageService } from 'src/app/shared/services/storage/ionstorage.service';
import { StrapiService } from 'src/app/shared/services/strapi/strapi.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        private strapi: StrapiService,
        private storage: IonStorageService,
    ) { }

    async onImagePicked(file, strapiUser?) {
        const response = await fetch(file);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append('files', blob, file.name);
        this.uploadData(formData, strapiUser);
    }
    async uploadData(formData, strapiUser?) {

        this.http.post(environment.API_BASE_PATH + '/upload', formData, { headers: this.headers }).pipe(
            finalize(() => {

            }),
        ).subscribe((response: any) => {
            if (response) {
                const fileId = response[0].id;
                // console.log(response);
                // console.log(this.strapiUser);
                if (strapiUser.id) {
                    this.http.put(environment.BASE_PATH + '/api/users/' + strapiUser.id, {
                        data: {
                            attachments: fileId,
                        },
                        avatar: fileId,
                    }).subscribe((res: any) => {
                        // console.log(res.id);
                        // this.strapi.setTokenResponse(res.id);
                        if (res) {
                            this.strapi.loadUser(res.id).subscribe((res: any) => {
                                // this.strapiUser = res;
                                console.log(res);
                                this.storage.storageSet('user', res);
                            });
                        }
                    });
                }
            }
        });
    }
}
