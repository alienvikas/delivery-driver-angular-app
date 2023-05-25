import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { VehicleManufactureService } from 'src/app/services/vehicle-manufacture/vehicle-manufacture.service';

@Component({
  selector: 'app-vehicle-manufacture',
  templateUrl: './vehicle-manufacture.component.html',
  styleUrls: ['./vehicle-manufacture.component.scss']
})
export class VehicleManufactureComponent implements AfterViewInit, OnInit {

  /* #region Variables */
  displayedColumns: string[] = ['action', 'name'];
  vehicleManufactureDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /* #endregion */

  /* #region Constructor */
  constructor(private dialog: MatDialog, private spinner: NgxSpinnerService,
    public commonService: CommonService, private vehicleManufactureService: VehicleManufactureService,
    private notificationService: NotificationService) { }
  /* #endregion */

  /* #region Initializing variables on page load  */
  ngOnInit(): void {
    this.spinner.show();
    this.getVehicleType();
  }
  ngAfterViewInit(): void {
    this.vehicleManufactureDataSource.paginator = this.paginator;
    this.vehicleManufactureDataSource.sort = this.sort;
  }
  /* #endregion */

  /* #region Get queries */
  getVehicleType() {
    this.vehicleManufactureService.findAll().subscribe({
      next: (res) => {
        this.vehicleManufactureDataSource.data = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.notificationService.showError(err.message, "Error");
        this.spinner.hide();
      }
    })
  }
  /* #endregion */

  /* #region Filters */
  applyFilter(event: Event) {
    this.spinner.show();
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicleManufactureDataSource.filter = filterValue.trim().toLowerCase();

    if (this.vehicleManufactureDataSource.paginator) {
      this.vehicleManufactureDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }
  /* #endregion */

  /* #region Edit vehicle type */
  editVehicleManufacture(dataRow: any) {

  }
  /* #endregion */

  /* #region Delete vehicle type */
  deleteVehicleManufacture(dataRow: any) {

  }
  /* #endregion */

  /* #region Upload vehicle type */
  openFileUploadModal() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: {
        component: VehicleManufactureComponent, serviceType: this.vehicleManufactureService,
        headerTitle: "Upload Vehicle Manufacture"
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getVehicleType();
    });
  }
  /* #endregion */

}
