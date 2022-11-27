
import PlayerAttackState from "./states/playerAttackState"
import PlayerIdleState from "./states/playerIdleState"
import PlayerWalkState from "./states/playerWalkState"

/**
 * 
 */
export default class PlayerStateFactory{
	
	/**
	 * 
	 * @param {PlayerStateMachine} context 
	 */
	constructor( context ){
		this.context = context
	}

	get idle(){
		return new PlayerIdleState(this.context, this)
	}
	get attack(){
		return new PlayerAttackState(this.context, this)
	}
	get walk(){
		return new PlayerWalkState(this.context, this)
	}
}