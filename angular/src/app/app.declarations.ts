
import * as _MODULES from '@modules';
import * as _GUARDS from '@guards';
import * as _COMPONENTS from '@components';
import * as _SERVICES from '@services';
import * as _VIEWS from '@views';

export const ENTRY_COMPONENTS = [
    _COMPONENTS.DeleteUserDialogContentComponent,
    _COMPONENTS.DeleteMessageDialogContentComponent,
];

export const MODULES = [
    _MODULES.MatModule
];

export const GUARDS = [
    _GUARDS.AuthGuard
];

export const COMPONENTS = [
    _COMPONENTS.AlertComponent,
    _COMPONENTS.ContactComponent,
    _COMPONENTS.ContactFormComponent,
    _COMPONENTS.MessageComponent,
    _COMPONENTS.MessageFormComponent,
    _COMPONENTS.NavbarComponent,
    _COMPONENTS.PageContentComponent,
    _COMPONENTS.ActionContentComponent,
    _COMPONENTS.MessageWidgetComponent,
    _COMPONENTS.TaskCardComponent,
    _COMPONENTS.DeleteUserDialogContentComponent,
    _COMPONENTS.DeleteMessageDialogContentComponent,
];

export const SERVICES = [
    _SERVICES.AlertService,
    _SERVICES.AuthenticationService,
    _SERVICES.ContactService,
    _SERVICES.MessageService,
    _SERVICES.UserService,
];

export const VIEWS = [
    _VIEWS.LandingComponent,
    _VIEWS.LoginComponent,
    _VIEWS.ContactCreateComponent,
    _VIEWS.ContactEditComponent,
    _VIEWS.ContactListComponent,
    _VIEWS.MessageCreateComponent,
    _VIEWS.MessageEditComponent,
    _VIEWS.MessageListComponent,
    _VIEWS.RegisterComponent,
    _VIEWS.DashboardComponent,
    _VIEWS.UserManagementComponent,
    _VIEWS.ResetPasswordComponent
];
