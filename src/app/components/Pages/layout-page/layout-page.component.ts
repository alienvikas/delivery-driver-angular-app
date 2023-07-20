import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef,
  OnDestroy, OnInit
} from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import {
  Observable, distinctUntilChanged, filter, fromEvent, map, pairwise,
  share, throttleTime
} from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}
@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})

export class LayoutPageComponent implements OnInit, AfterViewInit, OnDestroy {

  mobileQuery!: MediaQueryList;
  matSideNavContent: any;
  showScroll!: Observable<boolean>;
  showScrollTo: boolean = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public loginService: LoginService,
    private elementRef: ElementRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.matSideNavContent = this.elementRef.nativeElement.querySelector(".mat-sidenav-content") as MatSidenavContent;
    const content = document.querySelector('.mat-sidenav-content')!;
    const scroll$ = fromEvent(content, 'scroll').pipe(
      throttleTime(10), // only emit every 10 ms
      map(() => content.scrollTop), // get vertical scroll position
      pairwise(), // look at this and the last emitted element
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)), // compare this and the last element to figure out scrolling direction
      distinctUntilChanged(), // only emit when scrolling direction changed
      share(), // share a single subscription to the underlying sequence in case of multiple subscribers
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );


    goingUp$.subscribe((res: any) => {
      console.log('scrolling up');
    });
    goingDown$.subscribe((res: any) => {
      console.log('scrolling down');
      this.showScrollTo = true;
    });
  }


  onScrollToTop(matSideNavContent: any): void {
    if (matSideNavContent) {
      matSideNavContent.scrollTo({
        top: 0, behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  }

  currentDate(): Date {
    return new Date;
  }

}
