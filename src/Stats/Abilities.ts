import Equipment from "../Equipment/Equipment";
import { OPERATION } from "../Utility/Operation";
import Modifier from "./Modifier";
import Stat from "./Stat";
import { CalculatedStats, ModifierMap, PrecomputedStats, StatMap } from "./Types";

export default class Abilities {
    private stats: StatMap;
    private modifiers: ModifierMap;
    private equipment: Equipment;
    // TODO: what about buffs/debuffs? this may need to be separated from equipment

    private isDirty: boolean;
    // TODO: hate this
    private previousEquipmentValue: ModifierMap;
    private previousValue: CalculatedStats;

    public constructor() {
        this.stats = {};
        this.modifiers = {};
    }

    public addStat(stat: Stat): void {
        const statModifiers = this.stats[stat.statName];
        if (Boolean(statModifiers)) {
            throw new Error(`Stat (${stat.statName}) already exists!`);
        }
        this.stats[stat.statName] = stat;
        this.isDirty = true;
    }

    public addModifier(modifier: Modifier): void {
        const modifierList = this.modifiers[modifier.statName] = this.modifiers[modifier.statName] || [];
        modifierList.push(modifier);
        this.isDirty = true;
    }

    public attachEquipment(equipment: Equipment): void {
        this.equipment = equipment;
        this.isDirty = true;
    }

    // TODO: cleanup?
    public getAbilities(): CalculatedStats {
        const { stats, modifiers: statModifiers } = this.evaluate();
        const equipmentModifiers = this.equipment.evaluate();
        
        if (this.isDirty === false && equipmentModifiers === this.previousEquipmentValue) {
            return this.previousValue;
        }
        
        type Intermediate = {stat: Stat, addMods: Modifier[], multMods: Modifier[] };
        type IntermediateMap = { [i: string]: Intermediate };

        const intermediateMap: IntermediateMap = {};
        for (const statName in stats) {
            const stat = stats[statName];
            intermediateMap[stat.statName] = { stat: stat, addMods: [], multMods: [] };
        }

        for (const statName in statModifiers) {
            const modList = statModifiers[statName];

            if (Boolean(intermediateMap[statName]) === false) {
                intermediateMap[statName] = {
                    stat: new Stat(statName),
                    addMods: [],
                    multMods: []
                };
            }
            for (const mod of modList) {
                switch(mod.operation) {
                    case OPERATION.ADD:
                    case OPERATION.SUB:
                        intermediateMap[statName].addMods.push(mod);
                    break;
                    case OPERATION.INC_PER:
                    case OPERATION.DEC_PER:
                        intermediateMap[statName].multMods.push(mod);
                    break;
                }
            }
        }

        for (const statName in equipmentModifiers) {
            const modList = equipmentModifiers[statName];

            if (Boolean(intermediateMap[statName]) === false) {
                intermediateMap[statName] = {
                    stat: new Stat(statName),
                    addMods: [],
                    multMods: []
                };
            }
            for (const mod of modList) {
                switch(mod.operation) {
                    case OPERATION.ADD:
                    case OPERATION.SUB:
                        intermediateMap[statName].addMods.push(mod);
                    break;
                    case OPERATION.INC_PER:
                    case OPERATION.DEC_PER:
                        intermediateMap[statName].multMods.push(mod);
                    break;
                }
            }
        }

        const calcedStats = {};
        for (const statName in intermediateMap) {
            const intermediate = intermediateMap[statName];
            const additions = intermediate.addMods.reduce((sum, item) => {
                const additive = (item.operation === OPERATION.ADD) ? item.modifiedAmount : -item.modifiedAmount;
                return sum + additive;
            }, 0);
            const multiplications = intermediate.multMods.reduce((sum, item) => {
                const additive = (item.operation === OPERATION.INC_PER) ? item.modifiedAmount : -item.modifiedAmount;
                return sum + additive;
            }, 0);
            const preMult = (intermediate.stat.value + additions) || 1;

            calcedStats[statName] = preMult * (1 + multiplications);
        }

        return this.previousValue = calcedStats;
    }

    private evaluate(): PrecomputedStats {
        return { stats: this.stats, modifiers: this.modifiers };
    }
}
