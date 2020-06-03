import logoImg from "../assets/logo.png";
import demon from '../assets/spritesheets/demon.png';
import elf_f from '../assets/spritesheets/elf_f.png';

import Character from '../scripts/classes/Character/Character.js';
import Elf from '../prefabs/Elf';
import CharacterStats from '../scripts/classes/Character/Stat/CharacterStats.js';

import InputControls from '../helpers/controls.js';

let up;
let down;
let right;
let left;
let attack;

const ASD = 'null';

const newChara = new Character(
  'Elfo Puto',
  new CharacterStats(),
  new Elf()
);

export default class Game extends Phaser.Scene{
  constructor() {
    super({
      key: 'Game'
    })
  }

  preload() {

  	this.load.spritesheet('elf_f', elf_f, { frameWidth: 18, frameHeight: 30 });
  }
  create() {

    this.TA_Input = new InputControls(this);

  	up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  	down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  	right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  	left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  	attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  	this.animateSprite('elf_fSprite','elf_f');
  }

  update(time, delta) {

    let ms = 400 * (delta/1000);

    let elf_fSprite = this.elf_fSprite;

    this.TA_Input.onMoving(()=>{
      elf_fSprite.play('run', true);
    },
    ()=>{
      elf_fSprite.play('idle', true);
    });

    this.TA_Input.onUpInput(function(){
      elf_fSprite.y -= ms;
    });

    this.TA_Input.onDownInput(function(){
      elf_fSprite.y += ms;
    });

    this.TA_Input.onLeftInput(function(){

      elf_fSprite.x -= ms;
      elf_fSprite.flipX=true;
    });

    this.TA_Input.onRightInput(function(){
      elf_fSprite.x += ms;
      elf_fSprite.flipX=false;
    });

    this.TA_Input.onAttackInput(()=>{
      elf_fSprite.play('attack');
      console.log('<->', newChara);
    })
  }

  animateSprite(obj, sprite){

    console.log('ANIMATE', obj, sprite)

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

}
