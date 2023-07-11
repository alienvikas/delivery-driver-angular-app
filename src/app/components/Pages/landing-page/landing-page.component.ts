import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserTypeEnum } from 'src/app/enums/user-type-enum';
import { GlobalComponent } from 'src/app/global-component';
import { LoginService } from 'src/app/services/login/login.service';
import { TranslateService } from '@ngx-translate/core';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  //#region fields
  userTypeControl = new FormControl('Driver');
  isFormSubmitted: boolean = false;
  isLoginForm: boolean = true;
  userTypeEnum = UserTypeEnum;
  isWelcomeMessage: boolean = GlobalComponent.showWelcomePage();
  stateOptions: any;
  //#endregion

  //#region constructor
  constructor(private dialog: MatDialog, private translateService: TranslateService, private loginService: LoginService) { }
  //#endregion

  ngOnInit(): void {
    this.stateOptions = this.loginService.getAllLanguage();
  }

  //#region 
  displayEnumString(data: any) {
    return data;
  }

  //#region Opening sign up in pop-up
  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterPageComponent, {
      width: '50rem',
      disableClose: true
    });
  }
  //#endregion

  onLanguageChange(selectedLanguage: any) {
    this.translateService.use(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }
}
