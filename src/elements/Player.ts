import { Sprite } from "./Sprite";

export class Player extends Sprite {
	private powers: ActivePowers;
	private _score: number;

	constructor(image: CanvasImageSource) {
		super(50, 50, 64, 64, image);
		this.powers = {};
		this._score = 0;
	}

	applyPower(power: Power, duration: number) {
		this.powers[power] = true;
		console.log(`Power ${power} applied!`);

		setTimeout(() => {
			this.powers[power] = false;
			console.log(`Power ${power} removed!`);
		}, duration);
	}

	getPower(power: Power) {
		return this.powers[power];
	}

	get powerStatus() {
		return this.powers;
	}

	get score() {
		return this._score;
	}

	set score(value: number) {
		this._score = value;
	}
}

export type Power = "invincibility" | "tripleShot" | "extraPoints";
type ActivePowers = Partial<Record<Power, boolean>>;
