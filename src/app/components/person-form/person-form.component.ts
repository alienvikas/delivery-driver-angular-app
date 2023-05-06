import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { WebcamComponent } from 'ngx-webcam';
import { Observable, ReplaySubject } from 'rxjs';
import { ConvertFile } from 'src/app/commonMethods/convertFileToBinary';
import { FormInitialize } from 'src/app/form-initialization';
import { CountryService } from 'src/app/services/country/country.service';
import { CountyService } from 'src/app/services/county/county.service';
import { HomeBaseService } from 'src/app/services/home-base/home-base.service';
import { IntroducerService } from 'src/app/services/introducer/introducer.service';
import { PassportService } from 'src/app/services/passport/passport.service';
import { PersonalDetailService } from 'src/app/services/personal-detail/personal-detail.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private countryService: CountryService,
    private introducerService: IntroducerService,
    private ddhomebaseService: HomeBaseService,
    private passportService: PassportService,
    private countyService: CountyService,
    private personalDetailService: PersonalDetailService,
    private dialog: MatDialog) { }

  selected = -1;
  isPersonFormSubmitted: boolean = false;
  personForm!: FormGroup;
  selectedNationality!: string;
  nationalityOption: any = [];
  ddHomeBaseOptions: any = [];
  countyOptions: any = [];
  countryOptions: any = [];
  selectedHomeBase!: string;
  introducerOptions: any = [];
  selectedIntroducer!: string;
  workingCountryList = ['U.K', 'France'];
  workingCountrys = new FormControl('', [Validators.required]);
  step = 0;
  dropdownSettings: IDropdownSettings = {};
  isSubmitted: boolean = false;
  showWebCam: boolean = false;
  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  fileName = '';
  requiredFileType = "image/png";
  formData = new FormData();
  personPhoto!: File;
  fileList: any[] = [];

  ngOnInit(): void {
    this.getAllNationality();
    this.getAllIntroducer();
    this.getAllDdHomeBase();
    this.getAllCounties();
    this.getAllCountries();
    this.personForm = FormInitialize.initializePersonalForm(this.fb);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  setStep(index: number) {
    this.step = index;
  }

  // nextStep() {
  //   this.step++;
  // }

  prevStep() {
    this.step--;
  }

  getAllNationality() {
    this.passportService.findAll().subscribe((res) => {
      this.nationalityOption = res;
    });
  }

  getAllIntroducer() {
    this.introducerService.findAll().subscribe((res) => {
      this.introducerOptions = res;
    })
  }

  getAllDdHomeBase() {
    this.ddhomebaseService.findAll().subscribe((res) => {
      this.ddHomeBaseOptions = res;
    })
  }

  getAllCounties() {
    this.countyService.findAll().subscribe((res) => {
      this.countyOptions = res;
    })
  }

  getAllCountries() {
    this.countryService.findAll().subscribe(res => {
      this.countryOptions = res;
    })
  }

  onClick() {
    this.isSubmitted = true;
  }

  onBlur() {
    this.personForm.markAsUntouched();
  }

  filterCounty(filter: string): void {
    this.countyService.findAll().subscribe((res) => {
      this.countyOptions = res.filter((c: any) => c.name.toLowerCase().trim().includes(filter.toLowerCase().trim()));
    })
  }

  filterNationality(filter: string): void {
    this.passportService.findAll().subscribe((res) => {
      this.nationalityOption = res.filter((c: any) => c.countryName.toLowerCase().trim().includes(filter.toLowerCase().trim()));
    });
  }

  takeSelfie() {
    this.openWebCamDialog('300ms', '1500ms');
    //this.showWebCam = !this.showWebCam;
  }

  openWebCamDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(WebcamComponent, {
      // width: '640px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  // onFileSelected(event: any, formControlName: string) {
  //   let file: File = event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     let base64String = reader.result as string;
  //     this.personForm.value[formControlName] = base64String.substring(base64String.indexOf(',')).replace(',', "");
  //   };
  //   if (file) {
  //     this.fileName = file.name;
  //   }

  // }
  onFileSelected(event: any, formControlName: string) {
    let file: File = event.target.files[0];
    this.convertFile(file).subscribe(base64 => {
      this.fileList.push({ "propName": formControlName, "base64": base64 });
      //this.personForm.value[formControlName] = base64;
    })
    if (file) {
      this.fileName = file.name;
    }
  }
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  onPersonDetailSubmit(formGroup: any) {
    if (this.personForm.valid) {
      //const reader = new FileReader();
      //this.personForm.value["personPhoto"] = this.personPhoto;
      // let keys = Object.keys(this.personForm.value);
      // let values = [] = Object.values(this.personForm.value);
      // let formData = new FormData();
      // for (let i = 0; i <= keys.length - 1; i++) {
      //   formData.append(keys[i], values[i]);
      // }
      for (let index = 0; index < this.fileList.length; index++) {
        this.personForm.value[this.fileList[index].propName] = this.fileList[index].base64;
      }
      this.personalDetailService.save(this.personForm.value).subscribe(res => {
        console.log('saved');
      })
      //this.step++;
    }
  }

  get f() { return this.personForm.controls; }
}
