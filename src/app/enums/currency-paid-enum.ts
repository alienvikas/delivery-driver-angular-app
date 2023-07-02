export enum CurrencyPaidEnum {
    PoundSterling = 0,
    Euro = 1,
    Bitcoin = 2
}

export const CurrencyPaidList = new Map<number, string>([
    [CurrencyPaidEnum.PoundSterling, '£-Pound Sterling'],
    [CurrencyPaidEnum.Euro, '€-Euro'],
    [CurrencyPaidEnum.Bitcoin, 'B-Bitcoin']
]);