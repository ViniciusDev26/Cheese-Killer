import { getGameConfig } from "../config";
import { Sprite } from "./Sprite";

export class Meteoro extends Sprite {
	public speedX: number;

	constructor(meteoroImg: CanvasImageSource) {
		const gameConfig = getGameConfig();
		super(
			gameConfig.width,
			Math.random() * gameConfig.height - 40,
			30,
			30,
			meteoroImg,
		);
		this.speedX = -2 * Math.random() - 1;
	}

	//atualiza movimento do meteoro
	atualizar() {
		const gameConfig = getGameConfig();
		this.coordinates.x += this.speedX;

		if (this.coordinates.x < 0) {
			this.coordinates.x = gameConfig.width;
			this.coordinates.y = Math.random() * (gameConfig.height - 30);
		}
	}

	destruir() {
		const gameConfig = getGameConfig();
		this.coordinates.x = gameConfig.width;
		this.coordinates.y = Math.random() * (gameConfig.height - 30);
	}
}
