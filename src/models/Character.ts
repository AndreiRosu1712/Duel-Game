import { GameCharacter, Ability, AbilityType, HalfDamageAbility, PowerBoostAbility, HealOnLowHealthAbility} from "./Ability";

export class Character implements GameCharacter {
    public name: string;
    public health: number;
    public defense: number;
    public attack: number;
    public ability?: Ability;

    constructor(name:string){
        this.name = name;
        this.health = 100;
        this.defense = this.randomBetween(10, 15);
        this.attack = this.randomBetween(15,20);
    }

    //Generare de numar random pentru defense/attack in functie de intervalul generat din constructor
    private randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    public assignRandomAbility(): void{
        const abilities = [
            new HalfDamageAbility(),
            new PowerBoostAbility(), 
            new HealOnLowHealthAbility()
        ];

        const randomIndex = Math.floor(Math.random() * abilities.length);
        this.ability = abilities[randomIndex];
    }

    public assignAbility(abilityType: AbilityType): void {
    switch (abilityType) {
      case AbilityType.HALF_DAMAGE:
        this.ability = new HalfDamageAbility();
        break;
      case AbilityType.POWER_BOOST:
        this.ability = new PowerBoostAbility();
        break;
      case AbilityType.HEAL_ON_LOW_HEALTH:
        this.ability = new HealOnLowHealthAbility();
        break;
    }
  }

    public heal(healAmount: number): void {
        this.health += healAmount;
        console.log(`${this.name} heals for ${healAmount}. Current health: ${this.health}`);
    }

    public takeDamage(damage: number): void{
        this.health = Math.max(0, this.health - damage);
    }

    public isAlive(): boolean{
        return this.health > 0;
    }

    //It checks if the character has the ability available to use it
    public hasAbilityAvailable():boolean{
        return Math.random() < 0.25;
    }

    public displayStatus(): string {
        return `${this.name}: power = ${this.attack}, defense = ${this.defense}`;
    }
}