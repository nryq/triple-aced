import PlayerBaseState from "@/scripts/PlayerScripts/states/playerBaseState";

export default class PlayerWalkState extends PlayerBaseState{
	
	enterState(){
		console.log('caminando')
	}
	updateState(time, delta){
		super.updateState(time, delta)
	}
}