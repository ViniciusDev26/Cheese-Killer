import type { Power } from "./elements/Player";

type Keys = "SHOT";
export interface GameConfig {
	width: number;
	height: number;
	images: ReturnType<typeof makeImages>;
	sounds: ReturnType<typeof makeSounds>;
	keys: Record<Keys, string>;
}

function makeSounds() {
	const ding = new Audio(
		"sounds/784428__erokia__msfxp13-43_3-ambient-90-bpm.wav",
	);
	ding.preload = "auto";

	const death = new Audio(
		"sounds/506587__mrthenoronha__kill-enemy-2-8-bit.wav",
	);
	death.preload = "auto";

	const kill = new Audio("sounds/506585__mrthenoronha__kill-enemy-4-8-bit.wav");
	kill.preload = "auto";

	const pain = new Audio("sounds/29617__erdie__pain-male2.ogg");
	pain.preload = "auto";

	return {
		kill,
		death,
		ding,
		pain,
	};
}

function makeImages() {
	const imagem = new Image();
	imagem.src = "image/download-removebg-preview.png";

	const shotImg = new Image();
	shotImg.src = "image/r89tgjxet0y11.gif";

	const meteoroImg = new Image();
	meteoroImg.src = "image/images-removebg-preview.png";

	const power_ups: Record<Power, string> = {
		invincibility: "image/imunidade-removebg-preview.png",
		extraPoints: "image/dobro-removebg-preview.png",
		tripleShot: "image/tiro-triplo-removebg-preview.png",
	};

	return {
		elements: {
			imagem,
			shotImg,
			meteoroImg,
		},
		power_ups,
	};
}

export function getGameConfig(): GameConfig {
	return {
		width: 700,
		height: 300,
		sounds: makeSounds(),
		images: makeImages(),
		keys: {
			SHOT: " ",
		},
	};
}
