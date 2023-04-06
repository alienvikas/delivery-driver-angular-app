import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { AddCountryComponent } from '../../popup-dialog/add-country/add-country.component';
import { EditCountryComponent } from '../../popup-dialog/edit-country/edit-country.component';
import { ConfirmationDialogComponent } from '../../popup-dialog/confirmation-dialog/confirmation-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent {
  displayedColumns: string[] = ['action', 'name', 'phonecode'];
  countryDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private countryService: CountryService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

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
    this.countryService.fetchAllCountries().subscribe((res: Country[]) => {
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

  editCountry(data: any) {
    const dialogRef = this.dialog.open(EditCountryComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { country: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  deleteConfirm(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { country: data }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getCountries();
    });
  }

  uploadCountryList(){
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });
  }
}
