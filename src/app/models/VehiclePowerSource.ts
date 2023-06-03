import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';

export class VehiclePowerSource extends BaseEntity {
    id: string = uuidv4();
    name: string = "";
}