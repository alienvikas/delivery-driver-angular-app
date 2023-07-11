import { Component, Input, OnInit, Type, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import {
  MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  hide: boolean = true;
  @Input() group!: FormGroup;
  @Input() controlName: any;
  @Input() inputAppearanceType!: MatFormFieldAppearance;
  @Input() inputPlaceholder!: string;
  @Input() labelText!: string;
  @Input() inputType!: string;
  @Input() isReadOnly!: boolean;
  @Input() isInputDisabled!: boolean;
  @Input() iconType: string = '';
  @Input() errorMessage: string = '';
  @Input() isMatHint: boolean = false;
  @Input() matHintTooltip: string = '';
  isEraseIconVisible: boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

  onBlur() {
    if (this.errorMessage != '')
      this.group.markAllAsTouched();
    else
      this.group.markAsUntouched();
  }

  eraseIconVisibility(formControlName: any): boolean {
    return !this.f[formControlName].value == null;
  }

  clearData(formControlName: any) {
    this.f[formControlName].reset();
    //let r = formControl;
  }

  get f() { return this.group.controls; }
}
