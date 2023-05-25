import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';
import { County } from './county';
import { Country } from './country';

export class TownOrCity extends BaseEntity {
    id: string = uuidv4();
    name: string = "";
    county!: County;
    country!: Country
}