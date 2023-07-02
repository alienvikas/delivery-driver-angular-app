export class EnumHelper {
    constructor() { }
    public static getEnumValue(enumData: any) {
        const value = Object.values(enumData);
        return value;
    }
}