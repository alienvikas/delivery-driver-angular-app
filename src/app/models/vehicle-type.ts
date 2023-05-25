import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';

export class VehicleType extends BaseEntity {
    id: string = uuidv4();
    name: string = "";
}