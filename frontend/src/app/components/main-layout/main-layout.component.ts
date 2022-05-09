import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/features/user/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    this.userService.getCurrentUser();
  }

}
