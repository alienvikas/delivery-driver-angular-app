import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { AddCountryComponent } from '../../popup-dialog/add-country/add-country.component';
import { EditCountryComponent } from '../../popup-dialog/edit-country/edit-country.component';

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
    private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.countryDataSource.paginator = this.paginator;
    this.countryDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getCountries();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.countryDataSource.filter = filterValue.trim().toLowerCase();

    if (this.countryDataSource.paginator) {
      this.countryDataSource.paginator.firstPage();
    }
  }

  getCountries() {
    this.countryService.fetchAllCountries().subscribe((res: Country[]) => {
      this.countryDataSource.data = res;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCountryComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  editCountry(form: any) {
    const dialogRef = this.dialog.open(EditCountryComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { country: form }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }
}
