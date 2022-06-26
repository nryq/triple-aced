import Sprites from "@/scripts/TASprites";
// import GridPosition from "@VisualEngine/GridPosition";

export default class GameObject {

	constructor(name, sprites, meta = {}){

		this.name = name;

		if(!!sprites)
			this.sprites = new Sprites({sprites});
		
		const {
			x, y
		} = meta;

		// this.position = new GridPosition(x,y);

	}
}