
import {
    AuthGuard
} from '@guards';

import {
    AlertComponent,
    NavbarComponent 
} from '@components';

import {
    AlertService,
    AuthenticationService,
    UserService,
} from '@services';

import {
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent    
} from '@views';


export const GUARDS = [
    AuthGuard,
];

export const COMPONENTS = [
    AlertComponent,
    NavbarComponent
];

export const SERVICES = [
    AlertService,
    AuthenticationService,
    UserService,
];

export const VIEWS = [
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
];