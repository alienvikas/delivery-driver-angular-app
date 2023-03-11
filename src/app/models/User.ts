import { v4 as uuidv4 } from 'uuid';

export class User {
    Id: string = uuidv4();
    FirstName: string = "";
    MiddleName: string = "";
    LastName: string = "";
    Email: string = "";
    Password: string = "";
    Gender: string = "";
    Mobile: string = "";
    Country: string = "";
    MemberSince: Date = new Date();
    IsAccountLocked: boolean = false;
    RoleId: string = "";
}