import { Character } from '../models/Character';
import { AbilityType } from '../models/Ability';

export class DuelGame {
  private character1: Character;
  private character2: Character;
  private roundNumber: number;

  constructor() {
    this.character1 = new Character("Character 1");
    this.character2 = new Character("Character 2");
    this.roundNumber = 0;
  }

  public setupCharacters(ability1?: AbilityType, ability2?: AbilityType): void {
    //If the ability is provided, assign it, otherwise assign a random ability. Same for the second ability which is for the second character.
    if (ability1) {
      this.character1.assignAbility(ability1);
    } else {
      this.character1.assignRandomAbility();
    }

    if (ability2) {
      this.character2.assignAbility(ability2);
    } else {
      this.character2.assignRandomAbility();
    }

    console.log(this.character1.displayStatus());
    console.log(this.character2.displayStatus());
    console.log("");
  }

  public startDuel(): void {
    //Randomly decide who starts
    let attacker = Math.random() < 0.5 ? this.character1 : this.character2;
    //If attacker is character1, then defender is character2, otherwise is switched 
    let defender = attacker === this.character1 ? this.character2 : this.character1;

    while (this.character1.isAlive() && this.character2.isAlive()) {
      this.roundNumber++;
      console.log(`Round ${this.roundNumber}:`);
      
      this.executeAttack(attacker, defender);
      
      // Switch roles for next round
      [attacker, defender] = [defender, attacker];
      
      console.log("");
    }

    // Determine winner
    const winner = this.character1.isAlive() ? this.character1 : this.character2;
    console.log(`${winner.name} won!`);
  }

  private executeAttack(attacker: Character, defender: Character): void {
    console.log(`${attacker.name} attacks`);
    
    let damage = attacker.attack - defender.defense;
    damage = Math.max(0, damage); // Ensure damage is not negative
    
    // Check if attacker's ability activates (for power boost)
    if (attacker.ability && attacker.hasAbilityAvailable() && 
        attacker.ability.type === AbilityType.POWER_BOOST) {
      damage = attacker.ability.activate(attacker, defender, damage);
    }
    
    // Check if defender's ability activates (for half damage)
    if (defender.ability && defender.hasAbilityAvailable() && 
        defender.ability.type === AbilityType.HALF_DAMAGE) {
      damage = defender.ability.activate(attacker, defender, damage);
    }
    
    // Apply damage
    defender.takeDamage(damage);
    
    // Check if defender's heal ability activates
    if (defender.ability && defender.ability.type === AbilityType.HEAL_ON_LOW_HEALTH && 
        defender.health < 30 && defender.health > 0) {
      defender.ability.activate(attacker, defender, damage);
    }
    
    // Show result
    if (!defender.isAlive()) {
      console.log(`${defender.name} has 0 health`);
    } else {
      console.log(`${defender.name} has ${defender.health} health`);
    }
  }
}