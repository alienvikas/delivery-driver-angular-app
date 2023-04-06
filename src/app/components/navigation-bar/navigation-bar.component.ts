import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global-component';
import { LoginService } from 'src/app/services/login/login.service';
import { faCoffee, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit {

  constructor(private route: Router, public loginService: LoginService,
    private location: LocationStrategy) {
    if (localStorage.getItem('SessionUser') != null)
      GlobalComponent.isloggedIn = true;
  }
  ngOnInit(): void {

  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
