import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleType } from 'src/app/enums/role-type-enum';
import { GlobalComponent } from 'src/app/global-component';
import { Passport } from 'src/app/models/passport';
import { PassportService } from 'src/app/services/passport/passport.service';

@Component({
  selector: 'app-add-passport-list',
  templateUrl: './add-passport-list.component.html',
  styleUrls: ['./add-passport-list.component.scss']
})
export class AddPassportListComponent implements OnInit {
  passportForm!: FormGroup;
  submitted: boolean = false;
  roleType!: RoleType;
  constructor(private fb: FormBuilder, private passportService: PassportService,
    private dialogRef: MatDialogRef<AddPassportListComponent>) { }

  ngOnInit(): void {
    this.roleType = Object.values(JSON.parse(GlobalComponent.getRole()))[0] as RoleType;
    this.passportForm = this.fb.group({
      countryName: new FormControl(null, [Validators.required]),
      countryISO: new FormControl(null, [Validators.required])
    });
  }

  onBlur() {
    if (!this.submitted)
      this.passportForm.markAsUntouched();
  }

  onClick() { this.submitted = true; }

  onSubmit(form: Passport) {
    const passport = new Passport(form);
    if (this.passportForm.valid) {
      this.passportService.save(passport).subscribe((res) => {
        this.dialogRef.close();
      })
    }
  }

  get f() { return this.passportForm.controls; }
}
