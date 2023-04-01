import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  countryForm!: FormGroup;
  submitted: boolean = false;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private countryService: CountryService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      countryIcon: new FormControl(null, [Validators.required]),
      countryCode: new FormControl(null, [Validators.required])
    });
  }

  onBlur() {
    alert(this.submitted);
    if (!this.submitted)
      this.countryForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
    this.countryForm.reset();
  }

  onSubmit(form: any) {
    if (this.countryForm.invalid) return; // stop here if form is invalid
    this.countryService.saveCountry(form).subscribe((res) => {
      if (res.Id != null || res.Id != "")
        this.openSnackBar("Country added successfully !!!", "Success");
      this.submitted = false;
      this.countryForm.reset();
      this.countryForm.updateValueAndValidity();
    })
  }

  onReset() {
    this.submitted = false;
    this.countryForm.updateValueAndValidity();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  get f() { return this.countryForm.controls; }
}
