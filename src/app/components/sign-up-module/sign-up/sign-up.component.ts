import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public phone: FormControl;
  public department: FormControl;
  public departments = [
    'Computer Science',
    'Mechanical',
    'Chemical',
    'Civil'
  ]
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
    this.name = new FormControl("", Validators.required);
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]);
    this.phone = new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9\d]{10}")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.department = new FormControl("", Validators.required);
  }

  createForm() {
    this.signUpForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      department: this.department
    });
  }

  onSubmit() {
    if(this.isLoading) {
      return;
    }
    this.error = false;
    if(this.signUpForm.valid) {
      this.isLoading = true;
      var user = this.signUpForm.value;
      user['created'] = new Date();
      this.userService.signUp(user).subscribe(
        data => {
          this.isLoading = false;
          if(data['success']) {
            this.userService.emit({
              event: 'notification',
              notification: data['message']
            })
            this.router.navigate(['login']);
          } else {
            this.error = true;
            this.errorMsg = data['error'];
          }
        }
      )
    } else {
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
