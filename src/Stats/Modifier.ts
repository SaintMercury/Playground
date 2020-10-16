import { OPERATION } from "../Utility/Operation";

export default class Modifier {
    public name: string = "unnamed";
    public modifiedStat: string;
    public operation: OPERATION;
    public modifiedAmount: number;

    public constructor(stat: string, op: OPERATION, amount: number) {
        this.modifiedStat = stat;
        this.operation = op;
        this.modifiedAmount = amount;
    }
}
