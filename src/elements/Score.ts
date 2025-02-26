import { Observable } from "../helpers/Observable";

export class Score extends Observable<number> {
	private score = 0;

	get points() {
		return this.score;
	}

	addPoints(points: number) {
		this.score += points;
		this.notify(this.score);
	}

	reset() {
		this.score = 0;
	}
}
