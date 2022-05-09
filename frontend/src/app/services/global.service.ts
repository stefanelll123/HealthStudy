import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  checkEmptyObject(obj: any): boolean {
     
    if(!obj) {
      return true;
    }

    return !Object.keys(obj).length;
  }
}
