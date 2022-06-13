import Phaser from "phaser";

export default class MapScene extends Phaser.Scene{
	constructor(key, mapConfig={}){
		super(key);

		console.log('mapConfig',mapConfig)

		let {
			tiles=[]
			,walls=[]
			,width
			,heigth
		} = mapConfig;

		this.tiles = tiles;
		this.walls = walls;

		this.width = width;
		this.heigth = heigth;
	}
	// preload(){
	// 	preload.call()
	// }
	drawMap(){

	}
}