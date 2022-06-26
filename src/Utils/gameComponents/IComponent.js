function noImplementado(){
	throw 'NO IMPLEMENTADO'
}

export default class IComponent{
	constructor( go, id ){

		this.go = go;
		this.id = id;
	}

	create(){	throw 'NO IMPLEMENTADO'	}

	update(){	throw 'NO IMPLEMENTADO'	}
	destroy(){	throw 'NO IMPLEMENTADO'	}
}