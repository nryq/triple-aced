import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import demon from './assets/spritesheets/demon.png';
import elf_f from './assets/spritesheets/elf_f.png';

import {ninjaGirl,loadNinjaGirl} from './assets/NinjaGirlSprite';

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 800,
	height: 600,
	antialias: false,
	scene: {
		preload: preload,
		create: create,
		update,
		extend: {
			animateSprite,
			ninjaGirl,
			loadNinjaGirl
		}
	}
};

const game = new Phaser.Game(config);

let up;
let down;
let right;
let left;
let attack;


function preload() {
	// this.load.image("logo", logoImg);
	// this.load.spritesheet('demon', demon, { frameWidth: 34, frameHeight: 38 });
	this.load.spritesheet('elf_f', elf_f, { frameWidth: 18, frameHeight: 30 });


	this.loadNinjaGirl();
}

function create() {

	up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	// var mummyAnimation = this.anims.create({
	// 	key: 'walk',
	// 	frames: this.anims.generateFrameNumbers('demon'),
	// 	frameRate: 16,
	// 	repeat:-1
	// });

	this.ninjaGirl('ninja');

	this.animateSprite('elf_fSprite','elf_f');



	// let demonSprite = this.add.sprite(10, 300, 'demon').setScale(1.2);


	// demonSprite.play('walk');


	// sprite.anims.setRepeat(-1);

	// this.tweens.add({
	// 	targets: demonSprite,
	// 	x: 750,
	// 	duration: 8800,
	// 	ease: 'Linear'
	// });

}

function update(time, delta) {

	let ms = 400 * (delta/1000);

	// this.elf_fSprite.estado = 'idle'; 

	if(up.isDown || down.isDown || right.isDown || left.isDown){
		// this.elf_fSprite.estado = 'run';
		// this.elf_fSprite.play(this.elf_fSprite.estado, true);
		this.ninja.play('ninja_run', true);
	}else if( attack.isDown ){

		// this.elf_fSprite.estado = 'attack';
		// this.elf_fSprite.play(this.elf_fSprite.estado);
		this.ninja.play('ninja_attack', true);
	}else{

		// this.elf_fSprite.estado = 'idle';
		// this.elf_fSprite.play(this.elf_fSprite.estado, true);
		this.ninja.play('ninja_idle', true);
	}



	if (up.isDown){
		// this.elf_fSprite.y -= ms;
		this.ninja.y -= ms;
	}

	if (down.isDown){
		// this.elf_fSprite.y += ms;
		this.ninja.y += ms;
	}

	if (right.isDown){
		// this.elf_fSprite.x += ms;
		// this.elf_fSprite.flipX=false;

		this.ninja.x += ms;
		this.ninja.flipX=false;
	}

	if (left.isDown){
		// this.elf_fSprite.x -= ms;
		// this.elf_fSprite.flipX=true;

		this.ninja.x -= ms;
		this.ninja.flipX=true;
	}
}


function animateSprite(obj, sprite){

	this.anims.create({
		key: 'attack',
		frames: this.anims.generateFrameNumbers(sprite, {
			start: 0, 
			end: 1
		}),
		frameRate: 8,
		repeat:0
	});

	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers(sprite, {
			start: 1, 
			end: 4
		}),
		frameRate: 16,
		repeat:-1
	});

	this.anims.create({
		key: 'run',
		frames: this.anims.generateFrameNumbers(sprite, {
			start: 5, 
			end: 8
		}),
		frameRate: 12,
		repeat:-1
	});

	this[obj] = this.add.sprite(50, 300, sprite).setScale(2);
	this[obj].play('idle');

	// this.tweens.add({
	// 	targets: this.elf_fSprite,
	// 	x: 750,
	// 	duration: 8800,
	// 	ease: 'Linear'
	// });
}

