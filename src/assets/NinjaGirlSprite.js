import ninjaGirlSprites from './spritesheets/NinjaGirl';

export const ninjaGirl = function(obj){

	let framerate = 60;

	let frames = this.anims.generateFrameNumbers('ninjaGirl_a');

	this.anims.create({
		key: obj+'_attack',
		frames: frames,
		frameRate: framerate,
		repeat:1
	});

	this.anims.create({
		key: obj+'_idle',
		frames: this.anims.generateFrameNumbers('ninjaGirl_i'),
		frameRate: framerate/4,
		repeat:-1
	});

	this.anims.create({
		key: obj+'_run',
		frames: this.anims.generateFrameNumbers('ninjaGirl_r'),
		frameRate: framerate,
		repeat:-1
	});

	// this.anims.create({
	// 	key: 'run',
	// 	frames: this.anims.generateFrameNumbers(sprite, {
	// 		start: 5, 
	// 		end: 8
	// 	}),
	// 	frameRate: 12,
	// 	repeat:-1
	// });

	this[obj] = this.add.sprite(200, 100, obj).setScale(0.15);
	this[obj].play(obj+'_idle');
}

export const loadNinjaGirl = function(){

	this.load.spritesheet('ninjaGirl_a', ninjaGirlSprites['NinjaGirl_attack'], 
		{ frameWidth: 526, frameHeight: 567 });

	this.load.spritesheet('ninjaGirl_r', ninjaGirlSprites['NinjaGirl_run'], 
		{ frameWidth: 378, frameHeight: 522 });
	this.load.spritesheet('ninjaGirl_i', ninjaGirlSprites['NinjaGirl_idle'], 
		{ frameWidth: 292, frameHeight: 502 });
}
