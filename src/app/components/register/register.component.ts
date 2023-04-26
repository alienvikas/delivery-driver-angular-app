import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/commonMethods/confirmedValidator';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountryService } from 'src/app/services/country/country.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UkTelephoneService } from 'src/app/services/uk-area-telephone/uk-telephone.service';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { LetterAutoIncrement } from 'src/app/commonMethods/letterAutoIncrement';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedGender: string = "";
  genders: any = [];
  countries: any = [];
  roles: any = [];
  ukareatelephone: any = [];
  user = new User();
  selectedRole: any;
  selectedCountry: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  counter: number = 1252;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private roleService: RoleService, private countryService: CountryService,
    private ukAreaTelephoneService: UkTelephoneService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl("", [Validators.required]),
        middleName: new FormControl(""),
        lastName: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        confirmPassword: ['', Validators.required],
        //gender: new FormControl("", Validators.required),
        mobile: new FormControl("", [Validators.required, Validators.pattern('')]),
        countryId: new FormControl("", Validators.required),
        memberSience: new FormControl(formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en-GB')),
        isAccountLocked: new FormControl(false),
        roleId: new FormControl("", Validators.required),
        ukAreaTelephone: new FormControl("", [Validators.required]),
        uniqueNumber: new FormControl()
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      }
    );

    this.genders = [
      { value: 'male', viewValue: 'Male', iconvalue: "male" },
      { value: 'female', viewValue: 'Female', iconvalue: "female" },
    ];

    this.getAllCountries();
    this.getAllRoles();
    this.getAllUKAreaTelephone();
    this.roleService.findNameBasedRole('DRI').subscribe(res => {
      this.selectedRole = res.id;
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(form: any, message: string, action: string) {
    if (this.registerForm.invalid) return; // stop here if form is invalid
    this.registerForm.value["uniqueNumber"] = this.generateAutoNumber();
    this.authService.register(form).subscribe((res) => {
      if (res.Id != "") {
        this.openSnackBar(message, action);
        this.router.navigate(['login']);
        this.dialogRef.close();
      }
      else {
        this.openSnackBar(message, action);
      }
    });
  }

  getAllRoles() {
    this.roleService.findAll().subscribe((res) => {
      this.roles = res;
    })
  }

  getAllCountries() {
    this.countryService.findAll().subscribe((res) => {
      this.countries = res;
    });
  }

  getAllUKAreaTelephone() {
    this.ukAreaTelephoneService.findAll().subscribe((res: UkAreaTelephone[]) => {
      this.ukareatelephone = res;
    })
  }

  generateAutoNumber() {
    let numberOfZeros = "000000";
    const accType = "DRI";
    const countryISO = "+44";
    // this.countryService.findOne(this.registerForm.value["countryId"]).subscribe(res => {
    //   countryISO = res.countryCode;
    // });
    const telephoneCode = this.registerForm.value["ukAreaTelephone"];
    let alphabets = "AA";
    let incrementCounter = this.counter + 1;
    if (incrementCounter.toString().length > 6) {
      alphabets = LetterAutoIncrement.nextChar(alphabets);
      incrementCounter = 1;
    }
    const subStr = numberOfZeros.substr(incrementCounter.toString().length);
    let result = `${subStr}${incrementCounter}`;

    return `${accType} ${countryISO} ${telephoneCode} ${alphabets} ${result}`;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
