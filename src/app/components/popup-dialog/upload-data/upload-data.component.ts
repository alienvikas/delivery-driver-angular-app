import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Optional, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleType } from 'src/app/enums/role-type-enum';
import { GlobalComponent } from 'src/app/global-component';
import { CountyService } from 'src/app/services/county/county.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import * as XLSX from 'xlsx';
import { CountryListComponent } from '../../admin-view/country-list/country-list.component';
import { CountyListComponent } from '../../admin-view/county-list/county-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PassportListComponent } from '../../admin-view/passport-list/passport-list.component';
import { PassportService } from 'src/app/services/passport/passport.service';
//import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.scss']
})
export class UploadDataComponent {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  file: any;
  jsonData: any;
  worksheet: any;
  storeData: any;
  roleType!: RoleType;
  component!: Component;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private countyService: CountyService,
    private passportService: PassportService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<UploadDataComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.component = data.component;
  }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      file: new FormControl()
    });
    this.roleType = Object.values(JSON.parse(GlobalComponent.getRole()))[0] as RoleType;
  }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  onUploadFile() {
    this.spinner.show();
    let roleTypeVal = this.roleType.toString();
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('roleType', roleTypeVal);
    switch (this.component) {
      case CountryListComponent:
        this.countyService.uploadCounty(formData).subscribe((res) => {
          this.spinner.hide();
        });
        break;
      case CountyListComponent:
        break;
      case PassportListComponent:
        this.passportService.uploadPassportList(formData).subscribe((res) => {
          this.spinner.hide();
          this.dialogRef.close();
        })
        break;
    }

  }

  readAsJson() {
    this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    //this.jsonData = JSON.stringify(this.jsonData);
    const formData = new FormData();
    formData.append('counties', this.jsonData);
    formData.append('roleType', this.roleType.toString());
    this.countyService.uploadCounty(formData).subscribe((res) => {
      alert(res);
    })
  }

  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
    }
    readFile.readAsArrayBuffer(this.file);
  }
}
