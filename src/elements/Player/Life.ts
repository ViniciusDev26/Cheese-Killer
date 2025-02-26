import { Observable } from "../../helpers/Observable";

export class Life extends Observable<number> {
	constructor(private life: number) {
		super();
	}

	get remainingLives() {
		return this.life;
	}

	removeOneLife() {
		this.life -= 1;
		this.notify(this.life);
	}

	get isDead() {
		return this.life <= 0;
	}

	reset() {
		this.life = 3;
	}
}
