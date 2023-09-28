import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../entity/base-entity';
import { Time } from '@angular/common';

export class CalendarShift extends BaseEntity {
    id: string = uuidv4();
    retailerName: string = '';
    retailerNumber: string = '';
    shiftStartTime?: Date;
    shiftStartDay: string = '';
    shiftStartDate?: Date;
    shiftFinishTime?: Time;
    shiftFinishDay: string = '';
    shiftFinishDate?: Date;
    shiftExtraBonus: string = '';
    shiftPricePerHour: string = '';
    shiftExtraPerDrop: string = '';
    shiftExtra: string = '';
    shiftMinimumPerHour: string = '';
    shiftAutoNumber: string = '';
}