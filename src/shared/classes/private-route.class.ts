import {OnActivate, ComponentInstruction, Router} from '@angular/router-deprecated';
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

export class PrivateComponent implements OnActivate {
  _jwtHelper = new JwtHelper();

  constructor(private _router:Router,
              private role?:string) {
  }

  routerOnActivate(next:ComponentInstruction, prev:ComponentInstruction) {
    // verify is logged in
    if (!tokenNotExpired()) {
      this._router.navigateByUrl('/login');
    } else if (this.role && this.getUserRole() !== this.role) {
      this._router.navigateByUrl('/home');
    }
  }

  getUserRole() {
    let token = localStorage.getItem('id_token');
    if (!token) {
      return;
    }
    return this._jwtHelper.decodeToken(token).role;
  }
}
