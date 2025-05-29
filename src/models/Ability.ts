export enum AbilityType{
    HALF_DAMAGE = "HALF_DAMAGE",
    POWER_BOOST = "POWER_BOOST",
    HEAL_ON_LOW_HEALTH = "HEAL_ON_LOW_HEALTH",
}

export interface GameCharacter {
  name: string;
  health: number;
  heal(healAmount: number): void;
}

export interface Ability{
    type: AbilityType;
    activate(attacker: GameCharacter, defender: GameCharacter, damage: number): number;
}

export class HalfDamageAbility implements Ability{
    type = AbilityType.HALF_DAMAGE;
    activate(attacker: GameCharacter, defender: GameCharacter, damage: number): number {
        // Reduce the damage by half
        const reducedDamage = Math.floor(damage / 2);
        console.log(`${attacker.name} uses ${this.type} ability! Damage reduced to ${reducedDamage}`);
        return reducedDamage;
    }
}

export class PowerBoostAbility implements Ability{
    type = AbilityType.POWER_BOOST;

    activate(attacker: GameCharacter, defender: GameCharacter, damage: number): number{
        const boostDamage = Math.floor(damage * 1.5);
        console.log(`${attacker.name} uses ${this.type} ability! Damage boosted to ${boostDamage}`);
        return boostDamage;
    }
}

export class HealOnLowHealthAbility implements Ability {
    type = AbilityType.HEAL_ON_LOW_HEALTH;

    activate(attacker: GameCharacter, defender: GameCharacter, damage: number): number {
        if (attacker.health < 30) {
            const healAmount = 5;
            defender.heal(healAmount);
            return 0; // No damage dealt
        }
        return damage; // No healing, normal damage
    }
}