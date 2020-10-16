import { OPERATION } from "../Utility/Operation";
import { StatName } from "./Stat";

export default class Modifier {
    public name: string = "unnamed";
    public statName: string;
    public operation: OPERATION;
    public modifiedAmount: number;

    // TODO: I'd like to add a source property, if applicable
    public constructor(stat: StatName, op: OPERATION, amount: number) {
        this.statName = stat;
        this.operation = op;
        this.modifiedAmount = amount;
    }
}
