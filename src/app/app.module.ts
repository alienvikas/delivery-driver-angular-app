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

/* Translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
    PassportListComponent
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
    { provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMATS }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }