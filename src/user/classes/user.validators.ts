import {Control, ControlGroup} from "@angular/common";
import {UserService} from "../services/user.service";
import 'rxjs/add/operator/map';

export class UserValidators {

  static emailUnique(userService:UserService) {
    return function (control:Control) {
      return new Promise((resolve, reject) => {
        userService.emailVerify(control)
          .map(res => res.json())
          .subscribe(
            res => {
              if (res.available) {
                resolve(null);
              } else {
                resolve({emailUnique: true});
              }
            },
            err => {
              resolve(null);
            }
          );

      });
    };
  }

  static validEmail(control:Control) {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return (re.test(control.value)) ? null : {validEmail: true};
  }

  static passwordMatch(group:ControlGroup) {
    let password = group.find('password').value;
    let repassword = group.find('repassword').value;

    if (password === '' || repassword === '') {
      return null;
    }

    if (password !== repassword) {
      return {passwordMatch: true};
    }

    return null;
  }


}
