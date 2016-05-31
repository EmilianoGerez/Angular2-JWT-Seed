import {Component, Input} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Validators, FormBuilder, ControlGroup, FORM_DIRECTIVES} from "@angular/common";
import {UserValidators} from "../../classes/user.validators";
import {User} from "../../models/user.model";

@Component({
  selector: 'user-data',
  templateUrl: './app/user/templates/profile-data.template.html',
  directives: [FORM_DIRECTIVES]
})

export class ProfileDataComponent {
  @Input() currentUser:User;
  userData:User = new User();
  updateNameForm:ControlGroup;
  updatePassForm:ControlGroup;
  nameEdit:boolean = false;
  passEdit:boolean = false;
  errorMsg:any;
  successMsg:any;

  constructor(fb:FormBuilder,
              private _userService:UserService) {

    this.updateNameForm = fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    });

    this.updatePassForm = fb.group({
      oldPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ])],
      repassword: ['', Validators.required]
    }, {validator: UserValidators.passwordMatch});
  }

  update() {
    this._userService.update(this.userData)
      .subscribe(
        res => {
          this.nameEdit = false;
          this.passEdit = false;
          this.setSuccess(res);
        },
        err => this.setError(err));
  }

  private setError(err:any) {
    let errResponse = err.json();
    switch (errResponse.error) {
      case 'currentPassword':
        this.errorMsg = {
          head: 'Invalid current password!!',
          msg: 'please verify this.'
        };
        break;
      default:
        this.errorMsg = {
          head: 'Oops!!',
          msg: 'something went wrong.'
        };
    }
  }

  private setSuccess(res:any) {
    switch (res.type) {
      case 'passChanged':
        this.successMsg = {
          head: 'Password changed successfully!!',
          msg: 'remember to use this in the next login.'
        };
        break;
      default:
        this.successMsg = {
          head: 'User updated!!',
          msg: 'all is ok.'
        };
    }
  }
}
