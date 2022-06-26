import IComponent from "./IComponent";

let co = new IComponent();

let up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

let cursors = {up,down,left,right}

co.update = function(delta){
	let xVel = 0,
			yVel = 0,
			vel = 200;

		let lateralMovement = this.cursors.right.isDown || this.cursors.left.isDown;
		let verticalMovement = this.cursors.up.isDown || this.cursors.down.isDown;

		if( lateralMovement ){
			xVel = vel;
			xVel *= this.cursors.left.isDown?-1:1;
		}

		if( verticalMovement ){
			yVel = vel;
			yVel *= this.cursors.up.isDown?-1:1;
			yVel *= lateralMovement?.5:.75;
			this.player.depth = this.player.y + 32;
		}

		this.player.setVelocityY(yVel);
		this.player.setVelocityX(xVel);
}