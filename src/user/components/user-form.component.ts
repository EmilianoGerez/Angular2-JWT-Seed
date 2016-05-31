import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Validators, FormBuilder, ControlGroup, FORM_DIRECTIVES} from "@angular/common";
import {UserValidators} from "../classes/user.validators";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'user-form',
  templateUrl: './app/user/templates/user-form.template.html',
  directives: [FORM_DIRECTIVES],
  providers: [AuthService]
})

export class UserFormComponent {
  userForm:ControlGroup;
  errorMsg:any;
  isSent:boolean = false;
  sending:boolean = false;

  constructor(fb:FormBuilder,
              private _userService:UserService) {

    this.userForm = fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        UserValidators.validEmail
      ]), UserValidators.emailUnique(this._userService)],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ])],
      repassword: ['', Validators.required]
    }, {validator: UserValidators.passwordMatch});
  }

  onSubmit(form:any) {
    this._userService.create(form)
      .subscribe(
        () => {
          this.isSent = true;
          this.sending = false;
        },
        (err:any) => {
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


