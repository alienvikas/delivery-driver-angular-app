import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  //#region properties
  @Input() group!: FormGroup;
  @Input() controlName: any;
  @Input() dropdownData: any;
  @Input() selectedData: any;
  @Input() enumData: any;
  @Input() requiredErrorMessageKey!: string;
  @Input() dropdownPlaceholder!: string;
  @Input() customClass?: string;
  @Input() displayProp!: string;
  @Input() dropdownAppearanceType!: MatFormFieldAppearance;
  @Output() selectionChange = new EventEmitter<any>();
  @Input() iconType: string = '';
  //#endregion
}
