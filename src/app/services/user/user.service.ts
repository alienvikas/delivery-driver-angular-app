import { Injectable } from '@angular/core';
import { CrudService } from '../generic-service/crud.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User, string> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/user`)
  }
}
