import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/country';
import { CountyService } from 'src/app/services/county/county.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddCountyComponent } from '../../popup-dialog/add-county/add-county.component';
import { EditCountyComponent } from '../../popup-dialog/edit-county/edit-county.component';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { ConfirmationDialogComponent } from '../../popup-dialog/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CommonService } from 'src/app/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-county-list',
  templateUrl: './county-list.component.html',
  styleUrls: ['./county-list.component.scss']
})
export class CountyListComponent {
  displayedColumns: string[] = ['action', 'name'];
  countyDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private countyService: CountyService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    public commonService: CommonService,
    private translation: TranslateService) {
  }

  ngAfterViewInit() {
    this.countyDataSource.paginator = this.paginator;
    this.countyDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.spinner.show();
    this.getAllCounties();
  }

  applyFilter(event: Event) {
    this.spinner.show();
    const filterValue = (event.target as HTMLInputElement).value;
    this.countyDataSource.filter = filterValue.trim().toLowerCase();

    if (this.countyDataSource.paginator) {
      this.countyDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }

  getAllCounties() {
    this.countyService.findAll().subscribe((res) => {
      this.countyDataSource.data = res;
      this.spinner.hide();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCountyComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCounties();
    });
  }

  editCounty(form: any) {
    const dialogRef = this.dialog.open(EditCountyComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { country: form, headerTitle: "Upload Country" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCounties();
    });
  }

  uploadCounty() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { component: CountyListComponent, serviceType: this.countyService, headerTitle: "Upload County" }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCounties();
    });
  }

  deleteCounty(dataRow: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { message: this.translation.instant('Labels.confirmmessage') }
    });

    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.countyService.delete(dataRow.id).subscribe(() => {
          this.notification.showSuccess("Deleted county successfully!!!", "Delete County");
          this.getAllCounties();
        })
      }
    });
  }

}
