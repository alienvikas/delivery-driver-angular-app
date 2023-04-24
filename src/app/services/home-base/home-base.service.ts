import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DDHomeBase } from 'src/app/models/ddhomebase';
import { environment } from 'src/environments/environment';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class HomeBaseService extends CrudService<DDHomeBase, string> {

  // constructor(private http: HttpClient) { }

  // fetchAllHomeBase(): Observable<DDHomeBase> {
  //   return this.http.get<DDHomeBase>(environment.baseUrl + "DdHomeBase");
  // }
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/DDHomeBase`);
  }
}
