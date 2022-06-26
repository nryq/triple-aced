import Phaser from "phaser";

import ComponentManager from "@/Utils/gameComponents/ComponentManager";

export default class CustomScene extends Phaser.Scene{
	constructor(key){
		super(key)
		this.componentManager = new ComponentManager();
	}

	addFullSizeBG(key){
		let img = this.add.image(0, 0, key);
		this.setImgFullSize(img)
		return img;
	}

	setImgFullSize(img){
		img.displayHeight = this.sys.game.config.height;
		img.displayWidth = this.sys.game.config.width;
		// img.scaleX = img.scaleY;

		img.x = img.displayWidth *.5;
		img.y = img.displayHeight *.5;
	}

	update(time, delta){

		this.componentManager.update();

		super.update(time, delta)
	}
}