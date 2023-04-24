import { RoleType } from "../enums/role-type-enum";
import { GlobalComponent } from "../global-component";

export class BaseEntity {
    IsDeleted: boolean = false;
    AddedBy?: RoleType;
    AddedOn?: Date;
    ModifiedBy?: RoleType;
    ModifiedOn?: Date;
    constructor(id: string) {
        if (id == null || undefined) {
            this.AddedBy = Object.values(JSON.parse(GlobalComponent.getRole()))[0] as RoleType;
            this.AddedOn = new Date();
        }
        else {
            this.ModifiedBy = Object.values(JSON.parse(GlobalComponent.getRole()))[0] as RoleType;
            this.ModifiedOn = new Date();
        }
    }
}