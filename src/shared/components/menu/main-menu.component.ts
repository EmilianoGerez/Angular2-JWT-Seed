import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {AuthService} from "../../../user/services/auth.service";
import {UserService} from "../../../user/services/user.service";

@Component({
  selector: 'main-menu',
  templateUrl: './app/shared/components/menu/main-menu.template.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService]
})

export class MainMenuComponent {

  constructor(private _router:Router,
              private _authService:AuthService,
              private _userService:UserService) {
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  getUserData() {
    return this._userService.getCurrentUser();
  }

  isCurrentRoute(route:any) {
    let instruction = this._router.generate(route);
    return this._router.isRouteActive(instruction);
  }

  logout() {
    return this._authService.logout();
  }

}
