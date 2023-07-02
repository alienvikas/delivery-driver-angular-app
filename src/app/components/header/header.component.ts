import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { GlobalComponent } from 'src/app/global-component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //#region Properties
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  options: FormGroup;
  //#endregion

  //#region Constructor
  constructor(public loginService: LoginService, private observer: BreakpointObserver, fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
  //#endregion

  //#region init
  ngOnInit(): void {
    if (localStorage.getItem('SessionUser') != null)
      GlobalComponent.isloggedIn = true;
  }
  //#endregion

  //#region View Init
  ngAfterViewInit() {
    
  }
  //#endregion

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}
