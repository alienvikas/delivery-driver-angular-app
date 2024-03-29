import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleManufacture } from 'src/app/models/vehicle-manufacture';
import { environment } from 'src/environments/environment';
import { CrudService } from '../generic-service/crud.service';
import { VehicleModel } from 'src/app/models/vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class VehicleManufactureService extends CrudService<VehicleManufacture, number>{
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/vehiclemanufacture`);
  }

  getVehicleManufactureBasedOnModel(id: string) {
    this._http.post<VehicleManufacture>(environment.baseUrl + "/vehiclemanufacture/id=" + id, this.headers);
  }

  // getVehicleManufactureBasedVehicleModel(id: any) {
  //   this._http.post<VehicleModel[]>(environment.baseUrl + "/GetVehicleModelsBasedOnManufacture/id=" + id, this.headers);
  // }
}
