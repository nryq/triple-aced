import Phaser from "phaser";
// import logoImg from "./assets/logo.png";
import SceneBattlefield from '@/scripts/GameEngine/scenes/SceneBattlefield';
import SceneBackground from '@/scripts/GameEngine/scenes/SceneBackground';

import SceneDungeon from '@/scripts/GameEngine/scenes/SceneDungeon'

let sceneBF = new SceneBattlefield();
let sceneBG = new SceneBackground();
let sceneDun = new SceneDungeon({key:'dun', active:true});

let width = window.innerWidth,
	height = window.innerHeight;

let config = {
	type: Phaser.AUTO,
	width,
	height,
	transparent: true,
	physics: {
		default: 'arcade',
		arcade: {
			// gravity: { y: 200 }
		},
		debug: {
			showBody: true,
			showStaticBody: true
		}
	},
	scene: [
		sceneBG
		,sceneDun,
		
	]
};

function preload (){
	this.load.setBaseURL('http://labs.phaser.io');
	// http://labs.phaser.io/assets/tilemaps/iso/isorpg.json

	this.load.image('sky', 'assets/skies/space3.png');
	this.load.image('logo', 'assets/sprites/phaser3-logo.png');
	this.load.image('red', 'assets/particles/red.png');
}

function create (){
	this.add.image(400, 300, 'sky');

	let particles = this.add.particles('red');

	let emitter = particles.createEmitter({
		speed: 100,
		scale: { start: 1, end: 0 },
		blendMode: 'ADD'
	});

	let logo = this.physics.add.image(400, 100, 'logo');

	logo.setVelocity(100, 200);
	logo.setBounce(1, 1);
	logo.setCollideWorldBounds(true);

	emitter.startFollow(logo);
}

function update(){
	
}

let phaserGame = new Phaser.Game(config);

export default phaserGame