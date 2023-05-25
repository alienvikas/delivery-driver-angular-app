import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type/vehicle-type.service';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements AfterViewInit, OnInit {

  /* #region Variables */
  displayedColumns: string[] = ['action', 'name'];
  vehicleTypeDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /* #endregion */

  /* #region Constructor */
  constructor(private dialog: MatDialog, private spinner: NgxSpinnerService,
    public commonService: CommonService, private vehicleTypeService: VehicleTypeService,
    private notificationService: NotificationService) { }
  /* #endregion */

  /* #region Initializing variables on page load  */
  ngOnInit(): void {
    this.spinner.show();
    this.getVehicleType();
  }
  ngAfterViewInit(): void {
    this.vehicleTypeDataSource.paginator = this.paginator;
    this.vehicleTypeDataSource.sort = this.sort;
  }
  /* #endregion */

  /* #region Get queries */
  getVehicleType() {
    this.vehicleTypeService.findAll().subscribe({
      next: (res) => {
        this.vehicleTypeDataSource.data = res;
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
    this.vehicleTypeDataSource.filter = filterValue.trim().toLowerCase();

    if (this.vehicleTypeDataSource.paginator) {
      this.vehicleTypeDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }
  /* #endregion */

  /* #region Edit vehicle type */
  editVehicleType(dataRow: any) {

  }
  /* #endregion */

  /* #region Delete vehicle type */
  deleteVehicleType(dataRow: any) {

  }
  /* #endregion */

  /* #region Upload vehicle type */
  openFileUploadModal() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: {
        component: VehicleTypeComponent, serviceType: this.vehicleTypeService,
        headerTitle: "Upload Vehicle Type"
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getVehicleType();
    });
  }
  /* #endregion */
}
