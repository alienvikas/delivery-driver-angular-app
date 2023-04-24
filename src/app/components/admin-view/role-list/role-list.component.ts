import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from 'src/app/services/role/role.service';
import { UploadDataComponent } from '../../popup-dialog/upload-data/upload-data.component';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['action', 'name'];
  roleDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roleService: RoleService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    public commonService: CommonService) { }

  ngAfterViewInit() {
    this.roleDataSource.paginator = this.paginator;
    this.roleDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getRoleList();
  }

  applyFilter(event: Event) {
    this.spinner.show();
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleDataSource.filter = filterValue.trim().toLowerCase();

    if (this.roleDataSource.paginator) {
      this.roleDataSource.paginator.firstPage();
      this.spinner.hide();
    }
  }

  getRoleList() {
    this.roleService.findAll().subscribe((res) => {
      this.roleDataSource.data = res;
      this.spinner.hide();
    })
  }

  exportRoleList() { }

  openFileUploadModal() {
    const dialogRef = this.dialog.open(UploadDataComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      data: { component: RoleListComponent, serviceType: this.roleService, headerTitle: "Upload Roles" }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoleList();
    });
  }

  editRole(rowData: any) { }

  deleteConfirm(rowData: any) { }

  openDialog() { }
}
