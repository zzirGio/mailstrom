
import {
    AuthGuard
} from '@guards';

import {
    AlertComponent
} from '@components';

import {
    AlertService,
    AuthenticationService,
    UserService,
} from '@services';

import {
    LandingComponent,
    LoginComponent,
    RegisterComponent
    
} from '@views';


export const GUARDS = [
    AuthGuard,
];

export const COMPONENTS = [
    AlertComponent
];

export const SERVICES = [
    AlertService,
    AuthenticationService,
    UserService,
];

export const VIEWS = [
    LandingComponent,
    LoginComponent,
    RegisterComponent
];