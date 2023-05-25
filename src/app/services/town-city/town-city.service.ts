import { Injectable } from '@angular/core';
import { CrudService } from '../generic-service/crud.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TownOrCity } from 'src/app/models/town-city';

@Injectable({
  providedIn: 'root'
})
export class TownCityService extends CrudService<TownOrCity, number> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/townorcity`);
  }
}
