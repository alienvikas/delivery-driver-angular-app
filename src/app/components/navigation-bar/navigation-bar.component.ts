import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global-component';
import { LoginService } from 'src/app/services/login/login.service';
import { HomeComponent } from '../popup-dialog/home/home.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  options!: FormGroup;
  
  constructor(private route: Router, private observer: BreakpointObserver, public loginService: LoginService,
    private location: LocationStrategy, public dialog: MatDialog, fb: FormBuilder) {
    if (localStorage.getItem('SessionUser') != null)
      GlobalComponent.isloggedIn = true;

    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
    //this.openDialog('3000ms', '1500ms');
  }
  ngOnInit(): void { }
  ngAfterViewInit() {
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
