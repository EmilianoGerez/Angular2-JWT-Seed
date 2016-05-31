import {Component} from "@angular/core";
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {UserValidators} from "../classes/user.validators";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {RefreshTokenService} from "../services/refresh-token.service";


@Component({
  selector: 'login-form',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: './app/user/templates/login-form.template.html',
  providers: [AuthService]
})

export class LoginFormComponent {
  loginForm:ControlGroup;
  errorMsg:any;
  needsActivation:boolean;

  constructor(fb:FormBuilder,
              private _authService:AuthService,
              private _userService:UserService,
              private _refreshToken:RefreshTokenService,
              private router:Router) {

    this.loginForm = fb.group({
      email: ["", Validators.compose([
        Validators.required,
        UserValidators.validEmail
      ])],
      password: ["", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])]
    });
  }

  onSubmit(credentials:any) {
    this._authService.login(credentials)
      .subscribe(
        (res) => {
          let user = res.user;
          localStorage.setItem('id_token', res.token);
          this._userService.setCurrentUser(user);
          this._refreshToken.scheduleRefresh();
          this.router.navigateByUrl('/home');
        },
        err => {
          let errResponse = err.json();
          this.setError(errResponse);

          if (errResponse.error === 'activation') {
            this.needsActivation = true;
          }
        }
      );
  }

  private setError(errResponse:any) {

    switch (errResponse.error) {
      case 'credentials':
        this.errorMsg = {
          head: 'Invalid email or password!!',
          msg: 'please verify these.'
        };
        break;
      default:
        this.errorMsg = {
          head: 'Oops!!',
          msg: 'something went wrong.'
        };
    }
  }

}
