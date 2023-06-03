import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, MY_DATE_FORMATS } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { EditCountryComponent } from './components/popup-dialog/edit-country/edit-country.component';
import { AddCountryComponent } from './components/popup-dialog/add-country/add-country.component';
import { CountryListComponent } from './components/admin-view/country-list/country-list.component';
import { ConfirmationDialogComponent } from './components/popup-dialog/confirmation-dialog/confirmation-dialog.component';
import { UploadDataComponent } from './components/popup-dialog/upload-data/upload-data.component';
import { CountyListComponent } from './components/admin-view/county-list/county-list.component';
import { AddCountyComponent } from './components/popup-dialog/add-county/add-county.component';
import { EditCountyComponent } from './components/popup-dialog/edit-county/edit-county.component';
import { PassportListComponent } from './components/admin-view/passport-list/passport-list.component';
import { AddPassportListComponent } from './components/popup-dialog/add-passport-list/add-passport-list.component';
import { RoleListComponent } from './components/admin-view/role-list/role-list.component';
import { EditPassportComponent } from './components/popup-dialog/edit-passport/edit-passport.component';
import { HomeComponent } from './components/popup-dialog/home/home.component';
import { UkAreaTelephoneListComponent } from './components/admin-view/uk-area-telephone-list/uk-area-telephone-list.component';
import { WebCamComponent } from './components/popup-dialog/web-cam/web-cam.component';
import { VehicleTypeComponent } from './components/admin-view/vehicle-type/vehicle-type.component';
import { VehicleManufactureComponent } from './components/admin-view/vehicle-manufacture/vehicle-manufacture.component';
import { TownCityListComponent } from './components/admin-view/town-city-list/town-city-list.component';
import { AddEditUkAreaComponent } from './components/popup-dialog/add-edit-uk-area/add-edit-uk-area.component';

/* Translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppHttpInterceptor } from './commonMethods/httpInterceptor';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//#region shared component
import { SharedModule } from './shared/shared.module';
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    PersonFormComponent,
    NavigationBarComponent,
    AddCountryComponent,
    CountryListComponent,
    EditCountryComponent,
    ConfirmationDialogComponent,
    UploadDataComponent,
    CountyListComponent,
    AddCountyComponent,
    EditCountyComponent,
    PassportListComponent,
    AddPassportListComponent,
    RoleListComponent,
    EditPassportComponent,
    HomeComponent,
    UkAreaTelephoneListComponent,
    WebCamComponent,
    VehicleTypeComponent,
    VehicleManufactureComponent,
    TownCityListComponent,
    AddEditUkAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ToastrModule,
    //SharedModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
  ],
  providers: [
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }