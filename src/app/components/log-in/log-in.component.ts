import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';

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
    private router: Router) {
    this.stateOptions = this.loginService.getAllLanguage();
    this.loginForm = this.formBulider.group({
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    GlobalComponent.isloggedIn = false;
   }

  onLanguageChange(selectedLanguage: any) {
    console.log(selectedLanguage);
    this.translateService.use(selectedLanguage);
  }

  onLoginSubmit(): any {
    if (this.loginForm.valid) {
      return this.authService.authenicateUser(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('SessionUser', res);
        const isAuthenticated = this.authService.getAuthStatus();
        if (isAuthenticated) {
          this.router.navigate(['/', 'person']);
          GlobalComponent.isloggedIn = true;
        }
      });
    }
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}