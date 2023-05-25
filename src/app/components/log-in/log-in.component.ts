import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalComponent } from 'src/app/global-component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HomeComponent } from '../popup-dialog/home/home.component';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { Location } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss',
  '../../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class LogInComponent implements OnInit {
  stateOptions: any;
  loginForm!: FormGroup;
  currentRoute!: string;
  showWelcomePage: boolean = false;
  user!: User;
  role!: Role;
  /**
   Constructor
   */
  constructor(private loginService: LoginService,
    private authService: AuthService, private location: Location,
    private translateService: TranslateService,
    private formBulider: FormBuilder,
    private router: Router, public commonService: CommonService,
    private spinner: NgxSpinnerService, public dialog: MatDialog,
    private notificationService: NotificationService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        localStorage.setItem('previousUrl', event.url);
      }
    });

  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.stateOptions = this.loginService.getAllLanguage();
    this.loginForm = this.formBulider.group({
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })

    if (this.loginService.isLoggedIn())
      this.router.navigate([localStorage.getItem('previousUrl')]);
  }

  onLanguageChange(selectedLanguage: any) {
    this.translateService.use(selectedLanguage);
  }

  onLoginSubmit(): any {
    this.spinner.show();
    this.loginForm.markAsTouched();
    if (this.loginForm.valid) {
      // return this.authService.authenicateUser(this.loginForm.value).subscribe((res) => {
      //   const isAuthenticated = this.authService.getAuthStatus();
      //   if (isAuthenticated) {
      //     //this.router.navigate(['/']);
      //     //this.router.navigate(['/person']);
      //     //this.router.navigate(['/welcome']);
      //     this.openDialog('3000ms', '1500ms');
      //     //GlobalComponent.isloggedIn = true;
      //     this.showWelcomePage = !this.showWelcomePage;
      //     this.spinner.hide();
      //   }
      // }, error => {
      //   this.spinner.hide();
      // });
      return this.authService.authenicateUser(this.loginForm.value).subscribe((res) => {
        this.user = res['user'];
        this.role = res['role'];
        if (this.user != null) {
          this.location.replaceState('/welcome');
          this.openDialog('3000ms', '1500ms', this.user);
          this.showWelcomePage = !this.showWelcomePage;
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
        }
      })
    }
    else {
      this.spinner.hide();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    const dialogRef = this.dialog.open(HomeComponent, {
      //width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('userRole', JSON.stringify(this.role));
      GlobalComponent.isloggedIn = true;
      this.router.navigate([result]);
    })
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '50rem',
      disableClose: true
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.notificationService.showSuccess("User register successfully !!!", "Success");
    // })
  }
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}