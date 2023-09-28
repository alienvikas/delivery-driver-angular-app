import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../generic-service/crud.service';
import { CalendarShift } from 'src/app/models/calendar-Shift';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarShiftService extends CrudService<CalendarShift, string>{
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/CalendarShift`);
  }
}
