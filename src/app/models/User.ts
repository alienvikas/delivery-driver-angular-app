import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string = uuidv4();
    firstName!: string;
    middleName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    gender!: string;
    mobile!: string;
    country!: string;
    memberSince!: Date;
    isAccountLocked!: boolean;
    roleId!: string;
}