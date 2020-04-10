function StatModsTypes(name,order){
	this.name = name;
	this.order = order;
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

function StatModifier( type, value, src, id){
	this.id = id
	this.type = type;
	this.value = value;
	this.src = src;
}

StatModifier.prototype.getType = function() {
	this.type.name;
};

export default StatModifier;
export const FLAT_STAT_MODIFIER = FLAT;
export const PERCENT_STAT_MODIFIER = PERCENT;
export const PER_ADDITVE_STAT_MODIFIER = PER_ADDITVE;
export const NULLIFY_STAT_MODIFIER = NULLIFY;