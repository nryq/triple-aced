
export default class ControlManager{
	constructor(scene, {up='W', down='S', left='A', right='D', attack='F'}={}){

		this.up = scene.input.keyboard.addKey(up);
		this.down = scene.input.keyboard.addKey(down);
		this.left = scene.input.keyboard.addKey(left);
		this.right = scene.input.keyboard.addKey(right);
		this.attack = scene.input.keyboard.addKey(attack);
	}
}