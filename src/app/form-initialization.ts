import { group } from "@angular/animations";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Injectable()
export class FormInitialize {
    public static initializePersonalForm(fb: FormBuilder, data?: any) {
        return fb.group(
            {
                // ---------------PERSONAL DETAIL----------------------
                introducer: new FormControl(null, [Validators.required]),
                knownAs: new FormControl(data?.knownAs, [Validators.required]),
                dateOfBirth: new FormControl(data?.dateOfBirth, [Validators.required]),
                personPhoto: new FormControl(data?.personPhoto, [Validators.nullValidator]),
                nationality: new FormControl(null, [Validators.required]),
                usernameOrTelegramNumber: new FormControl(data?.usernameOrTelegramNumber, [Validators.pattern("^[+][0-9]{12}$")]),
                emailAddress: new FormControl(data?.emailAddress, [Validators.required, Validators.email]),
                residenceNumber: new FormControl(data?.residenceNumber, [Validators.required]),
                officalName: new FormControl(data?.officalName, [Validators.required]),
                country: new FormControl(null, [Validators.required]),
                phoneNumber: new FormControl(data?.phoneNumber, [Validators.required, Validators.pattern("^[+][0-9]{12}$")]),
                postcode: new FormControl(data?.postcode, [Validators.required, Validators.pattern("^[0-9]*$")]),
                county: new FormControl(null, [Validators.required]),
                townOrCity: new FormControl(null, [Validators.required]),
                area: new FormControl(data?.area, [Validators.required]),
                street: new FormControl(data?.street, [Validators.required]),

                // ---------------IDENTIFICATION----------------------
                birthCertificate: new FormControl(null),
                nationalityIdentification: new FormControl(null, [Validators.required]),
                passportId: new FormControl(null),
                identityCardFront: new FormControl(null),
                identityCardBack: new FormControl(null),
                visaFront: new FormControl(null),
                visaBack: new FormControl(null),
                firstUtilityBill: new FormControl(null),
                secondUtilityBill: new FormControl(null),
                firstHMRCCommunication: new FormControl(null),
                secondHMRCCommunication: new FormControl(null),
                other1: new FormControl(null),
                other2: new FormControl(null),
                other3: new FormControl(null),
                other4: new FormControl(null),
                ukDrivingLicenceFront: new FormControl(null),
                ukDrivingLicenceBack: new FormControl(null),
                foreignDrivingLicenceFront: new FormControl(null),
                foreignDrivingLicenceBack: new FormControl(null),
                originForeignDrivingLicence: new FormControl(null),
                // ---------------VEHICLE DETAIL----------------------
                vehicleType: new FormControl(null, [Validators.required]),
                vehicleManufacture: new FormControl(null, [Validators.required]),
                vehicleModel: new FormControl(null, [Validators.required]),
                vehicleRegistrationNumber: new FormControl(null, [Validators.required]),
                vehicleEngineSize: new FormControl(null, [Validators.required]),
                vehiclePowerSources: new FormControl(null, [Validators.required]),
                v5FrontImage: new FormControl(null),
                v5InsideImage: new FormControl(null),
                vehicleInsuranceCompany: new FormControl(null, [Validators.required]),
                vehicleInsuranceCompanyPhoto: new FormControl(null),
                nextMOTDue: new FormControl(null, [Validators.required]),
                MOTPhoto: new FormControl(null),
                //------------------WORKING AREA--------------------
                workingCountry: new FormControl(null, [Validators.required]),
                workingDDArea: new FormControl(null, [Validators.required]),
                workingTown: new FormControl(null, [Validators.required]),
                workingStatus: new FormControl('')
            }
        )
    }

    public static initializeWebCamForm(fb: FormBuilder) {
        return fb.group({
            fileName: new FormControl(null, [Validators.required])
        })
    }

    public static initializeUKAreaForm(fb: FormBuilder) {
        return fb.group({
            name: new FormControl(null, [Validators.required]),
            phoneCode: new FormControl(null, [Validators.required]),
            county: new FormControl(null, [Validators.required]),
            country: new FormControl(null, [Validators.required])
        })
    }

    public static initializeRetailPremisesForm(fb: FormBuilder) {
        return fb.group({
            Authoriser: new FormControl(null),
            retailPremisesName: new FormControl(null, [Validators.required]),
            buildingName: new FormControl(null),
            addressNumber: new FormControl(null),
            streetOrRoad: new FormControl(null, [Validators.required]),
            area: new FormControl(null),
            townOrCity: new FormControl(null, [Validators.required]),
            county: new FormControl(null, [Validators.required]),
            postCode: new FormControl(null),
            country: new FormControl(null, [Validators.required]),
            creationNotes: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            emailCommunication: new FormControl(null, [Validators.email]),
            emailInvoicing: new FormControl(null, [Validators.email]),
            retailLandline: new FormControl(null),
            retialLandlineTitle: new FormControl(null),
            retialMobileOneNumber: new FormControl(null),
            retailMobileOneTitle: new FormControl(null),
            retialMobileTwoNumber: new FormControl(null),
            retailMobileTwoTitle: new FormControl(null),
            retialMobileThreeNumber: new FormControl(null),
            retailMobileThreeTitle: new FormControl(null),
            currencyPaid: new FormControl(null),
            pricePerHour: new FormControl(null),
            pricePerDrop: new FormControl(null),
            extrasNotes: new FormControl(null),
            agreedMinimumPerHour: new FormControl(null),
            oneOffPrice: new FormControl(null),
            otherNotes: new FormControl(null),
            notesAndTips: new FormControl(null),
            logo: new FormControl(null),
            frontDoorVisual: new FormControl(null),
            autoNumber: new FormControl(null)
        })
    }
}