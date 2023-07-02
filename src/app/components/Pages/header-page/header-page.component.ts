import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {
  closeIconVisibilty: boolean = false;
  @Input() matSideNav!: MatSidenav;
  constructor(private route: Router) { }
  toggleIcon() {
    this.closeIconVisibilty = !this.closeIconVisibilty;
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
    location.reload();
  }
}
