export type StatName = string;

export default class Stat {
    public displayName: string;
    public statName: StatName;
    public value: number;

    public constructor(statName: string, initialValue?: number) {
        this.statName = statName;
        this.value = initialValue || 0;
    }
}
