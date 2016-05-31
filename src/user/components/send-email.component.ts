import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {AuthService} from "../services/auth.service";
import {UserValidators} from "../classes/user.validators";

@Component({
  selector: 'sendEmail-form',
  templateUrl: './app/user/templates/send-email.template.html',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [AuthService]
})

export class SendEmailComponent implements OnInit {
  sendEmailForm:ControlGroup;
  isForgot:boolean = false;
  errorMsg:any;
  isSent:boolean = false;
  sending:boolean = false;
  processName:string;
  formTitle:string;

  constructor(fb:FormBuilder,
              private _authService:AuthService,
              private _router:Router) {

    this.sendEmailForm = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        UserValidators.validEmail
      ])]
    });
  }

  ngOnInit() {
    this.isForgot = this._router.root.currentInstruction.component.routeName === 'Forgot';
    this.formTitle = (this.isForgot) ? 'Reset your password' : 'Send activation account email';
    this.processName = (this.isForgot) ? 'reset password' : 'activation account';
  }

  onSubmit(formValue:any) {
    this.errorMsg = false;
    this.sending = true;
    (this.isForgot) ? this.sendReset(formValue) : this.sendActivation(formValue);
  }

  private sendActivation(formValue:any) {
    this._authService.sendActivation(formValue)
      .subscribe(
        res => {
          this.isSent = true;
          this.sending = false;
        },
        err => {
          this.setErrorMsg(err);
        });
  }

  private sendReset(formValue:any) {
    this._authService.forgot(formValue)
      .subscribe(
        res => {
          this.isSent = true;
          this.sending = false;
        },
        err => {
          this.setErrorMsg(err);
        });
  }

  private setErrorMsg(err:any) {
    let errResponse = err.json();
    this.sending = false;

    switch (errResponse.error) {
      case 'invalidEmail':
        this.errorMsg = {
          head: 'Invalid Email!!',
          msg: 'please verify your input email.'
        };
        break;
      case 'sending':
        this.errorMsg = {
          head: 'Error Sending!!',
          msg: 'please try again'
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
