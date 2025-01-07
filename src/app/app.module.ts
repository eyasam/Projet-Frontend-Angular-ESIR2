import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationDetailsComponent } from './association-details/association-details.component';
import { MinuteDetailsDialogComponent } from './minute-details-dialog/minute-details-dialog.component';
import { AssociationEditComponent } from './association-edit/association-edit.component';
import { EditRoleDialogComponent } from './edit-role-dialog/edit-role-dialog.component';
import { AddRoleFormComponent } from './add-role-form/add-role-form.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AssociationSearchDetailsComponent } from './association-search-details/association-search-details.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    ProfileComponent,
    DashboardComponent,
    UserDetailsComponent,
    EditUserComponent,
    AddUserComponent,
    AssociationsListComponent,
    AssociationDetailsComponent,
    MinuteDetailsDialogComponent,
    AssociationEditComponent,
    EditRoleDialogComponent,
    AddRoleFormComponent,
    AssociationSearchDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    },
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
