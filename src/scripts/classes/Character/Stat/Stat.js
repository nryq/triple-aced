export default class Stat {
  constructor( name, baseVal, abr, desc ) {

    this.name = name;
    this.baseVal = baseVal;
    this.statVal = baseVal;
    this.abr = abr;
    this.desc = desc;

    this.statModifiers = [];

    Object.defineProperty(this, "__isDirty", {
      enumerable: false,
      writable: true
    });
  }

  getStatValue() {
  	// in case de stal value is dirty (modifiers o setted)
  	// is calculated again
  	if( this.__isDirty )
  		this.statVal = this.calculateStat();

  	return this.statVal;
  };

  setStatValue(newVal) {

  	this.hasToCalculate();
  	this.baseVal = newVal;
  };

  addModifier(modifier) {

  	this.hasToCalculate();
  	this.statModifiers.push(modifier);
  };

  getModifiers() {
  	return this.statModifiers;
  }

  addMultipleModifiers( arrMods ) {
  	this.hasToCalculate();
  	this.statModifiers.concat(arrMods);
  }

  // in case of stat modification this function should be
  // called to raise the flag to be recalculated when
  // the stat value is needed
  hasToCalculate() {
  	this.__isDirty = true;
  };

  // mark the stat as clean and DOES NOT need to be calculated
  calculated() {
  	this.__isDirty = false;
  };

  // calculate de new stat value and return it
  calculateStat() {

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

}
