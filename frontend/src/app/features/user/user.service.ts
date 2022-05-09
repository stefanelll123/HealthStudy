import { Injectable } from '@angular/core';
import { ICurrentUser } from 'src/app/interfaces/user';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: ICurrentUser;

  constructor(private globalService: GlobalService) { }

  getCurrentUser(): void {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    if(this.globalService.checkEmptyObject(user)) {
      return;
    }

    this.currentUser = user;
  }
}
