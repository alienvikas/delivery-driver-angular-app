import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/country';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { PassportService } from 'src/app/services/passport/passport.service';

@Component({
  selector: 'app-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss']
})
export class PassportListComponent {

  displayedColumns: string[] = ['action', 'country', 'countryISO'];
  passportDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private passportService: PassportService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    this.passportDataSource.paginator = this.paginator;
    this.passportDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getPassportList();
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

  getPassportList() {
    this.passportService.getAllPassport().subscribe((res: Country[]) => {
      this.passportDataSource.data = res;
      this.spinner.hide();
    })
  }

  openDialog() {
    // const dialogRef = this.dialog.open(AddCountryComponent, {
    //   backdropClass: 'custom-dialog-backdrop-class',
    //   panelClass: 'custom-dialog-panel-class',
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getPassportList();
    // });
  }

  editPassport(data: any) {
    // const dialogRef = this.dialog.open(EditCountryComponent, {
    //   backdropClass: 'custom-dialog-backdrop-class',
    //   panelClass: 'custom-dialog-panel-class',
    //   disableClose: true,
    //   data: { country: data }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getPassportList();
    // });
  }

  deleteConfirm(data: any) {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   backdropClass: 'custom-dialog-backdrop-class',
    //   panelClass: 'custom-dialog-panel-class',
    //   disableClose: true,
    //   data: { country: data }
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.getPassportList();
    // });
  }

  uploadPassportList() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { component: PassportListComponent }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPassportList();
    });
  }
}
