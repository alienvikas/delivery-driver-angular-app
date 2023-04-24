import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';

export class Passport extends BaseEntity {
    id: string = uuidv4();
    countryName: string = "";
    countryISO: string = "";

    constructor(passportObj: Passport) {
        super(passportObj.id);
        this.countryISO = passportObj.countryISO;
        this.countryName = passportObj.countryName;
        this.id = passportObj.id;
    }
}