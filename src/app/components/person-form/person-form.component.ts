import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { WebcamComponent } from 'ngx-webcam';
import { Observable, ReplaySubject, map, startWith } from 'rxjs';
import { FormInitialize } from 'src/app/form-initialization';
import { CountryService } from 'src/app/services/country/country.service';
import { CountyService } from 'src/app/services/county/county.service';
import { HomeBaseService } from 'src/app/services/home-base/home-base.service';
import { IntroducerService } from 'src/app/services/introducer/introducer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PassportService } from 'src/app/services/passport/passport.service';
import { PersonalDetailService } from 'src/app/services/personal-detail/personal-detail.service';
import { VehicleManufactureService } from 'src/app/services/vehicle-manufacture/vehicle-manufacture.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type/vehicle-type.service';
import { WebCamComponent } from '../popup-dialog/web-cam/web-cam.component';
import { UkTelephoneService } from 'src/app/services/uk-area-telephone/uk-telephone.service';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { VehicleEngineService } from 'src/app/services/vehicle-engine/vehicle-engine.service';
import { VehicleInsuranceCompanyService } from 'src/app/services/vehicle-insurance-company/vehicle-insurance-company.service';
import { VehicleModelService } from 'src/app/services/vehicle-model/vehicle-model.service';
import { VehicleManufacture } from 'src/app/models/vehicle-manufacture';
import { VehicleTypeEnum, VehicleTypeLabel } from 'src/app/enums/vehicle-type-enum';
import { IVehicleType } from 'src/app/interface/vehicle-type-interface';
import { IVehiclePowerSource } from 'src/app/interface/vehicle-power-source-interface';
import { IWorkingDDArea } from 'src/app/interface/dd-working-area';
import { ICountryWorking } from 'src/app/interface/country-working';
import { VehiclePowerSourceService } from 'src/app/services/vehicle-power-source/vehicle-power-source.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class PersonFormComponent implements OnInit, AfterViewInit {

  /* #region Properties */
  ukAreaOptions: any[] = [];
  nationalityOption: any = [];
  ddHomeBaseOptions: any = [];
  countyOptions: any = [];
  countryOptions: any = [];
  introducerOptions: any = [];
  vehicleTypeOption: any[] = [];
  vehicleManufactureOption: any[] = [];
  vehicleEngineOption: any[] = [];
  vehicleInsuranceCompanyOptions: any[] = [];
  vehicleModelOptions: any[] = [];
  vehiclePowerSourceOption: any[] = [];
  vehicleType: IVehicleType[] = [
    { id: 1, value: 'Van' }, { id: 2, value: 'Car' },
    { id: 3, value: 'Motor Cycle' }, { id: 4, value: 'Bicycle' }];
  // vehiclePowerSourceOption: IVehiclePowerSource[] = [
  //   { id: 1, text: "Diesel" }, { id: 2, text: "Petrol" },
  //   { id: 3, text: "LPG" }, { id: 4, text: "Electric" },
  //   { id: 5, text: "Hydrogen" }, { id: 6, text: "Pedal" }];
  workingCountry: ICountryWorking[] = [
    { id: 1, value: "U.K" }, { id: 2, value: "France" }]
  ddWorkingArea: IWorkingDDArea[] = [
    { id: 1, value: "DD MK" }, { id: 2, value: "DD Luton" },
    { id: 3, value: "DD Cardiff" }, { id: 4, value: "DD Areas" }
  ]
  isPersonFormSubmitted: boolean = false;
  isSubmitted: boolean = false;
  showWebCam: boolean = false;

  selected = -1;
  personForm!: FormGroup;
  selectedNationality!: string;
  selectedHomeBase!: string;
  selectedIntroducer!: string;
  workingCountryList = ['U.K', 'France'];
  workingCountrys = new FormControl('', [Validators.required]);
  step = 0;
  dropdownSettings: IDropdownSettings = {};
  filteredArea: Observable<UkAreaTelephone[]>;
  filteredVehicleManufactureOptions: Observable<VehicleManufacture[]>;
  keyword = 'name';
  vehiclePowerSources = new FormControl();
  selectedVehiclePowerSource: any;
  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  fileName = '';
  requiredFileType = "image/png";
  formData = new FormData();
  personPhoto!: File;
  fileList: any[] = [];
  /* #endregion */

  constructor(private fb: FormBuilder, private notificationService: NotificationService,
    private countryService: CountryService,
    private introducerService: IntroducerService,
    private ddhomebaseService: HomeBaseService,
    private passportService: PassportService,
    private countyService: CountyService,
    private personalDetailService: PersonalDetailService,
    private vehicleTypeService: VehicleTypeService,
    private vehicleManufactureService: VehicleManufactureService,
    private ukAreaService: UkTelephoneService,
    private vehicleEngineService: VehicleEngineService,
    private vehicleInsuranceCompanyService: VehicleInsuranceCompanyService,
    private vehicleModelService: VehicleModelService,
    private vehiclePowerSource: VehiclePowerSourceService,
    private eleRef: ElementRef,
    private dialog: MatDialog) {
    /* #region Form Initialization */
    this.personForm = FormInitialize.initializePersonalForm(this.fb);
    /* #endregion */
    this.filteredArea = this.personForm.controls["townOrCity"].valueChanges.pipe(
      startWith(''),
      map(area =>
        (area ? this._filterArea(area) : this.ukAreaOptions.slice())),
    );
    this.filteredVehicleManufactureOptions = this.personForm.controls["vehicleManufacture"].valueChanges
      .pipe(startWith(''),
        map(vehicleManu => vehicleManu ? this._filterVehicleManufacture(vehicleManu) : this.vehicleManufactureOption.slice()))
  }
  ngAfterViewInit(): void {
    let ele = this.eleRef.nativeElement.querySelector("data-isDisabled");
  }

  ngOnInit(): void {
    /* #region Calling Get Methods */
    this.getVehicleManufacture();
    this.getVehicleType();
    this.getAllNationality();
    this.getAllIntroducer();
    this.getAllDdHomeBase();
    this.getAllCounties();
    //this.getAllCountries();
    this.getAllUkArea();
    this.getAllVehicleEngine();
    this.getAllVehicleInsuranceCompany();
    //this.getAllVehicleModel();
    this.getAllVehiclePowerSource();
    /* #endregion */

    /* #region Multi-Select Dropdown Initialization */
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    /* #endregion */
  }

  setStep(index: number, item?: any) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  /* #region Get Methods */
  getVehicleManufacture() {
    this.vehicleManufactureService.findAll().subscribe({
      next: (res) => { this.vehicleManufactureOption = res; },
      error: (err) => { this.notificationService.showError("Something went wrong. Please try again later. !!!", "Error") }
    })
  }

  getVehicleType() {
    this.vehicleTypeService.findAll().subscribe(res => {
      this.vehicleTypeOption = res;
    })
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

  getAllUkArea() {
    this.ukAreaService.findAll().subscribe(res => {
      this.ukAreaOptions = res;
    })
  }

  getAllVehicleEngine() {
    this.vehicleEngineService.findAll().subscribe(res => {
      this.vehicleEngineOption = res;
    })
  }

  getAllVehicleInsuranceCompany() {
    this.vehicleInsuranceCompanyService.findAll().subscribe(res => {
      this.vehicleInsuranceCompanyOptions = res;
    })
  }

  // getAllVehicleModel() {
  //   this.vehicleModelService.findAll().subscribe(res => {
  //     this.vehicleModelOptions = res;
  //   })
  // }

  getAllVehiclePowerSource() {
    this.vehiclePowerSource.findAll().subscribe(res => {
      this.vehiclePowerSourceOption = res;
    })
  }
  /* #endregion */

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

  takeSelfie(fileUploadElement: any) {
    this.openWebCamDialog(fileUploadElement);
  }

  openWebCamDialog(fileUploadElement: any): void {
    const dialogRef = this.dialog.open(WebCamComponent, {
      width: '37rem',
      disableClose: true,
      data: fileUploadElement
    });

    dialogRef.afterClosed().subscribe(result => {
      const dataTransfer = new DataTransfer();
      let file = new File([result.fileUploadProp.base64String],
        result.fileUploadProp.fileName + '.png', {
        type: "image/png",
        lastModified: new Date().getTime()
      });
      dataTransfer.items.add(file);
      fileUploadElement.files = dataTransfer.files;
      this.fileList.push({
        "propName": fileUploadElement.getAttribute("formcontrolname"),
        "base64": result.fileUploadProp.base64String.replace(/^data:image\/[a-z]+;base64,/, "")
      })
    })
  }

  onFileSelected(event: any, formControlName: string) {
    let file: File = event.target.files[0];
    this.convertFile(file).subscribe(base64 => {
      this.fileList.push({ "propName": formControlName, "base64": base64 });
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
    this.setFilesIntoFormControls();
    if (this.personForm.valid) {
      this.personalDetailService.save(this.personForm.value).subscribe(res => {
        console.log('saved');
      })
    }
  }

  setFilesIntoFormControls() {
    for (let index = 0; index < this.fileList.length; index++) {
      this.personForm.value[this.fileList[index].propName] = this.fileList[index].base64;
    }
  }

  private _filterArea(value: any): UkAreaTelephone[] {
    let filterValue = "";
    if (value.name != undefined)
      filterValue = value.name.toLowerCase();
    else
      filterValue = value.toLowerCase();

    let result = this.ukAreaOptions.filter(area => area.name.toLowerCase().includes(filterValue));
    return result;
  }

  private _filterVehicleManufacture(value: any): VehicleManufacture[] {
    let filterValue = "";
    if (value.name != undefined)
      filterValue = value.name.toLowerCase();
    else
      filterValue = value.toLowerCase();

    let result = this.vehicleManufactureOption.filter(v => v.name.toLowerCase().includes(filterValue));
    return result;
  }

  onTownChange($event: any, item?: any[]) {
    if (this.personForm.value['county'] == null) {
      this.countyService.getCountyBasedOnArea($event.option.value.id).subscribe((res: any) => {
        this.countyOptions = res;
        // const toSelect = this.countyOptions.find((c: any) => c.id == res[0].id);
        // this.personForm.get('county')?.setValue(toSelect);
      })
    }
    // this.countryService.getCountryBasedOnArea($event.source.value).subscribe((res: any) => {
    //   this.countryOptions = res;
    //   const toSelect = this.countryOptions.find((c: any) => c.id == res[0].id);
    //   this.personForm.get('country')?.setValue(toSelect);
    // })
  }

  onCountyChange(data: any) {
    if (data.value != undefined || data.value != null) {
      if (data.value.country != null) {
        let countryArr = new Array(data.value.country);
        this.countryOptions = countryArr;
        this.personForm.get('country')?.setValue(data.value.country);
      }

      if (this.personForm.value['townOrCity'] == null ||
        this.personForm.value['townOrCity'] == "") {
        this.ukAreaService.getAreaBasedOnCounty(data.value.id).subscribe((res: any) => {
          this.ukAreaOptions = res;
          // this.countryOptions = res;
          // const toSelect = this.countryOptions.find((c: any) => c.id == res[0].id);
          // this.personForm.get('country')?.setValue(toSelect);
        })
      }
    }
    else {
      this.getAllUkArea();
      this.countryOptions = [];
    }
  }

  getVehicleModelBasedManufacture($event: any) {
    this.vehicleModelService.getVehicleModelBasedOnManufacturer($event.option.value.id).subscribe(res => {
      this.vehicleModelOptions = res;
    })
  }

  displayFn(option: any) {
    if (option != null)
      return option.name;
  }

  // get enumValue(vehicleTypeEnum: VehicleTypeEnum) { return VehicleTypeLabel.get(vehicleTypeEnum); }
  // setFormControlProp(ele: any) {
  //   ele.forEach((e: any) => e.disabled = true);
  // }

  // onVehicleManufactureChange($event: any) {
  //   this.vehicleManufactureService.getVehicleManufactureBasedVehicleModel($event.source.value.id).subscribe(res => {
  //     this.vehicleModelOptions = res;
  //   })
  // }

  get f() { return this.personForm.controls; }
}
