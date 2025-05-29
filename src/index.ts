import { DuelGame } from './game/DuelGame';
import { AbilityType } from './models/Ability';

console.log("=== DUEL GAME ===\n");

// Create and start a game with random abilities
const game = new DuelGame();
game.setupCharacters(); // Random abilities for both
game.startDuel();

console.log("\n" + "=".repeat(50) + "\n");

// Example with specific abilities
const game2 = new DuelGame();
game2.setupCharacters(AbilityType.POWER_BOOST, AbilityType.HALF_DAMAGE);
game2.startDuel();