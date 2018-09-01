import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '@guards';
import { ScheduledMessagesComponent } from './scheduled-messages/scheduled-messages.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'messages', component: ScheduledMessagesComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
