import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserService } from './services/user.service';
import { Animations } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.noti
  ]
})
export class AppComponent implements OnInit, AfterContentChecked {

  title = 'Employee App';
  public token;
  public user;
  public notification = null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.listen().subscribe(
      data => {
        if(data['event'] === 'notification') {
          this.notification = data['notification'];
          var that = this;
          setTimeout(function() {
            that.notification = null;
          }, 2000);
        } 
      }
    )
  }

  ngAfterContentChecked() {
    this.token = this.userService.getUserToken();
    this.user = this.userService.getUser();
  }

}
