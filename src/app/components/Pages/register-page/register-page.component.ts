import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountryService } from 'src/app/services/country/country.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UkTelephoneService } from 'src/app/services/uk-area-telephone/uk-telephone.service';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { Country } from 'src/app/models/country';
import { FormInitialize } from 'src/app/form-initialization';
import { PersonelInputCatagoryEnum } from 'src/app/enums/new-personel-input';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

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
  autoNumberList: any[] = [];
  disableSelect = new FormControl(true);
  newPersonelInputsOptions: any[] = [];
  personalInputCatagory = PersonelInputCatagoryEnum;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private roleService: RoleService, private countryService: CountryService,
    private ukAreaTelephoneService: UkTelephoneService,
    public dialogRef: MatDialogRef<RegisterPageComponent>,
    private _snackBar: MatSnackBar, private router: Router,
    private userService: UserService, private translatorService: TranslateService) {
    this.translatorService.onLangChange.subscribe(lang => {
      this.getNewPersonelInput();
    })
  }

  ngOnInit(): void {
    this.registerForm = FormInitialize.initialzeRegisterForm(this.fb);

    this.genders = [
      { value: 'male', viewValue: 'Male', iconvalue: "male" },
      { value: 'female', viewValue: 'Female', iconvalue: "female" },
    ];

    this.getAllCountries();
    this.getAllRoles();
    this.getAllUKAreaTelephone();
    this.getAllUser();
    this.getNewPersonelInput();
    this.roleService.findNameBasedRole('DRI').subscribe(res => {
      this.selectedRole = res.id;
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(form: any, message: string, action: string) {
    debugger;
    if (this.registerForm.invalid) return; // stop here if form is invalid
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
    this.countryService.findAll().subscribe((res: Country[]) => {
      this.countries = res;
    });
  }

  getAllUKAreaTelephone() {
    this.ukAreaTelephoneService.findAll().subscribe((res: UkAreaTelephone[]) => {
      this.ukareatelephone = res;
    })
  }

  getAllUser() {
    this.userService.findAll().subscribe(res => {
      this.autoNumberList = res.map((r: any) => r.uniqueNumber);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  disableCountryOption(country: Country) {
    let isDisabled = true;
    if (country.countryIcon.toLowerCase().trim() === "gb")
      isDisabled = false;
    return isDisabled;

  }

  onClick() {
    this.registerForm.markAllAsTouched();
  }

  getNewPersonelInput() {
    this.newPersonelInputsOptions = Object.keys(PersonelInputCatagoryEnum)
      .filter((key: any) => !isNaN(Number(PersonelInputCatagoryEnum[key])))
      .map((a: any) => {
        return {
          name: this.translatorService.instant(a),
          id: PersonelInputCatagoryEnum[a]
        }
      })
  }
}
