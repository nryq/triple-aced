import State from "@/scripts/GameEngine/StateMachine/state";

export default class PlayerBaseState extends State{
	constructor(context, factory){
		super(context)
		this.factory = factory
		this.timer = 1000;
	}
	
	updateState(time, delta){

		this.handleRunning(time, delta)
		this.handleAttacking(time, delta);
	}

	handleRunning(time, delta){

		const controlManager = this.context.controlManager;
		let lateralMovement = controlManager.right.isDown || controlManager.left.isDown;
		let verticalMovement = controlManager.up.isDown || controlManager.down.isDown;

		if( !lateralMovement && !verticalMovement ){

			if( this.context.stateMachine.currentState instanceof this.factory.idle.constructor ){
				return
			}else{
				this.context.stateMachine.changeState( this.factory.idle )
				this.context.playerGO.setVelocityY(0);
				this.context.playerGO.setVelocityX(0);
				return
			}
		}else{
			if( !(this.context.stateMachine.currentState instanceof this.factory.walk.constructor) )
				this.context.stateMachine.changeState( this.factory.walk )

			let xVel = 0,
				yVel = 0,
				vel = 2.5;

			
			const playerGO = this.context.playerGO;

			if( lateralMovement ){
				xVel = vel;
				xVel *= controlManager.left.isDown?-1:1;
			}

			if( verticalMovement ){
				yVel = vel;
				yVel *= controlManager.up.isDown?-1:1;
				yVel *= lateralMovement?.5:.75;
				playerGO.depth = playerGO.y + 32;
			}

			playerGO.setVelocityY(yVel);
			playerGO.setVelocityX(xVel);
		}

		
	}
	handleAttacking(time, delta){

		const controlManager = this.context.controlManager;
		const playerGO = this.context.playerGO;
		const weapon = this.context.currentEquippedWeapon;

		if( controlManager.attack.isDown && (this.timer === 0 || this.timer == null)){

			console.log( 'atacando' , playerGO )
			let xPos = playerGO.x, yPos = playerGO.y;
			weapon.setPosition(xPos, yPos).setVisible(true)
			return 
		}else if(this.timer > 0){

			this.timer -= delta;
		}else if( this.timer !== null ){

			this.timer = null;
			weapon.setVisible(false)
		}
	}
}