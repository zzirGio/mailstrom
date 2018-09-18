
import {
    AuthGuard
} from '@guards';

import {
    AlertComponent,
    MessageComponent,
    MessageFormComponent,
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
    MessageEditComponent,
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
    MessageFormComponent,
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
    MessageEditComponent,
    MessageListComponent,
    RegisterComponent,
    DashboardComponent,
    UserManagementComponent,
    ResetPasswordComponent
];
