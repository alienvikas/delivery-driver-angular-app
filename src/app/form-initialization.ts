import { group } from "@angular/animations";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Injectable()
export class FormInitialize {
    public static initializePersonalForm(fb: FormBuilder) {
        return fb.group(
            {
                // ---------------PERSONAL DETAIL----------------------
                introducer: new FormControl(null, [Validators.required]),
                knownAs: new FormControl(null, [Validators.required]),
                dateOfBirth: new FormControl(null, [Validators.required]),
                personPhoto: new FormControl(null, [Validators.nullValidator]),
                nationality: new FormControl(null, [Validators.required]),
                usernameOrTelegramNumber: new FormControl(null, [Validators.pattern("^[+][0-9]{12}$")]),
                emailAddress: new FormControl(null, [Validators.required, Validators.email]),
                residenceNumber: new FormControl(null, [Validators.required]),
                officalName: new FormControl(null, [Validators.required]),
                country: new FormControl(null, [Validators.required]),
                phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("^[+][0-9]{12}$")]),
                postcode: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
                county: new FormControl(null, [Validators.required]),
                townOrCity: new FormControl(null, [Validators.required]),
                area: new FormControl(null, [Validators.required]),
                street: new FormControl(null, [Validators.required]),

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
}