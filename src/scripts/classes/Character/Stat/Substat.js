import Stat from './Stat.js';

// stats that is affected by other stats
export default class Substat extends Stat{
  constructor(name, baseVal, abr, desc){
    super(name, baseVal, abr, desc)

    // dictionary of stats
    this.dependentStatsDictionary = {};
  };
  get value(){
    return this.calculateSubstat();
  };
  addDependentStat( stat, calcMethod=()=>{return stat.value} ){
    this.hasToCalculate();
    this.dependentStatsDictionary[ stat.abr ] = {
      stat,
      calcMethod
    }
  };
  removeDependentStat( stat ){
    this.hasToCalculate();
    try{
      let statName = typeof stat == 'string'?stat:stat.abr;
      delete this.dependentStatsDictionary[statName];
      return this.dependentStatsDictionary;
    }catch(error){
      console.log('Erro al quitar stat dependiente', stat);
      return false;
    }
  };
  // TODO: definir si los stats derivados van a ser calculados antes o despues
  // de los modificadores
  calculateSubstat(){
    let calculatedSubstat = 0;
    let dependentStats = this.dependentStatsDictionary;
    for( let statItem in dependentStats ){
      let statEntry = dependentStats[statItem];
      calculatedSubstat += statEntry.hasOwnProperty('calcMethod')?
        statEntry.calcMethod(dependentStats, super.value):
        super.value;
    }
    return calculatedSubstat;
  }
}
