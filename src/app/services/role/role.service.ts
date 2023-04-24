import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { Role } from 'src/app/models/role';
import { GlobalComponent } from 'src/app/global-component';
import { RoleType } from 'src/app/enums/role-type-enum';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role, number> {

  // constructor(private http: HttpClient,
  //   private notificationService: NotificationService) { }

  // getAllRoles() {
  //   return this.http.get(environment.baseUrl + "Role");
  // }

  // getRole(id: any): Observable<any> {
  //   return this.http.get(environment.baseUrl + "Role/" + id)
  //     .pipe(map(() => {
  //       const roleObj = new Role();
  //       const strEnum = roleObj.name as unknown as RoleType;
  //       GlobalComponent.roleType = strEnum;
  //     }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/Role`);
  }

  findNameBasedRole(roleName: string) {
    return this._http.get<Role>(environment.baseUrl + '/Role/RoleName?role=' + roleName);
  }
}
