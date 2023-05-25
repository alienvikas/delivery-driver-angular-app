import { Injectable } from '@angular/core';
import { VehicleType } from 'src/app/models/vehicle-type';
import { CrudService } from '../generic-service/crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService extends CrudService<VehicleType, number>{
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/vehicletype`);
  }
}
