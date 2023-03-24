import { v4 as uuidv4 } from 'uuid';
export class DDHomeBase {
    Id: string = uuidv4();
    Name: string = "";
    IsDeleted: boolean = false;
};