import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
