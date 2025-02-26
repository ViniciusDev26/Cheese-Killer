import type { Coordinates } from "../types";

export class Sprite {
	public coordinates: Coordinates = { x: 0, y: 0 };
	constructor(
		x: number,
		y: number,
		public readonly largura: number,
		public readonly altura: number,
		public readonly imagem: CanvasImageSource,
	) {
		this.coordinates = {
			x,
			y,
		};
	}

	desenha(ctx: CanvasRenderingContext2D) {
		if (this.imagem) {
			ctx.drawImage(
				this.imagem,
				this.coordinates.x,
				this.coordinates.y,
				this.largura,
				this.altura,
			);
		} else {
			ctx.strokeRect(
				this.coordinates.x,
				this.coordinates.y,
				this.largura,
				this.altura,
			);
		}
	}

	get center() {
		return {
			x: this.coordinates.x + this.largura / 2,
			y: this.coordinates.y + this.altura / 2,
		};
	}

	collision(outraSprite: Sprite) {
		const a = Math.abs(outraSprite.center.x - this.center.x);
		const b = Math.abs(outraSprite.center.y - this.center.y);
		const d = Math.sqrt(a ** 2 + b ** 2);
		const r1 = this.altura / 2;
		const r2 = outraSprite.altura / 2;

		return d <= r1 + r2;
	}
}
