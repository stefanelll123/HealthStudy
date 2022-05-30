import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/features/user/user.service';
import { IMenuItem } from 'src/app/interfaces/global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menu: IMenuItem[];

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu(): void {
    this.menu = [
      {
        name: 'Home',
        icon: 'home',
        link: '/home',
        isVisible: true,
      },
      {
        name: 'Studies',
        icon: 'studies',
        link: '/studies',
        isVisible: this.userService.currentUser?.isDoctor,
      },
      {
        name: 'Feedback',
        icon: 'feedback',
        link: '/feedback',
        isVisible: !this.userService.currentUser?.isDoctor,
      },
    ];
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
