import { getGameConfig } from "./config";
import { Meteoro } from "./elements/Meteor";
import { Player, type Power } from "./elements/Player";
import { PowerUps } from "./elements/PowerUp";
import { Score } from "./elements/Score";
import { Shot } from "./elements/Shot";
import { LifeView } from "./views/LifeView";
import { ScoreView } from "./views/ScoreView";

const config = getGameConfig();

let tempo = 0;
const tempoJogo = document.querySelector(".tempo");

const playerName = prompt("Digite seu nome") as string;
const player = document.querySelector("#player") as HTMLElement;
player.innerHTML = playerName;

const cheese = new Player(playerName, config.images.elements.imagem);
const lifeView = new LifeView(document.querySelector(".vida") as HTMLElement);
cheese.life.subscribe(lifeView);

const score = new Score();
const scoreView = new ScoreView(
	document.querySelector(".pontuacao") as HTMLElement,
);
score.subscribe(scoreView);

let balaRestante = 20;
const maxBalas = 20;
let recarregando = false;

const canvasEl = document.querySelector("#game") as HTMLCanvasElement;
const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;

ctx.imageSmoothingEnabled = false;

const allMeteor: Meteoro[] = [];
let allShots: Shot[] = [];
let allPowerUp: PowerUps[] = [];

function createMeteor() {
	const meteoro = new Meteoro(config.images.elements.meteoroImg);
	allMeteor.push(meteoro);
}

config.images.elements.imagem.addEventListener("load", () => {
	desenhaJogo();
	salvarDados();
	for (let i = 0; i < 3; i++) {
		createMeteor();
	}
});

canvasEl.addEventListener("mousemove", (e) => {
	cheese.coordinates.x = e.offsetX - cheese.largura / 2;
	cheese.coordinates.y = e.offsetY - cheese.altura / 2;
	desenhaJogo();
});

function desenhaJogo() {
	ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

	cheese.desenha(ctx);

	for (const meteoros of allMeteor) {
		meteoros.desenha(ctx);
	}

	for (const shot of allShots) {
		shot.desenha(ctx);
	}

	desenharPowerUps();
}

function atualizaInimigos() {
	for (const meteoros of allMeteor) {
		meteoros.atualizar();
	}
}
function atualizaTiros() {
	for (const shot of allShots) {
		shot.atualizar();
	}

	for (let i = 0; i < allShots.length; i++) {
		if (allShots[i].canBeDestroyed) {
			allShots.splice(i, 1);
		}
	}
}

function verificaCollision() {
	for (const meteoros of allMeteor) {
		const atingiuCheese = meteoros.collision(cheese);
		if (atingiuCheese) {
			if (!cheese.powerStatus.invincibility) {
				meteoros.destruir();
				config.sounds.pain.play();
				cheese.life.removeOneLife();

				if (cheese.life.isDead) {
					reiniciarJogo();
					break;
				}
			}
		}
	}

	for (const meteoro of allMeteor) {
		for (const tiro of allShots) {
			const tiroAtingiuMeteoro = tiro.collision(meteoro);
			if (tiroAtingiuMeteoro) {
				tiro.canBeDestroyed = true;
				meteoro.destruir();
				config.sounds.death.currentTime = 0;
				config.sounds.death.play();
				score.addPoints(1);
				// TODO: Add meteor speed increase each 30 seconds
			}
		}
	}
}

function reiniciarJogo() {
	fimDoJogo();
	allPowerUp = [];
	cheese.life.reset();
	score.reset();

	for (const meteor of allMeteor) {
		meteor.destruir();
	}

	allShots = [];

	desenhaJogo();

	alert("You died, the game will restart!");
}

function atualizaLogicaDoJogo() {
	atualizaInimigos();
	atualizaTiros();
	verificaCollision();
	verificaColisionPowerUps();

	desenhaJogo();
}

setInterval(atualizaLogicaDoJogo, 30);

function cheeseShot(shift_y?: number) {
	const shot = new Shot(cheese, config.images.elements.shotImg);
	if (shift_y) shot.coordinates.y += shift_y;

	allShots.push(shot);
}

function darTiro() {
	if (balaRestante > 0 && !recarregando) {
		if (cheese.powerStatus.tripleShot) {
			cheeseShot();
			cheeseShot(10);
			cheeseShot(-10);
		} else {
			cheeseShot();
		}

		config.sounds.kill.play();
		balaRestante--;
		atualizarPlacarBalas();
	} else if (balaRestante === 0 && !recarregando) {
		iniciarRecarga();
	}
}

document.body.addEventListener("keydown", (e) => {
	if (e.key === config.keys.SHOT) {
		e.preventDefault();
		darTiro();
	}
});

function atualizarPlacarBalas() {
	const placarBalas = document.querySelector(".allBalas");
	placarBalas.innerText = balaRestante;
}

function iniciarRecarga() {
	recarregando = true;

	setTimeout(() => {
		balaRestante = maxBalas;
		recarregando = false;
		atualizarPlacarBalas();
	}, 2000);
}

function salvarDados() {
	localStorage.setItem("pontos", count);
}

interface RankingItem {
	name: string;
	score: number;
}
function salvarPontuacao(name: string, score: number) {
	const ranking: RankingItem[] =
		JSON.parse(localStorage.getItem("ranking") ?? "") || [];
	ranking.push({ name, score });
	ranking.sort((a, b) => b.score - a.score);
	localStorage.setItem("ranking", JSON.stringify(ranking));
}

function fimDoJogo() {
	salvarPontuacao(playerName, score.points);
	alert("Pontuação salva, confira no ranking!");
	window.location.href = "ranking.html";
}

function aumentarInimigos() {
	tempo += 1;

	if (tempo % 10 === 0) {
		createMeteor();
	}
	tempoJogo.innerHTML = tempo;
}

setInterval(aumentarInimigos, 1000);

function randomPowerUp() {
	const tipos = Object.keys(config.images.power_ups) as Power[];
	const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
	const imagem = new Image();
	imagem.src = config.images.power_ups[tipoAleatorio];

	return new PowerUps(
		Math.random() * canvasEl.width,
		Math.random() * canvasEl.height,
		30,
		30,
		imagem,
		tipoAleatorio,
		5000,
	);
}

function addPowerUp() {
	const novoPowerUp = randomPowerUp();
	allPowerUp.push(novoPowerUp);
}

setInterval(addPowerUp, 10000);

function desenharPowerUps() {
	for (const powerUp of allPowerUp) {
		powerUp.desenhar(ctx);
	}
}

function verificaColisionPowerUps() {
	for (let i = 0; i < allPowerUp.length; i++) {
		const powerUp = allPowerUp[i];
		if (powerUp.colidiuCom(cheese)) {
			powerUp.AplicarEfeito(cheese);
			allPowerUp.splice(i, 1);
			break;
		}
	}
}

cheese.applyPower("invincibility", 5000);
