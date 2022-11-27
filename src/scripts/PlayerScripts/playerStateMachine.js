import StateMachine from "@/scripts/GameEngine/StateMachine/stateMachine";
import PlayerStateFactory from "./playerStateFactory";

export default class PlayerStateMachine extends StateMachine{
	constructor(context){

		super(context)

		this.states = new PlayerStateFactory(context);

		this.currentState = this.states.idle;
		this.currentState.enterState();
	}

	update(time, delta){

		this.currentState.updateState(time, delta);
	}
}