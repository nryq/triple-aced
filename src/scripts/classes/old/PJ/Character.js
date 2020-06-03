import Elf from '../race/Elf';
import PJStat from '../stat/PJStat';

function Character( name ){

	this.name = name;

	this.race = new Elf();
	this.stats = new PJStat( 4, 7, 7, 3, 1 );
}

export default Character;