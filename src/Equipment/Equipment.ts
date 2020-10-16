import { ModifierMap } from "../stats/Types";
import Item from "./Item";
import { Slot } from "./Types";

export type EquippedSlots = { [i: string /** should be Slot */]: Item  }

export default class Equipment {
    private equippedItems: EquippedSlots;
    private isDirty: boolean;
    private previousValue: ModifierMap;

    public equipItem(item: Item): Item {
        const previousItem = this.equippedItems[item.slot];
        this.equippedItems[item.slot] = item;
        this.isDirty = true;
        return previousItem;
    }

    public unequipSlot(slot: Slot): Item {
        const previousItem = this.equippedItems[slot];
        this.equippedItems[slot] = undefined;
        this.isDirty = true;
        return previousItem;
    }

    public evaluate(): ModifierMap {
        if (this.isDirty === false) {
            return this.previousValue;
        }

        const newValue: ModifierMap = {};
        for (const slot in this.equippedItems) {
            const item = this.equippedItems[slot];
            for (const modifier of item.modifiers) {
                const modList = newValue[modifier.statName] = newValue[modifier.statName] || [];
                modList.push(modifier);
            }
        }

        this.isDirty = false;
        return this.previousValue = newValue;
    }
}
