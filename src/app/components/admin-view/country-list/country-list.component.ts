import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { AddCountryComponent } from '../../popup-dialog/add-country/add-country.component';
import { EditCountryComponent } from '../../popup-dialog/edit-country/edit-country.component';
import { ConfirmationDialogComponent } from '../../popup-dialog/confirmation-dialog/confirmation-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Export } from 'src/app/commonMethods/export';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent {
  displayedColumns: string[] = ['action', 'name', 'countryCode', 'countryIcon'];
  countryDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private countryService: CountryService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private notification: NotificationService,
    public commonService: CommonService) { }

  ngAfterViewInit() {
    this.countryDataSource.paginator = this.paginator;
    this.countryDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getCountries();
  }

  applyFilter(event: Event) {
    this.spinner.show();
    const filterValue = (event.target as HTMLInputElement).value;
    this.countryDataSource.filter = filterValue.trim().toLowerCase();

    if (this.countryDataSource.paginator) {
      this.countryDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }

  getCountries() {
    this.countryService.findAll().subscribe((res: Country[]) => {
      this.countryDataSource.data = res;
      this.spinner.hide();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCountryComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCountries();
    });
  }

  editCountry(dataRow: any) {
    const dialogRef = this.dialog.open(EditCountryComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { country: dataRow }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  deleteConfirm(dataRow: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.countryService.delete(dataRow.id).subscribe(() => {
          this.notification.showSuccess("Deleted country successfully!!!", "Delete Country");
          this.getCountries();
        })
      }
    });
  }

  uploadCountryList() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { component: CountryListComponent, serviceType: this.countryService, headerTitle: "Upload Country" }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.notification.showSuccess("Uploaded country list", "Upload Country");
      this.getCountries();
    });
  }

  exportCountry(matTableDataSource: MatTableDataSource<any>, displayedColumns: string[]) {
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

    Export.JsonToExcel(data, 'Country - Delivery Driver', exportColObj);
  }
}
