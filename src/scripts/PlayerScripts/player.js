import ControlManager from "@/scripts/GameEngine/ControlManager";
import PlayerStateMachine from "./playerStateMachine"

export default class Player{
	constructor(scene, playerGO, weapon, controlManager){
		this.stats = {}
		this.scene = scene
		this.playerGO = playerGO;
		this.stateMachine = new PlayerStateMachine(this);
		this.controlManager = controlManager || new ControlManager(scene);
		this._weapon = weapon;
	}

	get currentEquippedWeapon(){
		return this._weapon;
	}

	onUpdate(time, delta){
		if( !this.playerGO || !this.controlManager || !this.scene )	return;
		this.stateMachine.update(time, delta);
	}
}