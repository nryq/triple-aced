
import Phaser, {Tilemaps} from "phaser";

const {Tile} = Tilemaps;
import IsInLayerBounds from "phaser/src/tilemaps/components/IsInLayerBounds";
import CalculateFacesAt from "phaser/src/tilemaps/components/CalculateFacesAt";
import SetTileCollision from "phaser/src/tilemaps/components/SetTileCollision";

import CustomTilemap from "./CustomTilemap";
import IsometricLayer from "./IsometricLayer";

export default class IsometricTilemap extends CustomTilemap{
	constructor(scene, config){
		config.orientation = 1;
		super( scene, config )
		// this.buildMap();
	}

	// buildMap (){
	// 	//  Parse the data out of the map
	// 	const data = this;

	// 	let {
	// 		tileWidth, tileHeight,
	// 		layers
	// 	} = data;

	// 	let tileWidthHalf = tileWidth / 2;
	// 	let tileHeightHalf = tileHeight / 2;

	// 	if( layers.length <= 0 )	return;

	// 	let layerIndex = 0;

	// 	console.log( 'll', layers )

	// 	const tiles = layers[layerIndex].data;

	// 	const mapwidth = layers[layerIndex].width;
	// 	const mapheight = layers[layerIndex].height;

	// 	const centerX = mapwidth * tileWidthHalf;
	// 	const centerY = 16;

	// 	const baseX = 100;
	// 	const baseY = 200; 

	// 	for (let y = 0; y < mapheight; y++){
	// 		for (let x = 0; x < mapwidth; x++){
	// 			let cTile = tiles[y][x]
	// 			const id = cTile - 1;

	// 			const tx = (x - y) * tileWidthHalf;
	// 			const ty = (x*.5 + y*.5) * tileHeightHalf;
	// 			// const layer = this.scene.add.layer();

	// 			//Cartesian to isometric:
	// 			const isoX = x - y;
	// 			const isoY = (x + y) / 2;
	// 			// const xPos = centerX + tx;
	// 			// const yPos = centerY + ty;
	// 			const xPos = ((isoX)  * tileWidthHalf)+baseX+centerX;
	// 			const yPos = ((isoY) * tileHeightHalf)+baseY+centerY;
	// 			const depth = layerIndex;

	// 			const tileTileset = cTile.tileset;

	// 			if( !!tileTileset && !!tileTileset.image ){
	// 				const tile = this.scene.add.image(
	// 					xPos, yPos
	// 					, tileTileset.image
	// 					, id
	// 				);
					
	// 				tile.setDisplaySize( tileWidth, tileHeight )

	// 				tile.depth = depth;
	// 			}else{

					
	// 			}

	// 			let txt = this.scene.add.text(
	// 				xPos - tileWidthHalf*.5
	// 				, yPos- (tileHeightHalf*.66)
	// 				// , `${(x+1)}, ${y+1}`
	// 				, ''+depth
	// 				, { font: "10px Arial Black", fill: "#000" }
	// 			);
				
	// 			txt.depth = 1000;
	// 		}
	// 	}
	// }

	addLayer(){
		let layer = new Phaser.GameObjects.Layer()
	}

	cartesianToIsometric(cartPt){
		var tempPt=new Phaser.Point();
		tempPt.x=cartPt.x-cartPt.y;
		tempPt.y=(cartPt.x+cartPt.y)/2;
		return (tempPt);
	}
	isometricToCartesian(isoPt){
		var tempPt=new Phaser.Point();
		tempPt.x=(2*isoPt.y+isoPt.x)/2;
		tempPt.y=(2*isoPt.y-isoPt.x)/2;
		return (tempPt);
	}
	/**
	 * 
	 * @param {*} tilesetName 
	 * @param {*} imageKey 
	 * @param {*} tileWidth 
	 * @param {*} tileHeight 
	 * @param {*} tileMargin 
	 * @param {*} tileSpacing 
	 * @param {*} gid 
	 * @returns 
	 */
	// addTilesetImage(tilesetName, imageKey, tileWidth, tileHeight, tileMargin, tileSpacing, gid){
	// 	let tileset = this.getTileSetByName(tilesetName);
		
	// 	let texture = this.scene.sys.textures.get(imageKey);
	// 	if (tileset){
	// 		tileset.setTileSize(tileWidth, tileHeight);
	// 		tileset.setSpacing(tileMargin, tileSpacing);
	// 		tileset.setImage(texture);

	// 		return tileset;
	// 	}
	// 	if (tileWidth === undefined) { tileWidth = this.tileWidth; }
	// 	if (tileHeight === undefined) { tileHeight = this.tileHeight; }
	// 	if (tileMargin === undefined) { tileMargin = 0; }
	// 	if (tileSpacing === undefined) { tileSpacing = 0; }
	// 	if (gid === undefined) { gid = 0; }

	// 	tileset = new Phaser.Tilemaps.Tileset(tilesetName, gid, tileWidth, tileHeight, tileMargin, tileSpacing);

	// 	tileset.setImage(texture);

	// 	this.tilesets.push(tileset);
	// 	console.log( 'tileset', tileset, texture )
	// 	this.buildMap();
	// 	return tileset;
	// }

	// getTileSetByName(tilesetName){
	// 	return this.tilesets.filter(t=>t.name === tilesetName)[0];
	// }

	// createLayer(layerID, tileset, x, y){
	// 	let layer = new Phaser.GameObjects.Layer()
	// 	// layer.pipeline.active = false;
	// 	console.log('super.createLayer', layer)
	// 	this.buildMap();
	// 	return layer
	// }

	addLayerData(config, tileset, data){
		
		let layer = this.createLayerData(config, data)
		this.layers.push(layer)
		var tilemapLayer = new Phaser.Tilemaps.TilemapLayer(this.scene, this, 1, tileset, 100, 100);
		console.log('tilemapLayer', tilemapLayer)
		this.scene.sys.displayList.add(tilemapLayer);
	}

	createLayerData(config, data=[]){
		var layerData = new Phaser.Tilemaps.LayerData(config);

		const {
			tileWidth=32
			,tileHeight=32
		} = config;

		var tiles = [];
		var height = data.length;
		var width = 0;

		const xOff = (data.length-1)*.5;

		for (var y = 0; y < data.length; y++){
			tiles[y] = [];
			var row = data[y];

			for (var x = 0; x < row.length; x++){

				var tileIndex = parseInt(row[x], 10);

				let cartesianToIsometric = function(cartPt){
					// var tempPt=new Phaser.Point();
					let tempPt = {}
					tempPt.x=cartPt.x-cartPt.y;
					tempPt.y=(cartPt.x+cartPt.y)/2;
					return (tempPt);
				}
				let isoPos = cartesianToIsometric({x,y});

				const xPos = (isoPos.x*.5)+xOff,
					yPos = (isoPos.y*.5);

				if (isNaN(tileIndex) || tileIndex === -1){

					tiles[y][x] = insertNull
						? null
						: new Phaser.Tilemaps.Tile(layerData, -1, xPos, yPos, tileWidth, tileHeight);
				}else{
					tiles[y][x] = new Phaser.Tilemaps.Tile(layerData, tileIndex, xPos, yPos, tileWidth, tileHeight);
				}
			}

			if (width === 0){
				width = row.length;
			}
		}

		layerData.data = tiles;

		return layerData;
	}

	static parseIso(name, data, tileWidth, tileHeight, insertNull){
		
		var layerData = new Phaser.Tilemaps.LayerData({
			tileWidth: tileWidth,
			tileHeight: tileHeight,
			baseTileWidth:tileWidth*.5,
			baseTileHeight:tileHeight*.5,
			// name: 0
			orientation: 1
		});

		var mapData = new Phaser.Tilemaps.MapData({
			name: name,
			tileWidth: tileWidth,
			tileHeight: tileHeight,
			format: null,
			layers: [ layerData ]
			,orientation: 1
		});

		var tiles = [];
		var height = data.length;
		var width = 0;

		const xOff = (data.length-1)*.3;
		

		for (var y = 0; y < data.length; y++){
			tiles[y] = [];
			var row = data[y];

			for (var x = 0; x < row.length; x++){

				var tileIndex = parseInt(row[x], 10);

				let cartesianToIsometric = function(cartPt){
					// var tempPt=new Phaser.Point();
					let tempPt = {}
					tempPt.x=cartPt.x-cartPt.y;
					tempPt.y=(cartPt.x+cartPt.y)/2;
					return (tempPt);
				}
				let isoPos = cartesianToIsometric({x,y});

				const xPos = (x),
					yPos = (y);

				if (isNaN(tileIndex) || tileIndex === -1){

					tiles[y][x] = insertNull
						? null
						: new Phaser.Tilemaps.Tile(layerData, -1, xPos, yPos, tileWidth, tileHeight);
				}else{
					tiles[y][x] = new Phaser.Tilemaps.Tile(layerData, tileIndex, xPos, yPos, tileWidth, tileHeight);
				}

				if(tiles[y][x]!=null){
					// console.log('tiles[y][x]', tiles[y][x])
					// tiles[y][x].setCollision(false, false, true)
					// tiles[y][x].depth = yPos + 32;

					// tiles[y][x].properties = {type: 'grass'}
 
					tiles[y][x].setSize(tileWidth, tileHeight, tileWidth, tileHeight*.50)
					// tiles[y][x].bottom = 128
					// tiles[y][x].setCollisionCallback(function(gameobject,tile){
					// 	console.log( 'asdasd', gameobject,tile )
					// })
				}
			}

			if (width === 0){
				width = row.length;
			}
		}

		mapData.width = layerData.width = width;
		mapData.height = layerData.height = height;
		mapData.widthInPixels = layerData.widthInPixels = width * tileWidth;
		mapData.heightInPixels = layerData.heightInPixels = height * tileHeight;
		layerData.data = tiles;
		
		return mapData;
	}

	setDisometricTileSize( tile ){
		
		const tileWidth = tile.width;
		const tileHeight = tile.height;
		const baseTileWidth = tile.baseWidth;
		const baseTileHeight = tile.baseHeight*.5
		tile.setSize(tileWidth, tileHeight, baseTileWidth, baseTileHeight)
	}

	putTileInLayer(layerName, tile, tileX, tileY, recalculateFaces){

		const layer = this.getLayer(layerName);
		const layerIndex = this.getLayerIndexByName(layerName)

		if (recalculateFaces === undefined) { recalculateFaces = true; }

		if (!IsInLayerBounds(tileX, tileY, layer)){
			return null;
		}

		var oldTile = layer.data[tileY][tileX];
		var oldTileCollides = oldTile && oldTile.collides;

		if (tile instanceof Tile){
			if (layer.data[tileY][tileX] === null){
				layer.data[tileY][tileX] = new Tile(
					layer
					, tile.index
					, tileX, tileY
					, layer.tileWidth
					, layer.tileHeight
				);
			}
			layer.data[tileY][tileX].copy(tile);
		}else{
			var index = tile;

			if (layer.data[tileY][tileX] === null){
				layer.data[tileY][tileX] = new Tile(layer, index, tileX, tileY, layer.tileWidth, layer.tileHeight*.5);
			}else{
				layer.data[tileY][tileX].index = index;
			}
		}

		// Updating colliding flag on the new tile
		var newTile = layer.data[tileY][tileX];
		var collides = layer.collideIndexes.indexOf(newTile.index) !== -1;

		SetTileCollision(newTile, collides);

		// Recalculate faces only if the colliding flag at (tileX, tileY) has changed
		if (recalculateFaces && (oldTileCollides !== newTile.collides)){
			CalculateFacesAt(tileX, tileY, layer);
		}

		this.setDisometricTileSize(newTile)

		if( tileY == 1 ){
			console.log( 'soy un tile 1' );

			newTile.set
		}

		return newTile;
	}


}