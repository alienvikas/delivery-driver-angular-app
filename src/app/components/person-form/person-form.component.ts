import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { connect } from 'rxjs';
import { DDHomeBase } from 'src/app/models/ddhomebase';
import { Introducer } from 'src/app/models/introducer';
import { CountryService } from 'src/app/services/country/country.service';
import { HomeBaseService } from 'src/app/services/home-base/home-base.service';
import { IntroducerService } from 'src/app/services/introducer/introducer.service';
import { validate } from 'uuid';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private countryService: CountryService,
    private introducerService: IntroducerService,
    private ddhomebaseService: HomeBaseService) { }

  isPersonFormSubmitted: boolean = false;
  personForm!: FormGroup;
  selectedNationality!: string;
  nationalityOption: any = [];
  ddHomeBaseOptions: any = [];
  selectedHomeBase!: string;
  introducerOptions: any = [];
  selectedIntroducer!: string;
  step = 0;

  ngOnInit(): void {
    this.getNationality();
    this.getIntroducer();
    this.getDdHomeBase();
    this.personForm = this.fb.group(
      {
        introducerId: new FormControl(null, [Validators.required]),
        ddHomeBaseId: new FormControl(null, [Validators.required]),
        nationalityId: new FormControl(null, [Validators.required]),
        usernameOrTelegramNumber: new FormControl(null),
        //countryId: new FormControl('', [Validators.required]),
        //vehicleMakerId: new FormControl('', [Validators.required]),
        knownAs: new FormControl(null, [Validators.required]),
        officialName: new FormControl(null, [Validators.required]),
        dateOfBirth: new FormControl(null, [Validators.required]),
        //personPhoto: new FormControl('', [Validators.required]),
        emailAddress: new FormControl(null, [Validators.required, Validators.email]),
        mobileNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
        postcode: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
        county: new FormControl(null, [Validators.required]),
        towncity: new FormControl(null, [Validators.required]),
        area: new FormControl(null, [Validators.required]),
        street: new FormControl(null, [Validators.required])
      }
    )
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

  getNationality() {
    this.countryService.fetchAllCountries().subscribe((res) => {
      this.nationalityOption = res;
    });
  }

  getIntroducer() {
    this.introducerService.getAllIntroducer().subscribe((res) => {
      this.introducerOptions = res;
    })
  }

  getDdHomeBase() {
    this.ddhomebaseService.fetchAllHomeBase().subscribe((res) => {
      this.ddHomeBaseOptions = res;
    })
  }

  onPersonDetailSubmit(formGroup: any) {
    if (this.personForm.valid) {
      this.step++;
    }
  }

  get f() { return this.personForm.controls; }
  //@ViewChild(MatAccordion) accordion!: MatAccordion;
}
