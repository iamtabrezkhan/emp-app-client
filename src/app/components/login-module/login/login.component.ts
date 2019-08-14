import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logInForm: FormGroup;
  public email: FormControl;
  public password: FormControl;

  public isLoading = false;
  public errorMsg = 'Please fill all the details';
  public error = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if(this.userService.getUserToken()) {
      this.router.navigate(['user']);
    }
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.logInForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit(formValue) {
    if(this.isLoading) {
      return;
    }
    this.error = false;
    if(this.logInForm.valid) {
      this.isLoading = true;
      var user = this.logInForm.value;
      this.userService.authUser(user.email.toLowerCase(), user.password).subscribe(
        data => {
          this.isLoading = false;
          if(data['success']) {
            this.userService.emit({
              event: 'notification',
              notification: data['message']
            })
            this.userService.saveUser(data['user']);
            this.userService.saveUserToken(data['accessToken']);
            this.router.navigate(['user']);
          } else {
            this.error = true;
            this.errorMsg = data['error'];
          }
        }
      )
    } else {
    }
  }

  goToSignUp() {
    this.router.navigate(['signup']);
  }

}
