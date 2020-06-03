import StatModifier, { FLAT_STAT_MODIFIER, PERCENT_STAT_MODIFIER, PER_ADDITVE_STAT_MODIFIER, NULLIFY_STAT_MODIFIER } from './StatModifier';

function Stat( name, val, abr, desc ){

	this.name = name;
	this.baseVal = val;
	this.statVal = val;
	this.abr = abr;
	this.desc = desc;

	this.statModifiers = [];

	Object.defineProperty(this, "__isDirty", {
    enumerable: false,
    writable: true
	});
}

Stat.prototype.getStatValue = function() {
	// in case de stal value is dirty (modifiers o setted)
	// is calculated again
	if( this.__isDirty )
		this.statVal = this.calculateStat();

	return this.statVal;
};

Stat.prototype.setStatValue = function(newVal) {

	this.hasToCalculate();
	this.baseVal = newVal;
};

Stat.prototype.addModifier = function(modifier) {

	this.hasToCalculate();
	this.statModifiers.push(modifier);
};

Stat.prototype.getModifiers = function() {
	return this.statModifiers;
}

Stat.prototype.addMultipleModifiers = function( arrMods ) {
	this.hasToCalculate();
	this.statModifiers.concat(arrMods);
}

// in case of stat modification this function should be 
// called to raise the flag to be recalculated when
// the stat value is needed
Stat.prototype.hasToCalculate = function() {
	this.__isDirty = true;
};

// mark the stat as clean and DOES NOT need to be calculated
Stat.prototype.calculated = function() {
	this.__isDirty = false;
};

// calculate de new stat value and return it
Stat.prototype.calculateStat = function() {

	let finalValue = this.baseVal;

	for(let mod of this.statModifiers ){

		switch( mod.type ){

			case FLAT_STAT_MODIFIER:

				finalValue += mod.value;
			break;
			case PERCENT_STAT_MODIFIER:

				finalValue *= (1 + mod.value);
			break;
			case PER_ADDITVE_STAT_MODIFIER:

				finalValue *= (1 + mod.value);
			break;
		}
	}

	this.calculated();

	return finalValue;
};



export default Stat;