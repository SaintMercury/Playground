import Modifier from "../Stats/Modifier";
import { Slot } from "./Types";

export default class Item {
    public modifiers: Modifier[];
    public slot: Slot;
}
