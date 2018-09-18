import { Routes, RouterModule } from '@angular/router';

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

import { AuthGuard } from '@guards';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessageListComponent },
    { path: 'edit-message/:id', component: MessageEditComponent },
    { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRouterModule = RouterModule.forRoot(appRoutes);
