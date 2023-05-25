import { Injectable } from '@angular/core';
import { CrudService } from '../generic-service/crud.service';
import { VehicleInsuranceCompany } from 'src/app/models/vehicle-insurance-company';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleInsuranceCompanyService extends CrudService<VehicleInsuranceCompany, number>{

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/vehicleinsurancecompany`);
  }
}
