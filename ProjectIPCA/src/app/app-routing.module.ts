import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './service/components/login/login.component';
import { RegisterComponent } from './service/components/register/register.component';
import { ServiceComponent } from './service/service.component';
import { MainPageComponent } from './main/main.component';
import { EventsComponent } from './service/components/events/events.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './service/components/add-user/add-user.component';
import { UsersComponent } from './service/components/users/users.component';
import { UserEventsComponent } from './service/components/user-events/user-events.component';
import { SalariesComponent } from './service/components/salaries/salaries.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'service', component: ServiceComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
      { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard]},
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
      { path: 'user-events', component: UserEventsComponent, canActivate: [AuthGuard]},
      { path: 'salaries', component: SalariesComponent, canActivate: [AuthGuard, AdminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
