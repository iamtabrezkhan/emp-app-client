import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users;
  public searchString;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => {
        if(data['success']) {
          this.users = data['users'];
        } else {
          this.userService.emit({
            event: 'notification',
            notification: data['error']
          })
        }
      }
    )
  }

  viewUser(dep, id) {
    if(dep !== this.userService.getUserDepartment()) {
      this.userService.emit({
        event: 'notification',
        notification: 'Unauthorized! Departments are not same.'
      })
    } else {
      this.router.navigate(['user', id]);
    }
  }

}
