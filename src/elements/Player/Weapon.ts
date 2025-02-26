import { Observable } from "../../helpers/Observable";

export class Weapon extends Observable<number> {
	private bullets: number;
	private reloading = false;

	constructor(
		private readonly maxBullets: number,
		private readonly reloadTimeMs: number,
	) {
		super();
		this.bullets = this.maxBullets;
	}

	shot() {
		if (this.bullets > 0) {
			this.bullets -= 1;
			this.notify(this.bullets);
			return true;
		}

		this.reload();
		return false;
	}

	get isReloading() {
		return this.reloading;
	}

	reload() {
		this.reloading = true;
		setTimeout(() => {
			this.bullets = this.maxBullets;
			this.reloading = false;
		}, this.reloadTimeMs);
	}
}
