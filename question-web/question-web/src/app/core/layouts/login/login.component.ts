import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup = this.fb.group({
    username: ['admin', Validators.required],
    password: ['123456', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  // Convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  // Convenience getter for easy access to form fields values
  // tslint:disable-next-line:typedef
  get v() {
    return this.formGroup.value;
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login(this.v.username, this.v.password)
      .subscribe(() => {
        this.router.navigate(['/']).then();
      }, () => {
        alert('Username or password invalid!');
      });
  }
}
