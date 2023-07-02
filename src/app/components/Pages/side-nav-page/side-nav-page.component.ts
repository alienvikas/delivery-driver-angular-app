import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-page',
  templateUrl: './side-nav-page.component.html',
  styleUrls: ['./side-nav-page.component.scss']
})
export class SideNavPageComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  fullName: string = `${this.user.firstName} ${this.user.middleName} ${this.user.lastName}`;
  uniqueNumber: string = this.user.uniqueNumber;
  personalPhoto: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
    this.personalPhoto = localStorage.getItem("personalPhoto");
  }


}
