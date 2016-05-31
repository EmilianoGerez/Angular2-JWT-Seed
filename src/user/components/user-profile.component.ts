import {Component, OnInit} from "@angular/core";
import {PrivateComponent} from "../../shared/classes/private-route.class";
import {Router, RouteParams} from '@angular/router-deprecated';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {ProfileDataComponent} from "./partials/profile-data.component";
import {SessionListComponent} from "./partials/session-list.component";

@Component({
  selector: 'user-profile',
  templateUrl: './app/user/templates/user-profile.template.html',
  directives: [ProfileDataComponent, SessionListComponent]
})
export class UserProfileComponent extends PrivateComponent implements OnInit {
  user:User = new User();
  profileSection:string = 'Profile';

  constructor(private router:Router,
              private _routeParams:RouteParams,
              private _userService:UserService) {
    super(router);
  }

  ngOnInit() {
    let id = this._routeParams.get('id');
    // check for id param or if the id belongs to the current user
    if (id !== this._userService.getCurrentUser()._id) {
      return this.router.navigateByUrl('/home');
    }

    this._userService.getOne(id)
      .subscribe(user => this.user = user);
  }

  setSection(name:string) {
    this.profileSection = name;
  }
}
