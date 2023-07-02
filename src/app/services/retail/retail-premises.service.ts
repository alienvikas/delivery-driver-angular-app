import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../generic-service/crud.service';
import { RetailPremises } from 'src/app/models/retail-premises';

@Injectable({
  providedIn: 'root'
})
export class RetailPremisesService extends CrudService<RetailPremises, number> {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/RetailPremises`);
  }

  getCurrencyPaid() {
    return this._http.get<any>(environment.baseUrl + '/enu/GetCurrencyPaid');
  }
}
