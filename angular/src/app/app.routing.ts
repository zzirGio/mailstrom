import { Routes, RouterModule } from '@angular/router';

import {
  LandingComponent,
  LoginComponent,
  MessageEditComponent,
  MessageListComponent,
  RegisterComponent,
  DashboardComponent,
  UserManagementComponent,
  ResetPasswordComponent,
  MessageCreateComponent
} from '@views';

import { AuthGuard } from '@guards';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    component: MessageListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-message',
    component: MessageCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-message/:id',
    component: MessageEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRouterModule = RouterModule.forRoot(appRoutes);
