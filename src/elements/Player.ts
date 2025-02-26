import { Life } from "./Player/Life";
import { Weapon } from "./Player/Weapon";
import { Sprite } from "./Sprite";

export class Player extends Sprite {
	private powers: ActivePowers;
	private _life: Life;
	private _score: number;
	private _weapon: Weapon;

	constructor(
		private readonly name: string,
		image: CanvasImageSource,
	) {
		super(50, 50, 64, 64, image);
		this.powers = {};
		this._life = new Life(3);
		this._score = 0;
		this._weapon = new Weapon(20, 2000);
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

	get life() {
		return this._life;
	}

	get weapon() {
		return this._weapon;
	}
}

export type Power = "invincibility" | "tripleShot" | "extraPoints";
type ActivePowers = Partial<Record<Power, boolean>>;
