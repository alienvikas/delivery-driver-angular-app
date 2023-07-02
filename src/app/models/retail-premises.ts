import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';
import { County } from './county';
import { Country } from './country';

export class RetailPremises extends BaseEntity {
    id: string = uuidv4();
    retailPremisesName: string = '';
    buildingName: string = '';
    addressNumber: string = '';
    streetOrRoad: string = '';
    area: string = '';
    townOrCity: string = '';
    county?: County;
    postCode: string = '';
    country?: Country;
    creationNotes: string = '';
}