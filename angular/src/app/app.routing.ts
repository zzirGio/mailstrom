import { Routes, RouterModule } from '@angular/router';

import {
    LandingComponent,
    LoginComponent,
    MessageListComponent,
    RegisterComponent,
    DashboardComponent,
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

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRouterModule = RouterModule.forRoot(appRoutes);
