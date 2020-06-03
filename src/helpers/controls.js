export default class InputControls {

  constructor( game ) {
    this.game = game;

    this.up = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  	this.down = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  	this.right = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  	this.left = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  	this.attack = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  AddInput(){

  }

  onUpInput(fun){

    if( this.up.isDown )
      fun();
  }

  onDownInput(fun){

    if( this.down.isDown )
      fun();
  }

  onLeftInput(fun){

    if( this.left.isDown )
      fun();
  }

  onRightInput(fun){

    if( this.right.isDown )
      fun();
  }

  onAttackInput(fun){

    if( this.attack.isDown )
      fun();
  }

  onMoving(move, stand){

    if( this.up.sDown || this.down.isDown || this.right.isDown || this.left.isDown ){
      move();
    }else if( !this.attack.isDown ){
      stand();
    }
  }
}
