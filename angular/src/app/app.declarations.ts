
import * as _MODULES from '@modules';
import * as _GUARDS from '@guards';
import * as _COMPONENTS from '@components';
import * as _SERVICES from '@services';
import * as _VIEWS from '@views';

export const MODULES = [
    _MODULES.MatModule
];

export const GUARDS = [
    _GUARDS.AuthGuard
];

export const COMPONENTS = [
    _COMPONENTS.AlertComponent,
    _COMPONENTS.MessageComponent,
    _COMPONENTS.MessageFormComponent,
    _COMPONENTS.NavbarComponent,
    _COMPONENTS.PageContentComponent,
    _COMPONENTS.ActionContentComponent,
    _COMPONENTS.RecentMessagesWidgetComponent,
    _COMPONENTS.UpcomingMessagesWidgetComponent,
    _COMPONENTS.TaskCardComponent,
];

export const SERVICES = [
    _SERVICES.AlertService,
    _SERVICES.AuthenticationService,
    _SERVICES.MessageService,
    _SERVICES.UserService,
];

export const VIEWS = [
    _VIEWS.LandingComponent,
    _VIEWS.LoginComponent,
    _VIEWS.MessageCreateComponent,
    _VIEWS.MessageEditComponent,
    _VIEWS.MessageListComponent,
    _VIEWS.RegisterComponent,
    _VIEWS.DashboardComponent,
    _VIEWS.UserManagementComponent,
    _VIEWS.ResetPasswordComponent
];
