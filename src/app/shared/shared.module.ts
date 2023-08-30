import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { SingleSelectComponent } from './single-select/single-select.component';
import { InputComponent } from './input/input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputDateComponent } from './input-date/input-date.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputAutoCompleteComponent } from './input-auto-complete/input-auto-complete.component';
import { FileUploadButtonComponent } from './file-upload-button/file-upload-button.component';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    declarations: [
        SingleSelectComponent,
        InputComponent,
        InputDateComponent,
        InputAutoCompleteComponent,
        FileUploadButtonComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        MatSelectModule,
        MatRadioModule,
        MatSliderModule,
        TranslateModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        ToastrModule,
        MatDatepickerModule,
        MatAutocompleteModule
        // MatNativeDateModule,
        // MatMomentDateModule
        //NgMultiSelectDropDownModule
    ],
    exports: [
        SingleSelectComponent,
        InputComponent,
        InputDateComponent,
        InputAutoCompleteComponent,
        FileUploadButtonComponent,
    ],
    providers: [

    ]
})
export class SharedModule { }