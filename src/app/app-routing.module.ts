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
import { RoleListComponent } from './components/admin-view/role-list/role-list.component';
import { HomeComponent } from './components/popup-dialog/home/home.component';
import { UkAreaTelephoneListComponent } from './components/admin-view/uk-area-telephone-list/uk-area-telephone-list.component';
import { VehicleTypeComponent } from './components/admin-view/vehicle-type/vehicle-type.component';
import { VehicleManufactureComponent } from './components/admin-view/vehicle-manufacture/vehicle-manufacture.component';
import { TownCityListComponent } from './components/admin-view/town-city-list/town-city-list.component';
import { LoginPageComponent } from './components/Pages/login-page/login-page.component';
import { PersonPageComponent } from './components/Pages/person-page/person-page.component';
import { RetailPremisesViewComponent } from './components/Pages/retail-premises-view/retail-premises-view.component';
import { RegisterPageComponent } from './components/Pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'login', component: LogInComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'person', component: PersonPageComponent, canActivate: [AuthService] },
  { path: 'addcountry', component: AddCountryComponent, canActivate: [AuthService] },
  { path: 'countryList', component: CountryListComponent, canActivate: [AuthService] },
  { path: 'countyList', component: CountyListComponent, canActivate: [AuthService] },
  { path: 'passportList', component: PassportListComponent, canActivate: [AuthService] },
  { path: 'roleList', component: RoleListComponent, canActivate: [AuthService] },
  { path: 'welcome', component: HomeComponent, canActivate: [AuthService] },
  { path: 'ukareatelephone', component: UkAreaTelephoneListComponent, canActivate: [AuthService] },
  { path: 'vehicletype', component: VehicleTypeComponent, canActivate: [AuthService] },
  { path: 'vehiclemanufacture', component: VehicleManufactureComponent, canActivate: [AuthService] },
  { path: 'townorcity', component: TownCityListComponent, canActivate: [AuthService] },
  { path: 'retailpremises', component: RetailPremisesViewComponent, canActivate: [AuthService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
