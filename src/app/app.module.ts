import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ArchwizardModule } from 'angular-archwizard';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewRequestComponent } from './new-request/new-request.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { NewUserComponent } from './company-settings/new-user/new-user.component';
import { EligibilityFormComponent } from './new-request/eligibility-form/eligibility-form.component';
import { UsersComponent } from './company-settings/users/users.component';
import { MealPlansComponent } from './company-settings/mealplans/mealplans.component';
import { ValidatorService } from './SERVICES/validator.service';
import { AccountService } from './SERVICES/account.service';
import { EventService } from './SERVICES/event.service';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    SideNavComponent,
    NewRequestComponent,
    CompanySettingsComponent,
    NewUserComponent,
    EligibilityFormComponent,
    UsersComponent,
    MealPlansComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ArchwizardModule,
    RouterModule.forRoot([
      { path: '', component: NewRequestComponent, pathMatch: 'full' },
      { path: 'empty', component: HomeComponent },
      { path: 'company-settings', component: CompanySettingsComponent },
      { path: 'new-user', component: NewUserComponent },
    ])
  ],

  providers: [ValidatorService,AccountService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
