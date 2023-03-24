import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DDHomeBase } from 'src/app/models/ddhomebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeBaseService {

  constructor(private http: HttpClient) { }

  fetchAllHomeBase(): Observable<DDHomeBase> {
    return this.http.get<DDHomeBase>(environment.baseUrl + "DdHomeBase");
  }
}
