import type { Player } from "./Player";
import { Sprite } from "./Sprite";

export type PowerUpType = "invincibility" | "tripleShot" | "extraPoints";

export class PowerUps extends Sprite {
	constructor(
		x: number,
		y: number,
		largura: number,
		altura: number,
		imagem: CanvasImageSource,
		public readonly type: PowerUpType,
		private readonly duration: number,
	) {
		super(x, y, largura, altura, imagem);
	}

	// TODO: Implementar método applyExtraPoints
	applyExtraPoints(player: Player) {
		// player.score += 50; // Soma 50 pontos corretamente
		// count += 50; // Atualiza o placar global
		// console.log("🎯 Ganhou 50 pontos extras!");
		// if (placar) {
		// 	setTimeout(() => {
		// 		// Pequeno atraso para garantir a atualização
		// 		placar.innerText = count;
		// 		console.log("📊 Placar atualizado:", count);
		// 	}, 100);
		// } else {
		// 	console.warn("! Elemento do placar não encontrado!");
		// }
	}

	AplicarEfeito(player: Player) {
		console.log(`Efeito do tipo ${this.type}`);

		if (this.type === "invincibility") {
			player.applyPower("invincibility", this.duration);
		} else if (this.type === "tripleShot") {
			player.applyPower("tripleShot", this.duration);
		} else if (this.type === "extraPoints") {
			this.applyExtraPoints(player);
		}

		console.log(`Efeito do tipo ${this.type} aplicado.`);
		console.log("📌 Estado do player após o PowerUp:", {
			imune: player.powerStatus.invincibility,
			"tiro-triplo": player.powerStatus.tripleShot,
		});
	}

	desenhar(ctx: CanvasRenderingContext2D) {
		super.desenha(ctx);
	}

	colidiuCom(jogador: Sprite) {
		return (
			jogador.coordinates.x < this.coordinates.x + this.largura &&
			jogador.coordinates.x + jogador.largura > this.coordinates.x &&
			jogador.coordinates.y < this.coordinates.y + this.altura &&
			jogador.coordinates.y + jogador.altura > this.coordinates.y
		);
	}
}
