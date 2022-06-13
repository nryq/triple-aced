import Sprites from "@VisualEngine/Sprite";
import GridPosition from "@VisualEngine/GridPosition";

export default class GameObject{

	constructor(name, sprites, meta = {}){

		this.name = name;

		this.sprites = new Sprites({sprites});
		
		const {
			x, y
		} = meta;

		this.position = new GridPosition(x,y);

	}
}