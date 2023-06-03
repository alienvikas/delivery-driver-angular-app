import { Injectable } from '@angular/core';
import { VehiclePowerSource } from 'src/app/models/VehiclePowerSource';
import { CrudService } from '../generic-service/crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclePowerSourceService extends CrudService<VehiclePowerSource, number>{

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/vehiclePowerSource`);
  }
}
