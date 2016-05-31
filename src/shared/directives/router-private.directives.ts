import {ViewContainerRef, DynamicComponentLoader, Directive, Attribute} from '@angular/core';
import {Router} from '@angular/router';
import {RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
import {UserService} from '../../user/services/user.service';
import {routes} from "../configs/router.config";

@Directive({
    selector: 'router-outlet',
    providers: [UserService]
})
export class LoggedInRouterOutlet extends RouterOutlet {
    // publicRoutes:Array<string>;
    // router:Router;
    //
    // constructor(_viewContainerRef:ViewContainerRef,
    //             _loader:DynamicComponentLoader,
    //             _parentRouter:Router,
    //             @Attribute('name') nameAttr:string,
    //             private userService:UserService) {
    //     super(_viewContainerRef, _loader, _parentRouter, nameAttr);
    //     this.router = _parentRouter;
    //     this.publicRoutes = routes.publicPaths;
    // }
    //
    // activate(instruction:ComponentInstruction) {
    //     if (this._canActivate(instruction.urlPath)) {
    //         return super.activate(instruction);
    //     }
    //
    //     this.router.navigate(['Signin']);
    // }
    //
    // _canActivate(url:any) {
    //     return this.publicRoutes.indexOf(url) !== -1
    //         || this.userService.isLoggedIn();
    // }
}
