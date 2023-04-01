import { v4 as uuidv4 } from 'uuid';

export class Country {
    Id: string = uuidv4();
    Name: string = "";
    CountryCode: string = "";
    CountryIcon: string = "";
}