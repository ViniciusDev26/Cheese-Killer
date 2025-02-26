import type { Coordinates } from "../types";

export class Sprite {
	public coordinates: Coordinates = { x: 0, y: 0 };
	constructor(
		x: number,
		y: number,
		public readonly width: number,
		public readonly height: number,
		public readonly imagem: CanvasImageSource,
	) {
		this.coordinates = {
			x,
			y,
		};
	}

	draw(ctx: CanvasRenderingContext2D) {
		if (this.imagem) {
			ctx.drawImage(
				this.imagem,
				this.coordinates.x,
				this.coordinates.y,
				this.width,
				this.height,
			);
		} else {
			ctx.strokeRect(
				this.coordinates.x,
				this.coordinates.y,
				this.width,
				this.height,
			);
		}
	}

	get center() {
		return {
			x: this.coordinates.x + this.width / 2,
			y: this.coordinates.y + this.height / 2,
		};
	}

	collision(sprite: Sprite) {
		const a = Math.abs(sprite.center.x - this.center.x);
		const b = Math.abs(sprite.center.y - this.center.y);
		const d = Math.sqrt(a ** 2 + b ** 2);
		const r1 = this.height / 2;
		const r2 = sprite.height / 2;

		return d <= r1 + r2;
	}
}
