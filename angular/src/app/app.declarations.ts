
import {
    AuthGuard
} from '@guards';

import {
    AlertComponent,
    NavbarComponent,
    PageContentComponent,
    ActionContentComponent
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
    DashboardComponent,
    ResetPasswordComponent
} from '@views';

export const GUARDS = [
    AuthGuard,
];

export const COMPONENTS = [
    AlertComponent,
    NavbarComponent,
    PageContentComponent,
    ActionContentComponent,
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
    DashboardComponent,
    ResetPasswordComponent
];
