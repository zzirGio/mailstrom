
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
    MessageService,
    UserService,
} from '@services';

import {
    LandingComponent,
    LoginComponent,
    MessageListComponent,
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
    MessageService,
    UserService,
];

export const VIEWS = [
    LandingComponent,
    LoginComponent,
    MessageListComponent,
    RegisterComponent,
    DashboardComponent
];
