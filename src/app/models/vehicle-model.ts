import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';
import { VehicleManufacture } from './vehicle-manufacture';

export class VehicleModel extends BaseEntity {
    id: string = uuidv4();
    name: string = "";
    vehicleManufacturer!: VehicleManufacture;
}