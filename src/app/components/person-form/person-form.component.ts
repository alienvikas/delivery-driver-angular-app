import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSelect } from '@angular/material/select';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { connect } from 'rxjs';
import { DDHomeBase } from 'src/app/models/ddhomebase';
import { Introducer } from 'src/app/models/introducer';
import { CountryService } from 'src/app/services/country/country.service';
import { CountyService } from 'src/app/services/county/county.service';
import { HomeBaseService } from 'src/app/services/home-base/home-base.service';
import { IntroducerService } from 'src/app/services/introducer/introducer.service';
import { PassportService } from 'src/app/services/passport/passport.service';
import { validate } from 'uuid';

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
    private countyService: CountyService) { }


  isPersonFormSubmitted: boolean = false;
  personForm!: FormGroup;
  selectedNationality!: string;
  nationalityOption: any = [];
  ddHomeBaseOptions: any = [];
  countyOptions: any = [];
  selectedHomeBase!: string;
  introducerOptions: any = [];
  selectedIntroducer!: string;
  workingCountryList = ['U.K', 'France'];
  workingCountrys = new FormControl('', [Validators.required]);
  step = 0;
  dropdownSettings: IDropdownSettings = {};
  isSubmitted: boolean = false;
  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  ngOnInit(): void {
    this.getNationality();
    this.getIntroducer();
    this.getDdHomeBase();
    this.getCounties();
    this.personForm = this.fb.group(
      {
        introducerId: new FormControl(null, [Validators.required]),
        ddHomeBaseId: new FormControl(null, [Validators.required]),
        nationalityId: new FormControl(null, [Validators.required]),
        usernameOrTelegramNumber: new FormControl(null, [Validators.pattern("^[+][0-9]{12}$")]),
        //countryId: new FormControl('', [Validators.required]),
        //vehicleMakerId: new FormControl('', [Validators.required]),
        knownAs: new FormControl(null, [Validators.required]),
        officialName: new FormControl(null, [Validators.required]),
        dateOfBirth: new FormControl(null, [Validators.required]),
        //personPhoto: new FormControl('', [Validators.required]),
        emailAddress: new FormControl(null, [Validators.required, Validators.email]),
        mobileNumber: new FormControl(null, [Validators.required, Validators.pattern("^[+][0-9]{12}$")]),
        postcode: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
        countyId: [],
        towncity: new FormControl(null, [Validators.required]),
        area: new FormControl(null, [Validators.required]),
        street: new FormControl(null, [Validators.required]),
        workingCountry: new FormControl(null, [Validators.required])
      }
    );
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
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  setStep(index: number) {
    this.step = index;
  }

  // nextStep() {
  //   this.step++;
  // }

  prevStep() {
    this.step--;
  }

  getNationality() {
    this.passportService.findAll().subscribe((res) => {
      this.nationalityOption = res;
    });
  }

  getIntroducer() {
    this.introducerService.findAll().subscribe((res) => {
      this.introducerOptions = res;
    })
  }

  getDdHomeBase() {
    this.ddhomebaseService.findAll().subscribe((res) => {
      this.ddHomeBaseOptions = res;
    })
  }

  getCounties() {
    this.countyService.findAll().subscribe((res) => {
      this.countyOptions = res;
    })
  }

  onPersonDetailSubmit(formGroup: any) {
    if (this.personForm.valid) {
      this.step++;
    }
  }

  onClick() {
    this.isSubmitted = true;
  }

  onBlur() {
    this.personForm.markAsUntouched();
  }
  get f() { return this.personForm.controls; }
  //@ViewChild(MatAccordion) accordion!: MatAccordion;
}
