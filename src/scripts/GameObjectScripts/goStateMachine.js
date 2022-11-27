import StateMachine from "@/scripts/GameEngine/StateMachine/stateMachine";
import GoStateFactory from "./goStateFactory";

export default class GoStateMachine extends StateMachine{
	constructor(){

		this.goStateMachine = new GoStateFactory(this);
	}
}