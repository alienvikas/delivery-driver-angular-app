import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';

export class Person extends BaseEntity {
    id: string = uuidv4();
    introducerId: String = uuidv4();
    DDHomeBaseId: String = uuidv4();
    nationalityId: string = uuidv4();
    vehicleMaker: string = uuidv4();
    knownAs: string = "";
    officalName: string = "";
    dateOfBirth!: Date;
    personPhoto!: Uint8Array;
    mobileNumber: number = 0;
    emailId: string = "";
};