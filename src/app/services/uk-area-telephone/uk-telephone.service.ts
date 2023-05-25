import { Injectable } from '@angular/core';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { CrudService } from '../generic-service/crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UkTelephoneService extends CrudService<UkAreaTelephone, string> {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/ukareatelephone`)
  }

  getAreaBasedOnCounty(countyId: string) {
    return this._http.post<any>(environment.baseUrl + '/UKAreaTelephone/getAreaBasedOnCounty?countyId=' + countyId, this.httpOptions);
  }
}
