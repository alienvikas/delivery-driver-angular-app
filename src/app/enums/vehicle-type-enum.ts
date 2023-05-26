export enum VehicleTypeEnum {
    Van = 1,
    Car = 2,
    MotorCycle = 3,
    Bicycle = 4
}
export const VehicleTypeLabel = new Map<number, string>([
    [VehicleTypeEnum.Van, 'VAN'],
    [VehicleTypeEnum.Car, 'CAR'],
    [VehicleTypeEnum.MotorCycle, 'MOTORCYCLE'],
    [VehicleTypeEnum.Bicycle, 'BICYCLE']
]);