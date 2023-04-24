import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { PassportService } from 'src/app/services/passport/passport.service';
import { EditPassportComponent } from '../../popup-dialog/edit-passport/edit-passport.component';
import { AddPassportListComponent } from '../../popup-dialog/add-passport-list/add-passport-list.component';
import { Passport } from 'src/app/models/passport';
import { ConfirmationDialogComponent } from '../../popup-dialog/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss']
})
export class PassportListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['action', 'countryName', 'countryISO'];
  passportObj!: Passport;
  passportDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private passportService: PassportService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    public commonService: CommonService) { }

  ngAfterViewInit() {
    this.passportDataSource.paginator = this.paginator;
    this.passportDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllPassport();
  }

  applyFilter(event: Event) {
    this.spinner.show();
    const filterValue = (event.target as HTMLInputElement).value;
    this.passportDataSource.filter = filterValue.trim().toLowerCase();

    if (this.passportDataSource.paginator) {
      this.passportDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }

  getAllPassport() {
    this.passportService.findAll().subscribe((res) => {
      this.passportDataSource.data = res;
      this.spinner.hide();
    })
  }

  getPassport(passportId: string) {
    this.passportService.findOne(passportId).subscribe((res) => {
      this.passportObj = res;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPassportListComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllPassport();
    });
  }

  editPassport(data: any) {
    const dialogRef = this.dialog.open(EditPassportComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { passport: data, headerTitle: "Edit Passport" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPassport();
    });
  }

  deleteConfirm(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((isDelete) => {
      alert(isDelete);
      if (isDelete) {
        this.passportService.delete(data.id).subscribe(() => {
          this.notification.showSuccess("Deleted passport successfully!!!", "Delete Passport");
          this.getAllPassport();
        })
      }
    });
  }

  uploadPassportList() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: {
        component: PassportListComponent,
        serviceType: this.passportService,
        headerTitle: "Upload Passport"
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllPassport();
    });
  }
}
