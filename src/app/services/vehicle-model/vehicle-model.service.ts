import { Injectable } from '@angular/core';
import { CrudService } from '../generic-service/crud.service';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService extends CrudService<VehicleModel, number>{
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/vehiclemodel`);
  }

  getVehicleModelBasedOnManufacturer(id: string) {
    return this._http.get<VehicleModel[]>(environment.baseUrl + "/vehiclemodel?id=" + id, this.headers);
  }
}
