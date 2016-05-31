import {Component} from "@angular/core";
import {RouteConfig, RouterOutlet} from "@angular/router-deprecated";
import {LoggedInRouterOutlet} from "./shared/directives/router-private.directives";
import {routes} from "./shared/configs/router.config";
import {MainMenuComponent} from "./shared/components/menu/main-menu.component";
import {RefreshTokenService} from "./user/services/refresh-token.service";


@RouteConfig(routes.paths)
@Component({
  selector: 'my-app',
  directives: [RouterOutlet, MainMenuComponent],
  templateUrl: './app/main.template.html'
})

export class AppComponent {
  constructor(_refreshToken:RefreshTokenService) {
  }
}
