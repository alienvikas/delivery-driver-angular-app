import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global-component';
import { LoginService } from 'src/app/services/login/login.service';
import { HomeComponent } from '../popup-dialog/home/home.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css']
})

export class NavigationBarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(private route: Router, private observer: BreakpointObserver, public loginService: LoginService,
    private location: LocationStrategy, public dialog: MatDialog) {
    if (localStorage.getItem('SessionUser') != null)
      GlobalComponent.isloggedIn = true;
    //this.openDialog('3000ms', '1500ms');
  }
  ngOnInit(): void { }
  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
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
