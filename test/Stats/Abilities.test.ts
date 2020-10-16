import Equipment from "../../src/Equipment/Equipment";
import Abilities from "../../src/Stats/Abilities"
import Modifier from "../../src/Stats/Modifier";
import Stat from "../../src/stats/Stat";
import { OPERATION } from "../../src/Utility/Operation";

export default function AbilitiesTest(): Function[] {
    const tests: Function[] = [];
    tests.push(() => {
        const abilities = new Abilities();
        const equipment = new Equipment();
        abilities.attachEquipment(equipment);
        const result = abilities.getAbilities();
        console.log(result);
    });

    tests.push(() => {
        const abilities = new Abilities();
        const equipment = new Equipment();
        abilities.attachEquipment(equipment);
        abilities.addStat(new Stat('Strength'));
        const result = abilities.getAbilities();
        console.log(result);
    });

    tests.push(() => {
        const abilities = new Abilities();
        const equipment = new Equipment();
        abilities.attachEquipment(equipment);
        abilities.addStat(new Stat('Strength'));
        abilities.addModifier(new Modifier('Strength', OPERATION.ADD, 1));
        const result = abilities.getAbilities();
        console.log(result);
    });

    tests.push(() => {
        const abilities = new Abilities();
        const equipment = new Equipment();
        abilities.attachEquipment(equipment);

        abilities.addStat(new Stat('Strength', 10));
        abilities.addStat(new Stat('Constitution', 10));
        abilities.addStat(new Stat('Dexterity', 10));
        abilities.addStat(new Stat('Intelligence', 10));
        abilities.addStat(new Stat('Wisdom', 10));
        abilities.addStat(new Stat('Charisma', 10));

        abilities.addModifier(new Modifier('Strength', OPERATION.ADD, 6));
        abilities.addModifier(new Modifier('Strength', OPERATION.INC_PER, 1));
        abilities.addModifier(new Modifier('Strength', OPERATION.DEC_PER, 0.5));
        abilities.addModifier(new Modifier('Strength', OPERATION.SUB, 4));
        abilities.addModifier(new Modifier('Dexterity', OPERATION.ADD, 1));
        abilities.addModifier(new Modifier('Strength', OPERATION.ADD, 1));
        const result = abilities.getAbilities();
        console.log(result);
    });

    tests.push(() => {
        const abilities = new Abilities();
        const equipment = new Equipment();
        abilities.attachEquipment(equipment);

        abilities.addModifier(new Modifier('Poison_DMG', OPERATION.INC_PER, 0.12));
        const result = abilities.getAbilities();
        console.log(result);
    });

    return tests;
}
