
import * as _MODULES from '@app/_modules';
import * as _GUARDS from '@app/_guards';
import * as _COMPONENTS from '@app/_components';
import * as _SERVICES from '@app/_services';
import * as _VIEWS from '@app/views';

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
    _VIEWS.ResetPasswordComponent,
    _VIEWS.TemplateDetailComponent,
    _VIEWS.TemplateCreateComponent,
    _VIEWS.TemplateManagementComponent
];
