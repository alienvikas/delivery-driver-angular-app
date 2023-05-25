import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';
import { County } from './county';
import { Country } from './country';

export class UkAreaTelephone extends BaseEntity {
    id: string = uuidv4();
    name: string = "";
    phoneCode: string = "";
    county!: County;
    country!: Country;
}