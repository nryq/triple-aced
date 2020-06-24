class StatModsTypes {
  constructor(name,order) {
    this.name = name;
    this.order = order;
  }
}

const FLAT = new StatModsTypes('FLAT', 100);
const PERCENT = new StatModsTypes('PERCENT', 200);
const PER_ADDITVE = new StatModsTypes('PER_ADDITVE', 300);
const NULLIFY = new StatModsTypes('NULLIFY', 400);

// const StatType{
// 	FLAT = 100,
// 	PERCENT = 200,
// 	PER_ADDITVE = 300,
// 	NULLIFY = 400
// }

export default class StatModifier {
  constructor( type, value, src, id=`${type}_${new Date().valueOf()}`, timer = false ) {
    this.id = id
    this.type = type;
    this.value = value;
    this.src = src;
    this.timer = timer;
  }

  getType() {
  	this.type.name;
  }
}

export const FLAT_STAT_MODIFIER = FLAT;
export const PERCENT_STAT_MODIFIER = PERCENT;
export const PER_ADDITVE_STAT_MODIFIER = PER_ADDITVE;
export const NULLIFY_STAT_MODIFIER = NULLIFY;
