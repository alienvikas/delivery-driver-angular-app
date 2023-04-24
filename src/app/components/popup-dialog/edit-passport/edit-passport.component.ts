import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Passport } from 'src/app/models/passport';
import { PassportService } from 'src/app/services/passport/passport.service';

@Component({
  selector: 'app-edit-passport',
  templateUrl: './edit-passport.component.html',
  styleUrls: ['./edit-passport.component.scss']
})
export class EditPassportComponent {

  passportForm!: FormGroup;
  submitted: boolean = false;
  passportObj!: Passport;
  constructor(private fb: FormBuilder,
    private passportService: PassportService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<EditPassportComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.passport);
    this.passportForm = this.fb.group({
      id: new FormControl(this.data.passport.id),
      countryName: new FormControl(this.data.passport.countryName, [Validators.required]),
      countryISO: new FormControl(this.data.passport.countryISO, [Validators.required])
    });
  }

  onBlur() {
    if (!this.submitted)
      this.passportForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
  }

  getPassport(id: string) {
    this.passportService.findOne(id).subscribe((res) => {
      this.passportObj = res;
    });
    return this.passportObj;
  }

  onUpdate(form: Passport) {
    this.spinner.show();
    const passport = new Passport(form);
    if (this.passportForm.invalid) { this.spinner.hide(); return; }// stop here if form is invalid
    this.passportService.update(form.id, passport).subscribe((res) => {
      this.dialogRef.close();
      this.spinner.hide();
    })
  }

  get f() { return this.passportForm.controls; }
}
