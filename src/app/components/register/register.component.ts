import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/commonMethods/confirmedValidator';
import { MustMatch } from 'src/app/helper/must-match.validator';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountryService } from 'src/app/services/country/country.service';
import { RoleService } from 'src/app/services/role/role.service';
import { SnackBarComponent } from '../popup-dialog/snack-bar/snack-bar.component';

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
  user = new User();
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private authService: AuthService,
    private roleService: RoleService, private countryService: CountryService,
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
        gender: new FormControl("", Validators.required),
        mobile: new FormControl("", [Validators.required, Validators.pattern('')]),
        countryId: new FormControl("", Validators.required),
        memberSience: new FormControl(formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en-GB')),
        isAccountLocked: new FormControl(false),
        roleId: new FormControl("", Validators.required)
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      }
    );

    this.genders = [
      { value: 'male', viewValue: 'Male', iconvalue: "male" },
      { value: 'female', viewValue: 'Female', iconvalue: "female" },
    ];

    // this.countries = [
    //   { value: 'india', viewValue: 'India', iconvalue: "fi fi-in", countrycode: "(+91)" },
    //   { value: 'usa', viewValue: 'USA', iconvalue: "fi fi-us", countrycode: "(+1)" },
    //   { value: 'uk', viewValue: 'United Kingdom', iconvalue: "fi fi-gb", countrycode: "(+44)" },
    // ];
    this.getCountries();
    this.getRoles();
  }

  get f() { return this.registerForm.controls; }

  onSubmit(form: any, message: string, action: string) {
    if (this.registerForm.invalid) return; // stop here if form is invalid
    this.authService.register(form).subscribe((res) => {
      if (res.Id != "") {
        this.openSnackBar(message, action);
        this.router.navigate(['login']);
      }
      else {
        this.openSnackBar(message, action);
      }
      console.log(res);
    });

    // this.authService.register(form).subscribe(
    //   data => { 
    //     console.log('success', alert(data.Id)) 
    //   },
    //   err => { 
    //     console.log('oops', alert(err.error)) 
    //   }      
    // );
    this.onReset();
  }

  onReset() {
    this.registerForm.reset();
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  getCountries() {
    this.countryService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  openSnackBar(message: string, action: string) {
    // this._snackBar.openFromComponent(SnackBarComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
