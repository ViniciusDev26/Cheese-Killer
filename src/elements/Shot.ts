import { getGameConfig } from "../config";
import { Sprite } from "./Sprite";

export class Shot extends Sprite {
	velocidadeX = 6;
	canBeDestroyed = false;

	constructor(cheese: Sprite, shotImg: CanvasImageSource) {
		super(cheese.center.x, cheese.center.y, 15, 15, shotImg);
	}

	atualizar() {
		this.coordinates.x += this.velocidadeX;
		if (this.coordinates.x > getGameConfig().width) {
			this.canBeDestroyed = true;
		}
	}
}
