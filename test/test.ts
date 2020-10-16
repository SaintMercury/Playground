import AbilitiesTest from "./Stats/Abilities.test";

function test() {
    const abilityTests = AbilitiesTest();
    for (let i = 0; i < abilityTests.length; ++i) {
        console.log(`Ability Test ${i}`);
        abilityTests[i]();
        console.log('------------------');
    }
}

test();