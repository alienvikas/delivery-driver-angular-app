import { Injectable } from "@angular/core";

@Injectable()
export class GlobalComponent {
    public static isloggedIn: boolean = false;
    public static loading: boolean = false;
    // constructor() {
    //     GlobalComponent.isloggedIn = false;
    // }

    // public static isLoggedIn() {
    //     return GlobalComponent.isloggedIn;
    // }
}