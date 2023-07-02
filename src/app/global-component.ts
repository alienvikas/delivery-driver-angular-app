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
    public static isWelcomePage: boolean = false;
    constructor() {
    }

    public static getUser() {
        let currentUser: any = localStorage.getItem('user');
        return currentUser;
    }
    public static getRole() {
        let currentUserRole: any = localStorage.getItem('userRole');
        return currentUserRole;
    }
    public static showWelcomePage() {
        return this.isWelcomePage;
    }
}