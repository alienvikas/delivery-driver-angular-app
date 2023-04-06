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
    private dialog: MatDialog, private spinner: NgxSpinnerService) {
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
    this.getCounties();
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

  getCounties() {
    this.countyService.getAllCounties().subscribe((res: Country[]) => {
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
      this.getCounties();
    });
  }

  editCounty(form: any) {
    const dialogRef = this.dialog.open(EditCountyComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { country: form }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCounties();
    });
  }

}
