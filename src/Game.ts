import { type GameConfig, getGameConfig } from "./config";

export class Game {
	public settings: GameConfig;

	constructor() {
		this.settings = getGameConfig();
	}

	gameLoop() {
		// Game loop logic

		this.gameLoop();
	}
}
