import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenavContent } from '@angular/material/sidenav';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent implements OnInit, OnDestroy {

  mobileQuery!: MediaQueryList;
  @ViewChild('sidenavContent', { read: MatSidenavContent }) sidenavContentScrollable!: MatSidenavContent;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public loginService: LoginService, @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    console.log(this.sidenavContentScrollable)
    //throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // scrollToTop(): void {
  //   debugger;
  //   // scroll to the top of the body
  //   if (this.sidenavContentScrollable) {
  //     this.sidenavContentScrollable.scrollTo({ top: 0 });
  //   }
  // }

}
