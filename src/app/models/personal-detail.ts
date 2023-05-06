import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';

export class PersonalDetail extends BaseEntity {
    id: string = uuidv4();
    introducerId: String = uuidv4();
    knownAs: string = "";
    dateOfBirth!: Date;
    photo: any;
    nationalityId: string = uuidv4();
    phoneNumber?: number;
    usernameOrTelegramNumber?: string;
    emailAddress: string = "";
    residenceNumber: string = "";
    street: string = "";
    area: string = "";
    townOrCity: string = "";
    countyId: string = uuidv4();
    postCode: string = "";
    countryId: string = uuidv4();
    officalName: string = "";

    //personPhoto!: Uint8Array;

};