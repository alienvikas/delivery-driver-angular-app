import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PassportService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
    private notificationService: NotificationService) { }

  getAllPassport(): Observable<any> {
    return this.http.get(environment.baseUrl + "Passport");
  }

  uploadPassportList(form: FormData) {
    return this.http.post<any>(environment.baseUrl + "Passport/UploadPassportList",
      form).
      pipe(
        map((res: any) => {
          if (res == 200)
            this.notificationService.showSuccess("Passport list uploaded successfully !!!", "Success");
        }))
      .pipe(catchError(err => {
        this.notificationService.showError(err.error, "Error");
        const error = err.error?.error_description || err.error?.message || err.statusText;
        return throwError(error);
      }));
  }
}
