export class Score {
	private score = 0;
	constructor() {
		this.score = 0;
	}
	get points() {
		return this.score;
	}
	addPoints(points: number) {
		this.score += points;
	}
	reset() {
		this.score = 0;
	}
}
