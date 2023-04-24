import { Injectable } from '@angular/core';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { CrudService } from '../generic-service/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UkTelephoneService extends CrudService<UkAreaTelephone, string> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/ukareatelephone`)
  }
}
