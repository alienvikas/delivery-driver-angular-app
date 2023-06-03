import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetail } from 'src/app/models/personal-detail';
import { environment } from 'src/environments/environment';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailService extends CrudService<PersonalDetail, number> {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/personaldetail`);
  }

  savePersonalDetail(formData: any) {
    return this._http.post<any>(environment.baseUrl + '/personaldetail', formData, this.headers);
  }
}
