
import Phaser from "phaser";

export default class IsometricLayer extends Phaser.GameObjects.Layer{
	constructor(scene, children, pipeline){
		super(scene, children)
		this.pipeline.active = false;
	}

}