import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  countryForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private countryService: CountryService,
    private dialogRef: MatDialogRef<AddCountryComponent>) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      countryIcon: new FormControl(null, [Validators.required]),
      countryCode: new FormControl(null, [Validators.required])
    });
  }

  onBlur() {
    if (!this.submitted)
      this.countryForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
  }

  onSubmit(form: any) {
    if (this.countryForm.invalid) return; // stop here if form is invalid
    this.countryService.save(form).subscribe((res) => {
      this.dialogRef.close();
    })
  }

  onReset() {
    this.submitted = false;
  }

  get f() { return this.countryForm.controls; }
}
