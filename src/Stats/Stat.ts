import Modifier from "./Modifier";

export default class Stat {
    public name: string;
    private isDirty: boolean;
    private modifiers: Modifier[];
}
