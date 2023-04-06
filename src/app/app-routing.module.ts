import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth/auth.service';
import { AddCountryComponent } from './components/popup-dialog/add-country/add-country.component';
import { CountryListComponent } from './components/admin-view/country-list/country-list.component';
import { CountyListComponent } from './components/admin-view/county-list/county-list.component';
import { PassportListComponent } from './components/admin-view/passport-list/passport-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'person', component: PersonFormComponent, canActivate: [AuthService] },
  { path: 'addcountry', component: AddCountryComponent, canActivate: [AuthService] },
  { path: 'countryList', component: CountryListComponent, canActivate: [AuthService] },
  { path: 'countyList', component: CountyListComponent, canActivate: [AuthService] },
  { path: 'passportList', component: PassportListComponent, canActivate: [AuthService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
