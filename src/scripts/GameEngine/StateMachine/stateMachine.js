import State from './state'

export default class StateMachine{

	constructor(context){
		this.context = context
		this.currentState = undefined;
	}

	addState(){}
	changeState( newState ){
		if( this.currentState instanceof State ){
			this.currentState.leaveState()
		}

		this.currentState = newState;
		this.currentState.enterState();
	}
	update(){}
}