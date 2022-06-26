
import IComponent from "./IComponent";

export default class ComponentManager{
	/**
	 * 
	 * @param {Array} componentsList 
	 */
	constructor(componentsList=[]){
		if( componentsList != undefined && !Array.isArray(componentsList) )
			throw 'Debe ser una lista de components';
		
		if( !componentsList.filter(c=>!(c instanceof IComponent)) )
			throw 'No permitodo tipo de objeto';

		
		this.componentsList = componentsList || [];
	}

	update(delta, time){
		this.componentsList.forEach(c=>{
			c.update(delta, time);
		})
	}

	addComponent(newComponent){
		this.componentsList.push(newComponent)
	}

	addGameObject(go, id){
		this.addComponent( new IComponent(go, id) );
	}
}