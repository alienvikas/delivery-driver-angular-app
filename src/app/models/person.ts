import { v4 as uuidv4 } from 'uuid';

export class Person {
    Id: string = uuidv4();
    IntroducerId: String = uuidv4();
    DDHomeBaseId: String = uuidv4();
    NationalityId: string = uuidv4();
    VehicleMaker: string = uuidv4();
    KnownAs: string = "";
    OfficalName: string = "";
    DateOfBirth!: Date;
    PersonPhoto!: Uint8Array;
    MobileNumber: number = 0;
    EmailId: string = "";
};