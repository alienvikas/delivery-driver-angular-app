import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMultiSelectComponent } from './shared-multi-select/shared-multi-select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    declarations: [
        SharedMultiSelectComponent
    ],
    imports: [
        CommonModule,
        NgMultiSelectDropDownModule
    ],
    exports: [
        SharedMultiSelectComponent
    ],
    providers: [

    ]
})
export class SharedModule { }