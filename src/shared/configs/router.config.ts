import {HomeComponent} from "../../home/components/home.component";
import {UserProfileComponent} from "../../user/components/user-profile.component";
import {LoginFormComponent} from "../../user/components/login-form.component";
import {UserFormComponent} from "../../user/components/user-form.component";
import {ActivationComponent} from "../../user/components/activation.component";
import {SendEmailComponent} from "../../user/components/send-email.component";
import {ResetFormComponent} from "../../user/components/reset-form.component";


export const routes = {
  paths: [
    {path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true},
    // user routes
    {path: '/users/:id', name: 'UserProfile', component: UserProfileComponent},
    {path: '/login', name: 'Login', component: LoginFormComponent},
    {path: '/signup', name: 'Signup', component: UserFormComponent},
    {path: '/auth/activation/:code', name: 'Activation', component: ActivationComponent},
    {path: '/auth/forgot', name: 'Forgot', component: SendEmailComponent},
    {path: '/auth/sendactivation', name: 'SendActivation', component: SendEmailComponent},
    {path: '/auth/reset/:code', name: 'Reset', component: ResetFormComponent},
    // default route
    {path: '/*other', name: 'Other', redirectTo: ['Home']}
  ]
};
