import Phaser from "phaser";

import tile from '@/assets/tilesets/Isometric/Tiles/BaseTiles/Base1 (64x64).png';
import player from '@/assets/pj/elf_f_idle_anim_f0.png';
import sword from '@/assets/sword.png';

import {Align} from 'phaser-utility';
// import { Align } from "node_modules/phaser-utility/index";

// import Tilemap from '@/Utils/CustomTilemap';
import IsometricTilemap from '@/Utils/Tilemap.Isometric';
import TASprites from "@/scripts/TASprites";

import MapScene from "./MapScene";

export default class SceneDungeon extends MapScene{
	constructor(config){
		super(config)
	}
	preload (){
	
		this.load.image('tile', tile);
		this.load.image('player', player);
		
		this.load.image('sword', sword)
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

		this.showDebug = false;
		this.debugGraphics = this.add.graphics();

		let map = new IsometricTilemap(this, parser)
		// let map = new Phaser.Tilemaps.Tilemap(this, parser);
		this.map = map;

		const tileset = map.addTilesetImage('asdasd', 'tile', 64, 64);

		this.layer = map.createLayer(0, tileset, 0, 0).setVisible(true);


		this.layer2 = map.createBlankLayer('walls', tileset, 0, 0).setDepth(100);
		// this.layer2.randomize(0, 0, 100, 100,  [ -1, 0, 12 ])

		let cartesianToIsometric = function(cartPt){
			// var tempPt=new Phaser.Point();
			let tempPt = {}
			tempPt.x=cartPt.x-cartPt.y;
			tempPt.y=(cartPt.x+cartPt.y)/2;
			return (tempPt);
		}

		this.map.putTileInLayer('walls', 0, 0, 0)

		this.player = this.matter.add.sprite(128,128,'player')
			.setFixedRotation(0)
			
		this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
		this.cameras.main.setZoom(2);

		console.log( 'this.player', this.player )
		
		let up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

		this.cursors = {up,down,left,right, attack}

		// this.physics.add.collider(this.player, this.layer2)
		// this.physics.add.collider(this.player, this.layer)
		// this.layer2.setCollisionByExclusion([ -1 ]);
		// this.layer.setCollisionByExclusion([ 0 ]);

		// this.matter.world.convertTilemapLayer(this.layer2);

		this.matter.world.on('collisionstart', function (event) {
			console.log( 'hola' )
		}, this)
		console.log( 'play', this.player )
		
		this.layer.forEachTile(tile => {

			Phaser.Geom.Mesh.GenerateGridVerts({
				tile,
				widthSegments: 6
		});

			// console.log( {tile} )

			if( tile.index !== 1 )	return;
			
			const {
				x:tileX, y:tileY
				, height:tileHeight, width:tileWidth
				, tilemapLayer: tileTilemapLayer
			} = tile;

			const displayWidth = tileWidth*.5,
				displayHeight = tileHeight*.25,
				xOff = tileTilemapLayer.x,
				yOff = tileTilemapLayer.y;

			var shapes = {
				"diamond": [
					[
						{ "x": 0, "y": -displayHeight } //superior
						, { "x": displayWidth, "y": 0 } //derecho
						, { "x": 0, "y": displayHeight } //inferior
						, { "x": -displayWidth, "y": 0 } //izquierdo
					]
				]
			};
			let isoPoint = IsometricTilemap.cartesianToIsometric(tileX, tileY);

			const posX = ((isoPoint.x+.5)*tileWidth)+xOff
				, posY= ((isoPoint.y+.25)*tileHeight)+yOff;

			var iso_collision = this.add.polygon(posX, posY, shapes.diamond, 0xff0000, 0.1);
			this.matter.add.gameObject(iso_collision, { shape: { type: 'fromVerts', verts: shapes.diamond } }).setStatic(true);
		});
		this.layer2.forEachTile(tile => {

			if( tile.index !== 0 )	return;
			
			const {
				x:tileX, y:tileY
				, height:tileHeight, width:tileWidth
				, tilemapLayer: tileTilemapLayer
			} = tile;

			const displayWidth = tileWidth*.5,
				displayHeight = tileHeight*.25,
				xOff = tileTilemapLayer.x,
				yOff = tileTilemapLayer.y;

			var shapes = {
				diamond: [
					[
						{ x: 0, y: -(displayHeight) }  //superior
						, { x: displayWidth, y: 0 }  //derecho
						, { x: 0, y: (displayHeight) }  //inferior
						, { x: -displayWidth, y: 0 }  //izquierdo
					]
				]
			};

			let isoPoint = IsometricTilemap.cartesianToIsometric(tileX, tileY);

			const posX = ((isoPoint.x+.5)*tileWidth)+xOff
				, posY= ((isoPoint.y+.25)*tileHeight)-yOff+(tileHeight*.5);

			var iso_collision = this.add.polygon(posX, posY, shapes.diamond, 0xff0000, 0.1);
			this.matter.add.gameObject(iso_collision, { shape: { type: 'fromVerts', verts: shapes.diamond } }).setStatic(true);
		});

		this.weapon = this.matter.add.sprite(10, 0, 'sword').setScale(.1, .1).setSensor(true)
		// this.physics.world.enable(this.weapon);
		// this.container.add(this.weapon);
		this.attacking = false;

		this.input.keyboard.on('keydown-C', event=>{
			this.showDebug = !this.showDebug;
			this.drawDebug();
		});

		this.playerContainer = this.add.container(0, 0);
		this.playerContainer.add(this.player)
		this.playerContainer.add(this.weapon);
	}

	drawDebug (){
    
		const debugGraphics = this.debugGraphics;
		debugGraphics.clear();

    if (this.showDebug)
    {
        this.layer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(211, 36, 255, 100), // Colliding tiles
            faceColor: new Phaser.Display.Color(211, 36, 255, 255) // Colliding face edges
        });

        this.layer2.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(244, 255, 36, 100), // Colliding tiles
            faceColor: new Phaser.Display.Color(244, 255, 36, 255) // Colliding face edges
        });
				
    }
	}

	
	update(time, delta){

			if( this.cursors.attack.isDown && (this.timer === 0 || this.timer == null)){

				console.log( 'attack', this.weapon )
				let xPos = this.player.x, yPos = this.player.y;
				this.weapon = this.matter.add.sprite(xPos, yPos, 'sword').setScale(.1, .1).setSensor(true)
				this.weapon.setVisible(true).setFlipX(true);
				this.timer = 1000;
				
			}else if(this.timer > 0){

				this.timer -= delta;
			}else if( this.timer !== null ){

				this.timer = null;
				this.weapon.destroy();
			}

			
		// }

		// this.rt.clear();

    // this.rt.draw(this.layer);

		let xVel = 0,
			yVel = 0,
			vel = 2.5;

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

	generate(x, y){
    fireball.setPosition(player.x, player.y).setScale(0.5).setAlpha(1);

    curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(player.x, player.y), new Phaser.Math.Vector2(x, y));

    fireball.setPath(curve);
    fireball.startFollow(300);
    
    fireFX.restart();    
	}
}