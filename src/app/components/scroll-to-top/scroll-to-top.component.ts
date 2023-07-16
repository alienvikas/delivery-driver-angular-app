import { Component, OnInit, Inject, HostListener, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  @Input() sidenavContentScrollable: any
  constructor() { }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  scrollToTop() {
    if (this.sidenavContentScrollable) {
      this.sidenavContentScrollable.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

}
