import Phaser from "phaser";
import {ninjaGirl,loadNinjaGirl} from './assets/NinjaGirlSprite';
import Game from './scenes/Game.js';

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 800,
	height: 600,
	antialias: false,
	scene: [
		Game
	]
};

const game = new Phaser.Game(config);


// function
