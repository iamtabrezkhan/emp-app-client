import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public user;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.userService.getSingleUser(params['id']).subscribe(
          data => {
            if(data['success']) {
              this.user = data['user'];
            } else {
              if(data['error'] === 'Requested user not found') {
                this.userService.emit({
                  event: 'notification',
                  notification: data['error']
                });
                this.router.navigate(['user']);
              }
              if(data['error'] === 'Requesting user not found') {
                this.userService.emit({
                  event: 'notification',
                  notification: data['error']
                });
                this.userService.logout();
              }if(data['error'] === 'Department does not match') {
                this.userService.emit({
                  event: 'notification',
                  notification: `Unauthorized! ${data['error']}`
                });
                this.router.navigate(['user']);
              }
            }
          }
        )
      }
    )
  }

  goBack() {
    this.location.back();
  }

}
