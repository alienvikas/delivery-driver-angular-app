import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RoleType } from 'src/app/enums/role-type-enum';
import { GlobalComponent } from 'src/app/global-component';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private router: Router,
    private spinner: NgxSpinnerService, private notificationService: NotificationService) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    var isAuthenticated = this.getAuthStatus();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }

  register(user: User): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };

    // return this.http.post<any>(HttpBaseUrl.getHttpBaseUrl() + "User/InsertUserDetails/",
    //   user).pipe(map(response => {
    //     const userObj = new User();
    //     return userObj;
    //   }));

    return this.http.post<any>(environment.baseUrl + "/User/InsertUserDetails/",
      user, this.httpOptions)
      .pipe(
        map(() => {
          const userObj = new User();
          return userObj;
        }))
      .pipe(catchError(err => {
        this.notificationService.showError(err.error, "User creation failed");
        const error = err.error?.error_description || err.error?.message || err.statusText;
        return throwError(error);
      }));

    // return this.http.post<User>(HttpBaseUrl.getHttpBaseUrl() + "User/InsertUserDetails/",
    //   user);
  }

  authenicateUser(user: any): Observable<any> {
    // return this.http.post<any>(environment.baseUrl + "/User/Authorize/",
    //   user, this.httpOptions)
    //   .pipe(map((res) => {
    //     localStorage.setItem('user', JSON.stringify(res.user))
    //     localStorage.setItem('userRole', JSON.stringify(res.role));
    //   }))
    //   .pipe(catchError(err => {
    //     const error = err.error?.error_description || err.error?.message || err.statusText;
    //     return throwError(error);
    //   }));
    return this.http.post<any>(environment.baseUrl + "/User/Authorize/",
      user);
  }

  getAuthStatus(): boolean {
    if (localStorage.getItem('user') != null)
      return true;
    else
      return false;
  }
}
