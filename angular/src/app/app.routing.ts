import { Routes, RouterModule } from '@angular/router';

import {
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
} from '@views';

import { AuthGuard } from '@guards';
import { MessageListComponent } from './message-list/message-list.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessageListComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRouterModule = RouterModule.forRoot(appRoutes);
