import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Export } from 'src/app/commonMethods/export';
import { GlobalComponent } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  exportFile(matTableDataSource: MatTableDataSource<any>, displayedColumns: string[], fileName: string) {
    const exportData: any[] = matTableDataSource.data;
    let exportColObj: any[] = [];

    displayedColumns.forEach(e => {
      if (e !== 'action') {
        let lowerCase = e[0].toLowerCase() + e.slice(1);
        exportColObj.push(lowerCase);
      }
    });

    let data = exportData.map(a => {
      return exportColObj.map(b => {
        if (a[b] != null && typeof (a[b]) === typeof ([]))
          return a[b].map((x: any) => x.name).toString();
        else
          return a[b];
      })
    });

    Export.JsonToExcel(data, fileName, exportColObj);
  }
}
