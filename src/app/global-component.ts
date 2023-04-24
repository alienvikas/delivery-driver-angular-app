import { Injectable } from "@angular/core";
import { RoleType } from "./enums/role-type-enum";
import { User } from "./models/user";

@Injectable()
export class GlobalComponent {
    public static navigationBarVisibility: boolean = false;
    public static isloggedIn: boolean = false;
    public static loading: boolean = false;
    public static loggedUser: User;
    public static roleType: RoleType;
    // constructor() {
    //     alert('trigger');
    //     GlobalComponent.isloggedIn = false;
    // }

    public static getUser() {
        //return this.loggedUser;
        let currentUser: any = localStorage.getItem('user');
        return currentUser;
    }
    public static getRole() {
        let currentUserRole: any = localStorage.getItem('userRole');
        return currentUserRole;
        //return this.roleType;
    }
}