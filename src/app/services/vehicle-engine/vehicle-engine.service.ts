import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleEngine } from 'src/app/models/vehicle-engine';
import { environment } from 'src/environments/environment';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleEngineService extends CrudService<VehicleEngine, number> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/vehicleengine`);
  }
}
