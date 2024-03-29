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

  getVehicleModelBasedOnManufacturer(id: any) {
    return this._http.post<VehicleModel[]>(environment.baseUrl + "/vehiclemodel/GetVehicleModelBasedOnManufacture?id=" + id, this.headers);
  }
}
