import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseUrl } from '../../commonMethods/httpBaseUrl';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get(HttpBaseUrl.getHttpBaseUrl() + "Role");
  }
}
