import { v4 as uuidv4 } from 'uuid';

export class Introducer {
    Id: string = uuidv4();
    Name: string = "";
    IsDeleted: boolean = false;
};       