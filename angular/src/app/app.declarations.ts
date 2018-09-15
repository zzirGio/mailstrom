
import {
    AuthGuard
} from '@guards';

import {
    AlertComponent,
    MessageComponent,
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
    UserManagementComponent,
    ResetPasswordComponent
} from '@views';

export const GUARDS = [
    AuthGuard,
];

export const COMPONENTS = [
    AlertComponent,
    MessageComponent,
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
    UserManagementComponent,
    ResetPasswordComponent
];
