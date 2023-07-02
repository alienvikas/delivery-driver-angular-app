import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, map, startWith } from 'rxjs';
import { CurrencyPaidEnum, CurrencyPaidList } from 'src/app/enums/currency-paid-enum';
import { PayFrequencyEnum } from 'src/app/enums/pay-frequrency-enum';
import { PayMode } from 'src/app/enums/pay-mode-enum';
import { FormInitialize } from 'src/app/form-initialization';
import { ICurrencyPaid } from 'src/app/interface/currency-paid-interface';
import { IPayFrequrency } from 'src/app/interface/pay-frequency-interface';
import { IPayMode } from 'src/app/interface/pay-mode-interface';
import { IPayment } from 'src/app/interface/paytment-interface';
import { Country } from 'src/app/models/country';
import { County } from 'src/app/models/county';
import { UkAreaTelephone } from 'src/app/models/ukAreaTelephone';
import { CountryService } from 'src/app/services/country/country.service';
import { CountyService } from 'src/app/services/county/county.service';
import { RetailPremisesService } from 'src/app/services/retail/retail-premises.service';
import { UkTelephoneService } from 'src/app/services/uk-area-telephone/uk-telephone.service';
import { WebCamComponent } from '../../popup-dialog/web-cam/web-cam.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-retail-premises-view',
  templateUrl: './retail-premises-view.component.html',
  styleUrls: ['./retail-premises-view.component.scss']
})
export class RetailPremisesViewComponent implements OnInit {

  //#region Form name
  retailFormGroup!: FormGroup;
  //#endregion

  //#region Filter property
  // filteredArea: Observable<UkAreaTelephone[]>;
  // filteredCounty: Observable<County[]>;
  // filteredCountry: Observable<Country[]>;
  //#endregion

  //#region Dropdown options
  ukAreaOptions: any[] = [];
  countyOptions: any[] = [];
  countryOptions: any[] = [];
  currencyPaidOptions: IPayment[] = [];
  payModeOptions: IPayment[] = [];
  payFrequencyOptions: IPayment[] = [];
  pricePerHourOptions: IPayment[] = [];
  userOptions: any[] = [];
  //#endregion

  currentUser!: User;

  fileName = '';
  requiredFileType = "image/png";
  fileList: any[] = [];

  constructor(private fb: FormBuilder, private ukAreaService: UkTelephoneService,
    private countyService: CountyService, private countryService: CountryService,
    private retailPremisesService: RetailPremisesService, private dialog: MatDialog,
    private snachBar: MatSnackBar, private userService: UserService) {

    this.retailFormGroup = FormInitialize.initializeRetailPremisesForm(this.fb);
    // this.filteredArea = this.retailFormGroup.controls["townOrCity"].valueChanges.pipe(
    //   startWith(''),
    //   map(area =>
    //     (area ? this.filterArea(area) : this.ukAreaOptions.slice())),
    // );
    // this.filteredCounty = this.retailFormGroup.controls["county"].valueChanges.pipe(
    //   startWith(''),
    //   map(county =>
    //     (county ? this.filterCounty(county) : this.countyOptions.slice())),
    // );
    // this.filteredCountry = this.retailFormGroup.controls["country"].valueChanges.pipe(
    //   startWith(''),
    //   map(country =>
    //     (country ? this.filterCountry(country) : this.countryOptions.slice())),
    // );
  }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
    this.getAllUkArea();
    this.getAllCounty();
    this.getAllCountry();
    this.getAllPayments();
    this.getAllUser();
    //this.selectedUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getAllUkArea() {
    this.ukAreaService.findAll().subscribe(res => {
      this.ukAreaOptions = res;
    })
  }

  getAllCounty() {
    this.countyService.findAll().subscribe(res => {
      this.countyOptions = res;
    })
  }

  getAllCountry() {
    this.countryService.findAll().subscribe(res => {
      this.countryOptions = res;
    })
  }

  getAllPayments() {
    this.currencyPaidOptions = [
      { id: CurrencyPaidEnum.PoundSterling, value: "£-Pound Sterling" },
      { id: CurrencyPaidEnum.Euro, value: "€-Euro" },
      { id: CurrencyPaidEnum.Bitcoin, value: "B-Bitcoin" }
    ];

    this.payModeOptions = [
      { id: PayMode.CashInHand, value: "Cash in Hand" },
      { id: PayMode.CashInBank, value: "Cash in Bank" },
      { id: PayMode.DigitalCurrencyAccount, value: "Digital Currency Account" },
      { id: PayMode.Salary, value: "Salary" },
    ]

    this.payFrequencyOptions = [
      { id: PayFrequencyEnum.EndEachShift, value: "End of Each Shift" },
      { id: PayFrequencyEnum.EndEachDay, value: "End of Each Day" },
      { id: PayFrequencyEnum.EndEachWeek, value: "End of Each Week" },
      { id: PayFrequencyEnum.Every2Week, value: "Every 2 Weeks" },
      { id: PayFrequencyEnum.Every4Week, value: "Every 4 Weeks" },
      { id: PayFrequencyEnum.EveryCalendarMonth, value: "Every Calendar Month" },
    ]

    this.pricePerHourOptions = [
      { id: 1, value: "25p" },
      { id: 2, value: "50p" },
      { id: 3, value: "1p" },
    ]
  }

  getAllUser() {
    this.userService.findAll().subscribe(res => {
      this.userOptions = res;
    })
  }

  displayFn(option: any) {
    if (option != null)
      return option.name;
  }

  // private filterArea(value: any): UkAreaTelephone[] {
  //   let filterValue = "";
  //   if (value.name != undefined)
  //     filterValue = value.name.toLowerCase();
  //   else
  //     filterValue = value.toLowerCase();

  //   let result = this.ukAreaOptions.filter(area => area.name.toLowerCase().includes(filterValue));
  //   return result;
  // }

  takeSelfie(fileUploadElement: any) {
    this.openWebCamDialog(fileUploadElement);
  }

  openWebCamDialog(fileUploadElement: any): void {
    const dialogRef = this.dialog.open(WebCamComponent, {
      width: '37rem',
      disableClose: true,
      data: fileUploadElement
    });

    dialogRef.afterClosed().subscribe((result: any) => {
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

  onRetailPremisesSubmit(form: any) {
    if (this.retailFormGroup.invalid) return; // stop here if form is invalid 
    this.setFilesIntoFormControls();
    this.retailPremisesService.save(form).subscribe(res => {
      this.snachBar.open("Retail Premises Save Successfully !!!", "OK")
    })
  }

  setFilesIntoFormControls() {
    for (let index = 0; index < this.fileList.length; index++) {
      this.retailFormGroup.value[this.fileList[index].propName] = this.fileList[index].base64;
    }
  }

  // private filterCounty(value: any): County[] {
  //   let filterValue = "";
  //   if (value.name != undefined)
  //     filterValue = value.name.toLowerCase();
  //   else
  //     filterValue = value.toLowerCase();

  //   let result = this.countyOptions.filter(county => county.name.toLowerCase().includes(filterValue));
  //   return result;
  // }
  // private filterCountry(value: any): County[] {
  //   let filterValue = "";
  //   if (value.name != undefined)
  //     filterValue = value.name.toLowerCase();
  //   else
  //     filterValue = value.toLowerCase();

  //   let result = this.countryOptions.filter(country => country.name.toLowerCase().includes(filterValue));
  //   return result;
  // }
}
