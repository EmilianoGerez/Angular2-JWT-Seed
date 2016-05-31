import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {AuthService} from "../services/auth.service";
import {UserValidators} from "../classes/user.validators";

@Component({
  selector: 'reset-form',
  templateUrl: './app/user/templates/reset-form.template.html',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [AuthService]
})

export class ResetFormComponent {
  resetForm:ControlGroup;
  isReset:boolean = false;
  errorMsg:any;
  sending:boolean = false;
  disabledInput:boolean = false;
  codeModel:string;

  constructor(fb:FormBuilder,
              private _authService:AuthService,
              private _params:RouteParams) {

    this.resetForm = fb.group({
      code: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ])],
      repassword: ['', Validators.required]
    }, {validator: UserValidators.passwordMatch});

  }

  ngOnInit() {
    let code = this._params.get('code');

    if (!code || code === 'null') {
      return;
    }
    this.disabledInput = true;
    this.codeModel = code;
  }

  onSubmit(formValue:any) {
    this.errorMsg = false;
    this.sending = true;
    this._authService.resetPassword(formValue)
      .subscribe(
        res => {
          this.isReset = true;
          this.sending = false;
        },
        err => {
          this.sending = false;
          this.setError(err);
        });
  }

  private setError(err:any) {
    let errResponse = err.json();
    console.log(err);

    switch (errResponse.error) {
      case 'invalidCode':
        this.errorMsg = {
          head: 'Invalid Code!!',
          msg: 'please verify your input code.'
        };
        break;
      case 'expiredCode':
        this.errorMsg = {
          head: 'Expired Code!!',
          msg: 'please send a new activation email'
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
