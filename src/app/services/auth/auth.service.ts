import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpBaseUrl } from '../../commonMethods/httpBaseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private router: Router) { }
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

    return this.http.post<any>(HttpBaseUrl.getHttpBaseUrl() + "User/InsertUserDetails/",
      user, this.httpOptions)
      .pipe(
        map(() => {
          const userObj = new User();
          return userObj;
        }))
      .pipe(catchError(err => {
        const error = err.error?.error_description || err.error?.message || err.statusText;
        return throwError(error);
      }));

    // return this.http.post<User>(HttpBaseUrl.getHttpBaseUrl() + "User/InsertUserDetails/",
    //   user);
  }

  authenicateUser(user: any): Observable<any> {
    //let queryParams = { "email": user.email, "password": user.password };
    return this.http.post<any>(HttpBaseUrl.getHttpBaseUrl() + "User/Authorize/",
      user, this.httpOptions);
  }

  getAuthStatus(): boolean {
    if (localStorage.getItem('SessionUser') != null)
      return true;
    else
      return false;
  }
}
