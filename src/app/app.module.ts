import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, MY_DATE_FORMATS } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

/* SharedModule */
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/Pages/landing-page/landing-page.component';
import { LayoutPageComponent } from './components/Pages/layout-page/layout-page.component';
import { HeaderPageComponent } from './components/Pages/header-page/header-page.component';
import { FooterPageComponent } from './components/Pages/footer-page/footer-page.component';
import { SideNavPageComponent } from './components/Pages/side-nav-page/side-nav-page.component';
import { RegisterPageComponent } from './components/Pages/register-page/register-page.component';
import { LoginPageComponent } from './components/Pages/login-page/login-page.component';
import { PersonPageComponent } from './components/Pages/person-page/person-page.component';
import { RetailPremisesViewComponent } from './components/Pages/retail-premises-view/retail-premises-view.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { CalendarWeekViewComponent } from './components/Pages/calendar-week-view/calendar-week-view.component';
import { AddCalendarShiftComponent } from './components/popup-dialog/add-calendar-shift/add-calendar-shift.component';

/* calendar */
import { MOMENT } from 'angular-calendar';
import * as moment from 'moment';
import { ShiftCalendarComponent } from './components/Pages/shift-calendar/shift-calendar.component';

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
        AddEditUkAreaComponent,
        HeaderComponent,
        FooterComponent,
        LandingPageComponent,
        LayoutPageComponent,
        HeaderPageComponent,
        FooterPageComponent,
        SideNavPageComponent,
        RegisterPageComponent,
        LoginPageComponent,
        PersonPageComponent,
        RetailPremisesViewComponent,
        ScrollToTopComponent,
        ShiftCalendarComponent,
        CalendarWeekViewComponent,
        AddCalendarShiftComponent
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
        SharedModule,        
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
        { provide: LOCALE_ID, useValue: 'en-GB' },
        { provide: MOMENT, useValue: moment },
        { provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMATS },
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }