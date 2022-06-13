
import sky from '@/assets/bg/game_background_1/layers/sky.png';
import rocks from '@/assets/bg/game_background_1/layers/rocks_2.png';
import path from '@/assets/bg/game_background_2/layers/rocks_2.png';
// import tile from '@/assets/tilesets/Hex Tiles/jungle forest.obj'
import logo from '@/assets/logo.png'

import {Align} from 'phaser-utility';
// import { Align } from "node_modules/phaser-utility/index";

import CustomScene from "./CustomScene";

export default class SceneBackground extends CustomScene{
	constructor(){
		super({key: 'bg'})
	}
	preload (){
	
		this.load.image('sky', sky);
		this.load.image('rocks', rocks);
		this.load.image('path', path);

		this.load.image('logo', logo);
	}
	
	create (){

		let sky = this.addFullSizeBG('sky')
		let rocks = this.addFullSizeBG('rocks')
		let path = this.addFullSizeBG('path')

	}
	
	update(time, delta){
		
	}
}