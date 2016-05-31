import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'activation-form',
  templateUrl: './app/user/templates/activation-form.template.html',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [AuthService]
})

export class ActivationComponent implements OnInit {
  activationForm:ControlGroup;
  codeModel:string;
  disabledInput:boolean = false;
  errorMsg:any;
  isActivated:boolean = false;
  sending:boolean = false;

  constructor(private fb:FormBuilder,
              private _authService:AuthService,
              private _params:RouteParams) {

    this.activationForm = fb.group({
      code: ['', Validators.required]
    });

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
    this._authService.activate(formValue)
      .subscribe(
        res => {
          this.isActivated = true;
          this.sending = false;
        },
        err => {
          this.sending = false;
          this.setError(err);
        });
  }

  private setError(err:any) {
    let errResponse = err.json();

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

