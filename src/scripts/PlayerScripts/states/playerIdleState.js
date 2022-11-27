import PlayerBaseState from "@/scripts/PlayerScripts/states/playerBaseState";

export default class PlayerIdleState extends PlayerBaseState{
	constructor(context, factory){
		super(context, factory)
	}
	enterState(){
		// console.log( 'idleando' )
	}
	updateState(time, delta){
		super.updateState(time, delta)
	}
}