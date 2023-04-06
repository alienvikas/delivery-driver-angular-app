import { Component, Optional, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country/country.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent {
  countryForm!: FormGroup;
  submitted: boolean = false;
  currentUser: any;
  constructor(private fb: FormBuilder,
    private countryService: CountryService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<EditCountryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('SessionUser');
    this.countryForm = this.fb.group({
      id: new FormControl(this.data.country.id),
      name: new FormControl(this.data.country.name, [Validators.required]),
      countryIcon: new FormControl(this.data.country.countryIcon, [Validators.required]),
      countryCode: new FormControl(this.data.country.countryCode, [Validators.required])
    });
  }

  onBlur() {
    if (!this.submitted)
      this.countryForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
  }

  onUpdate(form: any) {
    this.spinner.show();
    if (this.countryForm.invalid) { this.spinner.hide(); return; } // stop here if form is invalid
    this.countryService.updateCountry(form).subscribe((res) => {
      this.dialogRef.close();
      this.spinner.hide();
    })
  }

  get f() { return this.countryForm.controls; }
}
