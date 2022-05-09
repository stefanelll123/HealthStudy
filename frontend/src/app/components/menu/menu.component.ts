import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/features/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = [
    {
      name: 'Home',
      icon: 'home',
      link: '/home',
      type: 'link'
    },
    {
      name: 'Studies',
      icon: 'studies',
      link: '/studies',
    },
    {
      name: 'Feedback',
      icon: 'feedback',
      link: '/feedback'
    }
  ];

  constructor(public userService: UserService, public router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
