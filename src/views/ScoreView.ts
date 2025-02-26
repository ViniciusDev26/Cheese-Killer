import type { Observer } from "../helpers/Observable";

export class ScoreView implements Observer<number> {
	constructor(private readonly view: HTMLElement) {}

	update(data: number): void {
		this.view.innerText = data.toString();
	}
}
