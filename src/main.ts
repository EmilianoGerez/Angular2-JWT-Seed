import {bootstrap}    from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {FORM_PROVIDERS} from '@angular/common';
import {AppComponent} from './app.component';
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {UserService} from "./user/services/user.service";
import {RefreshTokenService} from "./user/services/refresh-token.service";

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  FORM_PROVIDERS,
  provide(AuthConfig, {
    useFactory: () => {
      return new AuthConfig();
    }
  }),
  AuthHttp,
  RefreshTokenService,
  UserService
]);

