
export class GetCurrencies {
    static readonly type = '[currencies] get currencies';
    constructor() {
        this.type = '';
     }
    type!: string;
}