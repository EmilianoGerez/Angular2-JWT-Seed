import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'session-list',
  templateUrl: './app/user/templates/session-list.template.html',
  providers: [AuthService]
})

export class SessionListComponent {
  @Input() userData:User;
  errorMsg:any;
  successMsg:any;
  isClosing:boolean = false;

  constructor(private _authService:AuthService) {
  }

  closeSession(selectedSession:any) {
    this.isClosing = true;
    let sessionId = selectedSession._id;
    this._authService.closeSession(sessionId)
      .subscribe(
        req => {
          this.isClosing = false;
          this.closeSuccess(sessionId);
        },
        err => this.setError(err)
      );
  }


  private setError(err:any) {
    this.errorMsg = {
      head: 'Oops!!',
      msg: 'something went wrong.'
    };
  }

  private closeSuccess(sessionId:string) {
    let sessions = this.userData.sessions;

    sessions = sessions.filter(session => {
      return session._id !== sessionId;
    });

    this.userData.sessions = sessions;

    this.successMsg = {
      head: 'Session closed!!',
      msg: ''
    };
  }
}
