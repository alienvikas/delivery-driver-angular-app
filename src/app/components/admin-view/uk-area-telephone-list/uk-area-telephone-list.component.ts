import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { CommonService } from 'src/app/services/common/common.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UkTelephoneService } from 'src/app/services/uk-area-telephone/uk-telephone.service';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';

@Component({
  selector: 'app-uk-area-telephone-list',
  templateUrl: './uk-area-telephone-list.component.html',
  styleUrls: ['./uk-area-telephone-list.component.scss']
})
export class UkAreaTelephoneListComponent {
  displayedColumns: string[] = ['action', 'name', 'phoneCode'];
  ukAreaTelephoneDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ukAreaTelephoneService: UkTelephoneService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private notification: NotificationService,
    public commonService: CommonService) { }

  ngAfterViewInit() {
    this.ukAreaTelephoneDataSource.paginator = this.paginator;
    this.ukAreaTelephoneDataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getUKAreaTelephones();
  }

  applyFilter(event: Event) {
    this.spinner.show();
    const filterValue = (event.target as HTMLInputElement).value;
    this.ukAreaTelephoneDataSource.filter = filterValue.trim().toLowerCase();

    if (this.ukAreaTelephoneDataSource.paginator) {
      this.ukAreaTelephoneDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }
  getUKAreaTelephones() {
    this.ukAreaTelephoneService.findAll().subscribe((res: UkAreaTelephone[]) => {
      this.ukAreaTelephoneDataSource.data = res;
      this.spinner.hide();
    })
  }
  editUKArea(dataRow: any) {
    
  }

  deleteConfirm(dataRow: any) {

  }

  uploadUkAreaTelephoneList() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { component: UkAreaTelephoneListComponent, serviceType: this.ukAreaTelephoneService, headerTitle: "Upload UK Area Telephone" }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.notification.showSuccess("Uploaded country list", "Upload Country");
      this.getUKAreaTelephones();
    });
  }
}
