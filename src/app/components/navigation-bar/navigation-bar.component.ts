import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global-component';
import { LoginService } from 'src/app/services/login/login.service';
import { faCoffee, faCircle } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../popup-dialog/home/home.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit {

  constructor(private route: Router, public loginService: LoginService,
    private location: LocationStrategy, public dialog: MatDialog) {
    if (localStorage.getItem('SessionUser') != null)
      GlobalComponent.isloggedIn = true;
    //this.openDialog('3000ms', '1500ms');
  }
  ngOnInit(): void {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(HomeComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {
      if (localStorage.getItem('SessionUser') != null)
        GlobalComponent.isloggedIn = true;
    })
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
