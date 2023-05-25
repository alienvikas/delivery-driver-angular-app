import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { TownCityService } from 'src/app/services/town-city/town-city.service';

@Component({
  selector: 'app-town-city-list',
  templateUrl: './town-city-list.component.html',
  styleUrls: ['./town-city-list.component.scss']
})
export class TownCityListComponent {
  //#region constructor
  constructor(private notificationService: NotificationService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    public commonService: CommonService, private towncityService: TownCityService,
    private translation: TranslateService) { }
  //#endregion

  //#region initialize members
  ngAfterViewInit() {
    this.townOrCityDataSource.paginator = this.paginator;
    this.townOrCityDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllTownOrCity();
  }
  //#endregion

  //#region variables
  displayedColumns: string[] = ['action', 'name'];
  townOrCityDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //#endregion

  //#region get method
  getAllTownOrCity() {
    this.towncityService.findAll().subscribe(res => {
      this.townOrCityDataSource.data = res;
      this.spinner.hide();
    })
  }
  //#endregion

  //#region upload file
  uploadTownOrCityList() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { component: TownCityListComponent, serviceType: this.towncityService, headerTitle: "Upload Town/City" }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.notificationService.showSuccess("Uploaded town/city list", "Upload Town/City");
      this.getAllTownOrCity();
    });
  }
  //#endregion
}
