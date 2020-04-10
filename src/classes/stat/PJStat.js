import Stat from '../stat/Stat';

function PJStat( strBase, agiBase, intBase, dexBase, lukBase ){
	this.str = new Stat('Fuerza', strBase, 'str', 'Es fuerza fisica');
	this.agi = new Stat('Agilidad', agiBase, 'agi', 'ES Agilidad');
	this.int = new Stat('Inteligencia', intBase, 'int', 'DESC inteligencia');
	this.dex = new Stat('Destreza', dexBase, 'dex', 'DESC destreza');
	this.luk = new Stat('Suerte', lukBase, 'luk', 'DESC suerte');
}

export default PJStat;