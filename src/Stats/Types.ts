import Modifier from "./Modifier"
import Stat from "./Stat"

export type StatMap = { [i: string]: Stat }
export type ModifierMap = { [i: string]: Modifier[] }
export type PrecomputedStats = { stats: StatMap, modifiers: ModifierMap }
export type CalculatedStats = { [i: string]: number }
