import Phaser from "phaser";

import tile from '@/assets/tilesets/Isometric/Tiles/BaseTiles/Base1 (64x64).png';
import player from '@/assets/pj/elf_f_idle_anim_f0.png';

import {Align} from 'phaser-utility';
// import { Align } from "node_modules/phaser-utility/index";

// import Tilemap from '@/Utils/CustomTilemap';
import IsometricTilemap from '@/Utils/Tilemap.Isometric';

import MapScene from "./MapScene";

export default class SceneDungeon extends MapScene{
	constructor(config){
		super(config)
	}
	preload (){
	
		this.load.image('tile', tile);
		this.load.image('player', player);
		
		// this.load.tilemapTiledJSON('map', 'src/assets/map.json');

		// this.load.image('tiles', 'http://labs.phaser.io/assets/tilemaps/iso/iso-64x64-outside.png');
    // this.load.image('tiles2', 'http://labs.phaser.io/assets/tilemaps/iso/iso-64x64-building.png');
    // this.load.tilemapTiledJSON('m', 'http://labs.phaser.io/assets/tilemaps/iso/isorpg.json');

		// this.load.map('mm', 'http://labs.phaser.io/assets/tilemaps/iso/isorpg.json')
	}
	
	create (){

		let lvl = [
			[0, 0, 0, 1, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,1, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,1 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 1, 0, 0, 0,0 ]
		]

		let _layer2 = [
			[0, 0, 0, 1, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,1, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,1 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 0, 0, 0, 0,0 ]
			,[0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0, 1, 0, 0, 0,0 ]
		]

		let mapConfig = {
			key: 'dun'
			, data:lvl
			,tileheight:1024
			,tilewidth: 1024
		}

		let parser = IsometricTilemap.parseIso(
			'dun'
			, lvl
			, 64
			, 64
			, false
		)
		parser.orientation = 'isometric';

		let map = new IsometricTilemap(this, parser)
		// let map = new Phaser.Tilemaps.Tilemap(this, parser);

		const tileset = map.addTilesetImage('asdasd', 'tile', 64, 64);
		this.layer = map.createLayer(0, tileset, 64, 64).setVisible(true);
		// let layer2 = map.createBlankLayer('walls', tileset, 200, 200).setData(_layer2);
		
		// map.addLayerData({name:'walls', tileWidth:32, tileHeight:32},tileset, _layer2)
		// this.layer.orientation = 1;
		// console.log('layer2', layer2)

		// let layer = this.layer;
		// console.log('layer',this.layer)

		let cartesianToIsometric = function(cartPt){
			// var tempPt=new Phaser.Point();
			let tempPt = {}
			tempPt.x=cartPt.x-cartPt.y;
			tempPt.y=(cartPt.x+cartPt.y)/2;
			return (tempPt);
		}

		console.log( 'map', map )
		// console.log( 'tileset', tileset )
		// console.log('layer', layer.layer)this.scene.sys.displayList.add(layer);

		// layer.layer.data.map(r=>{
		// 	if( r == null )	return;
		// 	r.map(c=>{
		// 		let {x,y} = cartesianToIsometric({x:c.x, y:c.y})
		// 		c.x = x;
		// 		c.y = y;
		// 	})
		// })

    // this.rt = this.add.renderTexture(0, 0, 800, 600);

		

		this.map = map;

		window.ta = {
			map
			// ,tileset
		}
		// let tile = this.add.image( 100,100,'tile' );

		// let la = this.add.layer([lvl.map(t=>{t==0?tile:null})])

		// this.add.isobox(200, 100, 50, 10)
		// let iso = this.add.isobox(300, 100, 50, 10)
		// iso.projection = 5
		// this.add.image( 100,100,'tile' );
		
		this.player = this.physics.add.sprite(128,128,'player')

		let up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		this.cursors = {up,down,left,right}

		console.log( 'player', this.player )
	}

	
	update(time, delta){

		// this.rt.clear();

    // this.rt.draw(this.layer);

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
		}

		this.player.setVelocityY(yVel);
		this.player.setVelocityX(xVel);
	}
}