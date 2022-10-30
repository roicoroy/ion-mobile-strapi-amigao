import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as nanoid from 'nanoid';
export const KEY = null;

@Injectable({
  providedIn: 'root'
})
export class StorageCrudService {

  constructor(
    private storage: Storage,
  ) { }
  deleteAll() {
    this.storage.remove(KEY);
  }
  get(): Promise<any[]> {
    return this.storage.get(KEY);
  }
  add(item): Promise<any[]> {
    item.id = nanoid(12);
    return this.storage.get(KEY)
      .then((formItems: any[]) => {
        console.log(formItems);
        if (formItems) {
          formItems.push(item);
          return this.storage.set(KEY, formItems);
        } else {
          return this.storage.set(KEY, [item]);
        }
      });
  }
  update(item: any): Promise<any> {
    return this.storage.get(KEY)
      .then((formItems: any[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: any[] = [];
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item);
          } else {
            newFormItem.push(form);
          }
        }
        return this.storage.set(KEY, newFormItem);
      });
  }
  delete(id: number): Promise<any> {
    return this.storage.get(KEY)
      .then((formItems: any[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: any[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set(KEY, formsToKeep);
      });
  }
}
