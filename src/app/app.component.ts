import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalComponent } from './global-component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DeliveryDriverSystem';
  constructor(translate: TranslateService) {

  }

  isLoggedIn() {
    return GlobalComponent.isloggedIn;
  }

  ngDestory() {
    alert('closed');
    localStorage.clear();
    GlobalComponent.isloggedIn = false;
  }
}
