import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from 'angular-calendar';

@Component({
  selector: 'app-material-timepicker',
  templateUrl: './material-timepicker.component.html',
  styleUrls: ['./material-timepicker.component.scss']
})
export class MaterialTimepickerComponent {
  @Input() group!: FormGroup;
  @Input() controlName: any;
  @Input() inputPlaceholder: string = '';
  @Input() isInputDisabled!: boolean;
  @Input() iconType: string = '';
  @Input() errorMessage: string = '';

  constructor() { }

  onBlur() {
    if (this.errorMessage != '')
      this.group.markAsUntouched();
  }
}
