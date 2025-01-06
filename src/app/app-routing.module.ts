import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationEditComponent } from './association-edit/association-edit.component';


const routes: Routes = [
  { path: 'users', component: UsersListComponent ,canActivate: [authGuard]},
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [authGuard] },
  { path: 'users/add', component: AddUserComponent, canActivate: [authGuard] },
  { path: 'associations', component: AssociationsListComponent, canActivate: [authGuard] },
  { path: 'associations/:id/edit', component: AssociationEditComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
