import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  stateOptions: any;
  loginForm!: FormGroup;
  /**
   Constructor
   */
  constructor(private loginService: LoginService, private authService: AuthService,
    private translateService: TranslateService, private formBulider: FormBuilder,
    private router: Router, public commonService: CommonService,
    private spinner: NgxSpinnerService) {
    this.stateOptions = this.loginService.getAllLanguage();
    this.loginForm = this.formBulider.group({
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {


    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.loginForm.markAsUntouched();
    GlobalComponent.isloggedIn = false;
  }

  onLanguageChange(selectedLanguage: any) {
    this.translateService.use(selectedLanguage);
  }

  onLoginSubmit(): any {
    /** spinner starts on init */
    this.spinner.show();
    this.loginForm.markAsTouched();
    if (this.loginForm.valid) {
      return this.authService.authenicateUser(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('SessionUser', res);
        const isAuthenticated = this.authService.getAuthStatus();
        if (isAuthenticated) {
          this.router.navigate(['/', 'person']);
          GlobalComponent.isloggedIn = true;
          this.spinner.hide();
        }
      }, error => {
        this.spinner.hide();
      });
    }
    else {
      this.spinner.hide();
    }
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}